document.addEventListener('DOMContentLoaded', () => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const signInButton1 = document.getElementById('signIn1');
    const forgetPassButton = document.getElementById('forgetPass');
    const container = document.getElementById('container');
    const forms = document.querySelectorAll('.form-container');
    function switchForms(activeFormIndex) {
        forms.forEach((form, index) => {
            form.classList.remove('active-left', 'active-right', 'fade-in', 'fade-out');
            form.style.display = 'none';
            if (index === activeFormIndex) {
                form.style.display = 'flex';
                if (activeFormIndex === 0) {
                    form.classList.add('active-left', 'fade-in');
                } else {
                    form.classList.add('active-right', 'fade-in');
                }
            } else {
                form.classList.add('fade-out');
            }
        });
    }
    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
        switchForms(1);
    });
    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
        switchForms(0);
    });
    signInButton1.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
        switchForms(0);
    });
    forgetPassButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
        switchForms(2);
    });
    const genderSelect = document.getElementById('genderSelect');
    const genderOptions = document.getElementById('genderOptions');
    const selectedGender = document.getElementById('selectedGender');
    genderSelect.addEventListener('click', function () {
        genderOptions.style.display = genderOptions.style.display === 'block' ? 'none' : 'block';
    });
    document.addEventListener('click', function (event) {
        if (!genderSelect.contains(event.target)) {
            genderOptions.style.display = 'none';
        }
    });
    genderOptions.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function () {
            const value = this.getAttribute('data-value');
            const icon = this.querySelector('svg').outerHTML; // Get the SVG of the clicked option
            selectedGender.innerHTML = icon + this.textContent; // Set the selected gender with icon
            genderOptions.style.display = 'none';
            console.log('Selected Gender:', value);
        });
    });
    flatpickr("#dob", {
        dateFormat: "Y-m-d",
        position: "below",  // Force the calendar to open below the input
        onReady: function () {
            const calendarContainer = document.querySelector('.flatpickr-calendar');
            if (calendarContainer) {
                calendarContainer.style.backgroundColor = "rgb(26, 26, 26)";
                calendarContainer.style.color = "white";
                calendarContainer.style.zIndex = "1000"; // Adjust z-index if necessary
                ['.flatpickr-day', '.flatpickr-weekday', '.flatpickr-month', '.flatpickr-current-month'].forEach(selector => {
                    calendarContainer.querySelectorAll(selector).forEach(el => el.style.color = "white");
                });
            }
        },
        onOpen: function() {
            const monthDropdown = document.querySelector('.flatpickr-monthDropdown-months');
            if (monthDropdown) {
                monthDropdown.style.backgroundColor = "rgb(26, 26, 26)";
                monthDropdown.style.color = "white";
                Array.from(monthDropdown.options).forEach(option => {
                    option.style.backgroundColor = "rgb(26, 26, 26)";
                    option.style.color = "white";
                });
            }
        },
    });
    document.querySelectorAll('.animate-button').forEach(button => {
        button.addEventListener('click', function (e) {
            const effect = document.createElement("span");
            effect.className = "button-effect";
            this.appendChild(effect);
                effect.addEventListener("animationend", function () {
                effect.remove();
            });
        });
    });
    const overlayLeftSlides = document.querySelectorAll('.overlay-left .slide-content');
    const overlayRightSlides = document.querySelectorAll('.overlay-right .slide-content');
    const overlayLeftIndicators = document.querySelectorAll('.overlay-left .indicator');
    const overlayRightIndicators = document.querySelectorAll('.overlay-right .indicator');
    let leftCurrentIndex = 0;
    let rightCurrentIndex = 0;
    const slideInterval = 3000;
    function showSlide(slides, indicators, index) {
        slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
        indicators.forEach((indicator, i) => {
            const circle = indicator.querySelector('.rounded-circle');
            if (i === index) {
                circle.style.background = 'white';
                circle.style.border = 'none';
            } else {
                circle.style.background = 'transparent';
                circle.style.border = 'white solid 1px';
            }
        });
    }
    function autoSlideLeft() {
        leftCurrentIndex = (leftCurrentIndex + 1) % overlayLeftSlides.length;
        showSlide(overlayLeftSlides, overlayLeftIndicators, leftCurrentIndex);
    }
    function autoSlideRight() {
        rightCurrentIndex = (rightCurrentIndex + 1) % overlayRightSlides.length;
        showSlide(overlayRightSlides, overlayRightIndicators, rightCurrentIndex);
    }
    setInterval(autoSlideLeft, slideInterval);
    setInterval(autoSlideRight, slideInterval);
    overlayLeftIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            leftCurrentIndex = index;
            showSlide(overlayLeftSlides, overlayLeftIndicators, leftCurrentIndex);
        });
    });
    overlayRightIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            rightCurrentIndex = index;
            showSlide(overlayRightSlides, overlayRightIndicators, rightCurrentIndex);
        });
    });
});
