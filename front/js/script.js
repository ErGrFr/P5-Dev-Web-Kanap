//console.log('fichier script.js')


let url = "http://localhost:3000/api/products"  // requete API : GET par defaut

// ecoute du clic sur canap sélectionne
//document.querySelector("#").addEventListener('',function(){
//})



// requete vers serveur + promesse
//const promiseCanaps = new Promise(function(resolve,reject)){}
fetch(url)
.then(response =>             // promesse réponse serveur
    response.json()
    .then((lesCanaps) => {                  // promesse datas JSON
        console.log(lesCanaps);           
        
        for (const unCanap of lesCanaps) {  // pour chaque element de la liste
            //console.log(unCanap._id);
            

            // mise en forme de l'article
            let articleHTML = `
            <a href="./product.html?id=${unCanap._id}">
                <article>
                    <img src="${unCanap.imageUrl}" alt="${unCanap.altTxt}">
                    <h3 class="productName">${unCanap.name}</h3>
                    <p class="productDescription">${unCanap.description}</p>
                </article>
            </a>`;
            // ajout enfant
            //parentItems.appendChild(leClone);
            document.getElementById('items').innerHTML += articleHTML; // ajoute chaque article ds le doc HTML
        }
        
    //.catch((erreur) => {      // erreur promesse JSON
    //})

    }))
.catch((erreur) => {
    // Erreur promesse du serveur
    document.getElementById('items').innerHTML = `<p class="erreur">Serveur inaccessible, recommencer plus tard ...</p>`
})

