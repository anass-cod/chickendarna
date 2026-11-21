function instagram() {
    let url = "https://www.instagram.com/chickendarna/"
    window.open(url, "_blank")
}
function wathsape() {
    let url = "https://wa.me/212785336192"
    window.open(url, "_blank")
}

function toggleMenu() {
    let navLink = document.getElementById("nav-links")
    navLink.classList.toggle("active");
    if(innerWidth <= 700){
        document.querySelectorAll("#nav-links a").forEach(e => e.onclick = () => {
            navLink.classList.remove("active")
        } )
    }
}
