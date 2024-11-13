// mport React, { useEffect, useState } from 'react';
// import { Link,useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify'
// import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import MaleIcon from '@mui/icons-material/Male';
// import FemaleIcon from '@mui/icons-material/Female';
// import TransgenderIcon from '@mui/icons-material/Transgender';
// import TripOriginOutlinedIcon from '@mui/icons-material/TripOriginOutlined';
// import Loader from '../../Component/Loader/loader';
// import Box from '@mui/material/Box';
// import './signUp.css';
// import 'react-toastify/dist/ReactToastify.css';
// const SignIn = () => {
//     return (
//             <div className="form-container w-50 h-100 d-flex justify-content-center align-items-center p-0 m-0">
//                 <div className="sign-in-container align-items-center justify-content-center flex-column">
//                     <div className="py-2 text-start w-100">
//                         <a href="/">
//                             <img src="https://cdn140.picsart.com/272733942032211.png?r1024x1024" alt="Metube logo" width="60" height="41" loading="lazy"/>
//                         </a>
//                     </div>
//                     <div className="text-start w-100">
//                         <h1 className="fw-bold fs-3">Welcome Back!</h1>
//                         <p className="fs-6 fw-semibold">Please enter sign-in details below.</p>
//                     </div>
//                     <form action="login" method="post" className="signin-form align-items-center justify-content-center flex-column w-100">
//                         <div className="mb-3 form-floating w-100 position-relative">
//                             <input type="text" value ={signinField.userName} onChange={(e) => handleOnChangeInput(e, "userName", "signin")} className="form-control gradient-input" id="signinEmail" placeholder="Email" autoComplete="on" required/>
//                             <label className="form-label" htmlFor="signinEmail">Email</label>
//                             <GradientBorderSVG gradientId="signinEmailGradient" maskId="signinEmailBorderMask" />
//                         </div>
//                         <div className="mb-3 form-floating w-100 position-relative">
//                             <input type="password" value ={signinField.password} onChange={(e)=> handleOnChangeInput(e,"password", "signin")} className="form-control gradient-input" placeholder="Password" id="signinPassword" name="password" autoComplete="on" required/>
//                             <label className="form-label" htmlFor="signinPassword">Password</label>
//                             <GradientBorderSVG gradientId="signinPassGradient" maskId="signinPassBorderMask" />
//                         </div>
//                         <p className="text-end fs-6 mb-3 w-100 clickable-text" id="forgetPass" >Forgot password?</p>
//                         <button type="button" className="animate-button fw-bold fs-6 py-2 w-100"  onClick={handleSignin}>Sign In</button>
//                     </form>
//                     <div className="d-flex align-items-center justify-content-center py-2 w-100">
//                         <hr className="flex-fill" style={{ background: '#C5BCBC' }} />
//                         <span className="px-2">or continue</span>
//                         <hr className="flex-fill" style={{ background: '#C5BCBC' }} />
//                     </div>
//                     <div className="d-flex flex-row align-items-center justify-content-center py-2 w-100">
//                         <button className="py-2 px-4 d-flex align-items-center justify-content-center w-100 mx-1" title="Sign in with Google">
//                             <span className="fw-bold fs-6">
//                                 <i className="fab fa-google"></i>
//                             </span>
//                         </button>
//                         <button className="py-2 px-4 d-flex align-items-center justify-content-center w-100 mx-1" title="Sign in with Facebook">
//                             <span className="fw-bold fs-6">
//                                 <i className="fab fa-facebook"></i>
//                             </span>
//                         </button>
//                         <button className="py-2 px-4 d-flex align-items-center justify-content-center w-100 mx-1" title="Sign in with Twitter">
//                             <span className="fw-bold fs-6">
//                                 <i className="fab fa-twitter"></i>
//                             </span>
//                         </button>
//                     </div>
//                     <div className="text-center w-100">
//                         <p className="fs-6 d-inline">Don’t have an account? </p>
//                         <p className="fw-bold fs-6 d-inline clickable-text" id="signUp">Sign Up</p>
//                     </div>
//                     {progressBar && <Box sx={{ width: '100%' }}>
//                         <Loader />
//                     </Box>}
//                 </div>
//                 <ToastContainer />
//             </div>
//     )
// }
// export default SignIn