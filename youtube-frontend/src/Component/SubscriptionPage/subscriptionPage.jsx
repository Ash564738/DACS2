import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./subscriptionPage.css";
import apiClient from "../../Utils/apiClient.js";
const SubscriptionPage = ({ sideNavbar }) => {
  const [data, setData] = useState([]);
  const [subscribedUsers, setSubscribedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const res = await apiClient.get("http://localhost:4000/auth/getSubscriptions", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (res.data) {
          setData(res.data.videos || []);
          setSubscribedUsers(res.data.subscribedUsers || []);
        } else {
          console.warn("No data found in response.");
        }
      } catch (err) {
        console.error("Error fetching subscriptions:", err);
        setError("Failed to load subscriptions.");
      } finally {
        setLoading(false);
      }
    };
    fetchSubscriptions();
  }, []);
  useEffect(() => {
    const addDragEffect = (selector) => {
      const slider = document.querySelector(selector);
      if (!slider) return;
      let isDown = false;
      let startX;
      let scrollLeft;
      const handleMouseDown = (e) => {
        isDown = true;
        slider.classList.add("active");
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
      };
      const handleMouseLeave = () => {
        isDown = false;
        slider.classList.remove("active");
      };
      const handleMouseUp = () => {
        isDown = false;
        slider.classList.remove("active");
      };
      const handleMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
      };
      slider.addEventListener("mousedown", handleMouseDown);
      slider.addEventListener("mouseleave", handleMouseLeave);
      slider.addEventListener("mouseup", handleMouseUp);
      slider.addEventListener("mousemove", handleMouseMove);
      return () => {
        slider.removeEventListener("mousedown", handleMouseDown);
        slider.removeEventListener("mouseleave", handleMouseLeave);
        slider.removeEventListener("mouseup", handleMouseUp);
        slider.removeEventListener("mousemove", handleMouseMove);
      };
    };
    const removeDragEffectFromSubscriptionRow = addDragEffect(".subscriptionRow");
    const removeDragEffectFromOptions = addDragEffect(".subscriptionPage_options");
    return () => {
      removeDragEffectFromSubscriptionRow?.();
      removeDragEffectFromOptions?.();
    };
  }, []);
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
    setSelectedUser(null);
  };
  const handleUserClick = (userId) => {
    setSelectedUser(userId);
    setSelectedCategory("All");
  };
  const filteredVideos = data.filter((video) => {
    if (selectedUser) return video.user?._id === selectedUser;
    if (selectedCategory !== "All") return video.videoType === selectedCategory;
    return true;
  });
  return (
    <div className={sideNavbar ? "homePage" : "fullHomePage"}>
      <div className="subscriptionRow">
        {subscribedUsers.map((user) => (
          <div
            key={user._id}
            className={`subscribedUser ${selectedUser === user._id ? "active" : ""}`}
            onClick={() => handleUserClick(user._id)}
          >
            <img src={user.profilePic || "default_profile.jpg"} alt={`${user.name} profile`} className="subscribedUserPic" />
            <span className="subscribedUserName">{user.name}</span>
          </div>
        ))}
      </div>
      <div className="subscriptionPage_options">
        {options.map((item, index) => (
          <div
            key={index}
            className={`subscriptionPage_option ${selectedCategory === item ? "active" : ""}`}
            onClick={() => handleCategoryClick(item)}
          >
            {item}
          </div>
        ))}
      </div>
      <div className={sideNavbar ? "subscription_mainPage" : "subscription_mainPageWithoutLink"}>
        {loading ? (
          <p>Loading videos...</p>
        ) : error ? (
          <p>{error}</p>
        ) : filteredVideos.length > 0 ? (
          filteredVideos.map((item) => <VideoItem key={item._id} item={item} />)
        ) : (
          <p>No videos available for this filter.</p>
        )}
      </div>
    </div>
  );
};
const VideoItem = ({ item }) => (
  <Link to={`/watch/${item._id}`} className="youtube_Video">
    <div className="youtube_thumbnailBox">
      <img src={item.thumbnail || "default_thumbnail.jpg"} alt={`${item.title} thumbnail`} className="youtube_thumbnailPic" />
      <div className="youtube_timingThumbnail">{item.duration || "00:00"}</div>
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
export default SubscriptionPage;