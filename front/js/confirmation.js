//-----------------------------------------------------------------------------------------------
//-----récuperation et affichage de l'orderId de la commande dans l'url ----------------------------
//-----------------------------------------------------------------------------------------------
let urlOrderId = location.search.substring().split("=") // urlID[1] : id uniquement
document.getElementById("orderId").innerText = urlOrderId[1]; // maj du no de commande