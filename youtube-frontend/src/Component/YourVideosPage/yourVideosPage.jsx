import React, { useState, useEffect } from 'react';
import SideNavbar from '../../Component/SideNavbar/sideNavbar';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../../Utils/apiClient.js';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const YourVideosPage = ({ sideNavbar }) => {
    const [data, setData] = useState([]);
    const [user, setUser] = useState(null);
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const [showVideoFunction, setShowVideoFunction] = useState({});

    const navigate = useNavigate();

    const fetchProfileData = async () => {
        try {
        const [userResponse, videosResponse] = await Promise.all([
            apiClient.get(`http://localhost:4000/auth/getUserById/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true
            }),
            axios.get(`http://localhost:4000/auth/getVideosByUserId/${userId}`)
        ]);
        setUser(userResponse.data.user);
        setData(videosResponse.data.videos);
        } catch (error) {
        console.error("Error fetching profile data:", error);
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, []);

    const handleEvent = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleToggleVideoFunction = (videoId, event) => {
        handleEvent(event);
        setShowVideoFunction((prev) => ({
        ...prev,
        [videoId]: !prev[videoId]
        }));
    };

    const handleDeleteVideo = async (videoId, event) => {
        handleEvent(event);
        try {
        await apiClient.delete(`http://localhost:4000/api/deleteVideo/${videoId}`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });
        setData((prevData) => prevData.filter((video) => video._id !== videoId));
        toast.success("Video deleted successfully");
        } catch (err) {
        console.error("Error deleting video:", err);
        toast.error("Error deleting video");
        }
    };

    return (
        <div className='profile'>
        <ToastContainer />
        <SideNavbar sideNavbar={sideNavbar} />
        <div className={sideNavbar ? "profile_page" : "profile_page_inactive"}>
            <div className="profile_top_section">
            <div className="profile_top_section_profile">
                <img className='profile_top_section_img' src={user?.profilePic} alt="Profile" onError={(e) => { e.target.src = 'defaultProfilePic.jpg'; }} />
            </div>
            <div className="profile_top_section_About">
                <div className="profile_top_section_About_Name">{user?.name}</div>
                <div className="profile_top_section_info">
                @{user?.userName} . {data.length} videos . {user?.subscribers || 0} subscribers
                </div>
                <div className="profile_top_section_info">
                {user?.about || user?.name}
                </div>
            </div>
            </div>
            <div className="profile_videos">
            <div className="profile_videos_title">Videos &nbsp; <ArrowRightIcon /></div>
            <div className="profileVideos">
                {
                data.map((item, key) => (
                    <Link to={`/watch/${item._id}`} className="youtube_Video" key={item._id}>
                    <div className="youtube_thumbnailBox">
                        <img src={item.thumbnail} alt="thumbnail" className="youtube_thumbnailPic" onError={(e) => { e.target.src = 'defaultThumbnail.jpg'; }} />
                        <div className="youtube_timingThumbnail">{item.duration || "00:00"}</div>
                    </div>
                    <div className="youtubeTitleBox">
                        <div className="youtubeTitleBox_Title">
                        <div className="youtube_videoTitle text-truncate">{item.title}</div>
                        <div className="d-flex flex-row text-truncate gap-10">
                            <div className="youtubeVideo_views text-truncate">{item.views ? `${item.views} views` : "0 views"}</div>
                            <div className="youtubeVideo_views text-truncate">{item.createdAt.slice(0, 10)}</div>
                        </div>
                        <div className="youtubeVideo_views text-truncate">{item.description}</div>
                        </div>
                        <div className="commentFuntionSectionBox">
                        <div className="commentFuntionToggle" onClick={(e) => handleToggleVideoFunction(item._id, e)}>
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                        </div>
                        {showVideoFunction[item._id] && (
                            <div className='playlistFunction'>
                            <>
                                <div className="commentReply" onClick={(e) => { handleEvent(e); handleDeleteVideo(item._id, e); }}>
                                <i className="fa-solid fa-trash"></i>
                                Delete
                                </div>
                                <div className='commentReply' onClick={(e) => { handleEvent(e); navigate(`/${item._id}/edit`); }}>
                                <i className="fa-solid fa-pen-to-square"></i>
                                Edit
                                </div>
                            </>
                            </div>
                        )}
                        </div>
                    </div>
                    </Link>
                ))
                }
            </div>
            </div>
        </div>
        </div>
    );
}
export default YourVideosPage;