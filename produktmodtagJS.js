        //HENT ENKELT PRODUKT PÅ SINGLEPAGE SIDE
        async function hentJson() {
            let url = new URL(window.location.href);
            let parameter = new URLSearchParams(url.search);
            let id = parameter.get("id");
            let jsonData = await fetch("http://simonepoulsen.dk/kea/2semester/wordpress/wp-json/wp/v2/products?per_page=100/" + id);
            let single = await jsonData.json();
            document.querySelector("[data-produktpic]").src = single.acf.main_photo.url;
            document.querySelector("[data-produktnavn]").textContent = single.acf.product_name;
            document.querySelector("[data-produktbeskrivelse]").innerHTML = single.acf.product_description;
            document.querySelector("[data-produktspecifikation]").innerHTML = single.acf.specifications;
            document.querySelector("[data-produktpris]").innerHTML = single.acf.price + " DKK";
            document.querySelector("[data-produktfarve]").innerHTML = single.acf.color;
        }

        //hent alt indhold når siden er loaded
        document.addEventListener("DOMContentLoaded", hentJson);
