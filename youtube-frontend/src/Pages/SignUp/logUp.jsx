import React from 'react';
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
const LogUp = ({ signupField, handleOnChangeInput, handleSignup, progressBar, handleGenderClick, fileName, uploadedImageUrl, signInButtonRef }) => {
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
        <div className="form-container w-50 h-100 justify-content-center align-items-center p-0 m-0">
            <div className="sign-up-container align-items-center justify-content-center flex-column">
                <div className="py-2 text-start w-100">
                    <h1 className="fw-bold fs-3">Welcome to Metube!</h1>
                    <p className="fw-semibold fs-6">Please fill in the form below to become a member of Metube.</p>
                </div>
                <form action="signup" method="post" className="signup-form align-items-center justify-content-center flex-column w-100">
                    <div className="mb-3 form-floating w-100 position-relative">
                        <input type="text" className="form-control gradient-input" value={signupField.userName} onChange={(e)=> handleOnChangeInput(e,"userName", "signup")} id="signupEmail" placeholder="Email" autoComplete="on" required/>
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
                                    <div className="option" data-value="Male" onClick={() => handleGenderClick("Male")}>
                                        <MaleIcon />
                                        Male
                                    </div>
                                    <div className="option" data-value="Female" onClick={() => handleGenderClick("Female")}>
                                        <FemaleIcon />
                                        Female
                                    </div>
                                    <div className="option" data-value="Other" onClick={() => handleGenderClick("Other")}>
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
                            <input type="date" className="form-control gradient-input" id="dob" required value={signupField.dob} onChange={(e) => handleOnChangeInput(e, "dob", "signup")} placeholder="Date of Birth" autoComplete="on" style={{ paddingLeft: '40px' }} />
                            <label className="form-label" htmlFor="dob" id="dob-label">Date of Birth</label>
                            <GradientBorderSVG gradientId="signupDoBGradient" maskId="signupDoBBorderMask" />
                        </div>
                    </div>
                    <div className="mb-3 form-floating w-100 position-relative">
                        <input type="password" className="form-control gradient-input" value ={signupField.password} onChange={(e)=> handleOnChangeInput(e,"password", "signup")} id="signupPassword" autoComplete="on" placeholder="Password" required/>
                        <label className="form-label" htmlFor="signupPassword">Password</label>
                        <GradientBorderSVG gradientId="signupPassGradient" maskId="signupPassBorderMask" />
                    </div>
                    <div className="mb-3 form-floating w-100 position-relative align-items-center d-flex">
                        <input type="file" onChange={(e) => handleOnChangeInput(e, "profilePic")} accept="image/*"style={{position: "absolute",left: 0,top: 0,opacity: 0,width:"100%",height: "100%",cursor: "pointer",zIndex: 1,}}/>
                        <button type="button"style={{padding: "5px",backgroundColor: 'white',color: "black",border: "none",borderRadius: "15px",cursor: "pointer",fontSize: "0.9em", textTransform: "none",}}>
                            Choose File
                        </button>
                        {fileName || " No ProfilePic Choosen"}
                        <img src={uploadedImageUrl} alt="" className='image_default_signUp'/>
                    </div>
                    <button type="button" className="animate-button fw-bold fs-8 form-floating w-100 position-relative"  onClick={handleSignup}>Sign Up</button>
                </form>
                <div className="text-center w-100">
                    <p className="fs-6 d-inline">Already have an account? </p>
                    <div className="fw-bold fs-6 d-inline clickable-text" id="signIn" ref={signInButtonRef}>Sign In</div>
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
export default LogUp