        //Menuen fra navigation.html hentes
        async function hentMenu() {
            let topMenu = await fetch("navigation.html");
            let menu = await topMenu.text();
            //document.querySelector("[data-navigation]").innerHTML = menu;
        }

        let produkter;
        let templateModtager = document.querySelector("#templateModtager");
        let produktTemplate = document.querySelector("#produktTemplate");


        //HENT PRODUKTER TIL OVERSIGTSSIDEN

        //hent Json fra Wordpress Rest API
        async function hentWpData() {
            let wpData = await fetch("http://simonepoulsen.dk/kea/2semester/wordpress/wp-json/wp/v2/products?per_page=100");
            //vis objekt som Json
            produkter = await wpData.json();
            visProdukter();
        }

        //lav en klon af template
        function visProdukter() {
            produkter.forEach(produkt => {
                let klon = produktTemplate.cloneNode(true).content;
                klon.querySelector("[data-produktpic]").src = produkt.acf.main_photo.url;
                klon.querySelector("[data-produktnavn]").textContent = produkt.acf.product_name;
                klon.querySelector("[data-produktbeskrivelse]").innerHTML = produkt.acf.product_description;
                klon.querySelector("[data-produktknap1]").href = "produktmodtag.html?id=" + produkt.id;
                klon.querySelector("[data-produktknap2]").href = "produktmodtag.html?id=" + produkt.id;
                klon.querySelector("[data-produktknap3]").href = "produktmodtag.html?id=" + produkt.id;
                klon.querySelector("[data-produktpris]").innerHTML = produkt.acf.price + " DKK";
                //klon.querySelector("[data-produktknap4]").href = "produktmodtager.html?id=" + produkt.id;
                templateModtager.appendChild(klon);
            })
        }



        //Footer fra footer.html hentes
        async function hentFooter() {
            let footer = await fetch("footer.html");
            let footerIndhold = await footer.text();

            //document.querySelector("[data-footer]").innerHTML = footerIndhold;
        }

        //hent alt indhold når siden er loaded
        document.addEventListener("DOMContentLoaded", hentMenu);
        document.addEventListener("DOMContentLoaded", hentWpData);
        document.addEventListener("DOMContentLoaded", hentFooter);
