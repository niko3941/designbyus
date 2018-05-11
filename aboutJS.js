 let ansatte;
 let templateModtager = document.querySelector("#templateModtager");
 let ansatTemplate = document.querySelector("#ansatTemplate");


 //HENT ANSATTE TIL ABOUT SIDEN

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
         klon.querySelector("[data-ansatpic]").src = ansat.acf.photo.url;
         klon.querySelector("[data-ansatnavn]").textContent = ansat.acf.name;
         klon.querySelector("[data-ansatbeskrivelse]").innerHTML = ansat.acf.description;
         klon.querySelector("[data-ansatemail]").innerHTML = "Email: " + ansat.acf.email;
         klon.querySelector("[data-ansatnummer]").innerHTML = "Tlf: " + ansat.acf.phone;
         templateModtager.appendChild(klon);
     })
 }

 //Hent indhold når siden er loaded
 document.addEventListener("DOMContentLoaded", hentWpData);
