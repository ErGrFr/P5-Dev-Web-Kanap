// affiche un canap du panier
function majUnCanap(leCanap, indexDataId){
    // selection du parent
    const leParent = document.getElementById("cart__items");
    //console.log(leParent);

    // chargement template (un bloc template a été rajouté ds le html autour de "cart__item")
    const leTemplate = document.getElementById("template");

    // clonage du bloc template
    //let leClone = leTemplate.cloneNode(true);
    let leClone = document.importNode(leTemplate.content, true);

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
    leClone.getElementById("PrixProduit").textContent = `Prix : ${leCanap.price} €`;    // modif du prix
    replaceIdByClass(leClone,'PrixProduit','PrixProduit');
    leClone.getElementById("QtyProduitInput").setAttribute("value",`${leCanap.qty}`); // modif qty ds le input
    leClone.getElementById("QtyProduitInput").removeAttribute("id"); // suppression simple de l'Id, il existe deja la class=itemQty
    
    // Ajout identification de l'article complet
    leClone.querySelector('.cart__item').setAttribute("data-id",`${indexDataId}`);
    // Ajout identification du bouton supprimer ( de 0 a xxx)
    leClone.querySelector('.deleteItem').setAttribute("data-id", `${indexDataId}`);
    // Ajout identification sur input qui modifie la qty
    leClone.querySelector('.itemQuantity').setAttribute("data-id", `${indexDataId}`);
    // Ajout identification sur qté
    leClone.querySelector('.QtyProduit').setAttribute("data-id", `${indexDataId}`);

    // ajout du clone ds html
    leParent.appendChild(leClone); // ajout sur le parent 
    //console.log(leClone);

}

// remplace l'id par une class dans docHtml
function replaceIdByClass(docHtml,theId,theClass){
    let element = docHtml.getElementById(theId);
    element.setAttribute("class",theClass);   // ajout de la class
    element.removeAttribute("id");      // suppression de l'id
}

// suppression d'un canap dans le local storage et le html
function deleteCanap(indexPanier){
    // suppression de l'article ds le local storage
    let lesCanaps = lectureLocalstorage();
    lesCanaps.splice(indexPanier,1)  // suppression du canap ds le tableau
    sauvegardeDansLocalstorage(lesCanaps);
    // suppression de l'article dans le html
    let lesArticles = document.querySelectorAll('.cart__item');//.getAttribute("data-id");//setAttribute("data-id",`${indexDataId}`);
    for(unArticle of lesArticles){
        if(unArticle.getAttribute('data-id') == indexPanier){ 
            unArticle.remove();
        }
    }
    // maj du total panier
    majInfosTotalPanier();
  };

// modification de la qty ds le localstorage
function modificationQty(indexPanier, newQty){
    console.log("modifQty "+indexPanier+ " " + newQty);
    let lesCanaps = lectureLocalstorage();// lecture du localstorage
    lesCanaps[indexPanier].qty = newQty;  // modification de la qty
    sauvegardeDansLocalstorage(lesCanaps); // sauvegarde du panier
    // maj affichage qty article
    let panier = document.querySelectorAll('.QtyProduit');
    for(article of panier){
        if(article.getAttribute('data-id') == indexPanier){
            article.textContent = `qté : ${newQty}`;
        }
    }
    // maj du total panier
    majInfosTotalPanier();
  }

function majInfosTotalPanier(){
    // Total panier
    let panierTotal = {
    prixTotal: 0,
    qtyTotal:0,
    }

    let lesCanaps = lectureLocalstorage();
    for(unCanap of lesCanaps){
        panierTotal.qtyTotal = parseInt(`${unCanap.qty}`);   // pas de cumul sur la qty
        panierTotal.prixTotal += parseInt(`${unCanap.price}`) * panierTotal.qtyTotal;
    }
    // affichage du prix total du panier et qty total du panier ( le cumul se fait ds la boucle de lecture du localstorage )
    document.getElementById('totalQuantity').innerText = panierTotal.qtyTotal;
    document.getElementById('totalPrice').innerText = panierTotal.prixTotal;
  }

  //-------------------------------- localstorage -------------------------------------------------
  function lectureLocalstorage(){
      return JSON.parse(localStorage.getItem('selectionCanap')); // lecture ds localstorage
  }

  function sauvegardeDansLocalstorage(element){
    localStorage.setItem('selectionCanap',JSON.stringify(element));  // ecriture ds localstorage
  }

