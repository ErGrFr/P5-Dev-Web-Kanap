console.log('fichier cart.js');
//let lesCanaps = JSON.parse(localStorage.getItem('selectionCanap'));

// Total panier
let panierTotal = {
  prixTotal: 0,
  qtyTotal:0,
}






// affichage du panier
let lesCanaps = JSON.parse(localStorage.getItem('selectionCanap')); // lecture du localstorage
//for (const unCanap of lesCanaps) {
for(i=0;i<lesCanaps.length;i++){
    //majUnCanap(unCanap);
    majUnCanap(lesCanaps[i], i)
    //console.log(datasHTML);
};

console.log(panierTotal);
// affichage du prix total du panier et qty total du panier ( le cumul se fait ds la boucle de lecture du localstorage )
document.getElementById('totalQuantity').innerText = panierTotal.qtyTotal;
document.getElementById('totalPrice').innerText = panierTotal.prixTotal;


// affichage un canap du panier et renvoi le prix du canap

function majUnCanap(leCanap, indexDataId){
    // selection du parent
    const leParent = document.getElementById("cart__items");
    //console.log(leParent);

    // chargement template (un bloc temlate a été rajouté ds le html autour de "cart__item")
    const leTemplate = document.getElementById("template");
    //console.log(leTemplate);

    // clonage du bloc template
    //let leClone = leTemplate.cloneNode(true);
    let leClone = document.importNode(leTemplate.content, true);
    //console.log(leClone);

    // modification des informations ds le clone
    leClone.getElementById("ImgProduit").setAttribute("src",`${leCanap.img}`);  // modif de l'image
    leClone.getElementById("ImgProduit").setAttribute("alt",`${leCanap.alt}`);
    leClone.getElementById("NomProduit").textContent = `${leCanap.name}`;       // modif du nom
    leClone.getElementById("CouleurProduit").textContent = `Couleur : ${leCanap.color}`;    // modif de la couleur
    //console.log(leClone);
    
    leClone.getElementById("QtyProduit").textContent = `qté : ${leCanap.qty}`;    // modif de la qté
    panierTotal.qtyTotal += parseInt(`${leCanap.qty}`);   //  recalcul de la qté panier
    leClone.getElementById("PrixProduit").textContent = `Prix : ${leCanap.price} €`;    // modif du prix
    panierTotal.prixTotal += parseInt(`${leCanap.price}`) * parseInt(`${leCanap.qty}`);   //  recalcul du prix panier
    //clone.querySelector(".cart__item__content__settings__quantity p").innerHTML = `Qté : ${leCanap.qty}`;  // modif qty
    leClone.getElementById("QtyProduitInput").setAttribute("value",`${leCanap.qty}`); // modif qty ds le input
    
    // Ajout identification du bouton supprimer ( de 0 a xxx)
    leClone.querySelector('.deleteItem').setAttribute("data-id", `${indexDataId}`);

    // ajout du clone ds htmls
    //document.getElementById("cart_items").appendChild(leClone);
    //console.log(leClone);
    leParent.appendChild(leClone);
    console.log(leClone);

}

// ecoute des boutons supprimer
let boutonsSupprimmer = document.querySelectorAll('.deleteItem');
//console.log(boutonsSupprimmer);

for(unBouton of boutonsSupprimmer){
    unBouton.addEventListener("click" , function(eventSuppression){
    //console.log(eventSuppression.target.getAttribute('data-id'));
    //console.log("clic");
    // suppression du canap correspondant, meme index que les boutons
    deleteCanap(eventSuppression.target.getAttribute('data-id'));
  });
};

// suppression d'un canap dans le local storage
function deleteCanap(index){
  console.log("suppression canap" + index);
  
};


// requete de la commande
let url = "http://localhost:3000/api/order/" ; // requete API
fetch(url)
.then(response =>                   // promesse réponse serveur
    response.json()
    .then((laCommande) => {            // promesse datas JSON
        console.log(laCommande);
        //MajInfosCanap(LeCanap);     // Maj infos du canap
        
    })
    .catch()                        // Gestion des erreurs
    )
.catch(response => console.log(response))