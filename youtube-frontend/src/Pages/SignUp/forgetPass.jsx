import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'flatpickr/dist/flatpickr.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './signUp.css';
import axios from 'axios';
const ForgetPass = ({ signInButton1Ref }) => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [step, setStep] = useState(1);
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
    const handleSendOTP = async () => {
        try {
            const response = await axios.post('http://localhost:4000/otp/sendOTP', { email });
            toast.success(response.data.message, { position: 'top-center' });
            setStep(2); // Move to step 2 (enter OTP)
        } catch (error) {
            toast.error(error.response?.data.error || 'Error sending OTP');
        }
    };
    const handleVerifyOTP = async () => {
        try {
            const response = await axios.post('http://localhost:4000/otp/verifyOTP', { email, otp });
            toast.success(response.data.message, { position: 'top-center' });
            setStep(3); // Move to step 3 (enter new password)
        } catch (error) {
            toast.error(error.response?.data.error || 'Invalid OTP');
        }
    };
    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }
        try {
            const response = await axios.post('http://localhost:4000/auth/changePassword', { userName: email, newPassword });
            toast.success(response.data.message, { position: 'top-center' });
            setStep(1); // Reset the process
        } catch (error) {
            toast.error(error.response?.data.error || 'Error changing password');
        }
    };
    return (
        <div className="form-container w-50 h-100 justify-content-center align-items-center p-0 m-0">
            <div className="forget-pass-container align-items-center justify-content-center flex-column">
                <div className="py-2 text-start w-100">
                    <h1 className="fw-bold fs-3">Forget your password?</h1>
                    <p className="fw-semibold fs-6">Please follow the steps below to change your password.</p>
                </div>
                {step === 1 && (
                    <>
                        <form className="align-items-center justify-content-center flex-column w-100">
                            <div className="mb-3 form-floating w-100 position-relative">
                                <input
                                    type="email"
                                    className="form-control gradient-input"
                                    id="forgetpassEmail"
                                    placeholder="Email"
                                    autoComplete="off"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <label className="form-label" htmlFor="forgetpassEmail">Email</label>
                                <GradientBorderSVG gradientId="forgetpassEmailGradient" maskId="forgetpassEmailBorderMask" />
                            </div>
                            <button 
                                type="button" 
                                className="animate-button fw-bold fs-8 form-floating w-100 position-relative" 
                                onClick={handleSendOTP}
                            >
                                Send OTP
                            </button>
                        </form>
                    </>
                )}
                {step === 2 && (
                    <>
                        <form className="align-items-center justify-content-center flex-column w-100">
                            <div className="mb-3 form-floating w-100 position-relative">
                                <input
                                    type="text"
                                    className="form-control gradient-input"
                                    id="forgetpassOtp"
                                    placeholder="OTP"
                                    autoComplete="off"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                />
                                <label className="form-label" htmlFor="forgetpassOtp">OTP</label>
                                <GradientBorderSVG gradientId="forgetpassOtpGradient" maskId="forgetpassOtpBorderMask" />
                            </div>
                            <button 
                                type="button" 
                                className="animate-button fw-bold fs-8 form-floating w-100 position-relative" 
                                onClick={handleVerifyOTP}
                            >
                                Verify OTP
                            </button>
                        </form>
                    </>
                )}
                {step === 3 && (
                    <>
                        <form className="align-items-center justify-content-center flex-column w-100">
                            <div className="mb-3 form-floating w-100 position-relative">
                                <input
                                    type="password"
                                    className="form-control gradient-input"
                                    id="newPassword"
                                    placeholder="New Password"
                                    autoComplete="off"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                                <label className="form-label" htmlFor="newPassword">New Password</label>
                                <GradientBorderSVG gradientId="newPasswordGradient" maskId="newPasswordBorderMask" />
                            </div>
                            <div className="mb-3 form-floating w-100 position-relative">
                                <input
                                    type="password"
                                    className="form-control gradient-input"
                                    id="confirmPassword"
                                    placeholder="Confirm Password"
                                    autoComplete="off"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                                <GradientBorderSVG gradientId="confirmPasswordGradient" maskId="confirmPasswordBorderMask" />
                            </div>
                            <button 
                                type="button" 
                                className="animate-button fw-bold fs-8 form-floating w-100 position-relative" 
                                onClick={handleChangePassword}
                            >
                                Change Password
                            </button>
                        </form>
                    </>
                )}
                <div className="text-center w-100">
                    <p className="fs-6 d-inline">Remember your password? </p>
                    <div className="fw-bold fs-6 d-inline clickable-text" id="signIn1" ref={signInButton1Ref}>Sign In</div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPass;