import React, { useState, useEffect } from 'react';
import './videoUpload.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
const VideoUpload = () => {
    const [inputField, setInputField] = useState({
        title: "",
        description: "",
        videoLink: "",
        thumbnail: "",
        videoType: ""
    });
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const handleOnChangeInput = (event, name) => {
        setInputField({
            ...inputField,
            [name]: event.target.value
        });
    };
    const uploadImage = async (e, type) => {
        setLoader(true);
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'youtube-clone');
        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`,
                data
            );
            const fileUrl = response.data.secure_url;
            setInputField({
                ...inputField,
                [type]: fileUrl
            });
        } catch (err) {
            console.error("Error uploading file:", err);
        } finally {
            setLoader(false);
        }
    };
    useEffect(()=>{
        let isLogin = localStorage.getItem("userId");
        if(isLogin===null){
            navigate('/')
        }
    },[])
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
            <div className="uploadBox">
                <div className="uploadVideoTitle">
                    <YouTubeIcon sx={{ fontSize: "54px", color: "red" }} />
                    Upload Video
                </div>
                <div className="uploadForm">
                    <input className="uploadFormInputs" type="text" placeholder="Enter video title" value={inputField.title} onChange={(e) => handleOnChangeInput(e, "title")}/>
                    <input className="uploadFormInputs"placeholder="Enter video description" value={inputField.description}onChange={(e) => handleOnChangeInput(e, "description")}/>
                    <input className="uploadFormInputs"type="text"placeholder="Enter video category"value={inputField.videoType}onChange={(e) => handleOnChangeInput(e, "videoType")}/>
                    {loader && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                            <CircularProgress />
                        </Box>
                    )}
                    <div>Thumbnail <input type="file" onChange={(e) => uploadImage(e, "thumbnail")} accept='image/*'/></div>
                    <div>Video <input type="file" onChange={(e) => uploadImage(e, "videoLink")} accept='video/mp4, video/webm, video/*'/></div>
                </div>
                <div className="uploadBtns">
                    <div className="uploadBtn-form" onClick={handleSubmitFunc}>Upload</div>
                    <Link to="/" className="uploadBtn-form">Home</Link>
                </div>
            </div>
        </div>
    );
};
export default VideoUpload;
