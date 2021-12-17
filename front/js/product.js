//console.log('fichier product.js')
//localStorage.clear();
 let clef = localStorage.getItem('selectionCanap'); // lecture de la clef de stockage
console.log(clef);

// information a stocker ds le panier
let infosCart = {
    id:'',
    name:'',
    img:'',
    imgalt:'',
    color:'',
    qty:0,
    price:''
};
let maSelectionCanaps = [];   // tableau des canaps ajouté au panier

//----------------------------------------------------------------
//---------- Ecoute du clic sur bouton "Ajout au panier" ----------
//-----------------------------------------------------------------
document.getElementById('addToCart').addEventListener("click" , function(){
    //console.log("clic");

    let infoQty = document.querySelector('#quantity');  // récupération des infos sélectionnées ( qty et couleur )
    let infoColor = document.querySelector('#colors');
    //console.log(infoQty.value);

    if(infoQty.value != '0' && infoQty.value != '' && infoColor.value != ''){  // verif saisie, pas de chaine vide ou zero
        // ajout des infos manquantes
        infosCart.id = urlID[1];           // ajout id du canap
        infosCart.qty = infoQty.value;     // ajout qty
        infosCart.color = infoColor.value;    // ajout color
        //console.log(infoColor.value);

        //console.log(maSelectionCanaps);
        // lecture/ recup des datas sauvegardés ds localstorage
        if(localStorage.getItem('selectionCanap') != null){  // si localstorage n'est pas vide
            // on transforme le contenu 'chaine'( JSON) en 'objet'(JS)
            maSelectionCanaps = JSON.parse(localStorage.getItem('selectionCanap'));
            //maSelectionCanaps = sauvegardeDansLocalstorage();
        }
        // modification du panier
        let index = RechercheIdCanapLocalstorage(maSelectionCanaps,infosCart.id,infosCart.color);
        if ( index == null){    // si l'id n'existe pas on l'ajoute
            // maj de la selection
            maSelectionCanaps.push(infosCart);
            console.log(maSelectionCanaps);
            // sauvegarde du panier ds le local storage ( on transforme l'objet JS en chaine JSON)
            //let monCart = localStorage.setItem('selectionCanap',JSON.stringify(maSelectionCanaps));
            sauvegardeDansLocalstorage(maSelectionCanaps);
        }else{  
            //let QtySav =  maSelectionCanaps[index].qty;
            let QtySav = parseInt(maSelectionCanaps[index].qty);   // si l'id existe deja on update la qty
            QtySav = QtySav + parseInt(infosCart.qty);
            maSelectionCanaps[index].qty = QtySav;
            //console.log(maSelectionCanaps);
            // sauvegarde du panier ds le local storage
            //localStorage.setItem('selectionCanap',JSON.stringify(maSelectionCanaps));
            sauvegardeDansLocalstorage(maSelectionCanaps);
        }
        
    }
});

//------------------------ récuperation de l'id du canapé dans l'url ----------------------------
let urlID = location.search.substring().split("=") // urlID[1] : id uniquement
//console.log(urlID[1])

//------------------------------------------------------------------------------------------------------------------
// Maj des infos de la page product.html + stockage des infos connus dans infosCart ( temporaire avant validation )
//------------------------------------------------------------------------------------------------------------------
function MajInfosCanap (UnCanap){
    if (UnCanap !== undefined) {    // verification si pas d'informations
        // Maj de l'image
        document.querySelector('.item__img').innerHTML = `<img src="${UnCanap.imageUrl}" alt="${UnCanap.altTxt}">`;
        infosCart.img = UnCanap.imageUrl;
        infosCart.imgalt = UnCanap.altTxt;
        // Maj du titre
        document.getElementById('title').innerHTML = `<p>${UnCanap.name}</p>`;
        infosCart.name = UnCanap.name;
        // MAj du prix
        document.getElementById('price').innerHTML =  `${UnCanap.price} `;
        infosCart.price = UnCanap.price;
        //Maj de la description
        document.getElementById('description').innerHTML =  `${UnCanap.description} `;
        // Maj de la liste des couleurs
        for (const UneCouleur of UnCanap.colors) {
            document.getElementById('colors').innerHTML +=  `<option value="${UneCouleur}">${UneCouleur}</option>`;
        }
    }
};

//-----------------------------------------------------------------------------------------
// recherche si le canap existe deja dans le panier, si oui on renvoi l'index du tableau
//-----------------------------------------------------------------------------------------
function RechercheIdCanapLocalstorage(LesCanaps, IdCanap, CouleurCanap){
    let i=0;
    for (UnCanap of LesCanaps) {
        if(UnCanap.id == IdCanap && UnCanap.color == CouleurCanap) {
            return i;
        }   
    i++; // index suivant
    }
return null;
}

//---------------------------------------------------------------
//------------ requete sur le canapé selectionné ------------------
//-----------------------------------------------------------------

let url = "http://localhost:3000/api/products/" + urlID[1] // requete API

fetch(url)
.then(response =>                   // promesse réponse serveur
    response.json()
    .then((LeCanap) => {            // promesse datas JSON
        //console.log(LeCanap);
        MajInfosCanap(LeCanap);     // Maj infos du canap
        
    })
    .catch()                        // Gestion des erreurs
    )
.catch(response => console.log(response))



