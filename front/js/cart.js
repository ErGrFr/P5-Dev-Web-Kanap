
//-----------------------------------------------------------------------------
//-------- affichage du panier ( sauvegardé ds localstorage )--------------------
//-----------------------------------------------------------------------------
let lesCanaps = lectureLocalstorage(); // lecture du localstorage
if(lesCanaps != undefined){
  for(i=0;i<lesCanaps.length;i++){  // l'index i permet aussi d'identifier chaque bouton suppression et input qty
    majUnCanap(lesCanaps[i], i);
  };
  majInfosTotalPanier();
}


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
//console.log(lesQtyInput);
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
let products = []; // tableau de product _id

// regroupe les informartions de valididees de chaque champ
let contactValide = {
  firstName: false,
  lastName: false,
  adress: true,
  city: false,
  email: false
}

// a chaque saisie on verifie si pas de chiffre
contact.firstName = verifChiffreFormulaire('firstName');
contact.lastName = verifChiffreFormulaire('lastName');
contact.city = verifChiffreFormulaire('city');
contact.address = 'ici';
contact.email = verifArobasFormulaire('email');
console.log(contact);


// ecoute du bouton commander
document.getElementById("order").addEventListener("click" , function(commander){

  // si tous les champs sont true , alors on envoi la cmd au serveur
  console.log(contactValide);
  console.log("click")
  if (contactValide.firstName && contactValide.lastName && contactValide.adress && contactValide.city && contactValide.email){  // si tous les champs formulaire sont ok
    //console.log(contactValide) + "1";
    //console.log("condition true")
    products = ListeIdLocalstorage(); //<-- array of product _id
    //console.log(products);
      // soumission de la commande au serveur
      let url = "http://localhost:3000/api/products/order"; //+contact+products; //+ JSON.stringify(contact) + JSON.stringify(products); // requete API
      let cmd = fetch(url,{
        //-------------------------- datas pour le serveur ------------
        method : 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          contact : contact,
          products : products
        })
        })
        .then(response => response.json() // promesse réponse serveur
              .then((maCommande) => {     // promesse datas JSON
                // clear panier
                localStorage.clear();
                // url vers confirmation
                window.location.href = "./confirmation.html?orderId="+maCommande.orderId
                //MajInfosCanap(LeCanap);     // Maj infos du canap

              })
              .catch(response => console.log(response))   // Gestion des erreurs
        
        )
        .catch(response => console.log(response))
        //console.log(cmd.orderId);
  }else{
    console.log("condition false")
  };
  
});