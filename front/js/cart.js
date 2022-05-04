
// ici on récupère le localStorage en JSON et on le retransforme en javascript
let cart_storage = JSON.parse(localStorage.cart)

const url = "http://localhost:3000/api/products/"

const cart_items = document.getElementById("cart__items")

const totQty = document.getElementById("totalQuantity")

const totPrice = document.getElementById("totalPrice")


// on va ajouter les produits dans cart.html
function panierHtml () {
    // on répète la fonction ppour le nombre d'élément dans le local storage
    for (let i = 0; i < cart_storage.length; i++) {
        fetch(url+cart_storage[i][0])
        .then(function(res) {
            if (res.ok) {
              return res.json();
            }
          })
        .then(function(value) {
            // ici on ajoute le HTML contenant tout nos produits dans "cart__items" tout en gardant la couleur choisie et la quantité de chaque éléments 
            function panier1(value){
                cart_items.innerHTML += `
                <article class="cart__item" data-id="${value._id}" data-color="${cart_storage[i][2]}">
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
            }
            panier1(value)

            // change la quantité 

            function changeQty() {
                let qty = document.querySelectorAll(".itemQuantity")
                let qtyArray = Array.prototype.slice.call(qty)
                
                qtyArray.forEach(item => {
                    item.addEventListener("change", function(){
                        let article = item.closest("article")
                        let p = item.closest('div').querySelector('p')
                        for (let i = 0; i < cart_storage.length; i++) {
                            if (article.getAttribute("data-id") == cart_storage[i][0] && article.getAttribute("data-color") == cart_storage[i][2]) {
                                cart_storage[i][1] = parseFloat(this.value)
                                p.innerText = `Qté : ${this.value}`

                            }
                            if (cart_storage[i][1] == 0) {
                                article.remove()
                                cart_storage.splice(i,1)
                            }
                        }
                        totalQty()
                        price(value)
                        console.log(this.value)
                        localStorage.cart = JSON.stringify(cart_storage)
                    })
                });
            }

            changeQty()

            // fonction qui supprime lorsqu'on appui sur supprimer

            function deleteElement() {
                let button = document.querySelectorAll(".deleteItem")
                let buttonArray = Array.prototype.slice.call(button)

                buttonArray.forEach(item => {
                    item.addEventListener("click", function(){
                        let article = item.closest("article")
                        for (let i = 0; i < cart_storage.length; i++) {
                            if (article.getAttribute("data-id") == cart_storage[i][0] && article.getAttribute("data-color") == cart_storage[i][2]) {
                                article.remove()
                                cart_storage.splice(i,1)
                                localStorage.cart = JSON.stringify(cart_storage)
                            }
                        }
                        totalQty()
                        price(value)
                        console.log(localStorage)
                    })
                });
            }

            deleteElement()
            

            //   ici on additionne tout les prix de chaque élément du local storage
            function price(value){
                let tot = 0
                if (cart_storage.length >  0) {
                    for (let i = 0; i < cart_storage.length; i++) {
                        totPrice.innerText = (tot += (value.price * cart_storage[i][1]))
                    }
                
                } else {
                    tot = 0
                    totPrice.innerText = tot
                }
            }
            price(value)

            // fonction qui calcul la quantité de produit en additionnant toute les quantité que nous avons dans le local storage
            function totalQty () {
                let tot = 0
                for (let i = 0; i < cart_storage.length; i++) {
                    tot += cart_storage[i][1]
                }
                totQty.innerText = tot
            }

            totalQty()

        })
        .catch(function(err) {
             console.log("Une erreur est survenue")
        });
        
    }
}

panierHtml()


let firstName = document.getElementById("firstName")
let lastName = document.getElementById("lastName")
let address = document.getElementById("address")
let city = document.getElementById("city")
let email = document.getElementById("email")

let regExpName = /^[A-Z]+([\ A-Za-z]+)*/;
let regExpNoNumber = /^[^0-9()]+$/
let regExpAddress = /^[0-9]{1,4}(?:[,. ]){1}([a-zA-Z]+)*/
let regExpEmail =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/


function controlfirstName(){
    let firstName = document.getElementById("firstName")
    if (regExpName.test(firstName.value) && regExpNoNumber.test(firstName.value)) {
        document.getElementById("firstNameErrorMsg").innerHTML = ""
        return true
    } else {
        document.getElementById("firstNameErrorMsg").innerHTML = "Veuillez renseigner correctement ce champ"
        return false
    }
}


function controlLastName(){
    if (regExpName.test(lastName.value) && regExpNoNumber.test(lastName.value)) {
        document.getElementById("lastNameErrorMsg").innerHTML = ""
        return true
    } else {
        document.getElementById("lastNameErrorMsg").innerHTML = "Veuillez renseigner correctement ce champ"
        return false
    }
}

function controlAddress(){
    if (regExpAddress.test(address.value)) {
        document.getElementById("addressErrorMsg").innerHTML = ""
        address === true
        return true
    } else {
        document.getElementById("addressErrorMsg").innerHTML = "Veuillez renseigner correctement ce champ"
        address === false
        return false
    }
}
    
function controlCity(){
    if (regExpName.test(city.value) && regExpNoNumber.test(city.value)) {
        document.getElementById("cityErrorMsg").innerHTML = ""
        return true
    } else {
        document.getElementById("cityErrorMsg").innerHTML = "Veuillez renseigner correctement ce champ"
        return false
    }
}

function controlEmail() {
    if (regExpEmail.test(email.value)) {
        document.getElementById("emailErrorMsg").innerHTML = ""
        return true
    } else {
        document.getElementById("emailErrorMsg").innerHTML = "Veuillez renseigner correctement ce champ"
        return false
    }
}


firstName.addEventListener ('change', function() {
    controlfirstName()
})

lastName.addEventListener('change', function(){
    controlLastName()
})

address.addEventListener('change', function(){
    controlAddress()
})

city.addEventListener('change', function(){
    controlCity()
})

email.addEventListener('change', function(){
    controlEmail()
})
    
document.getElementById("order").addEventListener("click", async function(){
    let contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,

    }
    let item = localStorage.cart
    let postItemContact = {
        contact,
        item,
    }
    console.log(postItemContact)

    const res = await fetch("http://url-service-web.com/api/order", {
        method: "POST",
        headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json' 
    },
        body: JSON.stringify(postItemContact)
    })

    response.json().then(data => {
        console.log(data);
      });
    
    
        

    // if (controlfirstName() && controlLastName() && controlAddress() && controlCity() && controlEmail()) {
    //     fetch("http://url-service-web.com/api/users", {
    //         method: "POST",
    //         headers: { 
    //         'Accept': 'application/json', 
    //         'Content-Type': 'application/json' 
    //     },
    //         body: JSON.stringify(postItemContact)
    //     })
    //     .then(function(res) {
    //         if (res.ok) {
    //             console.log(content.orderId)
    //           return res.json();
              
    //         }
    //     })
    // }
})




                
