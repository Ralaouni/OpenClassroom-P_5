
const str = window.location.href
const newUrl = new URL(str);
const Id = newUrl.searchParams.get("id").replace(/"/g,"")
let confirmId = document.getElementById('orderId')


confirmId.innerText = Id

localStorage.clear()