import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import TripOriginOutlinedIcon from '@mui/icons-material/TripOriginOutlined';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import './signUp.css';
import axios from 'axios';
const SignUp = () => {
    const [uploadedImageUrl, setUploadedImageUrl] = useState('https://th.bing.com/th/id/OIP.x-zcK4XvIdKjt7s4wJTWAgAAAA?w=360&h=360&rs=1&pid=ImgDetMain');
    const [signinField, setSigninField] = useState({"userName":"","password":""});
    const [signupField, setSignupField] = useState({"userName":"","name":"","password":"","gender":"","dob":"","profilePic":uploadedImageUrl});
    const [progressBar,setProgressBar] = useState(false);
    const navigate = useNavigate();
    const [fileName, setFileName] = useState('');
    const uploadImage = async (e) => {
        console.log("Uploading Image");
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'Metube');
        setProgressBar(true);
        try {
            // cloudName = 'dicsxejp4';
            const response = await axios.post(`https://api.cloudinary.com/v1_1/dicsxejp4/image/upload`,data);
            const imageUrl = response.data.secure_url;
            setUploadedImageUrl(imageUrl);
            setSigninField({...signupField,"profilePic": imageUrl});
        } catch (err) {
            console.error("Error uploading file:", err);
        } finally {
            setProgressBar(false);
        }
    };
    const handleOnChangeInput = (e, name, form) => {
        const { value, files } = e.target;
        if (files && files.length > 0) {
            uploadImage(e);
            setFileName(files[0].name);
        } else {
            if (form === "signin") {
                setSigninField({
                    ...signinField,[name]: value
                });
            } else if (form === "signup") {
                setSignupField({
                    ...signupField,[name]: value
                });
            }
        }
    };
    console.log(signinField);
    console.log(signupField);
    const GradientBorderSVG = ({ gradientId, maskId, className }) => {
        return (
            <svg className={`position-absolute gradient-border-svg top-0 w-100 h-100 pointer-events-none ${className}`}>
                <defs>
                    <linearGradient id={gradientId} gradientTransform="rotate(10)">
                        <stop offset="10%" stopColor="#29fb65"></stop>
                        <stop offset="90%" stopColor="#77a7fa"></stop>
                    </linearGradient>
                    <mask id={maskId}>
                        <rect x="0" y="0" width="100%" height="100%" rx="15" ry="15" strokeWidth="2" stroke="#fff" fill="none"></rect>
                    </mask>
                </defs>
                <rect x="0"y="0"width="100%"height="100%"rx="15"ry="15"strokeWidth="2"stroke={`url(#${gradientId})`}fill="none"mask={`url(#${maskId})`}className="transition-stroke-dashoffset"
                ></rect>
            </svg>
        );
    };
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
        document.addEventListener('click', function (event) {
            if (!genderSelect.contains(event.target)) {
                genderOptions.style.display = 'none';
            }
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
    <main>
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
                            <input type="email" value ={signinField.userName} onChange={(e) => handleOnChangeInput(e, "userName", "signin")} className="form-control gradient-input" id="signinEmail" placeholder="Email" autoComplete="on" required/>
                            <label className="form-label" htmlFor="signinEmail">Email</label>
                            <GradientBorderSVG gradientId="signinEmailGradient" maskId="signinEmailBorderMask" />
                        </div>
                        <div className="mb-3 form-floating w-100 position-relative">
                            <input type="password" value ={signinField.password} onChange={(e)=> handleOnChangeInput(e,"password", "signin")} className="form-control gradient-input" placeholder="Password" id="signinPassword" name="password" autoComplete="on" required/>
                            <label className="form-label" htmlFor="signinPassword">Password</label>
                            <GradientBorderSVG gradientId="signinPassGradient" maskId="signinPassBorderMask" />
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
                        <p className="fs-6 d-inline">Don’t have an account? </p>
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
                            <input type="email" className="form-control gradient-input" value={signupField.userName} onChange={(e)=> handleOnChangeInput(e,"userName", "signup")} id="signupEmail" placeholder="Email" autoComplete="on" required/>
                            <label className="form-label" htmlFor="signupEmail">Email</label>
                            <GradientBorderSVG gradientId="signupEmailGradient" maskId="signupEmailBorderMask" />
                        </div>
                        <div className="mb-3 form-floating w-100 position-relative">
                            <input type="text" className="form-control gradient-input" value ={signupField.name} onChange={(e)=> handleOnChangeInput(e,"name", "signup")} id="signupName" placeholder="Full Name" autoComplete="on" required/>
                            <label className="form-label" htmlFor="signupName">Full Name</label>
                            <GradientBorderSVG gradientId="signupNameGradient" maskId="signupNameBorderMask" />
                        </div>
                        <div className="mb-3 form-floating w-100 position-relative d-flex flex-row">
                            <div className="form-floating" style={{ width: '40%', marginRight: '10px' }}>
                                <div className="form-select gradient-input" id="genderSelect" required>
                                    <span id="selectedGender">
                                        <TripOriginOutlinedIcon sx={{ fontSize: "1em", marginRight: "4px"}}/>
                                        Gender
                                    </span>
                                    <div className="options" id="genderOptions">
                                        <div className="option" data-value="" disabled selected> 
                                            <TripOriginOutlinedIcon sx={{ fontSize: "1em", marginRight: "4px"}}/>
                                            Gender
                                        </div>
                                        <div className="option" data-value="Male">
                                            <MaleIcon />
                                            Male
                                        </div>
                                        <div className="option" data-value="Female">
                                            <FemaleIcon />
                                            Female
                                        </div>
                                        <div className="option" data-value="Other">
                                            <TransgenderIcon />
                                            Other
                                        </div>
                                    </div>
                                </div>
                                <label className="form-label" htmlFor="genderSelect">Select Gender</label>
                            </div>
                            <div className="form-floating" style={{ width: '60%' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" height="1em" x="0" y="0" viewBox="0 0 48 48" style={{ enableBackground: 'new 0 0 512 512' }} xmlSpace="preserve" className="input-icon">
                                    <g>
                                        <rect width="4" height="6" x="11" y="3" rx="2" fill="#ffffff" opacity="1"></rect>
                                        <rect width="4" height="6" x="33" y="3" rx="2" fill="#ffffff" opacity="1"></rect>
                                        <path d="M4 18v23a4 4 0 0 0 4 4h32a4 4 0 0 0 4-4V18zm12 20a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2zm0-11a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2zm11 11a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2zm0-11a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2zm11 11a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2zm0-11a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2zM44 16v-6a4 4 0 0 0-4-4h-1v1c0 2.206-1.794 4-4 4s-4-1.794-4-4V6H17v1c0 2.206-1.794 4-4 4S9 9.206 9 7V6H8a4 4 0 0 0-4 4v6z" fill="#ffffff" opacity="1"></path>
                                    </g>
                                </svg>
                                <input type="text" className="form-control gradient-input" id="dob" required placeholder="Date of Birth" autoComplete="on" style={{ paddingLeft: '40px' }} />
                                <label className="form-label" htmlFor="dob" id="dob-label">Date of Birth</label>
                                <GradientBorderSVG gradientId="signupDoBGradient" maskId="signupDoBBorderMask" />
                            </div>
                        </div>
                        <div className="mb-3 form-floating w-100 position-relative">
                            <input type="password" className="form-control gradient-input" value ={signupField.password} onChange={(e)=> handleOnChangeInput(e,"password", "signup")} id="signupPassword" autoComplete="on" placeholder="Password" required/>
                            <label className="form-label" htmlFor="signupPassword">Password</label>
                            <GradientBorderSVG gradientId="signupPassGradient" maskId="signupPassBorderMask" />
                        </div>
                        <div className="mb-3 form-floating w-100 position-relative">
                            <input type="file" onChange={(e) => handleOnChangeInput(e, "profilePic")} accept="image/*"style={{position: "absolute",left: 0,top: 0,opacity: 0,width:"100%",height: "100%",cursor: "pointer",zIndex: 1,}}/>
                            <button type="button"style={{padding: "5px",backgroundColor: 'white',color: "black",border: "none",borderRadius: "15px",cursor: "pointer",fontSize: "0.9em", textTransform: "none",}}>
                                Choose File
                            </button>
                            {fileName || " No ProfilePic Choosen"}
                            <img src={uploadedImageUrl} alt="" className='image_default_signUp'/>
                        </div>
                        <button type="submit" className="animate-button fw-bold fs-6 form-floating w-100 position-relative">Submit</button>
                    </form>
                    <div className="text-center w-100">
                        <p className="fs-6 d-inline">Already have an account? </p>
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
                            <input type="email" className="form-control gradient-input" id="forgetpassEmail" placeholder="Email" autoComplete="on" required/>
                            <label className="form-label" htmlFor="forgetpassEmail">Email</label>
                            <GradientBorderSVG gradientId="forgetpassEmailGradient" maskId="forgetpassEmailBorderMask" />
                        </div>
                        <div className="mb-3 form-floating w-100 position-relative">
                            <input type="password" className="form-control gradient-input" id="forgetpassPassword" placeholder="Password" autoComplete="on" required/>
                            <label className="form-label" htmlFor="forgetpassPassword">New Password</label>
                            <GradientBorderSVG gradientId="forgetpassPassGradient" maskId="forgetpassPassBorderMask" />
                        </div>
                        <div className="mb-3 form-floating w-100 position-relative">
                            <input type="password" className="form-control gradient-input" id="forgetpassConfirmPassword" placeholder="Confirm Password" autoComplete="on" required/>
                            <label className="form-label" htmlFor="forgetpassConfirmPassword">Confirm New Password</label>
                            <GradientBorderSVG gradientId="forgetpassConPassGradient" maskId="forgetpassConPassBorderMask" />
                        </div>
                        <button type="submit" className="animate-button fw-bold fs-6 form-floating w-100 position-relative">Change Password</button>
                    </form>
                    <div className="text-center w-100">
                        <p className="fs-6 d-inline">Remember your password? </p>
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
                                <img src="https://media.giphy.com/media/HCwnYWnMgLZUW1BtP2/giphy.gif?cid=ecf05e47xevwfjnbf5yudikky6unae3wydl67gqqp7v9t9is&ep=v1_stickers_search&rid=giphy.gif&ct=s" alt="background" height="350" className="position-absolute w-100" style={{ color: 'transparent', zIndex: 0, top: 0, objectFit: 'contain' }} />
                                <img src="https://media.giphy.com/media/XtwvQC1cx5uuCgCsOH/giphy.gif?cid=ecf05e47fz0rh3j8owfhvpjtazezbof39bymem0972ee7ddq&ep=v1_stickers_search&rid=giphy.gif&ct=ts" alt="details" height="180" className="position-absolute w-80" style={{ color: 'transparent', zIndex: 0, top: '280px', objectFit: 'contain' }} />
                            </div>
                        </div>
                        <div className="animate-slide slide-content w-100 h-100 align-items-center justify-content-center flex-column position-relative" id="slide-4" style={{ height: '500px' }}>
                            <div className="d-flex w-100 align-items-center justify-content-center">
                                <img src="https://media.giphy.com/media/bUbGhADoOB4fHulPpE/giphy.gif?cid=ecf05e47ae7xh0rjskzmjbjeigfi8b9kipl9rf3dmw54ufgq&ep=v1_gifs_related&rid=giphy.gif&ct=s" alt="background" height="350" className="position-absolute w-100" style={{ color: 'transparent', zIndex: 0, top: 0, objectFit: 'contain' }} />
                                <img src="https://media.giphy.com/media/2SDGRecRVr42fIpCyT/giphy.gif?cid=790b7611j5uaetjykpuercavq5dk4zt2bjhyzq1un36d9so0&ep=v1_stickers_search&rid=giphy.gif&ct=ts" alt="details" height="100" className="position-absolute w-80" style={{ color: 'transparent', zIndex: 0, top: '320px', objectFit: 'contain' }} />
                            </div>
                        </div>
                        <div className="d-flex align-items-center w-100 h-100 justify-content-center position-relative animate-slide">
                            <ul className="d-flex align-items-center justify-content-around rounded-pill px-2 position-absolute custom-rounded-pill" >
                                <li className="d-flex align-items-center justify-content-center indicator clickable-text" data-target="slide-1">
                                    <div className="rounded-circle" style={{ backgroundColor:"white"}}></div>
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
                                <img src="https://media.giphy.com/media/HCwnYWnMgLZUW1BtP2/giphy.gif?cid=ecf05e47xevwfjnbf5yudikky6unae3wydl67gqqp7v9t9is&ep=v1_stickers_search&rid=giphy.gif&ct=s" alt="background" height="350" className="position-absolute w-100" style={{ color: 'transparent', zIndex: 0, top: 0, objectFit: 'contain' }} />
                                <img src="https://media.giphy.com/media/XtwvQC1cx5uuCgCsOH/giphy.gif?cid=ecf05e47fz0rh3j8owfhvpjtazezbof39bymem0972ee7ddq&ep=v1_stickers_search&rid=giphy.gif&ct=ts" alt="details" height="180" className="position-absolute w-80" style={{ color: 'transparent', zIndex: 0, top: '280px', objectFit: 'contain' }} />
                            </div>
                        </div>
                        <div className="animate-slide slide-content w-100 h-100 align-items-center justify-content-center flex-column position-relative" id="slide-8" style={{ height: '500px' }}>
                            <div className="d-flex w-100 align-items-center justify-content-center">
                                <img src="https://media.giphy.com/media/bUbGhADoOB4fHulPpE/giphy.gif?cid=ecf05e47ae7xh0rjskzmjbjeigfi8b9kipl9rf3dmw54ufgq&ep=v1_gifs_related&rid=giphy.gif&ct=s" alt="background" height="350" className="position-absolute w-100" style={{ color: 'transparent', zIndex: 0, top: 0, objectFit: 'contain' }} />
                                <img src="https://media.giphy.com/media/2SDGRecRVr42fIpCyT/giphy.gif?cid=790b7611j5uaetjykpuercavq5dk4zt2bjhyzq1un36d9so0&ep=v1_stickers_search&rid=giphy.gif&ct=ts" alt="details" height="100" className="position-absolute w-80" style={{ color: 'transparent', zIndex: 0, top: '320px', objectFit: 'contain' }} />
                            </div>
                        </div>
                        <div className="d-flex align-items-center w-100 h-100 justify-content-center position-relative animate-slide">
                            <ul className="d-flex align-items-center justify-content-around rounded-pill px-2 position-absolute custom-rounded-pill" >
                                <li className="d-flex align-items-center justify-content-center indicator clickable-text" data-target="slide-5">
                                    <div className="rounded-circle" style={{ backgroundColor:"white"}}></div>
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
        {progressBar && <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>}
        <ToastContainer />
    </main>
    )
}
export default SignUp