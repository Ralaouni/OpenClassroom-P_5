
// ici on récupère le localStorage en JSON et on le retransforme en javascript
let cart_storage = JSON.parse(localStorage.cart)

const url = "http://localhost:3000/api/products/"

const cart_items = document.getElementById("cart__items")

const totQty = document.getElementById("totalQuantity")

const totPrice = document.getElementById("totalPrice")

// fonction qui calcul la quantité de produit en additionnant toute les quantité que nous avons dans le local storage
function totalQty () {
    let tot = 0
    for (let i = 0; i < cart_storage.length; i++) {
        tot += cart_storage[i][1]
    }
    totQty.innerText = tot
}

// on va ajouter les produits dans cart.html
function panier () {
    let tot = 0
    // on répète la fonction ppour le nombre d'élément dans le local storage
    for (let i = 0; i < cart_storage.length; i++) {
        fetch(url+cart_storage[i][0])
        .then(function(res) {
            if (res.ok) {
              return res.json();
            }
          })
          .then(function(value) {
            //   ici on additionne tout les prix de chaque élément du local storage
              totPrice.innerText = tot += value.price
            // ici on ajoute le HTML contenant tout nos produits dans "cart__items" tout en gardant la couleur choisie et la quantité de chaque éléments 
            cart_items.innerHTML += `
                <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                    <div class="cart__item__img">
                    <img src="${value.imageUrl}" alt="${value.altTxt}">
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${value.name}</h2>
                            <p>${cart_storage[i][2]}</p>
                            <p>${value.price}</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                            <p>Qté : ${cart_storage[i][1]}  </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart_storage[i][1]}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                    </div>
                </article>
              `
          })
          .catch(function(err) {
             console.log("Une erreur est survenue")
          });
    }
}


panier()
totalQty()

