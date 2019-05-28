document.addEventListener("DOMContentLoaded", start);

function start() {

    document.querySelector(".burger_menu").addEventListener("click", function () {
        document.querySelector("nav").classList.toggle("mobile_hidden");
        document.querySelector("header").classList.toggle("hidden");
        document.querySelector("main").classList.toggle("hidden");
    });

    // --------------------- nav menu ------------------

    //https://codemyui.com/sticky-sidebar-navigation-on-scroll/?fbclid=IwAR1BWZ7mLpb_EUsm7mUra_6SpXtGt5LDsqpUuPtFRa4HwJagNzSU0Po-vpU

    let mainNavLinks = document.querySelectorAll("nav ul li a");
    // let mainSections = document.querySelectorAll("main section");

    let lastId;
    let cur = [];

    window.addEventListener("scroll", event => {
        let fromTop = window.scrollY + 250;

        mainNavLinks.forEach(link => {
            let section = document.querySelector(link.hash);

            if (
                section.offsetTop <= fromTop &&
                section.offsetTop + section.offsetHeight > fromTop
            ) {
                link.classList.add("current");
            } else {
                link.classList.remove("current");
            }
        });
    });


}


// ----- HVEM ER VI? -----

destHvemErVi = document.querySelector("#hvemervi");

async function getHvemErVi() {
    let pagesUrl = "https://camillagejl.com/kea/2-semester/larsjon/wordpress/wp-json/wp/v2/hvemervi?per_page=100";
    let jsonData = await fetch(pagesUrl);
    section = await jsonData.json();
    insertHvemErVi();
}

function insertHvemErVi() {
    section.forEach(section => {
        let template =
            `
            <section>
                <div class="content">
                    <div class="image_content">
                        <img src="${section.billede.guid}">
                    </div>
                    <div class="text_content">
                        <h2>${section.overskrift}</h2>
                        <p>
                            ${section.indhold}
                        </p>
                    </div>
                </div>
            </section>
`;
        destHvemErVi.insertAdjacentHTML("beforeend", template);
    });
}

getHvemErVi();


// ----- VORES TEAM -----

destVoresTeam = document.querySelector(".vores_team_grid");

async function getVoresTeam() {
    let pagesUrl = "https://camillagejl.com/kea/2-semester/larsjon/wordpress/wp-json/wp/v2/vores_team?per_page=100";
    let jsonData = await fetch(pagesUrl);
    section = await jsonData.json();
    insertVoresTeam();
}

function insertVoresTeam() {
    section.forEach(section => {
        let template =
            `
            <div class="sub_section">
                        <div class="image_content">
                            <img src="${section.billede.guid}">
                        </div>
                        <div class="text_content">
                            <h3>${section.navn}</h3>
                            <h4>${section.stilling}</h4>
                            <p>
                                ${section.indhold}
                            </p>

                        </div>
                    </div>
`;
        destVoresTeam.insertAdjacentHTML("beforeend", template);
    });
}

getVoresTeam();


/*************** Firma og events ****************/

destFirma_events = document.querySelector("#firma_events");

async function getFirma_events() {
    let pagesUrl = "https://camillagejl.com/kea/2-semester/larsjon/wordpress/wp-json/wp/v2/firma_events?per_page=100";
    let jsonData = await fetch(pagesUrl);
    section = await jsonData.json();
    insertFirma_events();
}

function insertFirma_events() {
    section.forEach(section => {
        let template =
            `                   
                <section>
                <div class="content">
                    <div class="image_content">
                        <img src="${section.billede.guid}">
                    </div>
                    <div class="text_content">
                        <h2>${section.overskrift}</h2>
                        <p>
                            ${section.indhold}
                        </p>
                    </div>
                </div>
            </section>
`;
        destFirma_events.insertAdjacentHTML("beforeend", template);
    });
}

getFirma_events();


// ----- GALLERIER -----

destGallery = document.querySelectorAll(".gallery");

async function getGallery() {
    let pagesUrl = "https://camillagejl.com/kea/2-semester/larsjon/wordpress/wp-json/wp/v2/galleri?per_page=100";
    let jsonData = await fetch(pagesUrl);
    section = await jsonData.json();
    insertGallery();
}

function insertGallery() {
    destGallery.forEach(galleri => {
        let galleryNumber = galleri.getAttribute("data-gallery-number");
        console.log(galleryNumber);

        section.forEach(section => {
            console.log("galleryNumber: " + galleryNumber);
            console.log("galleri_nummer: " + section.galleri_nummer);

            if (section.galleri_nummer == galleryNumber) {

                section.billeder.forEach(image => {
                    galleri.querySelector(".desktop_gallery").innerHTML += `<img src="${image.guid}">`;

                    let template =
                        `
                            <div class="mySlides fade"><div class="numbertext"></div>
                            <img src="${image.guid}"></div>
`;
                    galleri.querySelector(".slideshow-container").insertAdjacentHTML("beforeend", template);
                    console.log("what is happening");

                });

            }
        });

    });
    showSlides();
}

getGallery();


/*************** Slideshow ****************/

function showSlides() {
    document.querySelectorAll(".slideshow-container").forEach(function(slideshow) {
        console.log("Starting slideshow", slideshow);
        let i;
        let slides = slideshow.getElementsByClassName("mySlides");
        let currentSlide = 0;

        let nextSlide = function () {
            console.log("Next slide ["+currentSlide+"]", slideshow);
            // Hide all
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }
            // Next slide, and show that slide
            currentSlide++;
            if (currentSlide > slides.length) {
                currentSlide = 1
            }
            slides[currentSlide - 1].style.display = "block";

            // Wait 2 sec before switching again
            setTimeout(nextSlide, 2000);
        };

        if (slides.length === 0) {
            console.log("No images loaded in slideshow", slideshow);
        } else {
            nextSlide();
        }
    });





    // document.querySelectorAll(".slideshow-container").forEach(slideshow => {
    //
    //     console.log("Showing slideshow");
    //     var i;
    //     var slides = slideshow.getElementsByClassName("mySlides");
    //     for (i = 0; i < slides.length; i++) {
    //         slides[i].style.display = "none";
    //     }
    //     slideIndex++;
    //     if (slideIndex > slides.length) {
    //         slideIndex = 1
    //     }
    //     slides[slideIndex - 1].style.display = "block";
    //     setTimeout(showSlides, 2000); // Change image every 2 seconds
    //
    // });
}
