import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './signUp.css';
import axios from 'axios';
import apiClient from '../../Utils/apiClient.js';
import OverlayContainer from './overlayContainer';
import LogIn from './logIn.jsx';
import LogUp from './logUp.jsx';
import ForgetPass from './forgetPass.jsx';
const SignUp = () => {
    const [uploadedImageUrl, setUploadedImageUrl] = useState('https://th.bing.com/th/id/OIP.x-zcK4XvIdKjt7s4wJTWAgAAAA?w=360&h=360&rs=1&pid=ImgDetMain');
    const [signinField, setSigninField] = useState({"userName": "", "password": ""});
    const [signupField, setSignupField] = useState({"userName": "", "name": "", "password": "", "gender": "", "dob": "", "profilePic": uploadedImageUrl});
    const [progressBar, setProgressBar] = useState(false);
    const [fileName, setFileName] = useState('');
    const signUpButtonRef = useRef(null);
    const signInButtonRef = useRef(null);
    const signInButton1Ref = useRef(null);
    const forgetPassButtonRef = useRef(null);
    const token = localStorage.getItem('token');
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
    };
    useEffect(() => {
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
        signUpButtonRef.current.addEventListener('click', () => {
            container.classList.add("right-panel-active");
            switchForms(1);
        });
        signInButtonRef.current.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
            switchForms(0);
        });
        signInButton1Ref.current.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
            switchForms(0);
        });
        forgetPassButtonRef.current.addEventListener('click', () => {
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
        await axios.post('http://localhost:4000/auth/signUp', signupField).then(res => {
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
        await apiClient.post('http://localhost:4000/auth/signIn', signinField, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true
        }).then((res) => {
            toast.success("User signed in successfully", { position: "top-center", autoClose: 2000 });
            setProgressBar(false);
            console.log(res);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.user._id);
            localStorage.setItem("userName", res.data.user.userName);
            localStorage.setItem("name", res.data.user.name);
            localStorage.setItem("profilePic", res.data.user.profilePic);
            navigate('/');
            window.location.reload();
        }).catch((err) => {
            toast.error("Error signing in user", { position: "top-center", autoClose: 2000 });
            setProgressBar(false);
            console.log(err);
        });
    }
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
        <main>
            <div className="container text-white align-items-center justify-content-center flex-row overflow-hidden p-0 m-0" id="container">
                <LogIn signinField={signinField} handleOnChangeInput={handleOnChangeInput} handleSignin={handleSignin} progressBar={progressBar} signUpButtonRef={signUpButtonRef} forgetPassButtonRef={forgetPassButtonRef}/>
                <LogUp signupField={signupField} handleOnChangeInput={handleOnChangeInput} handleSignup={handleSignup} progressBar={progressBar} handleGenderClick={handleGenderClick} fileName={fileName} uploadedImageUrl={uploadedImageUrl} signInButtonRef={signInButtonRef}/>
                <ForgetPass signInButton1Ref={signInButton1Ref}/>
                <OverlayContainer />
            </div>
            <ToastContainer />
        </main>
    )
}
export default SignUp