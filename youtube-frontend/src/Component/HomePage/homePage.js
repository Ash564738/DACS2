import React, { useEffect, useState } from 'react';
import './homePage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
const HomePage = ({ sideNavbar }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
  const options = ["All", "Music", "Live", "Mixes", "Gaming", "Debates", "Comedy", "Recently Uploaded", "Watched", "New to you"];
  return (
    <div className={sideNavbar ? 'homePage' : 'fullHomePage'}>
      <div className="homePage_options">
        {options.map((item, index) => (
          <div key={index} className="homePage_option">
            {item}
          </div>
        ))}
      </div>
      <div className={sideNavbar ? "home_mainPage" : "home_mainPageWithoutLink"}>
        {loading ? (
          <p>Loading videos...</p>
        ) : error ? (
          <p>{error}</p>
        ) : data.length > 0 ? (
          data.map((item) => (
            <VideoItem key={item._id} item={item} />
          ))
        ) : (
          <p>No videos available.</p>
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