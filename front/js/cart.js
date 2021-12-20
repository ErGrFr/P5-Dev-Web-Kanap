
//-----------------------------------------------------------------------------
//-------- affichage du panier ( sauvegardé ds localstorage )--------------------
//-----------------------------------------------------------------------------
let lesCanaps = lectureLocalstorage(); // lecture du localstorage
for(i=0;i<lesCanaps.length;i++){  // l'index i permet aussi d'identifier chaque bouton suppression et input qty
    majUnCanap(lesCanaps[i], i);
  };
majInfosTotalPanier();

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
let lesProducts = ['']; //<-- array of product _id



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

  //console.log(contact);
 
  if (saisieFormulaire === true){  // si tous les champs formulaire sont ok
      // soumission de la commande au serveur
      let url = "http://localhost:3000/api/order/"; //+contact+products; //+ JSON.stringify(contact) + JSON.stringify(products); // requete API
      fetch(url,{
        //-------------------------- datas pour le serveur ------------
        method : 'POST',
        //headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(contact),
        //body: contact,lesProducts   // FormData
        product: JSON.stringify(lesProducts)
        //--------------------------------------------------------------
        })
        .then(response => response.json() // promesse réponse serveur
              .then((maCommande) => {            // promesse datas JSON
                console.log(maCommande);
                //MajInfosCanap(LeCanap);     // Maj infos du canap

        
              })
              .catch(response => console.log(response))                        // Gestion des erreurs
        )
        .catch(response => console.log(response))
  };
});