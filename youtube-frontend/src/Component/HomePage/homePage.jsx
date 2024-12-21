import React, { useEffect, useState } from 'react';
import './homePage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiClient from '../../Utils/apiClient.js';
const HomePage = ({ sideNavbar }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showVideoFunction, setShowVideoFunction] = useState({});
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/allVideo');
        if (res.data && res.data.videos) {
          setData(res.data.videos);
        } else {
          console.warn("No videos found in response.");
        }
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError("Failed to load videos.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    if (data.length === 0) return;
    const slider = document.querySelector('.homePage_options');
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

  const handleToggleVideoFunction = (videoId, event) => {
    event.stopPropagation();
    event.preventDefault();
    setShowVideoFunction((prev) => ({
      ...prev,
      [videoId]: !prev[videoId]
    }));
  };

  const handleDeleteVideo = async (itemId, videoId, event) => {
    event.stopPropagation();
    event.preventDefault();
    try {
      const response = await apiClient.delete(`http://localhost:4000/api/deleteVideo/${videoId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      console.log('Delete response:', response);
      setData((prevData) => prevData.filter((video) => video._id !== videoId));
    } catch (err) {
      console.error("Error deleting video:", err);
      console.error("Error response:", err.response);
    }
  };

  const handleFunctionItemClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    // Add your logic here
  };

  const filteredVideos = selectedCategory === "All"
    ? data
    : data.filter((video) => video.videoType === selectedCategory);

  return (
    <div className={sideNavbar ? 'homePage' : 'fullHomePage'}>
      <div className="homePage_options">
        {options.map((item, index) => (
          <div key={index} className={`homePage_option ${selectedCategory === item ? "active" : ""}`} onClick={() => handleCategoryClick(item)}>
            {item}
          </div>
        ))}
      </div>
      <div className={sideNavbar ? "home_mainPage" : "home_mainPageWithoutLink"}>
        {loading ? (
          <p>Loading videos...</p>
        ) : error ? (
          <p>{error}</p>
        ) : filteredVideos.length > 0 ? (
          filteredVideos.map((item) => (
            <VideoItem
              key={item._id}
              item={item}
              userId={userId}
              showVideoFunction={showVideoFunction}
              handleToggleVideoFunction={handleToggleVideoFunction}
              handleDeleteVideo={handleDeleteVideo}
              handleFunctionItemClick={handleFunctionItemClick}
            />
          ))
        ) : (
          <p>No videos available for this category.</p>
        )}
      </div>
    </div>
  );
};
const VideoItem = ({ item, userId, showVideoFunction, handleToggleVideoFunction, handleDeleteVideo, handleFunctionItemClick }) => {
  const navigate = useNavigate();
  const handleVideoClick = () => {
    navigate(`/watch/${item._id}`);
  };
  return (
    <div className="youtube_Video" onClick={handleVideoClick}>
      <div className="youtube_thumbnailBox">
        <img
          src={item.thumbnail || "default_thumbnail.jpg"}
          alt={`${item.title} thumbnail`}
          className="youtube_thumbnailPic"
        />
        <div className="youtube_timingThumbnail">
          {item.duration || "00:00"}
        </div>
      </div>
      <div className="youtubeTitleBox">
        <div className="youtubeTitleBoxProfile">
          <img
            src={item.user?.profilePic || "default_profile.jpg"}
            alt={`${item.user?.name || "Unknown"} profile`}
            className="youtube_thumbnail_Profile"
          />
        </div>
        <div className="youtubeTitleBox_Title">
          <div className="youtube_videoTitle">{item.title || "Untitled Video"}</div>
          <div className="youtube_channelName">{item.user?.name || "Unknown Channel"}</div>
          <div className="youtubeVideo_views">{item.views ? `${item.views} views` : "0 views"}</div>
        </div>
        <div className="commentFuntionSectionBox">
          <div className="commentFuntionToggle" onClick={(e) => { e.stopPropagation(); handleToggleVideoFunction(item._id, e); }}>
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </div>
          {showVideoFunction[item._id] && (
            <div className='videoFunction'>
              {item.user._id === userId ? (
                <>
                  <div className="commentReply" onClick={(e) => { e.stopPropagation(); handleDeleteVideo(item._id, item._id, e); }}>
                    <i className="fa-solid fa-trash"></i>
                    Delete
                  </div>
                  <div className='commentReply' onClick={(e) => { e.stopPropagation(); navigate(`/${item._id}/edit`); }}>
                    <i className="fa-solid fa-pen-to-square"></i>
                    Edit
                  </div>
                </>
              ) : (
                <>
                  <div className="videoFunctionItem" onClick={(e) => { e.stopPropagation(); handleFunctionItemClick(e); }}>
                    <i className="fa-solid fa-plus"></i>
                    Add to queue
                  </div>
                  <div className="videoFunctionItem" onClick={(e) => { e.stopPropagation(); handleFunctionItemClick(e); }}>
                    <i className="fa-solid fa-clock"></i>
                    Save to Watch later
                  </div>
                  <div className="videoFunctionItem" onClick={(e) => { e.stopPropagation(); handleFunctionItemClick(e); }}>
                    <i className="fa-solid fa-list"></i>
                    Save to playlist
                  </div>
                  <div className="videoFunctionItem" onClick={(e) => { e.stopPropagation(); handleFunctionItemClick(e); }}>
                    <i className="fa-solid fa-download"></i>
                    Download
                  </div>
                  <div className="videoFunctionItem" onClick={(e) => { e.stopPropagation(); handleFunctionItemClick(e); }}>
                    <i className="fa-solid fa-share"></i>
                    Share
                  </div>
                  <hr className="header-modal-separator" />
                  <div className="videoFunctionItem" onClick={(e) => { e.stopPropagation(); handleFunctionItemClick(e); }}>
                    <i className="fa-solid fa-ban"></i>
                    Not interested
                  </div>
                  <div className="videoFunctionItem" onClick={(e) => { e.stopPropagation(); handleFunctionItemClick(e); }}>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width="1.0em" height="1.0em" x="0" y="0" viewBox="0 0 512 512" style={{ enableBackground: "new 0 0 512 512" }} xmlSpace="preserve" className="">
                      <g>
                        <path d="M256 512c140.61 0 256-115.39 256-256S396.61 0 256 0 0 115.39 0 256s115.39 256 256 256zM76 211h360v90H76v-90z" fill="#ffffff" opacity="1" data-original="#ffffff" className=""></path>
                      </g>
                    </svg>
                    Don't recommend channel
                  </div>
                  <div className="videoFunctionItem" onClick={(e) => { e.stopPropagation(); handleFunctionItemClick(e); }}>
                    <i className="fa-solid fa-flag"></i>
                    Report
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;