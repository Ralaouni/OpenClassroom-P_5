

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
                const article = document.createElement("article")
                article.setAttribute("class","cart__item")
                article.setAttribute('data-id',`${value._id}`)
                article.setAttribute('data-color',`${cart_storage[i][2]}`)
                cart_items.appendChild(article)

                const div1 = document.createElement("div")
                div1.setAttribute("class","cart__item__img")
                article.appendChild(div1)

                const img = document.createElement("img")
                img.setAttribute("src", `${value.imageUrl}`)
                img.setAttribute("alt", `${value.altTxt}`)
                div1.appendChild(img)

                const div = document.createElement("div")
                div.setAttribute("class","cart__item__content")
                article.appendChild(div)

                const div2 = document.createElement("div")
                div2.setAttribute("class","cart__item__content__description")
                div.appendChild(div2)

                const div2h2 = document.createElement("h2")
                div2h2.innerText = `${value.name}`
                div2.appendChild(div2h2)

                const div2p1 = document.createElement("p")
                div2p1.innerText = `${cart_storage[i][2]}`
                div2.appendChild(div2p1)

                const div2p2 = document.createElement("p")
                div2p2.innerText = `${value.price}`
                div2.appendChild(div2p2)

                const div3 = document.createElement("div")
                div3.setAttribute("class","cart__item__content__settings")
                div.appendChild(div3)

                const div4 = document.createElement("div")
                div4.setAttribute("class","cart__item__content__settings__quantity" )
                div3.appendChild(div4)

                const pqty = document.createElement("p")
                pqty.innerText = `Qté : ${cart_storage[i][1]}`
                div4.appendChild(pqty)

                const inputqty = document.createElement("input") 
                inputqty.setAttribute("type","number")
                inputqty.setAttribute("class","itemQuantity")
                inputqty.setAttribute("name","itemQuantity")
                inputqty.setAttribute("min","1")
                inputqty.setAttribute("max","100")
                inputqty.setAttribute("value",`${cart_storage[i][1]}`)
                div4.appendChild(inputqty)

                const div5 = document.createElement("div")
                div5.setAttribute("class", "cart__item__content__settings__delete")
                div3.appendChild(div5)

                const pdelete = document.createElement("p")
                pdelete.setAttribute("class", 'deleteItem')
                pdelete.innerText = "Supprimer"
                div5.appendChild(pdelete)

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

// On va créer des fonctions qui vont valider les données inscrites par l'utilisateur grâce aux regex
// Elle retourne true si c'est validé

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

// On ajoute ces fonctions a des events listener pour verifier les données on "change"

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


// Ici on va creer un evemenement au moment de submit le formulaire
    
document.getElementsByClassName('cart__order__form')[0].addEventListener("submit", function(event){

    // On fait en sorte que cela fonctionne que si toutes les données du formulaire sont validées

    if (controlfirstName() && controlLastName() && controlAddress() && controlCity() && controlEmail()) {
        event.preventDefault()

        // On créé l'obet contact avec les données du formulaire

        let contact = {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value,
        }

        // on créé le products avec les Id des différents objets sélectionné par l'utilisateur

        let products = []

        for (let i = 0; i < cart_storage.length; i++) {
            products.push(cart_storage[i][0])
        }
        let postproductsContact = {
            contact,
            products,
        }

        // On va faire un requète POST à l'API en lui envoyant les contact et products et attendre sa réponse, qui sera l'Id de la commande 

        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
        },
            body: JSON.stringify(postproductsContact)
        })

        .then(function(reponseAPI) {
            if (reponseAPI.ok) {
                return reponseAPI.json()
            }
        })
        .then(function(reponseId) {
        // On clear le local Storage et on y met l'Id de commande 
            localStorage.clear()
            localStorage.setItem("orderId", reponseId.orderId)
        // On redirige l'utilisateur vers la page de confirmation 
            window.location=`./confirmation.html?${reponseId.orderId}`
            console.log(reponseId.orderId)
        })
        .catch (function(err) {
            console.log("Une erreur est survenue")
        });

        ;
    }
})
