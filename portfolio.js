'use strict';

//Opening or closing side bar

const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function() {elementToggleFunc(sidebar); })

//Activating Modal-testimonial

const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');

const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

const testimonialsModalFunc = function () {
    modalContainer.classList.toggle('active');
    overlay.classList.toggle('active');
}

for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener('click', function () {
        modalImg.src = this.querySelector('[data-testimonials-avatar]').src;
        modalImg.alt = this.querySelector('[data-testimonials-avatar]').alt;
        modalTitle.innerHTML = this.querySelector('[data-testimonials-title]').innerHTML;
        modalText.innerHTML = this.querySelector('[data-testimonials-text]').innerHTML;

        testimonialsModalFunc();
    })
}

//Activating close button in modal-testimonial

modalCloseBtn.addEventListener('click', testimonialsModalFunc);
overlay.addEventListener('click', testimonialsModalFunc);

//Activating Filter Select and filtering options

// const select = document.querySelector('[data-select]');
// const selectItems = document.querySelectorAll('[data-select-item]');
// const selectValue = document.querySelector('[data-select-value]');
// const filterBtn = document.querySelectorAll('[data-filter-btn]');

// select.addEventListener('click', function () {elementToggleFunc(this); });

// for(let i = 0; i < selectItems.length; i++) {
//     selectItems[i].addEventListener('click', function() {

//         let selectedValue = this.innerText.toLowerCase();
//         selectValue.innerText = this.innerText;
//         elementToggleFunc(select);
//         filterFunc(selectedValue);

//     });
// }

// const filterItems = document.querySelectorAll('[data-filter-item]');

// const filterFunc = function (selectedValue) {
//     for(let i = 0; i < filterItems.length; i++) {
//         if(selectedValue == "all") {
//             filterItems[i].classList.add('active');
//         } else if (selectedValue == filterItems[i].dataset.category) {
//             filterItems[i].classList.add('active');
//         } else {
//             filterItems[i].classList.remove('active');
//         }
//     }
// }

// new project code 

const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');
select.addEventListener('click', function () {
    elementToggleFunc(this);
});

for (let i = 0; i < selectItems.length; i++) {
    console.log(i)
    selectItems[i].addEventListener('click', function () {
        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);
    });
}

for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener('click', function () {
        let selectedValue = this.innerText.toLowerCase();
        filterFunc(selectedValue);
    });
}

const filterItems = document.querySelectorAll('[data-filter-item]');

const filterFunc = function (selectedValue) {
    for (let i = 0; i < filterItems.length; i++) {
        if (selectedValue === "all") {
            filterItems[i].classList.add('active');
        } else if (selectedValue === filterItems[i].dataset.category.toLowerCase()) {
            filterItems[i].classList.add('active');
        } else {
            filterItems[i].classList.remove('active');
        }
    }
}

// Helper function to toggle elements
// function elementToggleFunc(element) {
//     element.classList.toggle('active');
// }


//new project code  

//Enabling filter button for larger screens 

let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
    
    filterBtn[i].addEventListener('click', function() {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);

        lastClickedBtn.classList.remove('active');
        this.classList.add('active');
        lastClickedBtn = this;

    })
}

// Enabling Contact Form

    // Form validation and button enable/disable
    const form = document.querySelector('[data-form]');
    const formInputs = document.querySelectorAll('[data-form-input]');
    const formBtn = document.querySelector('[data-form-btn]');

    for(let i = 0; i < formInputs.length; i++) {
        formInputs[i].addEventListener('input', function () {
            if(form.checkValidity()) {
                formBtn.removeAttribute('disabled');
            } else { 
                formBtn.setAttribute('disabled', '');
            }
        });
    }

    // Enabling Page Navigation
    const navigationLinks = document.querySelectorAll('[data-nav-link]');
    const pages = document.querySelectorAll('[data-page]');

    for(let i = 0; i < navigationLinks.length; i++) {
        navigationLinks[i].addEventListener('click', function() {
            for(let i = 0; i < pages.length; i++) {
                if(this.innerHTML.toLowerCase() == pages[i].dataset.page) {
                    pages[i].classList.add('active');
                    navigationLinks[i].classList.add('active');
                    window.scrollTo(0, 0);
                } else {
                    pages[i].classList.remove('active');
                    navigationLinks[i].classList.remove('active');
                }
            }
        });
    }

    // Contact form submission handling
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent default form submission

        const formData = new FormData(form);
        const data = new URLSearchParams();

        formData.forEach((value, key) => {
            data.append(key, value);
        });

        // Google Apps Script Web App URL
        const scriptURL = "https://script.google.com/macros/s/AKfycbwSn9CL273b7cYTGuyt8zV2T9dMujxNQCmM1lRFfNu6rS612Tnt9k6y8N0T-7hjLjBG/exec";

        fetch(scriptURL, {
            method: "POST",
            body: data,
        })
        .then((response) => response.json())
        .then((json) => {
            const responseMessage = document.getElementById("form-response");
            if (json.result === "success") {
                responseMessage.textContent = "Thank you! Your message has been sent.";
                responseMessage.style.color = "green";
                form.reset();
            } else {
                responseMessage.textContent = "An error occurred: " + (json.message || "Unknown error");
                responseMessage.style.color = "red";
            }
        })
        .catch((error) => {
            const responseMessage = document.getElementById("form-response");
            responseMessage.textContent = "An error occurred. Please try again.";
            responseMessage.style.color = "red";
            console.error("Error:", error);
        });
    });