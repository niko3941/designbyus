//Menuen fra navigation.html hentes
async function hentMenu() {
    let topMenu = await fetch("navigation.html");
    let menu = await topMenu.text();
    document.querySelector("[data-navigation]").innerHTML = menu;
}

//Footer fra footer.html hentes
async function hentFooter() {
    let footer = await fetch("footer.html");
    let footerIndhold = await footer.text();
    document.querySelector("[data-footer]").innerHTML = footerIndhold;
}

//hent alt indhold når siden er loaded
document.addEventListener("DOMContentLoaded", hentMenu);
document.addEventListener("DOMContentLoaded", hentFooter);
