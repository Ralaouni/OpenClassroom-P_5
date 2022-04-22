
const url = "http://localhost:3000/api/products/"
let itm = document.getElementById("items")

// Fonction qui ajoute les éléments (a, article, img, h3,p) dans l'element id="items" pour chaque produits existant dans l'API products.js et les modifier en fonction du produits.

function kanap(products){
  for (let i = 0; i < products.length; i++) {
    itm.innerHTML += `
    <a href = http://127.0.0.1:5500/Projet/P_5bis/front/html/product.html?id=${products[i]._id}>
    <article>
        <img src="${products[i].imageUrl}" alt="${products[i].altTxt}">
        <h3 class="productName">${products[i].name}</h3>
        <p class="productDescription">${products[i].description}</p>
    </article>
    </a>
  `;
  }
}

// appel dans l'API products.js en json et le retransforme en javascript pour pouvoir être utilisé dans la fonction kanap

fetch(url)
.then(function(res) {
  if (res.ok) {
    return res.json();
  }
})
.then(function(value) {
  kanap(value)
})
.catch(function(err) {
   console.log("Une erreur est survenue")
});

  