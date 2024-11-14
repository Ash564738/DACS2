import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './shortPage.css';
import apiClient from '../../Utils/apiClient.js';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ShortItem from './shortItem';
const ShortPage = ({ sideNavbar }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState({});
    const [userPic, setUserPic] = useState("https://th.bing.com/th/id/OIP.x-zcK4XvIdKjt7s4wJTWAgAAAA?w=360&h=360&rs=1&pid=ImgDetMain");
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    useEffect(() => {
        if (userId) {
            fetchUserProfile(userId);
        }
    }, [userId]);
    const fetchUserProfile = async (userId) => {
        try {
            const response = await apiClient.get(`http://localhost:4000/auth/getUserById/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            });
            const { profilePic, name, userName, about } = response.data.user;
            setUser({ name, userName, about });
            setUserPic(profilePic);
        } catch (error) {
            toast.error("Failed to fetch user profile");
        }
    };
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/allVideo');
                setData(res.data?.videos || []);
            } catch (err) {
                console.error("Error fetching videos:", err);
                setError("Failed to load videos.");
            } finally {
                setLoading(false);
            }
        };
        fetchVideos();
    }, []);
    return (
        <div className={sideNavbar ? 'shortPage' : 'fullShortPage'}>
            <div className="short_mainPage">
                {loading ? (
                    <p>Loading videos...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : data.length > 0 ? (
                    data.map((item) => (
                        <ShortItem key={item._id} item={item} userPic={userPic} />
                    ))
                ) : (
                    <p>No videos available.</p>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};
export default ShortPage;