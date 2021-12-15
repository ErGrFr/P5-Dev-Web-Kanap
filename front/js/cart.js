//console.log('fichier cart.js');
//let lesCanaps = JSON.parse(localStorage.getItem('selectionCanap'));

// Total panier
let panierTotal = {
  prixTotal: 0,
  qtyTotal:0,
}


//-----------------------------------------------------------------------------
//-------- affichage du panier ( sauvegardé ds localstorage )--------------------
//-----------------------------------------------------------------------------
let lesCanaps = JSON.parse(localStorage.getItem('selectionCanap')); // lecture du localstorage
//for (const unCanap of lesCanaps) {
for(i=0;i<lesCanaps.length;i++){  // l'index i permet aussi d'identifier chaque bouton suppression et input qty
    //majUnCanap(unCanap);
    majUnCanap(lesCanaps[i], i);
    //console.log(datasHTML);
};

console.log(panierTotal);
// affichage du prix total du panier et qty total du panier ( le cumul se fait ds la boucle de lecture du localstorage )
document.getElementById('totalQuantity').innerText = panierTotal.qtyTotal;
document.getElementById('totalPrice').innerText = panierTotal.prixTotal;

// affiche un canap du panier
function majUnCanap(leCanap, indexDataId){
    // selection du parent
    const leParent = document.getElementById("cart__items");
    //console.log(leParent);

    // chargement template (un bloc template a été rajouté ds le html autour de "cart__item")
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
    // Ajout identification sur input qui modifie la qty
    leClone.querySelector("#QtyProduitInput").setAttribute("data-id", `${indexDataId}`);

    // ajout du clone ds html
    leParent.appendChild(leClone); // ajout sur le parent 
    console.log(leClone);

}
//---------------------------------------------------------------------
// -----------------  boutons supprimer --------------------------------
//---------------------------------------------------------------------
// selection de tous les boutons
let boutonsSupprimmer = document.querySelectorAll('.deleteItem');
//console.log(boutonsSupprimmer);

// ecoute de chaque bouton supprimer
for(unBouton of boutonsSupprimmer){
    unBouton.addEventListener("click" , function(eventSuppression){
    //console.log(eventSuppression.target.getAttribute('data-id'));
    // suppression du canap correspondant, meme index que les boutons
    deleteCanap(eventSuppression.target.getAttribute('data-id'));
  });
};

// suppression d'un canap dans le local storage
function deleteCanap(indexPanier){
  console.log("suppression canap" + indexPanier);
  let lesCanaps = JSON.parse(localStorage.getItem('selectionCanap')); // lecture du localstorage
  lesCanaps.splice(indexPanier,1)  // suppression du canap ds le tableau
  console.log(lesCanaps);
  let monCart = localStorage.setItem('selectionCanap',JSON.stringify(lesCanaps)); // re-sauvegarde du panier ds le localstorage
  //localStorage.removeItem('selectionCanap'[indexPanier]);
  window.location.reload();   // re-affichage de la page ( maj)

};

//-------------------------------------------------------------------
//------------------ modification qty "input" -----------------------
//--------------------------------------------------------------------
// selection de tous les input qty
let lesQtyInput = document.querySelectorAll("#QtyProduitInput");
console.log(lesQtyInput);
// ecoute de chaque input
for(unQtyInput of lesQtyInput){
  unQtyInput.addEventListener("change" , function(eventModificationQty){  // event sur changement de valeur
  // modification de la qty sur l'article du panier
  modificationQty(eventModificationQty.target.getAttribute('data-id'),eventModificationQty.target.value);
});
};
// modification de la qty ds le localstorage
function modificationQty(indexPanier, newQty){
  console.log("modifQty "+indexPanier+ " " + newQty);
  let lesCanaps = JSON.parse(localStorage.getItem('selectionCanap')); // lecture du localstorage
  lesCanaps[indexPanier].qty = newQty;  // modification de la qty
  //console.log(lesCanaps);
  let monCart = localStorage.setItem('selectionCanap',JSON.stringify(lesCanaps)); // re-sauvegarde du panier ds le localstorage
  window.location.reload();   // re-affichage de la page ( maj)
}




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