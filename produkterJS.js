//Menuen fra navigation.html hentes
async function hentMenu() {
    let topMenu = await fetch("navigation.html");
    let menu = await topMenu.text();
    document.querySelector("[data-navigation]").innerHTML = menu;
}

let produkter;
let templateModtager = document.querySelector("#templateModtager");
let produktTemplate = document.querySelector("#produktTemplate");

//cat=category, bruges til at sortere mellem kategorierne.
//hvis cat er = et bestemt kategorinummer, så går den til den valgte kategori
//hvis den ikke er lig med en bestemt kategori, går den til kategori 5, som er alle produkter
let cat;
if (window.name) {
    cat = window.name;
} else {
    cat = 5;
}

//HENT PRODUKTER TIL OVERSIGTSSIDEN

//hent Json fra Wordpress Rest API
async function hentWpData() {
    let wpData = await fetch("http://simonepoulsen.dk/kea/2semester/wordpress/wp-json/wp/v2/products?per_page=100");
    //vis objekt som Json
    produkter = await wpData.json();
    visProdukter();
    sortering();
}

function sortering() {
    document.querySelector("#sorter_all").addEventListener("click", sorterAllProducts);
    document.querySelector("#sorter_lightning").addEventListener("click", sorterLightning);
    document.querySelector("#sorter_seating").addEventListener("click", sorterSeating);
    document.querySelector("#sorter_tables").addEventListener("click", sorterTables);
    document.querySelector("#sorter_various").addEventListener("click", sorterVarious);
}

//lav en klon af template
function visProdukter() {
    //hvis der er valgt en bestemt kategori
    if (cat != 5) {
        produkter.forEach(produkt => {

            if (produkt.acf.category == cat) {
                let klon = produktTemplate.cloneNode(true).content;
                klon.querySelector("[data-produktpic]").src = produkt.acf.main_photo.url;
                klon.querySelector("[data-produktnavn]").textContent = produkt.acf.product_name;
                //klon.querySelector("[data-produktbeskrivelse]").innerHTML = produkt.acf.product_description;
                klon.querySelector("[data-produktknap1]").href = "produktmodtag.html?id=" + produkt.id;
                klon.querySelector("[data-produktknap2]").href = "produktmodtag.html?id=" + produkt.id;
                klon.querySelector("[data-produktknap3]").href = "produktmodtag.html?id=" + produkt.id;
                klon.querySelector("[data-produktpris]").innerHTML = produkt.acf.price + " DKK";
                //klon.querySelector("[data-produktknap4]").href = "produktmodtager.html?id=" + produkt.id;
                templateModtager.appendChild(klon);
            }
        });
    } else {
        //hvis der ikke
        produkter.forEach(produkt => {

            let klon = produktTemplate.cloneNode(true).content;
            klon.querySelector("[data-produktpic]").src = produkt.acf.main_photo.url;
            klon.querySelector("[data-produktnavn]").textContent = produkt.acf.product_name;
            //klon.querySelector("[data-produktbeskrivelse]").innerHTML = produkt.acf.product_description;
            klon.querySelector("[data-produktknap1]").href = "produktmodtag.html?id=" + produkt.id;
            klon.querySelector("[data-produktknap2]").href = "produktmodtag.html?id=" + produkt.id;
            klon.querySelector("[data-produktknap3]").href = "produktmodtag.html?id=" + produkt.id;
            klon.querySelector("[data-produktpris]").innerHTML = produkt.acf.price + " DKK";
            //klon.querySelector("[data-produktknap4]").href = "produktmodtager.html?id=" + produkt.id;
            templateModtager.appendChild(klon);

        });
    }
}

function sorterAllProducts() {
    cat = 5;
    templateModtager.innerHTML = "";
    visProdukter();
}

function sorterLightning() {
    cat = 2;
    templateModtager.innerHTML = "";
    visProdukter();
}

function sorterSeating() {

    cat = 4;
    templateModtager.innerHTML = "";
    visProdukter();
}

function sorterTables() {

    cat = 3;
    templateModtager.innerHTML = "";
    visProdukter();
}

function sorterVarious() {

    cat = 1;
    templateModtager.innerHTML = "";
    visProdukter();
}

//Når et menupunkt er valgt, så skift farver
$('.produkt_link').each(function () {
    $(this).click(function () {
        $('.produkt_link').removeClass('selected');
        $(this).addClass('selected');
    })
});



//Footer fra footer.html hentes
async function hentFooter() {
    let footer = await fetch("footer.html");
    let footerIndhold = await footer.text();

    document.querySelector("[data-footer]").innerHTML = footerIndhold;
}

//hent alt indhold når siden er loaded
document.addEventListener("DOMContentLoaded", hentMenu);
document.addEventListener("DOMContentLoaded", hentWpData);
document.addEventListener("DOMContentLoaded", hentFooter);
//document.addEventListener("DOMContentLoaded", sortering);
