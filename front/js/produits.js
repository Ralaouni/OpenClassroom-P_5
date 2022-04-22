
const url = "http://localhost:3000/api/products/"
// sert a nous dire de prendre l'id qui se trouve dans l'url pour pouvoir savoir quel products on doit afficher
const str = window.location.href
const newUrl = new URL(str);
const productId = newUrl.searchParams.get("id").replace(/"/g,"")



function ajoutImg(products){
    let itemImg = document.getElementsByClassName("item__img")
    itemImg.innerHTML = `<img src="${products.imageUrl}" alt="${products.altTxt}">`;
}

function ajoutH1(products){
    let title = document.getElementById("title")
    title.innerText = `"${products.name}"`
}

function ajoutPrix(products){
    let price = document.getElementById("price")
    price.innerText = `"${products.price}"`
}

function ajoutDscrpt(products) {
    let dscrpt = document.getElementById("description")
    dscrpt.innerText = `"${products.description}"`
}



fetch(url + productId)
    .then(function(res) {
    if (res.ok) {
        return res.json();
    }
    })
    .then(function(value) {
        ajoutImg(value)
        ajoutH1(value)
        ajoutPrix(value)
        ajoutDscrpt(value)

        console.log(value)
    })
    .catch(function(err) {
    console.log("Une erreur est survenue")
    });


