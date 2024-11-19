import React, { useEffect, useState } from 'react';
import './likedVideoPage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import apiClient from '../../Utils/apiClient.js';
import 'react-toastify/dist/ReactToastify.css';

const LikedVideoPage = ({ sideNavbar }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (userId) {
      fetchLikedVideos(userId);
    }
  }, [userId]);

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
    "All",
    "Music",
    "Animation",
    "Documentary",
    "Education",
    "Entertainment",
    "Playlists",
    "Mixes",
    "Gaming",
    "Food",
    "Comedy",
    "Recently Uploaded",
    "Watched",
    "New to you",
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredVideos = selectedCategory === "All" 
    ? data 
    : data.filter((video) => video.category === selectedCategory);

  const firstVideoThumbnail = data.length > 0 ? data[0].thumbnail : '';
  const lastUpdated = data.length > 0 ? new Date(data[0].updatedAt).toLocaleDateString() : '';
  const ownerName = data.length > 0 ? data[0].user?.name : '';

  return (
    <div className={sideNavbar ? 'likedVideoPage' : 'fullLikedVideoPage'}>
      <div className={sideNavbar ? "likedVideo_mainPage" : "likedVideo_mainPageWithoutLink"}>
        <div className="likedVideoCard">
          <div className="likedVideoCardOverlay" style={{ backgroundImage: `url(${firstVideoThumbnail})` }}></div>
          <div className= "likedVideoCardContent">
            <img className="likedVideoCardImg" src={firstVideoThumbnail} alt="First Video Thumbnail" />
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
                    <img src={video.thumbnail} alt={video.title} className="likedVideoThumbnail" />
                    <div className="likedVideoDetails">
                      <span className="likedVideoTitle">{video.title}</span>
                      <span className="likedVideoInfo">{video.user?.name} · {video.views} views · {new Date(video.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="likedVideoFunctions">
                    <i className="fa-solid fa-ellipsis-vertical"></i>
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