// Wait for the entire HTML document to be loaded and parsed
document.addEventListener('DOMContentLoaded', function() {

    // --- Preloader ---
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.addEventListener('transitionend', () => preloader.remove());
        }, 500);
    }

    // --- Animate On Scroll (AOS) Initialization ---
    AOS.init({
        duration: 800,
        once: true,
    });

    // --- Theme Switcher ---
    const themeSwitchButton = document.getElementById('switchTheme');
    if (themeSwitchButton) {
        themeSwitchButton.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-bs-theme');
            if (currentTheme === 'dark') {
                document.body.setAttribute('data-bs-theme', 'light');
                themeSwitchButton.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';
            } else {
                document.body.setAttribute('data-bs-theme', 'dark');
                themeSwitchButton.innerHTML = '<i class="bi bi-brightness-high-fill"></i>';
            }
        });
    }
    
    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = document.querySelector('#header')?.offsetHeight || 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Formspree Form Submission ---
    const contactForm = document.getElementById("contact-form"); // Your form must have id="contact-form"
    const msg = document.getElementById("msg"); // Your status message element

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            
            if(msg) msg.innerHTML = "Submitting...";

            fetch(contactForm.action, { // The action URL is taken from your HTML form
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    if(msg) msg.innerHTML = "Message sent successfully! ✅";
                    contactForm.reset();
                    setTimeout(() => {
                        if(msg) msg.innerHTML = "";
                    }, 4000); // Clear message after 4 seconds
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                           if(msg) msg.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                           if(msg) msg.innerHTML = "Oops! There was a problem.";
                        }
                    });
                }
            }).catch(error => {
                console.error("Error!", error.message);
                if(msg) msg.innerHTML = "Oops! There was a network error.";
            });
        });
    }
});

// --- Tab Switching Functionality (About Me Section) ---
// This function remains global because it's called by `onclick` in the HTML.
function opentab(event, tabname) {
    const tablinks = document.getElementsByClassName("tab-links");
    const tabcontents = document.getElementsByClassName("tab-contents");

    for (let tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}