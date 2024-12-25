import React, { useState, useEffect } from 'react';
import SideNavbar from '../../Component/SideNavbar/sideNavbar';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link, useParams } from 'react-router-dom';
import apiClient from '../../Utils/apiClient.js';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const YourVideosPage = ({ sideNavbar }) => {
    const [data, setData] = useState([]);
    const [user, setUser] = useState(null);
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const [showVideoFunction, setShowVideoFunction] = useState({});
    const [watchLaterPlaylistId, setWatchLaterPlaylistId] = useState(null);

    const navigate = useNavigate();

    const fetchProfileData = async () => {
        try {
            const userResponse = await apiClient.get(`http://localhost:4000/auth/getUserById/${userId}`, {},{
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            });
            const videosResponse = await axios.get(`http://localhost:4000/auth/getVideosByUserId/${userId}`);
            setUser(userResponse.data.user);
            setData(videosResponse.data.videos);
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    };
    useEffect(() => {
        fetchProfileData();
    }, [userId]);
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
      const response = await apiClient.delete(`http://localhost:4000/api/deleteVideo/${videoId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setData((prevData) => prevData.filter((video) => video._id !== videoId));
    } catch (err) {
      console.error("Error deleting video:", err);
      console.error("Error response:", err.response);
    }
    };
    const handleAddToWatchLater = async (videoId) => {
        try {
        if (!watchLaterPlaylistId) {
            toast.error("Watch Later playlist not found");
            return;
        }
        await apiClient.post(`http://localhost:4000/playlist/addVideoToPlaylist/${watchLaterPlaylistId}`, { videoId }, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });
        toast.success("Video added to Watch Later");
        } catch (error) {
        toast.error("Error adding video to Watch Later");
        console.error("Error adding video to Watch Later:", error);
        }
    };
    useEffect(() => {
    const fetchWatchLaterPlaylistId = async () => {
        try {
        const response = await apiClient.get(`http://localhost:4000/playlist/getPlaylistByTitle/Watch Later`, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
        });
        if (response.data && response.data.playlist) {
            setWatchLaterPlaylistId(response.data.playlist._id);
        } else {
            console.warn("Watch Later playlist not found.");
        }
        } catch (err) {
        console.error("Error fetching Watch Later playlist ID:", err);
        }
    };

    if (userId) {
        fetchWatchLaterPlaylistId();
    }
    }, [userId, token]);

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
                                    <div className = "youtubeTitleBox">
                                        <div className="youtubeTitleBox_Title">
                                            <div className="youtube_videoTitle text-truncate">{item.title}</div>
                                            <div className = "d-flex flex-row text-truncate gap-10">
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
                                                {item.user._id === userId ? (
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
                                                ) : (
                                                    <>
                                                    <div className="videoFunctionItem" onClick={handleEvent}>
                                                        <i className="fa-solid fa-plus"></i>
                                                        Add to queue
                                                    </div>
                                                    <div className="videoFunctionItem" onClick={(e) => { handleEvent(e); handleAddToWatchLater(item._id); }}>
                                                        <i className="fa-solid fa-clock"></i>
                                                        Save to Watch later
                                                    </div>
                                                    <div className="videoFunctionItem" onClick={handleEvent}>
                                                        <i className="fa-solid fa-list"></i>
                                                        Save to playlist
                                                    </div>
                                                    <div className="videoFunctionItem" onClick={handleEvent}>
                                                        <i className="fa-solid fa-download"></i>
                                                        Download
                                                    </div>
                                                    <div className="videoFunctionItem" onClick={handleEvent}>
                                                        <i className="fa-solid fa-share"></i>
                                                        Share
                                                    </div>
                                                    </>
                                                )}
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