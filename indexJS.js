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


//Smooth scrolling
$(document).ready(function () {
    // Add smooth scrolling to all links
    $("a").on('click', function (event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 1000, function () {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });
});
