//console.log('fichier script.js')


let url = "http://localhost:3000/api/products"  // requete API


// ecoute du clic sur canap sélectionne
//document.querySelector("#").addEventListener('',function(){
//})

// requete vers serveur + promesse
//const promiseCanaps = new Promise(function(resolve,reject)){}
fetch(url)
.then(response =>             // promesse réponse serveur
    response.json()
    .then((LesCanaps) => {                  // promesse datas JSON
        //console.log(LesCanaps);           
        
        for (const UnCanap of LesCanaps) {  // pour chaque element de la liste
            //console.log(UnCanap._id);
            let ArticleHTML = `
            <a href="./product.html?id=${UnCanap._id}">
                <article>
                    <img src="${UnCanap.imageUrl}" alt="${UnCanap.altTxt}">
                    <h3 class="productName">${UnCanap.name}</h3>
                    <p class="productDescription">${UnCanap.description}</p>
                </article>
            </a>`;
            document.getElementById('items').innerHTML += ArticleHTML; // ajoute chaque article ds le doc HTML
            
        }
    //.catch((erreur) => {      // erreur promesse JSON
    //})

    }))
.catch((erreur) => {
    // Erreur promesse du serveur
    document.getElementById('items').innerHTML = `<p class="erreur">Serveur inaccessible, recommencer plus tard ...</p>`
})

