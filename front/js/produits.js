
const url = "http://localhost:3000/api/products/"
const str = window.location.href
const newUrl = new URL(str);
const productId = newUrl.searchParams.get("id").replace(/"/g,"")

fetch(url + productId)
    .then(function(res) {
    if (res.ok) {
        return res.json();
    }
    })
    .then(function(value) {
        console.log(value)
    })
    .catch(function(err) {
    console.log("Une erreur est survenue")
    });



