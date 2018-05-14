//Menuen fra navigation.html hentes
async function hentMenu() {
    let topMenu = await fetch("navigation.html");
    let menu = await topMenu.text();
    document.querySelector("[data-navigation]").innerHTML = menu;
}



//HENT ENKELT PRODUKT PÅ SINGLEPAGE SIDE
async function hentJson() {
    let url = new URL(window.location.href);
    let parameter = new URLSearchParams(url.search);
    let id = parameter.get("id");
    let jsonData = await fetch("http://simonepoulsen.dk/kea/2semester/wordpress/wp-json/wp/v2/products/" + id);
    let single = await jsonData.json();
    document.querySelector("[data-produktpic]").src = single.acf.main_photo.url;
    document.querySelector("[data-produktnavn]").textContent = single.acf.product_name;
    document.querySelector("[data-produktbeskrivelse]").innerHTML = single.acf.product_description;
    document.querySelector("[data-produktspecifikation]").innerHTML = single.acf.specifications;
    document.querySelector("[data-produktpris]").innerHTML = single.acf.price + " DKK";
    document.querySelector("[data-produktfarve]").innerHTML = single.acf.color;
}

//Footer fra footer.html hentes
async function hentFooter() {
    let footer = await fetch("footer.html");
    let footerIndhold = await footer.text();

    document.querySelector("[data-footer]").innerHTML = footerIndhold;
}

//hent alt indhold når siden er loaded
document.addEventListener("DOMContentLoaded", hentMenu);
document.addEventListener("DOMContentLoaded", hentJson);
document.addEventListener("DOMContentLoaded", hentFooter);
