import React from 'react';
import 'flatpickr/dist/flatpickr.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Loader from '../../Component/Loader/loader';
import Box from '@mui/material/Box';
import './signUp.css';
import 'react-toastify/dist/ReactToastify.css';
const LogIn = ({ signinField, handleOnChangeInput, handleSignin, progressBar, signUpButtonRef, forgetPassButtonRef }) => {
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
                <rect x="0" y="0" width="100%" height="100%" rx="15" ry="15" strokeWidth="2" stroke={`url(#${gradientId})`} fill="none" mask={`url(#${maskId})`} className="transition-stroke-dashoffset"></rect>
            </svg>
        );
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
                <p className="text-end fs-6 mb-3 w-100 clickable-text" id="forgetPass" ref={forgetPassButtonRef}>Forgot password?</p>
                <button type="button" className="animate-button fw-bold fs-8 py-2 w-100"  onClick={handleSignin}>Sign In</button>
            </form>
            <div className="d-flex align-items-center justify-content-center py-2 w-100">
                <hr className="flex-fill" style={{ background: '#C5BCBC' }} />
                <span className="px-2">or continue</span>
                <hr className="flex-fill" style={{ background: '#C5BCBC' }} />
            </div>
            <div className="d-flex flex-row align-items-center justify-content-center py-2 w-100">
                <button className="py-2 px-4 d-flex align-items-center justify-content-center w-100 mx-1 animate-button" title="Sign in with Google">
                    <span className="fw-bold fs-6">
                        <i className="fab fa-google"></i>
                    </span>
                </button>
                <button className="py-2 px-4 d-flex align-items-center justify-content-center w-100 mx-1 animate-button" title="Sign in with Facebook">
                    <span className="fw-bold fs-6">
                        <i className="fab fa-facebook"></i>
                    </span>
                </button>
                <button className="py-2 px-4 d-flex align-items-center justify-content-center w-100 mx-1 animate-button" title="Sign in with Twitter">
                    <span className="fw-bold fs-6">
                        <i className="fab fa-twitter"></i>
                    </span>
                </button>
            </div>
            <div className="text-center w-100">
                <p className="fs-6 d-inline">Don’t have an account? </p>
                <div className="fw-bold fs-6 d-inline clickable-text" id="signUp" ref={signUpButtonRef}>Sign Up</div>
            </div>
            {progressBar && (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px', width: '40px', height: '40px'}}>
                    <Loader/>
                </Box>
            )}
        </div>
    </div>
    )
}
export default LogIn