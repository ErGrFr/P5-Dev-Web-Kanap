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
    replaceIdByClass(leClone,'ImgProduit','ImgProduit');                        //un id doit etre unique

    leClone.getElementById("NomProduit").textContent = `${leCanap.name}`;       // modif du nom
    replaceIdByClass(leClone,'NomProduit','NomProduit');
    leClone.getElementById("CouleurProduit").textContent = `Couleur : ${leCanap.color}`;    // modif de la couleur
    replaceIdByClass(leClone,'CouleurProduit','CouleurProduit');
    
    
    leClone.getElementById("QtyProduit").textContent = `qté : ${leCanap.qty}`;    // modif de la qté
    replaceIdByClass(leClone,'QtyProduit','QtyProduit');
    panierTotal.qtyTotal += parseInt(`${leCanap.qty}`);   //  recalcul de la qté panier
    leClone.getElementById("PrixProduit").textContent = `Prix : ${leCanap.price} €`;    // modif du prix
    replaceIdByClass(leClone,'PrixProduit','PrixProduit');
    panierTotal.prixTotal += parseInt(`${leCanap.price}`) * parseInt(`${leCanap.qty}`);   //  recalcul du prix panier
    //clone.querySelector(".cart__item__content__settings__quantity p").innerHTML = `Qté : ${leCanap.qty}`;  // modif qty
    leClone.getElementById("QtyProduitInput").setAttribute("value",`${leCanap.qty}`); // modif qty ds le input
    leClone.getElementById("QtyProduitInput").removeAttribute("id"); // suppression simple de l'Id, il existe deja la class=itemQty
    // Ajout identification du bouton supprimer ( de 0 a xxx)
    leClone.querySelector('.deleteItem').setAttribute("data-id", `${indexDataId}`);
    // Ajout identification sur input qui modifie la qty
    leClone.querySelector('.itemQuantity').setAttribute("data-id", `${indexDataId}`);

    // ajout du clone ds html
    leParent.appendChild(leClone); // ajout sur le parent 
    console.log(leClone);

}

// remplace l'id par une class dans docHtml
function replaceIdByClass(docHtml,theId,theClass){
    //let val = 
    let element = docHtml.getElementById(theId);
    //console.log(element);
    element.setAttribute("class",theClass);   // ajout de la class
    element.removeAttribute("id");      // suppression de l'id
    //console.log(element);
}

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

  // modification de la qty ds le localstorage
function modificationQty(indexPanier, newQty){
    console.log("modifQty "+indexPanier+ " " + newQty);
    let lesCanaps = JSON.parse(localStorage.getItem('selectionCanap')); // lecture du localstorage
    lesCanaps[indexPanier].qty = newQty;  // modification de la qty
    //console.log(lesCanaps);
    let monCart = localStorage.setItem('selectionCanap',JSON.stringify(lesCanaps)); // re-sauvegarde du panier ds le localstorage
    window.location.reload();   // re-affichage de la page ( maj)
  }