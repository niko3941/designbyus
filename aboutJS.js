//Menuen fra navigation.html hentes
async function hentMenu() {
    let topMenu = await fetch("navigation.html");
    let menu = await topMenu.text();
    document.querySelector("[data-navigation]").innerHTML = menu;
}



//HENT ANSATTE TIL ABOUT SIDEN
let ansatte;
let templateModtager = document.querySelector("#templateModtagerAbout");
let ansatTemplate = document.querySelector("#ansatTemplate");


//hent Json fra Wordpress Rest API
async function hentWpData() {
    let wpData = await fetch("http://simonepoulsen.dk/kea/2semester/wordpress/wp-json/wp/v2/employees?per_page=100");
    //vis objekt som Json
    ansatte = await wpData.json();
    visAnsatte();
}

//lav en klon af template
function visAnsatte() {

    ansatte.forEach(ansat => {

        let klon = ansatTemplate.cloneNode(true).content;
        //klon.querySelector("[data-ansatpic]").src = ansat.acf.photo.url;
        klon.querySelector("[data-ansatnavn]").textContent = ansat.acf.name;
        klon.querySelector("[data-ansatbeskrivelse]").innerHTML = ansat.acf.description;
        klon.querySelector("[data-ansatemail]").innerHTML = "Email: " + ansat.acf.email;
        klon.querySelector("[data-ansatnummer]").innerHTML = "Tlf: " + ansat.acf.phone;
        templateModtager.appendChild(klon);
    })
}

function initMap() {
    //koordinater
    let designbyus = {
        lat: 55.7068731,
        lng: 12.5250508
    };


    //opretter et kort
    let map = new google.maps.Map(document.querySelector('#map'), {
        zoom: 11,
        center: designbyus
    });


    //indsæt marker
    let marker = new google.maps.Marker({
        position: designbyus,
        map: map,
        //icon: "indsæt pointer sti her, hvis vi ønsker costumized pointer",
        title: "Design By Us",
    });

    //infovindue
    let infowindow = new google.maps.InfoWindow({
        content: '<h2>Skriv indhold til infovindue her</h2>',
    })

    //click åben infovindue
    marker.addListener('click', function () {
        infowindow.open(map, marker);

    });
}


//Footer fra footer.html hentes
async function hentFooter() {
    let footer = await fetch("footer.html");
    let footerIndhold = await footer.text();
    document.querySelector("[data-footer]").innerHTML = footerIndhold;
}

//Hent indhold når siden er loaded
document.addEventListener("DOMContentLoaded", hentMenu);
document.addEventListener("DOMContentLoaded", hentWpData);
document.addEventListener("DOMContentLoaded", hentFooter);
