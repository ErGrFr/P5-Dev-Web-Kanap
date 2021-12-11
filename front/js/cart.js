console.log('fichier cart.js');
//let lesCanaps = JSON.parse(localStorage.getItem('selectionCanap'));



// affichage du panier
let lesCanaps = JSON.parse(localStorage.getItem('selectionCanap')); // lecture du localstorage
for (const unCanap of lesCanaps) {
    majUnCanap(unCanap);
    //console.log(datasHTML);
}

// affichage un canap du panier

function majUnCanap(leCanap){

    /*let unCanap = `
            <article class="cart__item" data-id="${leCanap.id}" data-color="${leCanap.color}">
                <div class="cart__item__img">
                  <img src="${leCanap.img}" alt="${leCanap.alt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${leCanap.name}</h2>
                    <p>${leCanap.color}</p>
                    <p>${leCanap.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : ${leCanap.qty}</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
            </article>`;*/
    // selection du parent
    const leParent = document.getElementById("cart__items");
    //console.log(leParent);
    // chargement template
    const leTemplate = document.getElementById("template");
    //console.log(leTemplate);

    // clonage du bloc template
    //let leClone = leTemplate.cloneNode(true);
    let leClone = document.importNode(leTemplate.content, true);
    //console.log(leClone);

    // suppression de la balise template

    // modification des informations ds le clone
    //clone.getElementsByTagName("img")[0].setAttribute("src","leCanap.img"); // modif de l'image
    leClone.getElementById("ImgProduit").setAttribute("src",`${leCanap.img}`);
    leClone.getElementById("ImgProduit").setAttribute("alt",`${leCanap.alt}`);
    //clone.getElementsByTagName("img").setAttribute("alt","leCanap.alt");
    //console.log(clone.getElementsByTagName("h2"));
    //console.log(`${leCanap.name}`);
    leClone.getElementById("NomProduit").textContent = `${leCanap.name}`;       // modif du nom
    leClone.getElementById("CouleurProduit").textContent = `Couleur : ${leCanap.color}`;    // modif de la couleur
    //console.log(leClone);
    leClone.getElementById("PrixProduit").textContent = `Prix : ${leCanap.price} €`;    // modif du prix
    leClone.getElementById("QtyProduit").textContent = `qté : ${leCanap.qty}`;    // modif de la qté
    //clone.querySelector(".cart__item__content__settings__quantity p").innerHTML = `Qté : ${leCanap.qty}`;  // modif qty
    leClone.getElementById("QtyProduitInput").setAttribute("value",`${leCanap.qty}`); // modif qty ds le input
    // ajout du clone ds html
    //document.getElementById("cart_items").appendChild(leClone);
    console.log(leClone);
    leParent.appendChild(leClone);
    //console.log(leClone);

    //return unCanap;

}


// requete de commande
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