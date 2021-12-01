//console.log('fichier product.js')

let infosCart = {
    id:'',
    color:'',
    qty:''
};

// Ecoute du clic sur bouton "Ajout au panier"
document.getElementById('addToCart').addEventListener("click" , function(){
    //console.log("clic");
    infosCart.id = urlID[1];           // ajout id du canap
    let infoQty = document.querySelector('#quantity');  // récupération des infos
    infosCart.qty = infoQty.value;     // ajout qty
    //console.log(infoQty.value);
    let infoColor = document.querySelector('#colors');
    infosCart.color = infoColor.value;    // ajout color
    //console.log(infoColor.value);

    console.log(infosCart)

});



// récuperation de l'id du canapé dans l'url
let urlID = location.search.substring().split("=") // urlID[1] : id uniquement
//console.log(urlID[1])

// Maj des infos de la page product.html
function MajInfosCanap (UnCanap){
    if (UnCanap !== undefined) {    // verification si pas d'informations
        // Maj de l'image
        document.querySelector('.item__img').innerHTML = `<img src="${UnCanap.imageUrl}" alt="${UnCanap.altTxt}">`;
        // Maj du titre
        document.getElementById('title').innerHTML = `<p>${UnCanap.name}</p>`;
        // MAj du prix
        document.getElementById('price').innerHTML =  `${UnCanap.price} `;
        //Maj de la description
        document.getElementById('description').innerHTML =  `${UnCanap.description} `;
        // Maj de la liste des couleurs
        for (const UneCouleur of UnCanap.colors) {
            document.getElementById('colors').innerHTML +=  `<option value="${UneCouleur}">${UneCouleur}</option>`;
        }
        // Maj de nb d'articles ( qty = 1 par defaut )
        document.getElementById('description').innerHTML =  `${UnCanap.description} `;
    }
};



// requete sur le canapé selectionné

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



