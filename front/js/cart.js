console.log('fichier cart.js');
//let lesCanaps = JSON.parse(localStorage.getItem('selectionCanap'));



// affichage du panier
let lesCanaps = JSON.parse(localStorage.getItem('selectionCanap'));
for (const unCanap of lesCanaps) {
    let datasHTML = majUnCanap(unCanap);
    console.log(datasHTML);
    
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

            
    return unCanap;

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