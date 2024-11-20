import React, { useEffect, useState } from 'react';
import './homePage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = ({ sideNavbar }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

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
    : data.filter((video) => video.videoType === selectedCategory);

  return (
    <div className={sideNavbar ? 'homePage' : 'fullHomePage'}>
      <div className="homePage_options">
        {options.map((item, index) => (
          <div 
            key={index} 
            className={`homePage_option ${selectedCategory === item ? "active" : ""}`} 
            onClick={() => handleCategoryClick(item)}
          >
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
            <VideoItem key={item._id} item={item} />
          ))
        ) : (
          <p>No videos available for this category.</p>
        )}
      </div>
    </div>
  );
};

const VideoItem = ({ item }) => (
  <Link to={`/watch/${item._id}`} className="youtube_Video">
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
    </div>
  </Link>
);

export default HomePage;