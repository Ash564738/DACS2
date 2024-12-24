import React, { useEffect, useState } from 'react';
import './likedVideoPage.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import apiClient from '../../Utils/apiClient.js';
import 'react-toastify/dist/ReactToastify.css';

const LikedVideoPage = ({ sideNavbar }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showVideoFunction, setShowVideoFunction] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [watchLaterPlaylistId, setWatchLaterPlaylistId] = useState(null);

  const toggleVideoFunction = (videoId, event) => {
    event.stopPropagation();
    event.preventDefault();
    setShowVideoFunction((prev) => ({
      ...prev,
      [videoId]: !prev[videoId]
    }));
  };

  useEffect(() => {
    const fetchLikedVideos = async (userId) => {
      try {
        const response = await apiClient.get(`http://localhost:4000/api/getLikedVideos/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        if (response.data && response.data.likedVideos) {
          setData(response.data.likedVideos);
        } else {
          console.warn("No liked videos found in response.");
        }
      } catch (err) {
        console.error("Error fetching liked videos:", err);
        setError("Failed to load liked videos.");
      } finally {
        setLoading(false);
      }
    };

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
      fetchLikedVideos(userId);
      fetchWatchLaterPlaylistId();
    }
  }, [userId, token]);

  useEffect(() => {
    if (data.length === 0) return;
    const slider = document.querySelector('.likedVideoPage_options');
    if (!slider) {
        console.warn("Slider not found.");
        return;
    }
    let isDown = false;
    let startX;
    let scrollLeft;
    const handleMouseDown = (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    };
    const handleMouseLeave = () => {
        isDown = false;
        slider.classList.remove('active');
    };
    const handleMouseUp = () => {
        isDown = false;
        slider.classList.remove('active');
    };
    const handleMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    };
    slider.addEventListener('mousedown', handleMouseDown);
    slider.addEventListener('mouseleave', handleMouseLeave);
    slider.addEventListener('mouseup', handleMouseUp);
    slider.addEventListener('mousemove', handleMouseMove);
    return () => {
        slider.removeEventListener('mousedown', handleMouseDown);
        slider.removeEventListener('mouseleave', handleMouseLeave);
        slider.removeEventListener('mouseup', handleMouseUp);
        slider.removeEventListener('mousemove', handleMouseMove);
    };
  }, [data]);

  const options = [
    'All',
    'Music',
    'Animal',
    'Animation',
    'Documentary',
    'Education',
    'Entertainment',
    'Playlists',
    'Mixes',
    'Gaming',
    'Food',
    'Comedy',
    'Recently Uploaded',
    'Watched',
    'New to you',
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredVideos = selectedCategory === "All" 
    ? data 
    : data.filter((video) => video.category === selectedCategory);

  const firstVideoThumbnail = data.length > 0 && data[0]?.thumbnail ? data[0].thumbnail : null;
  const lastUpdated = data.length > 0 ? new Date(data[0].updatedAt).toLocaleDateString() : '';
  const ownerName = data.length > 0 ? data[0].user?.name : '';

  const handleLikeDislike = async (videoId, action) => {
    try {
      await apiClient.put(`http://localhost:4000/api/video/toggleLikeDislike/${videoId}?action=${action}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      });
      if (action === "like") {
        setData(prevData => prevData.filter(video => video._id !== videoId));
      }
      toast.success(`Video ${action === "like" ? "removed from" : "added to"} liked videos`);
    } catch (error) {
      toast.error("Please login first to like/dislike");
      console.error("Error in like/dislike video:", error);
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

  const handleFunctionItemClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDeleteVideo = async (videoId, e) => {
    e.stopPropagation();
    try {
      await apiClient.delete(`http://localhost:4000/api/deleteVideo/${videoId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      });
      setData(prevData => prevData.filter(video => video._id !== videoId));
      toast.success("Video deleted successfully");
    } catch (error) {
      toast.error("Error deleting video");
      console.error("Error deleting video:", error);
    }
  };

  return (
    <div className={sideNavbar ? 'likedVideoPage' : 'fullLikedVideoPage'}>
      <ToastContainer />
      <div className={sideNavbar ? "likedVideo_mainPage" : "likedVideo_mainPageWithoutLink"}>
        <div className="likedVideoCard">
          <div className="likedVideoCardOverlay" style={{ backgroundImage: `url(${firstVideoThumbnail})` }}></div>
          <div className= "likedVideoCardContent">
            <img className="likedVideoCardImg" src={firstVideoThumbnail || null} alt="First Video Thumbnail" />
            <div className="likedVideoCardInfo">
              <h3 className="likedVideoCardTitle">Liked videos</h3>
              <span className="likedVideoCardOwner">{ownerName}</span>
              <span className="likedVideoCardStats">{data.length} videos · No views · Updated {lastUpdated}</span>
            </div>
          </div>
          <div className="likedVideoCardControl">
              <div className="likedVideoCardControlButton">
                <i className="fa fa-play"></i>
                <span>Play all</span>
              </div>
              <div className="likedVideoCardControlButton">
                <i className="fa fa-random"></i>
                <span>Shuffle</span>
              </div>
            </div>
        </div>
        <div className="likedVideoWrapper">
          <div className="likedVideoPage_options">
            {options.map((item, index) => (
              <div key={index} className={`likedVideoPage_option ${selectedCategory === item ? "active" : ""}`} onClick={() => handleCategoryClick(item)}>
                {item}
              </div>
            ))}
          </div>
          <div className="likedVideoList">
            {loading ? (
              <p className="loadingMessage">Loading liked videos...</p>
            ) : error ? (
              <p className="errorMessage">{error}</p>
            ) : filteredVideos.length > 0 ? (
              filteredVideos.map((video, index) => (
                <Link to={`/watch/${video._id}`} className="likedVideo" key={video._id}>
                  <div className="likedVideoIndex">
                    <span>{index + 1}</span>
                  </div>
                  <div className="likedVideoContent">
                    <img src={video?.thumbnail || null} alt={video?.title || 'Video Thumbnail'} className="likedVideoThumbnail" />
                    <div className="likedVideoDetails">
                      <span className="likedVideoTitle">{video?.title}</span>
                      <span className="likedVideoInfo">{video?.user?.name} · {video?.views} views · {new Date(video?.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="likedVideoFuntionSectionBox">
                    <div className="likedVideoFunctionsToggle" onClick={(e) => {e.stopPropagation(); toggleVideoFunction(video._id, e);}}>
                      <i className="fa-solid fa-ellipsis-vertical"></i>
                    </div>
                    {showVideoFunction[video._id] && (
                      <div className="videoFunction">
                        {video.user._id === userId ? (
                          <>
                            <div className="commentReply" onClick={(e) => { handleFunctionItemClick(e); handleDeleteVideo(video._id, e); }}>
                              <i className="fa-solid fa-trash"></i>
                              Delete
                            </div>
                            <div className='commentReply' onClick={(e) => { handleFunctionItemClick(e); navigate(`/${video._id}/edit`); }}>
                              <i className="fa-solid fa-pen-to-square"></i>
                              Edit
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="videoFunctionItem" onClick={handleFunctionItemClick}>
                              <i className="fa-solid fa-plus"></i>
                              Add to queue
                            </div>
                            <div className="videoFunctionItem" onClick={(e) => { handleFunctionItemClick(e); handleAddToWatchLater(video._id); }}>
                              <i className="fa-solid fa-clock"></i>
                              Save to Watch later
                            </div>
                            <div className="videoFunctionItem" onClick={handleFunctionItemClick}>
                              <i className="fa-solid fa-list"></i>
                              Save to playlist
                            </div>
                            <div className="videoFunctionItem" onClick={handleFunctionItemClick}>
                              <i className="fa-solid fa-share"></i>
                              Share
                            </div>
                            <hr className="header-modal-separator" />
                            <div className="videoFunctionItem" onClick={(e) => { handleFunctionItemClick(e); handleLikeDislike(video._id, "like"); }}>
                              <i className="fa-solid fa-trash"></i>
                              Remove from liked videos
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              ))
            ) : (
              <p className="noVideosMessage">No liked videos available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikedVideoPage;