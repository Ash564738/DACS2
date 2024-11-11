mport React, { useEffect, useState } from 'react';
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
import Loader from '../../Component/Loader/loader';
import Box from '@mui/material/Box';
import './signUp.css';
import 'react-toastify/dist/ReactToastify.css';
const SignIn = () => {
    const [uploadedImageUrl, setUploadedImageUrl] = useState('https://th.bing.com/th/id/OIP.x-zcK4XvIdKjt7s4wJTWAgAAAA?w=360&h=360&rs=1&pid=ImgDetMain');
    const [signinField, setSigninField] = useState({"userName": "", "password": ""});
    const [signupField, setSignupField] = useState({"userName": "", "name": "", "password": "", "gender": "", "dob": "", "profilePic": uploadedImageUrl});
    const [progressBar, setProgressBar] = useState(false);
    const [fileName, setFileName] = useState('');
    const navigate = useNavigate();
    const handleGenderClick = (gender) => {
        setSignupField((prevSignupField) => ({
            ...prevSignupField,
            gender: gender
        }));
    };
    const handleOnChangeInput = (e, name, form) => {
        const { value, files } = e.target;
        if (files && files.length > 0) {
            uploadImage(e);
            setFileName(files[0].name);
        } else {
            if (form === "signin") {
                setSigninField({
                    ...signinField, [name]: value
                });
            } else if (form === "signup") {
                setSignupField({
                    ...signupField, [name]: value
                });
            }
        }
        console.log("Signup Field:", signupField);
        console.log("Signin Field:", signinField);
    };
    useEffect(() => {
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const signInButton1 = document.getElementById('signIn1');
        const forgetPassButton = document.getElementById('forgetPass');
        const container = document.getElementById('container');
        const forms = document.querySelectorAll('.form-container');
        const genderSelect = document.getElementById('genderSelect');
        const genderOptions = document.getElementById('genderOptions');
        const selectedGender = document.getElementById('selectedGender');
        const handleGenderSelectClick = (event) => {
            event.stopPropagation();
            genderOptions.style.display = genderOptions.style.display === 'block' ? 'none' : 'block';
        };
        const handleDocumentClick = (event) => {
            if (!genderSelect.contains(event.target)) {
                genderOptions.style.display = 'none';
            }
        };
        genderOptions.querySelectorAll('.option').forEach(option => {
            option.addEventListener('click', function () {
                const selectedValue = this.getAttribute('data-value');
                handleGenderClick(selectedValue);
                const icon = this.querySelector('svg').outerHTML;
                selectedGender.innerHTML = icon + this.textContent;
                genderOptions.style.display = 'none';
            });
        });
        genderSelect.addEventListener('click', handleGenderSelectClick);
        document.addEventListener('click', handleDocumentClick);
        flatpickr("#dob", {
            dateFormat: "Y-m-d",
            position: "below",
            onChange: (selectedDates) => {
                if (selectedDates.length > 0) {
                    setSignupField((prevSignupField) => ({
                        ...prevSignupField,
                        dob: selectedDates[0].toISOString().split('T')[0],
                    }));
                }
                console.log('Date Selected:', selectedDates[0].toISOString().split('T')[0]);
            },
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
        return () => {
            genderSelect.removeEventListener('click', handleGenderSelectClick);
            document.removeEventListener('click', handleDocumentClick);
        };
    });
    const handleSignup = async () => {
        setProgressBar(true);
        axios.post('http://localhost:4000/auth/signUp', signupField).then(res => {
            console.log(res);
            toast.success("User registered successfully", { position: "top-center", autoClose: 2000 });
            setProgressBar(false);
            navigate('/');
        }).catch(err => {
            console.log(err);
            setProgressBar(false);
            toast.error("Error registering user", { position: "top-center", autoClose: 2000 });
        });
    };
    const handleSignin = async() => {
        setProgressBar(true);
        axios.post('http://localhost:4000/auth/signIn', signinField, {withCredentials: true}).then((res) => {
            toast.success("User signed in successfully", { position: "top-center", autoClose: 2000 });
            setProgressBar(false);
            console.log(res);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.user._id);
            localStorage.setItem("userName", res.data.user.userName);
            localStorage.setItem("name", res.data.user.name);
            localStorage.setItem("profilePic", res.data.user.profilePic);
            window.location.reload();
            navigate('/');
        }).catch((err) => {
            toast.error("Error signing in user", { position: "top-center", autoClose: 2000 });
            setProgressBar(false);
            console.log(err);
        });
    }
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
    const uploadImage = async (e) => {
        console.log("Uploading Image");
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'Metube');
        setProgressBar(true);
        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/dicsxejp4/image/upload`, data);
            setProgressBar(false);
            const imageUrl = response.data.secure_url;
            setUploadedImageUrl(imageUrl);
            setSignupField({ ...signupField, "profilePic": imageUrl });
        } catch (err) {
            console.error("Error uploading file:", err);
        } finally {
            setProgressBar(false);
        }
    };
    return (
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
                            <input type="text" value ={signinField.userName} onChange={(e) => handleOnChangeInput(e, "userName", "signin")} className="form-control gradient-input" id="signinEmail" placeholder="Email" autoComplete="on" required/>
                            <label className="form-label" htmlFor="signinEmail">Email</label>
                            <GradientBorderSVG gradientId="signinEmailGradient" maskId="signinEmailBorderMask" />
                        </div>
                        <div className="mb-3 form-floating w-100 position-relative">
                            <input type="password" value ={signinField.password} onChange={(e)=> handleOnChangeInput(e,"password", "signin")} className="form-control gradient-input" placeholder="Password" id="signinPassword" name="password" autoComplete="on" required/>
                            <label className="form-label" htmlFor="signinPassword">Password</label>
                            <GradientBorderSVG gradientId="signinPassGradient" maskId="signinPassBorderMask" />
                        </div>
                        <p className="text-end fs-6 mb-3 w-100 clickable-text" id="forgetPass" >Forgot password?</p>
                        <button type="button" className="animate-button fw-bold fs-6 py-2 w-100"  onClick={handleSignin}>Sign In</button>
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
                        <p className="fw-bold fs-6 d-inline clickable-text" id="signUp">Sign Up</p>
                    </div>
                    {progressBar && <Box sx={{ width: '100%' }}>
                        <Loader />
                    </Box>}
                </div>
                <ToastContainer />
            </div>
    )
}
export default SignIn