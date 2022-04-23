
let cart = []
let button = document.getElementById ("addToCart")
const url = "http://localhost:3000/api/products/"
// sert a nous dire de prendre l'id qui se trouve dans l'url pour pouvoir savoir quel products on doit afficher
const str = window.location.href
const newUrl = new URL(str);
const productId = newUrl.searchParams.get("id").replace(/"/g,"")


// ajoute une image au premier élément avec la classe item__img
function ajoutImg(products){
    let itemImg = document.getElementsByClassName("item__img")[0]
    itemImg.innerHTML = `<img src="${products.imageUrl}" alt="${products.altTxt}">`;
}

// ajout du name dans id=title
function ajoutH1(products){
    let title = document.getElementById("title")
    title.innerText = `"${products.name}"`
}

// ajout du prix dans id=price
function ajoutPrix(products){
    let price = document.getElementById("price")
    price.innerText = `"${products.price}"`
}

// ajout de la dercription dans id=description
function ajoutDscrpt(products) {
    let dscrpt = document.getElementById("description")
    dscrpt.innerText = `"${products.description}"`
}

// ajout des couleurs avec un nouveau paramètre à prendre en compte , i = le nombre de couleurs disponible
function ajoutClr(products, i) {
    let clrs = document.getElementById("colors")
    clrs.innerHTML += `<option value = "${products.colors[i]}">"${products.colors[i]}"</option>`
}

// ici nous avons une fonction qui va nous permettre d'ajouter les articles sélectionné mais qui va aussi détecter si l'article exisite déjà , auquel cas il va augmenter la quantité de 1
function ajouterAuPanier(products) {
    let select = document.querySelector("select")
    cart.splice(cart.length, 1 ,[products._id,1,select.value])
        for (let i = 0; i < cart.length - 1; i++) {
            if (cart.length > 1 && cart[i][0] === cart[cart.length - 1][0] && cart[i][2] === cart[cart.length - 1][2]) {
                cart.pop();
                cart[i][1] ++;
            }
        }
    localStorage.setItem("cart", JSON.stringify(cart))
    console.log(localStorage)
}


// ajout des fonction du dessus par rapport à l'id récupérer dans l'url !
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
        // ici on va ajouter la fonction ajoutClr pour autant de couleur qu'il y'a dans l'element sélectionné
        for (let i = 0; i < value["colors"].length; i++) {
            ajoutClr(value, i)  
        }
    })
    .catch(function(err) {
    console.log("Une erreur est survenue")
    });

button.addEventListener("click", function() {
    fetch(url + productId)
    .then(function(res) {
    if (res.ok) {
        return res.json();
    }
    })
    .then(function(value) {
        ajouterAuPanier(value)
    })
    .catch(function(err) {
    console.log("Une erreur est survenue")
    })
})





