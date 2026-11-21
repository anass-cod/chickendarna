let PanierChickenDarna = localStorage.PanierChickenDarna ? JSON.parse(localStorage.PanierChickenDarna) : []
let table = document.getElementById("table")
function read() {
    let data = false
    table.innerHTML = ""
    for (let i = 0; i < PanierChickenDarna.length; i++) {
        data = true
        table.innerHTML += `
                <tr>
                    <td><img src="${PanierChickenDarna[i].img}" alt="${PanierChickenDarna[i].name}"></td>
                    <td>${PanierChickenDarna[i].name}</td>
                    <td>${PanierChickenDarna[i].price} درهم</td>
                    <td><div class="quantite"><button ${PanierChickenDarna[i].quantity === 1 ? "class='minValue'" : ""} id="moin${i}" onclick="moin(${i} , ${+PanierChickenDarna[i].quantity - 1})">-</button> ${PanierChickenDarna[i].quantity} <button onclick="plus(${i} , ${+PanierChickenDarna[i].quantity + 1})">+</button></div></td>
                    <td>${PanierChickenDarna[i].quantity * PanierChickenDarna[i].price} درهم</td>
                    <td><button onclick="sup(${i})">حذف</button></td>
                </tr>
        `
    }
    if (!data) {
        table.innerHTML = `
            <tr>
                <td colspan="6" rowpan="2"> لا توجد أطباق في السلة</td>
            </tr>
        `
    }
    spaneTotel()
}
read()
function saveLocalStorageAndRead() {
    localStorage.PanierChickenDarna = JSON.stringify(PanierChickenDarna)
    read()
}
function moin(index, value) {
    if (value > 0) {
        PanierChickenDarna[index].quantity = value
    } else {
        PanierChickenDarna[index].quantity = 1
    }
    saveLocalStorageAndRead()
}
function plus(index, value) {
    PanierChickenDarna[index].quantity = value
    saveLocalStorageAndRead()
}
function sup(index) {
    PanierChickenDarna.splice(index, 1)
    saveLocalStorageAndRead()
}
function gettotal() {
    let total = 0
    for (let i = 0; i < PanierChickenDarna.length; i++) {
        total += (PanierChickenDarna[i].price * PanierChickenDarna[i].quantity)
    }
    return total
}
function spaneTotel() {
    let total = gettotal()
    let totalSpan = document.getElementById("total")
    totalSpan.innerHTML = `${total} درهم`
}
function confirme() {
    if (PanierChickenDarna.length > 0) {
        showConfirm()
        let div = document.getElementById("commendes")
        div.innerHTML = ""
        for (let i = 0; i < PanierChickenDarna.length; i++) {
            div.innerHTML += `
             <span>${PanierChickenDarna[i].name} × ${PanierChickenDarna[i].quantity} = <strong>${PanierChickenDarna[i].quantity * PanierChickenDarna[i].price} درهم</strong></span>
            `
            if (i === (PanierChickenDarna.length - 1)) {
                div.innerHTML += ` <span>المجموع : <strong>${gettotal()} درهم</strong></span>`
            }
        }
    }
}

let confirmBox = document.getElementById("confirm")
let ok = document.getElementById("ok")
let no = document.getElementById("no")

function showConfirm() {
    confirmBox.classList.add("active")
}

// رقم واتساب الخاص بـ Chicken Darna
const NUMERO_WHATSAPP = "212785336192"

ok.onclick = () => {
    let NumeroUtilise = NUMERO_WHATSAPP
    confirmBox.classList.remove("active")
    try {
        let commende = ""
        for (let i = 0; i < PanierChickenDarna.length; i++) {
            commende += `\n${PanierChickenDarna[i].quantity} × ${PanierChickenDarna[i].name} = ${PanierChickenDarna[i].quantity * PanierChickenDarna[i].price} درهم`
        }
        let total = gettotal()
        commende += `\nالمجموع : ${total} درهم`
        const message = `السلام عليكم، أرغب في تأكيد طلبي من Chicken Darna : ${commende} `;

        const phone = NumeroUtilise;

        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

        window.open(url, "_blank");

        PanierChickenDarna.splice(0)
        localStorage.PanierChickenDarna = JSON.stringify(PanierChickenDarna)
        read()
    } catch (err) {
        showError()
    }


}

no.onclick = () => {
    confirmBox.classList.remove("active")
}
const errorMessage = document.getElementById("errorMessage");

function showError() {
    errorMessage.classList.add("active");

    setTimeout(() => {
        errorMessage.classList.remove("active");
    }, 3000);
}

