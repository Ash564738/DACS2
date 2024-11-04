import React, { useEffect } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './login.css';
const Login = () => {
  useEffect(() => {
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
    genderOptions.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function () {
            const value = this.getAttribute('data-value');
            const icon = this.querySelector('svg').outerHTML;
            selectedGender.innerHTML = icon + this.textContent;
            genderOptions.style.display = 'none';
            console.log('Selected Gender:', value);
        });
    });
    flatpickr("#dob", {
        dateFormat: "Y-m-d",
        position: "below",
        onReady: function () {
            const calendarContainer = document.querySelector('.flatpickr-calendar');
            if (calendarContainer) {
                calendarContainer.style.backgroundColor = "rgb(26, 26, 26)";
                calendarContainer.style.color = "white";
                calendarContainer.style.zIndex = "1000";
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
  return (
    <div className="container text-white align-items-center justify-content-center flex-row overflow-hidden p-0 m-0" id="container">
            <div className="form-container w-50 h-100 d-flex justify-content-center align-items-center p-0 m-0">
                <div className="sign-in-container align-items-center justify-content-center flex-column">
                    <div className="py-2 text-start w-100">
                        <a href="/">
                            <img src="https://cdn140.picsart.com/272733942032211.png?r1024x1024" alt="Metube logo" width="60" height="41" loading="lazy"/>
                        </a>
                    </div>
                    <div className="text-start w-100">
                        <h1 className="fw-bold fs-3">Welcome Back!</h1>
                        <p className="fs-6 fw-semibold">Please enter sign-in details below.</p>
                    </div>
                    <form action="login" method="post" className="signin-form align-items-center justify-content-center flex-column w-100">
                        <div className="mb-3 form-floating w-100 position-relative">
                            <input type="email" className="form-control gradient-input" id="signinEmail" placeholder="Email" autocomplete="on" required/>
                            <label className="form-label" for="signinEmail">Email</label>
                            <svg className="position-absolute gradient-border-svg top-0 w-100 h-100 pointer-events-none">
                                <defs>
                                    <linearGradient id="signinEmailGradient" gradientTransform="rotate(10)">
                                        <stop offset="10%" stop-color="#29fb65"></stop>
                                        <stop offset="90%" stop-color="#77a7fa"></stop>
                                    </linearGradient>
                                    <mask id="signinEmailBorderMask">
                                        <rect x="0" y="0" width="100%" height="100%" rx="15" ry="15" stroke-width="2" stroke="#fff" fill="none"></rect>
                                    </mask>
                                </defs>
                                <rect x="0" y="0" width="100%" height="100%" rx="15" ry="15" stroke-width="2" stroke="url(#signinEmailGradient)" fill="none" mask="url(#signinEmailBorderMask)" className="transition-stroke-dashoffset"></rect>
                            </svg>
                        </div>
                        <div className="mb-3 form-floating w-100 position-relative">
                            <input type="password" className="form-control gradient-input" placeholder="Password" id="signinPassword" name="password" autocomplete="on" required/>
                            <label className="form-label" for="signinPassword">Password</label>
                            <svg className="position-absolute gradient-border-svg top-0 w-100 h-100 pointer-events-none" >
                                <defs>
                                    <linearGradient id="signinPassGradient" gradientTransform="rotate(10)">
                                        <stop offset="10%" stop-color="#29fb65"></stop>
                                        <stop offset="90%" stop-color="#77a7fa"></stop>
                                    </linearGradient>
                                    <mask id="signinPassBorderMask">
                                        <rect x="0" y="0" width="100%" height="100%" rx="15" ry="15" stroke-width="2" stroke="#fff" fill="none"></rect>
                                    </mask>
                                </defs>
                                <rect x="0" y="0" width="100%" height="100%" rx="15" ry="15" stroke-width="2" stroke="url(#signinPassGradient)" fill="none" mask="url(#signinPassBorderMask)" className="transition-stroke-dashoffset"></rect>
                            </svg>
                        </div>
                        <p className="text-end fs-6 mb-3 w-100 clickable-text" id="forgetPass" >Forgot password?</p>
                        <button type="submit" className="animate-button fw-bold fs-6 py-2 w-100">Sign In</button>
                    </form>
                    <div className="d-flex align-items-center justify-content-center py-2 w-100">
                        <hr className="flex-fill" style={{ background: '#C5BCBC' }} />
                        <span className="px-2">or continue</span>
                        <hr className="flex-fill" style={{ background: '#C5BCBC' }} />
                    </div>
                    <div className="d-flex flex-row align-items-center justify-content-center py-2 w-100">
                        <button className="py-2 px-4 d-flex align-items-center justify-content-center w-100 mx-1" title="Sign in with Google">
                            <span className="fw-bold fs-6">
                                <i className="fab fa-google"></i>
                            </span>
                        </button>
                        <button className="py-2 px-4 d-flex align-items-center justify-content-center w-100 mx-1" title="Sign in with Facebook">
                            <span className="fw-bold fs-6">
                                <i className="fab fa-facebook"></i>
                            </span>
                        </button>
                        <button className="py-2 px-4 d-flex align-items-center justify-content-center w-100 mx-1" title="Sign in with Twitter">
                            <span className="fw-bold fs-6">
                                <i className="fab fa-twitter"></i>
                            </span>
                        </button>
                    </div>
                    <div className="text-center w-100">
                        <p className="fs-6 d-inline">Don’t have an account?</p>
                        <p className="fw-bold fs-6 d-inline clickable-text" id="signUp" >Sign Up</p>
                    </div>
                </div>
            </div>
            <div className="form-container w-50 h-100 justify-content-center align-items-center p-0 m-0">
                <div className="sign-up-container align-items-center justify-content-center flex-column">
                    <div className="py-2 text-start w-100">
                        <h1 className="fw-bold fs-3">Welcome to Metube!</h1>
                        <p className="fw-semibold fs-6">Please fill in the form below to become a member of Metube.</p>
                    </div>
                    <form action="signup" method="post" className="signup-form align-items-center justify-content-center flex-column w-100">
                        <div className="mb-3 form-floating w-100 position-relative">
                            <input type="email" className="form-control gradient-input" id="signupEmail" placeholder="Email" autocomplete="on" required/>
                            <label className="form-label" for="signupEmail">Email</label>
                            <svg className="position-absolute gradient-border-svg top-0 w-100 h-100 pointer-events-none">
                                <defs>
                                    <linearGradient id="signupEmailGradient" gradientTransform="rotate(10)">
                                        <stop offset="10%" stop-color="#29fb65"></stop>
                                        <stop offset="90%" stop-color="#77a7fa"></stop>
                                    </linearGradient>
                                    <mask id="signupEmailBorderMask">
                                        <rect x="0" y="0" width="100%" height="100%" rx="15" ry="15" stroke-width="2" stroke="#fff" fill="none"></rect>
                                    </mask>
                                </defs>
                                <rect x="0" y="0" width="100%" height="100%" rx="15" ry="15" stroke-width="2" stroke="url(#signupEmailGradient)" fill="none" mask="url(#signupEmailBorderMask)" className="transition-stroke-dashoffset"></rect>
                            </svg>
                        </div>
                        <div className="mb-3 form-floating w-100 position-relative">
                            <input type="text" className="form-control gradient-input" id="signupName" placeholder="Full Name" autocomplete="on" required/>
                            <label className="form-label" for="signupName">Full Name</label>
                            <svg className="position-absolute gradient-border-svg top-0 w-100 h-100 pointer-events-none">
                                <defs>
                                    <linearGradient id="signupNameGradient" gradientTransform="rotate(10)">
                                        <stop offset="10%" stop-color="#29fb65"></stop>
                                        <stop offset="90%" stop-color="#77a7fa"></stop>
                                    </linearGradient>
                                    <mask id="signupNameBorderMask">
                                        <rect x="0" y="0" width="100%" height="100%" rx="15" ry="15" stroke-width="2" stroke="#fff" fill="none"></rect>
                                    </mask>
                                </defs>
                                <rect x="0" y="0" width="100%" height="100%" rx="15" ry="15" stroke-width="2" stroke="url(#signupNameGradient)" fill="none" mask="url(#signupNameBorderMask)" className="transition-stroke-dashoffset"></rect>
                            </svg>
                        </div>
                        <div className="mb-3 form-floating w-100 position-relative d-flex flex-row">
                            <div className="form-floating" style={{ width: '40%', marginRight: '10px' }}>
                                <div className="form-select gradient-input" id="genderSelect" required>
                                    <span id="selectedGender">
                                        <svg xmlns="http://www.w3.org/2000/svg"version="1.1"xmlnsXlink="http://www.w3.org/1999/xlink"height="1.3em"x="0"y="0"viewBox="0 0 512 512"style={{ enableBackground: 'new 0 0 512 512' }}xmlSpace="preserve"className="">
                                            <g>
                                                <path d="M403.921 0v31.347h35.36l-68.982 65.409c-24.421-24.99-58.474-40.53-96.092-40.53-50.603 0-94.759 28.112-117.687 69.535a135.342 135.342 0 0 0-5.924-.138c-74.118 0-134.417 60.299-134.417 134.418 0 68.816 51.984 125.71 118.743 133.498v41.657H87.995v31.347h46.929V512h31.347v-45.458h48.977v-31.347h-48.977v-41.657c43.948-5.127 81.488-31.533 102.013-68.616 1.964.086 3.937.138 5.922.138 74.119 0 134.418-60.299 134.418-134.417 0-25.187-6.969-48.774-19.071-68.944l74.919-71.038v38.933h31.347V0h-91.898zM150.598 363.11c-56.833 0-103.07-46.237-103.07-103.071 0-54.619 42.705-99.442 96.477-102.853a134.204 134.204 0 0 0-4.215 33.457c0 60.464 40.132 111.726 95.157 128.562-18.666 26.533-49.515 43.905-84.349 43.905zm98.446-72.51c-44.709-11.26-77.906-51.802-77.906-99.957 0-10.636 1.62-20.901 4.625-30.561 44.709 11.26 77.906 51.803 77.906 99.958 0 10.636-1.621 20.9-4.625 30.56zm31.757 2.895a134.196 134.196 0 0 0 4.215-33.456c0-60.464-40.132-111.726-95.156-128.563 18.666-26.532 49.516-43.905 84.349-43.905 56.834 0 103.071 46.237 103.071 103.071-.002 54.619-42.707 99.443-96.479 102.853z" fill="#ffffff" opacity="1" data-original="#000000" className=""></path>
                                            </g>
                                        </svg>
                                        Gender
                                    </span>
                                    <div className="options" id="genderOptions">
                                        <div className="option" data-value="" disabled selected> 
                                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" height="1.3em" x="0" y="0" viewBox="0 0 512 512" style={{ enableBackground: 'new 0 0 512 512' }} xmlSpace="preserve" className="">
                                                <g>
                                                    <path d="M403.921 0v31.347h35.36l-68.982 65.409c-24.421-24.99-58.474-40.53-96.092-40.53-50.603 0-94.759 28.112-117.687 69.535a135.342 135.342 0 0 0-5.924-.138c-74.118 0-134.417 60.299-134.417 134.418 0 68.816 51.984 125.71 118.743 133.498v41.657H87.995v31.347h46.929V512h31.347v-45.458h48.977v-31.347h-48.977v-41.657c43.948-5.127 81.488-31.533 102.013-68.616 1.964.086 3.937.138 5.922.138 74.119 0 134.418-60.299 134.418-134.417 0-25.187-6.969-48.774-19.071-68.944l74.919-71.038v38.933h31.347V0h-91.898zM150.598 363.11c-56.833 0-103.07-46.237-103.07-103.071 0-54.619 42.705-99.442 96.477-102.853a134.204 134.204 0 0 0-4.215 33.457c0 60.464 40.132 111.726 95.157 128.562-18.666 26.533-49.515 43.905-84.349 43.905zm98.446-72.51c-44.709-11.26-77.906-51.802-77.906-99.957 0-10.636 1.62-20.901 4.625-30.561 44.709 11.26 77.906 51.803 77.906 99.958 0 10.636-1.621 20.9-4.625 30.56zm31.757 2.895a134.196 134.196 0 0 0 4.215-33.456c0-60.464-40.132-111.726-95.156-128.563 18.666-26.532 49.516-43.905 84.349-43.905 56.834 0 103.071 46.237 103.071 103.071-.002 54.619-42.707 99.443-96.479 102.853z" fill="#ffffff" opacity="1" data-original="#000000" className=""></path>
                                                </g>
                                            </svg>
                                            Gender
                                        </div>
                                        <div className="option" data-value="Male">
                                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" height="1.3em" x="0" y="0" viewBox="0 0 384 384" style={{ enableBackground: 'new 0 0 512 512' }} xmlSpace="preserve" className="">
                                                <g>
                                                    <path d="M383.793 13.938c-.176-1.38-.48-2.708-.984-3.954-.016-.03-.016-.074-.024-.113 0-.008-.008-.016-.015-.023-.555-1.313-1.313-2.504-2.168-3.61-.211-.261-.418-.52-.641-.765-.914-1.032-1.906-1.985-3.059-2.762-.03-.024-.07-.031-.101-.055-1.114-.734-2.344-1.289-3.633-1.726-.32-.114-.633-.211-.961-.297C370.855.266 369.465 0 368 0H256c-8.832 0-16 7.168-16 16s7.168 16 16 16h73.367l-95.496 95.496C208.406 107.13 177.055 96 144 96 64.602 96 0 160.602 0 240s64.602 144 144 144 144-64.602 144-144c0-33.04-11.121-64.383-31.504-89.871L352 54.625V128c0 8.832 7.168 16 16 16s16-7.168 16-16V16c0-.336-.078-.656-.098-.984a16.243 16.243 0 0 0-.109-1.079zM144 352c-61.762 0-112-50.238-112-112s50.238-112 112-112c29.902 0 58.055 11.64 79.223 32.734C244.359 181.945 256 210.098 256 240c0 61.762-50.238 112-112 112zm0 0" fill="#ffffff" opacity="1" data-original="#000000"></path>
                                                </g>
                                            </svg>
                                            Male
                                        </div>
                                        <div className="option" data-value="Female">
                                            <svg xmlns="http://www.w3.org/2000/svg"version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink"height="1.3em" x="0"y="0"viewBox="0 0 512 512"style={{ enableBackground: 'new 0 0 512 512' }}xmlSpace="preserve"className="">
                                                <g>
                                                    <path d="M376.264 290.173c66.314-66.293 66.314-174.16 0-240.453-66.314-66.294-174.214-66.294-240.529 0-66.314 66.293-66.314 174.16 0 240.453 28.07 28.061 63.591 44.24 100.254 48.546v56.923h-40.018c-11.051 0-20.009 8.956-20.009 20.003s8.958 20.003 20.009 20.003h40.018v56.348c.001 11.047 8.959 20.003 20.011 20.003 11.051 0 20.009-8.956 20.009-20.003v-56.348h40.019c11.051 0 20.009-8.956 20.009-20.003s-8.958-20.003-20.009-20.003h-40.019V338.72c36.664-4.307 72.185-20.486 100.255-48.547zm-212.231-28.289c-50.711-50.695-50.711-133.181 0-183.876 50.71-50.693 133.221-50.696 183.934 0 50.711 50.695 50.711 133.181 0 183.876-50.711 50.694-133.223 50.694-183.934 0z" fill="#ffffff" opacity="1" data-original="#000000" className=""></path>
                                                </g>
                                            </svg> 
                                            Female
                                        </div>
                                        <div className="option" data-value="Other">
                                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink"height="1.3em"x="0"y="0"viewBox="0 0 512.002 512.002"style={{ enableBackground: 'new 0 0 512 512' }}xmlSpace="preserve"className="">
                                                <g>
                                                    <path d="M491.183 13.638c-.547-7.53-7.391-13.756-14.931-13.635h-92.8c-8.284 0-15 6.716-15 15s6.716 15 15 15h56.584l-110.478 110.47c-19.769-17.025-45.48-27.332-73.556-27.332s-53.787 10.307-73.556 27.332l-35.985-35.982 25.012-25.012c5.858-5.857 5.858-15.355 0-21.213-5.857-5.857-15.355-5.857-21.213 0l-25.013 25.013-53.28-53.277h56.584c8.284 0 15-6.716 15-15s-6.716-15-15-15h-92.8c-8.05-.148-15.149 6.948-15 15v92.8c0 8.284 6.716 15 15 15s15-6.716 15-15V51.214l53.282 53.279-25.013 25.013c-5.858 5.857-5.858 15.355 0 21.213 2.929 2.929 6.768 4.394 10.606 4.394s7.678-1.465 10.606-4.394l25.014-25.014 37.214 37.211c-12.193 18.021-19.321 39.737-19.321 63.086 0 57.147 42.695 104.504 97.861 111.862v75.286h-41.65c-8.284 0-15 6.716-15 15s6.716 15 15 15H241v53.852c0 8.284 6.716 15 15 15s15-6.716 15-15V443.15h41.65c8.284 0 15-6.716 15-15s-6.716-15-15-15H271v-75.286c55.167-7.359 97.861-54.715 97.861-111.862 0-23.349-7.127-45.065-19.321-63.086L461.252 51.214v56.588c0 8.284 6.716 15 15 15s15-6.716 15-15v-92.8c0-.459-.028-.913-.069-1.364zM256.002 308.864c-45.689 0-82.861-37.172-82.861-82.861s37.172-82.861 82.861-82.861 82.861 37.172 82.861 82.861-37.171 82.861-82.861 82.861z" fill="#ffffff" opacity="1" data-original="#000000" className=""></path>
                                                </g>
                                            </svg>
                                            Other
                                        </div>
                                    </div>
                                </div>
                                <label className="form-label" for="genderSelect">Select Gender</label>
                            </div>
                            <div className="form-floating" style={{ width: '60%' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" height="1em" x="0" y="0" viewBox="0 0 48 48" style={{ enableBackground: 'new 0 0 512 512' }} xmlSpace="preserve" className="input-icon">
                                    <g>
                                        <rect width="4" height="6" x="11" y="3" rx="2" fill="#ffffff" opacity="1"></rect>
                                        <rect width="4" height="6" x="33" y="3" rx="2" fill="#ffffff" opacity="1"></rect>
                                        <path d="M4 18v23a4 4 0 0 0 4 4h32a4 4 0 0 0 4-4V18zm12 20a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2zm0-11a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2zm11 11a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2zm0-11a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2zm11 11a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2zm0-11a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2zM44 16v-6a4 4 0 0 0-4-4h-1v1c0 2.206-1.794 4-4 4s-4-1.794-4-4V6H17v1c0 2.206-1.794 4-4 4S9 9.206 9 7V6H8a4 4 0 0 0-4 4v6z" fill="#ffffff" opacity="1"></path>
                                    </g>
                                </svg>
                                <input type="text" className="form-control gradient-input" id="dob" required placeholder="Date of Birth" style={{ paddingLeft: '40px' }} />
                                <label className="form-label" for="dob" id="dob-label">Date of Birth</label>
                                <svg className="position-absolute gradient-border-svg top-0 w-100 h-100 pointer-events-none">
                                    <defs>
                                        <linearGradient id="signupDoBGradient" gradientTransform="rotate(10)">
                                            <stop offset="10%" stop-color="#29fb65"></stop>
                                            <stop offset="90%" stop-color="#77a7fa"></stop>
                                        </linearGradient>
                                        <mask id="signupDoBBorderMask">
                                            <rect x="0" y="0" width="100%" height="100%" rx="15" ry="15" stroke-width="2" stroke="#fff" fill="none"></rect>
                                        </mask>
                                    </defs>
                                    <rect x="0" y="0" width="100%" height="100%" rx="15" ry="15" stroke-width="2" stroke="url(#signupDoBGradient)" fill="none" mask="url(#signupDoBBorderMask)" className="transition-stroke-dashoffset"></rect>
                                </svg>
                            </div>
                        </div>
                        <div className="mb-3 form-floating w-100 position-relative">
                            <input type="password" className="form-control gradient-input" id="signupPassword" placeholder="Password" required/>
                            <label className="form-label" for="signupPassword">Password</label>
                            <svg className="position-absolute gradient-border-svg top-0 w-100 h-100 pointer-events-none">
                                <defs>
                                    <linearGradient id="signupPassGradient" gradientTransform="rotate(10)">
                                        <stop offset="10%" stop-color="#29fb65"></stop>
                                        <stop offset="90%" stop-color="#77a7fa"></stop>
                                    </linearGradient>
                                    <mask id="signupPassBorderMask">
                                        <rect x="0" y="0" width="100%" height="100%" rx="15" ry="15" stroke-width="2" stroke="#fff" fill="none"></rect>
                                    </mask>
                                </defs>
                                <rect x="0" y="0" width="100%" height="100%" rx="15" ry="15" stroke-width="2" stroke="url(#signupPassGradient)" fill="none" mask="url(#signupPassBorderMask)" className="transition-stroke-dashoffset"></rect>
                            </svg>
                        </div>
                        <div className="mb-3 form-floating w-100 position-relative">
                            <input type="password" className="form-control gradient-input" id="signupConfirmPassword" placeholder="Confirm Password" required/>
                            <label className="form-label" for="signupConfirmPassword">Confirm Password</label>
                            <svg className="position-absolute gradient-border-svg top-0 w-100 h-100 pointer-events-none">
                                <defs>
                                    <linearGradient id="signupConPassGradient" gradientTransform="rotate(10)">
                                        <stop offset="10%" stop-color="#29fb65"></stop>
                                        <stop offset="90%" stop-color="#77a7fa"></stop>
                                    </linearGradient>
                                    <mask id="signupConPassBorderMask">
                                        <rect x="0" y="0" width="100%" height="100%" rx="15" ry="15" stroke-width="2" stroke="#fff" fill="none"></rect>
                                    </mask>
                                </defs>
                                <rect x="0" y="0" width="100%" height="100%" rx="15" ry="15" stroke-width="2" stroke="url(#signupConPassGradient)" fill="none" mask="url(#signupConPassBorderMask)" className="transition-stroke-dashoffset"></rect>
                            </svg>
                        </div>
                        <button type="submit" className="animate-button fw-bold fs-6 form-floating w-100 position-relative">Submit</button>
                    </form>
                    <div className="text-center w-100">
                        <p className="fs-6 d-inline">Already have an account?</p>
                        <p className ="fw-bold fs-6 d-inline clickable-text" id="signIn">Sign In</p>
                    </div>
                </div>
            </div>
            <div className="form-container w-50 h-100 justify-content-center align-items-center p-0 m-0">
                <div className="forget-pass-container align-items-center justify-content-center flex-column">
                    <div className="py-2 text-start w-100">
                        <h1 className="fw-bold fs-3">Forget your password?</h1>
                        <p className="fw-semibold fs-6">Please fill in the form below to change your password.</p>
                    </div>
                    <form action="" method="post" className="align-items-center justify-content-center flex-column w-100">
                        <div className="mb-3 form-floating w-100 position-relative">
                            <input type="email" className="form-control gradient-input" id="forgetpassEmail" placeholder="Email" autocomplete="on" required/>
                            <label className="form-label" for="forgetpassEmail">Email</label>
                            <svg className="position-absolute gradient-border-svg top-0 w-100 h-100 pointer-events-none">
                                <defs>
                                    <linearGradient id="forgetpassEmailGradient" gradientTransform="rotate(10)">
                                        <stop offset="10%" stop-color="#29fb65"></stop>
                                        <stop offset="90%" stop-color="#77a7fa"></stop>
                                    </linearGradient>
                                    <mask id="forgetpassEmailBorderMask">
                                        <rect x="0" y="0" width="100%" height="100%" rx="15" ry="15" stroke-width="2" stroke="#fff" fill="none"></rect>
                                    </mask>
                                </defs>
                                <rect x="0" y="0" width="100%" height="100%" rx="15" ry="15" stroke-width="2" stroke="url(#forgetpassEmailGradient)" fill="none" mask="url(#forgetpassEmailBorderMask)" className="transition-stroke-dashoffset"></rect>
                            </svg>
                        </div>
                        <div className="mb-3 form-floating w-100 position-relative">
                            <input type="password" className="form-control gradient-input" id="forgetpassPassword" placeholder="Password" required/>
                            <label className="form-label" for="forgetpassPassword">New Password</label>
                            <svg className="position-absolute gradient-border-svg top-0 w-100 h-100 pointer-events-none">
                                <defs>
                                    <linearGradient id="forgetpassPassGradient" gradientTransform="rotate(10)">
                                        <stop offset="10%" stop-color="#29fb65"></stop>
                                        <stop offset="90%" stop-color="#77a7fa"></stop>
                                    </linearGradient>
                                    <mask id="forgetpassPassBorderMask">
                                        <rect x="0" y="0" width="100%" height="100%" rx="15" ry="15" stroke-width="2" stroke="#fff" fill="none"></rect>
                                    </mask>
                                </defs>
                                <rect x="0" y="0" width="100%" height="100%" rx="15" ry="15" stroke-width="2" stroke="url(#forgetpassPassGradient)" fill="none" mask="url(#forgetpassPassBorderMask)" className="transition-stroke-dashoffset"></rect>
                            </svg>
                        </div>
                        <div className="mb-3 form-floating w-100 position-relative">
                            <input type="password" className="form-control gradient-input" id="forgetpassConfirmPassword" placeholder="Confirm Password" required/>
                            <label className="form-label" for="forgetpassConfirmPassword">Confirm New Password</label>
                            <svg className="position-absolute gradient-border-svg top-0 w-100 h-100 pointer-events-none">
                                <defs>
                                    <linearGradient id="forgetpassConPassGradient" gradientTransform="rotate(10)">
                                        <stop offset="10%" stop-color="#29fb65"></stop>
                                        <stop offset="90%" stop-color="#77a7fa"></stop>
                                    </linearGradient>
                                    <mask id="forgetpassConPassBorderMask">
                                        <rect x="0" y="0" width="100%" height="100%" rx="15" ry="15" stroke-width="2" stroke="#fff" fill="none"></rect>
                                    </mask>
                                </defs>
                                <rect x="0" y="0" width="100%" height="100%" rx="15" ry="15" stroke-width="2" stroke="url(#forgetpassConPassGradient)" fill="none" mask="url(#forgetpassConPassBorderMask)" className="transition-stroke-dashoffset"></rect>
                            </svg>
                        </div>
                        <button type="submit" className="animate-button fw-bold fs-6 form-floating w-100 position-relative">Change Password</button>
                    </form>
                    <div className="text-center w-100">
                        <p className="fs-6 d-inline">Remember your password?</p>
                        <p className ="fw-bold fs-6 d-inline clickable-text" id="signIn1">Sign In</p>
                    </div>
                </div>
            </div>
            <div className="overlay-container w-50 h-100 justify-content-center align-items-center p-0 m-0">
                <div className="overlay">
                    <div className="overlay-panel overlay-left d-flex align-items-center justify-content-center overflow-hidden">
                        <div className="animate-slide slide-content active w-100 h-100 align-items-center justify-content-center flex-column position-relative" id="slide-1" style={{ height: '500px' }}>
                            <img src="https://media.giphy.com/media/fxqzWdjvacWEie6gho/giphy.gif?cid=82a1493bsfu4ketb56yjt7sm5lcsegkaktyk4i6e03dss8h7&ep=v1_stickers_trending&rid=giphy.gif&ct=s" alt="background" height="400" className="position-absolute w-100" style={{ zIndex: 0, top: 0, objectFit: 'contain' }} />
                            <img src="https://media.giphy.com/media/FjWvPN1ljbdfOXlKGJ/giphy.gif?cid=ecf05e47ddeauulejt31jekl9w17fprgxufi3bhn56snvpg5&ep=v1_gifs_related&rid=giphy.gif&ct=ts" alt="details" height="250" className="position-absolute w-80" style={{ zIndex: 0, top: '300px', objectFit: 'contain' }} />
                        </div>
                        <div className="animate-slide slide-content w-100 h-100 align-items-center justify-content-center flex-column position-relative" id="slide-2" style={{ height: '500px' }}>
                            <div className="d-flex w-100 align-items-center justify-content-center">
                                <img src="https://media.giphy.com/media/Stcu1RKJfvPcghYqUN/giphy.gif?cid=ecf05e47iiawtlu9nzfytre095y7jwk3mlk1b906ps4upmdq&ep=v1_gifs_related&rid=giphy.gif&ct=s" alt="background" height="350" className="position-absolute w-100" style={{ color: 'transparent', zIndex: 0, top: 0, objectFit: 'contain' }} />
                                <img src="https://media.giphy.com/media/HA0mTAyYUJthwBWKkI/giphy.gif?cid=ecf05e4747z9bfk2n7fxhrja3qh4oj6e9akd8n3g3gst5kul&ep=v1_stickers_search&rid=giphy.gif&ct=s" alt="details" height="100" className="position-absolute w-80" style={{ color: 'transparent', zIndex: 0, top: '350px', objectFit: 'contain' }} />
                            </div>
                        </div>
                        <div className="animate-slide slide-content w-100 h-100 align-items-center justify-content-center flex-column position-relative" id="slide-3" style={{ height: '500px' }}>
                            <div className="d-flex w-100 align-items-center justify-content-center">
                                <img src="https://media.giphy.com/media/HCwnYWnMgLZUW1BtP2/giphy.gif?cid=ecf05e47xevwfjnbf5yudikky6unae3wydl67gqqp7v9t9is&ep=v1_stickers_search&rid=giphy.gif&ct=s" alt="background" height="400" className="position-absolute w-100" style={{ color: 'transparent', zIndex: 0, top: 0, objectFit: 'contain' }} />
                                <img src="https://media.giphy.com/media/XtwvQC1cx5uuCgCsOH/giphy.gif?cid=ecf05e47fz0rh3j8owfhvpjtazezbof39bymem0972ee7ddq&ep=v1_stickers_search&rid=giphy.gif&ct=ts" alt="details" height="150" className="position-absolute w-80" style={{ color: 'transparent', zIndex: 0, top: '350px', objectFit: 'contain' }} />
                            </div>
                        </div>
                        <div className="animate-slide slide-content w-100 h-100 align-items-center justify-content-center flex-column position-relative" id="slide-4" style={{ height: '500px' }}>
                            <div className="d-flex w-100 align-items-center justify-content-center">
                                <img src="https://media.giphy.com/media/bUbGhADoOB4fHulPpE/giphy.gif?cid=ecf05e47ae7xh0rjskzmjbjeigfi8b9kipl9rf3dmw54ufgq&ep=v1_gifs_related&rid=giphy.gif&ct=s" alt="background" height="350" className="position-absolute w-100" style={{ color: 'transparent', zIndex: 0, top: 0, objectFit: 'contain' }} />
                                <img src="https://media.giphy.com/media/2SDGRecRVr42fIpCyT/giphy.gif?cid=790b7611j5uaetjykpuercavq5dk4zt2bjhyzq1un36d9so0&ep=v1_stickers_search&rid=giphy.gif&ct=ts" alt="details" height="100" className="position-absolute w-80" style={{ color: 'transparent', zIndex: 0, top: '350px', objectFit: 'contain' }} />
                            </div>
                        </div>
                        <div className="d-flex align-items-center w-100 h-100 justify-content-center position-relative animate-slide">
                            <ul className="d-flex align-items-center justify-content-around rounded-pill px-2 position-absolute custom-rounded-pill" >
                                <li className="d-flex align-items-center justify-content-center indicator clickable-text" data-target="slide-1">
                                    <div className="rounded-circle white-circle"></div>
                                </li>
                                <li className="d-flex align-items-center justify-content-center indicator clickable-text" data-target="slide-2">
                                    <div className="rounded-circle"></div>
                                </li>
                                <li className="d-flex align-items-center justify-content-center indicator clickable-text" data-target="slide-3">
                                    <div className="rounded-circle"></div>
                                </li>
                                <li className="d-flex align-items-center justify-content-center indicator clickable-text" data-target="slide-4">
                                    <div className="rounded-circle"></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="overlay-panel overlay-right d-flex align-items-center justify-content-center overflow-hidden">
                        <div className="animate-slide slide-content active w-100 h-100 align-items-center justify-content-center flex-column position-relative" id="slide-5" style={{ height: '500px' }}>
                            <img src="https://media.giphy.com/media/fxqzWdjvacWEie6gho/giphy.gif?cid=82a1493bsfu4ketb56yjt7sm5lcsegkaktyk4i6e03dss8h7&ep=v1_stickers_trending&rid=giphy.gif&ct=s" alt="background" height="400" className="position-absolute w-100" style={{ zIndex: 0, top: 0, objectFit: 'contain' }} />
                            <img src="https://media.giphy.com/media/FjWvPN1ljbdfOXlKGJ/giphy.gif?cid=ecf05e47ddeauulejt31jekl9w17fprgxufi3bhn56snvpg5&ep=v1_gifs_related&rid=giphy.gif&ct=ts" alt="details" height="250" className="position-absolute w-80" style={{ zIndex: 0, top: '300px', objectFit: 'contain' }} />
                        </div>
                        <div className="animate-slide slide-content w-100 h-100 align-items-center justify-content-center flex-column position-relative" id="slide-6" style={{ height: '500px' }}>
                            <div className="d-flex w-100 align-items-center justify-content-center">
                                <img src="https://media.giphy.com/media/Stcu1RKJfvPcghYqUN/giphy.gif?cid=ecf05e47iiawtlu9nzfytre095y7jwk3mlk1b906ps4upmdq&ep=v1_gifs_related&rid=giphy.gif&ct=s" alt="background" height="350" className="position-absolute w-100" style={{ color: 'transparent', zIndex: 0, top: 0, objectFit: 'contain' }} />
                                <img src="https://media.giphy.com/media/HA0mTAyYUJthwBWKkI/giphy.gif?cid=ecf05e4747z9bfk2n7fxhrja3qh4oj6e9akd8n3g3gst5kul&ep=v1_stickers_search&rid=giphy.gif&ct=s" alt="details" height="100" className="position-absolute w-80" style={{ color: 'transparent', zIndex: 0, top: '350px', objectFit: 'contain' }} />
                            </div>
                        </div>
                        <div className="animate-slide slide-content w-100 h-100 align-items-center justify-content-center flex-column position-relative" id="slide-7" style={{ height: '500px' }}>
                            <div className="d-flex w-100 align-items-center justify-content-center">
                                <img src="https://media.giphy.com/media/HCwnYWnMgLZUW1BtP2/giphy.gif?cid=ecf05e47xevwfjnbf5yudikky6unae3wydl67gqqp7v9t9is&ep=v1_stickers_search&rid=giphy.gif&ct=s" alt="background" height="400" className="position-absolute w-100" style={{ color: 'transparent', zIndex: 0, top: 0, objectFit: 'contain' }} />
                                <img src="https://media.giphy.com/media/XtwvQC1cx5uuCgCsOH/giphy.gif?cid=ecf05e47fz0rh3j8owfhvpjtazezbof39bymem0972ee7ddq&ep=v1_stickers_search&rid=giphy.gif&ct=ts" alt="details" height="150" className="position-absolute w-80" style={{ color: 'transparent', zIndex: 0, top: '350px', objectFit: 'contain' }} />
                            </div>
                        </div>
                        <div className="animate-slide slide-content w-100 h-100 align-items-center justify-content-center flex-column position-relative" id="slide-8" style={{ height: '500px' }}>
                            <div className="d-flex w-100 align-items-center justify-content-center">
                                <img src="https://media.giphy.com/media/bUbGhADoOB4fHulPpE/giphy.gif?cid=ecf05e47ae7xh0rjskzmjbjeigfi8b9kipl9rf3dmw54ufgq&ep=v1_gifs_related&rid=giphy.gif&ct=s" alt="background" height="350" className="position-absolute w-100" style={{ color: 'transparent', zIndex: 0, top: 0, objectFit: 'contain' }} />
                                <img src="https://media.giphy.com/media/2SDGRecRVr42fIpCyT/giphy.gif?cid=790b7611j5uaetjykpuercavq5dk4zt2bjhyzq1un36d9so0&ep=v1_stickers_search&rid=giphy.gif&ct=ts" alt="details" height="100" className="position-absolute w-80" style={{ color: 'transparent', zIndex: 0, top: '350px', objectFit: 'contain' }} />
                            </div>
                        </div>
                        <div className="d-flex align-items-center w-100 h-100 justify-content-center position-relative animate-slide">
                            <ul className="d-flex align-items-center justify-content-around rounded-pill px-2 position-absolute custom-rounded-pill" >
                                <li className="d-flex align-items-center justify-content-center indicator clickable-text" data-target="slide-5">
                                    <div className="rounded-circle white-circle"></div>
                                </li>
                                <li className="d-flex align-items-center justify-content-center indicator clickable-text" data-target="slide-6">
                                    <div className="rounded-circle"></div>
                                </li>
                                <li className="d-flex align-items-center justify-content-center indicator clickable-text" data-target="slide-7">
                                    <div className="rounded-circle"></div>
                                </li>
                                <li className="d-flex align-items-center justify-content-center indicator clickable-text" data-target="slide-8">
                                    <div className="rounded-circle"></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    )
}
export default Login