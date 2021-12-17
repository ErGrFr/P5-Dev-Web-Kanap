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
majInfosTotalPanier();
console.log(panierTotal);
// affichage du prix total du panier et qty total du panier ( le cumul se fait ds la boucle de lecture du localstorage )
//document.getElementById('totalQuantity').innerText = panierTotal.qtyTotal;
//document.getElementById('totalPrice').innerText = panierTotal.prixTotal;


//---------------------------------------------------------------------
// -----------------  boutons supprimer --------------------------------
//---------------------------------------------------------------------
// selection de tous les boutons
let boutonsSupprimmer = document.querySelectorAll('.deleteItem');

// ecoute de chaque bouton supprimer
for(unBouton of boutonsSupprimmer){
    unBouton.addEventListener("click" , function(eventSuppression){
    // suppression du canap correspondant, meme index que les boutons
    deleteCanap(eventSuppression.target.getAttribute('data-id'));
  });
};



//-------------------------------------------------------------------
//------------------ modification qty "input" -----------------------
//--------------------------------------------------------------------
// selection de tous les input qty
let lesQtyInput = document.querySelectorAll('.itemQuantity');
console.log(lesQtyInput);
// ecoute de chaque input
for(unQtyInput of lesQtyInput){
  unQtyInput.addEventListener("change" , function(eventModificationQty){  // event sur changement de valeur
  // modification de la qty sur l'article du panier
  modificationQty(eventModificationQty.target.getAttribute('data-id'),eventModificationQty.target.value);
  });
};



//-------------------------------------------------------------
//----------------------- commande ----------------------------
//-------------------------------------------------------------

 // objet pour la commande
 let contact = {
  firstName : '',
  lastName : '',
  address : '',
  city : '',
  email: ''
};
let products = ['']; //<-- array of product _id



// ecoute du bouton commander
document.getElementById("order").addEventListener("click" , function(commander){

  // verification des champs contact
  let saisieFormulaire = true;  // vrai par defaut

  contact.firstName = document.getElementById("firstName").value;
  if(contact.firstName.match(/[0-9]/)){
    //console.log("Chiffre detecté");
    document.getElementById("firstNameErrorMsg").innerText = "Erreur , ne pas saisir de chiffres svp. "
    saisieFormulaire = false;
  }
  contact.lastName = document.getElementById("lastName").value;
  if(contact.lastName.match(/[0-9]/)){
    //console.log("Chiffre detecté");
    document.getElementById("lastNameErrorMsg").innerText = "Erreur , ne pas saisir de chiffres svp. "
    saisieFormulaire = false;
  }

  console.log(contact);
 
 if (saisieFormulaire === true){  // si tous les champs formulaire sont ok
      // soumission de la commande au serveur
      let url = "http://localhost:3000/api/order/"; //+contact+products; //+ JSON.stringify(contact) + JSON.stringify(products); // requete API
      fetch(url)
        .then(response =>                   // promesse réponse serveur
          response.json()
          .then((maCommande) => {            // promesse datas JSON
            console.log(maCommande);
            //MajInfosCanap(LeCanap);     // Maj infos du canap
        
          })
          .catch()                        // Gestion des erreurs
        )
        .catch(response => console.log(response))
  };

});