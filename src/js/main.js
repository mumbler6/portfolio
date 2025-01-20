/* Your JS here. */
function handleNavbar() {
    const navbar = document.querySelector(".navbar");
    const navbar_left = document.querySelector(".navbar-left");
    const navbar_right = document.querySelectorAll(".navbar-right a");

    const section_about = document.getElementById("about_me");
    const section_portfolio = document.getElementById("portfolio");
    const section_contact = document.getElementById("contact");

    function shrinkNavbar() {
        const scrollY_pos = window.scrollY;
        let navbarHeight = "100px";
        let headerFontSize = "1em";
        let listFontSize = "20px";
        if (scrollY_pos > 136) {
            navbarHeight = "70px";
            headerFontSize = "12px";
            listFontSize = "1em";
        }
        navbar.style.height = navbarHeight;
        navbar_left.style.fontSize = headerFontSize;
        navbar_right.forEach(function(element) {
            element.style.fontSize = listFontSize;
        })
    }
    function highlightNavbar() {
        const scrollY_pos = window.scrollY;
        const sections = [section_about, section_portfolio, section_contact];
        function removeHighlightAll() {
            const allMenuItems = document.querySelectorAll(".navbar-right li");
            allMenuItems.forEach(item => {
                item.style.backgroundColor = "#1b1b1d";
            });
        }
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            removeHighlightAll();
            const lastSection = sections[sections.length - 1];
            const correspondingMenuItem = document.querySelector(`.navbar-right a[href="#${lastSection.id}"]`);
            const li_corresponding = correspondingMenuItem.parentNode;
            li_corresponding.style.backgroundColor = "#000000";
        } else {
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY_pos >= sectionTop - 70 && scrollY_pos < sectionTop - 70 + sectionHeight) {
                    removeHighlightAll();
                    const correspondingMenuItem = document.querySelector(`.navbar-right a[href="#${section.id}"]`);
                    const li_corresponding = correspondingMenuItem.parentNode;
                    li_corresponding.style.backgroundColor = "#000000";
                }
            });
        }
        if (scrollY_pos < 768) {
            removeHighlightAll();
        }
    }

    window.addEventListener("scroll", ()=> {
        shrinkNavbar();
        highlightNavbar();
    });
}
function smoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: "smooth" 
                });
            }
        });
    });
}
function handleModal() {
    var meteor_button = document.getElementById("meteor");
    var trophy_button = document.getElementById("trophy");
    var rocket_button = document.getElementById("rocket");
    var car_button = document.getElementById("car");
    var graphics_button = document.getElementById("graphics");
    var spans = document.querySelectorAll(".close-button");
    var current_modal;

    meteor_button.onclick = function() {
        var modal = document.getElementById("meteor-modal");
        modal.classList.add('show');
        current_modal = modal;
    }
    trophy_button.onclick = function () {
        var modal = document.getElementById("trophy-modal");
        modal.classList.add('show');
        current_modal = modal;
    }
    rocket_button.onclick = function () {
        var modal = document.getElementById("rocket-modal");
        modal.classList.add('show');
        current_modal = modal;
    }
    car_button.onclick = function() {
        var modal = document.getElementById("car-modal");
        modal.classList.add('show');
        current_modal = modal;
    }
    graphics_button.onclick = function() {
        var modal = document.getElementById("graphics-modal");
        modal.classList.add('show');
        current_modal = modal;
    }
    spans.forEach(span=>{
        span.onclick = function() {
            current_modal.classList.remove("show");
        }
    })
    window.onclick = function(event) {
        if (event.target == current_modal) {
            current_modal.classList.remove("show");
        }
    }
}
function handleCarousel() {
    const slider = document.querySelector(".carousel-slider");
    const slides = document.querySelectorAll(".slide");
    const prevButton = document.querySelector(".prev-button");
    const nextButton = document.querySelector(".next-button");

    let currentIndex = 0;

    function showSlide(index) {
        if (index < 0) {
            currentIndex = slides.length - 1;
        } else if (index >= slides.length) {
            currentIndex = 0;
        }
        const offset = -currentIndex * 100;
        slider.style.transform = `translateX(${offset}%)`;
        const current_slide = slides[currentIndex];
        current_slide.style.animation = "none";
        current_slide.offsetHeight;
        current_slide.style.animation = null;
    }

    function slideNext() {
        currentIndex++;
        showSlide(currentIndex);
    }

    function slidePrev() {
        currentIndex--;
        showSlide(currentIndex);
    }

    nextButton.addEventListener("click", slideNext);
    prevButton.addEventListener("click", slidePrev);

    showSlide(currentIndex);
}
function copyURI(evt) {
    evt.preventDefault();   
    navigator.clipboard.writeText(evt.target.parentNode.getAttribute('href')).then(() => {
    }, () => {
    });
}
document.addEventListener("DOMContentLoaded", function () {
    handleCarousel();
    handleNavbar();
    smoothScrolling();
    handleModal();
});