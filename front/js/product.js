console.log('fichier product.js')

// récuperation de l'id du canapé dans l'url

let urlID = location.search.substring().split("=") // urlID[1] : id uniquement
console.log(urlID[1])



// requete sur le canapé selectionné

let url = "http://localhost:3000/api/products/" + urlID[1] // requete API

fetch(url)
.then(response =>             // promesse réponse serveur
    response.json()
    .then((LeCanap) => {                  // promesse datas JSON
        console.log(LeCanap);
        
    }))