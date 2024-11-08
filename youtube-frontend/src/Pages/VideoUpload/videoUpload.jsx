import React, { useState, useEffect } from 'react';
import './videoUpload.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Loader from '../../Component/Loader/loader';
const VideoUpload = () => {
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
    const [inputField, setInputField] = useState({"title": "","description": "","videoLink": "","thumbnail": "","videoType": ""});
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const handleOnChangeInput = (event, name) => {
        setInputField({
            ...inputField,[name]: event.target.value
        });
    };
    const uploadImage = async (e, type) => {
        console.log("Uploading Image");
        setLoader(true);
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'Metube');
        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/dicsxejp4/${type}/upload`,data);
            const url = response.data.secure_url;
            let val = type === "image" ? "thumbnail" : "videoLink";
            setInputField({
                ...inputField,[val]: url
            });
        } catch (err) {
            console.error("Error uploading file:", err);
        } finally {
            setLoader(false);
        }
    };
    console.log(inputField);
    // useEffect(()=>{
    //     let isLogin = localStorage.getItem("userId");
    //     if(isLogin===null){
    //         navigate('/')
    //     }
    // },[])
    const handleSubmitFunc = async () => {
        setLoader(true);
        try {
            const response = await axios.post('http://localhost:4000/api/uploadVideo', inputField);
            if (response.status === 200) {
                navigate('/');
            }
        } catch (error) {
            console.error("Error uploading video:", error);
        } finally {
            setLoader(false);
        }
    };
    return (
        <div className='videoUpload'>
            <div className="uploadBoxWrapper">
                <div className="uploadBox">
                    <div className="uploadVideoTitle">
                        <img src="https://cdn140.picsart.com/272733942032211.png?r1024x1024" alt="Metube logo" width="60" height="41" loading="lazy"/>
                        Upload Video
                    </div>
                    <div className="uploadForm">
                        <div className="mb-3 form-floating w-100 position-relative">
                            <input type="text" value={inputField.title} onChange={(e) => handleOnChangeInput(e, "title")} className="form-control gradient-input" placeholder="Enter Video Title" autoComplete="on" required/>
                            <label className="form-label">Video Title</label>
                            <GradientBorderSVG gradientId="signinEmailGradient" maskId="signinEmailBorderMask" />
                        </div>
                        <div className="mb-3 form-floating w-100 position-relative">
                            <input type="text" value={inputField.description} onChange={(e) => handleOnChangeInput(e, "description")} className="form-control gradient-input" placeholder="Enter Video Description" autoComplete="on" required/>
                            <label className="form-label"> Video Description</label>
                            <GradientBorderSVG gradientId="signinEmailGradient" maskId="signinEmailBorderMask" />
                        </div>
                        <div className="mb-3 form-floating w-100 position-relative">
                            <input type="text" value={inputField.videoType}onChange={(e) => handleOnChangeInput(e, "videoType")} className="form-control gradient-input" placeholder="Enter Video Category" autoComplete="on" required/>
                            <label className="form-label">Video Category</label>
                            <GradientBorderSVG gradientId="signinEmailGradient" maskId="signinEmailBorderMask" />
                        </div>
                        {loader && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px', width: '40px', height: '40px'}}>
                            <Loader/>
                        </Box>
                        )}
                        <div>Thumbnail <input type="file" onChange={(e) => uploadImage(e, "image")} accept='image/*'/></div>
                        <div>Video <input type="file" onChange={(e) => uploadImage(e, "video")} accept='video/mp4, video/webm, video/*'/></div>
                    </div>
                    <div className="uploadBtns">
                        <div className="uploadBtn-form animate-button fw-bold fs-6 form-floating w-100 position-relative" onClick={handleSubmitFunc}>Upload</div>
                        <Link to="/" className="uploadBtn-form animate-button fw-bold fs-6 form-floating w-100 position-relative">Home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default VideoUpload;
