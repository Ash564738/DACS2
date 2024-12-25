import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./subscriptionPage.css";
import apiClient from "../../Utils/apiClient.js";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SubscriptionPage = ({ sideNavbar }) => {
  const [data, setData] = useState([]);
  const [subscribedUsers, setSubscribedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showVideoFunction, setShowVideoFunction] = useState({});
  const [watchLaterPlaylistId, setWatchLaterPlaylistId] = useState(null);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem("userId");

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
      fetchSubscriptions();
      fetchWatchLaterPlaylistId();
    }
  }, [userId, token]);

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
    setSelectedUser(null);
  };

  const handleUserClick = (userId) => {
    setSelectedUser(userId);
    setSelectedCategory("All");
  };

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

  const handleDeleteVideo = async (itemId, videoId, event) => {
    handleEvent(event);
    try {
      await apiClient.delete(`http://localhost:4000/api/deleteVideo/${videoId}`, {
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

  const filteredVideos = data.filter((video) => {
    if (selectedUser) return video.user?._id === selectedUser;
    if (selectedCategory !== "All") return video.videoType === selectedCategory;
    return true;
  });

  return (
    <div className={sideNavbar ? "homePage" : "fullHomePage"}>
      <ToastContainer />
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
          filteredVideos.map((item) => 
            <VideoItem 
              key={item._id}
              item={item}
              userId={userId}
              token={token}
              showVideoFunction={showVideoFunction}
              handleToggleVideoFunction={handleToggleVideoFunction}
              handleDeleteVideo={handleDeleteVideo}
              handleEvent={handleEvent}
              handleAddToWatchLater ={handleAddToWatchLater}
            />
          )
        ) : (
          <p>No videos available for this filter.</p>
        )}
      </div>
    </div>
  );
};

const VideoItem = ({ item, userId, token, showVideoFunction, handleToggleVideoFunction, handleDeleteVideo, handleEvent, handleAddToWatchLater }) => {
  const navigate = useNavigate();

  const handleVideoClick = async () => {
    console.log("Navigating to video:", item._id);
    navigate(`/watch/${item._id}`);
    try {
      console.log("Adding video to history:", {
        videoId: item._id,
        title: item.title,
        thumbnail: item.thumbnail,
        views: item.views,
        user: item.user,
        duration: item.duration,
      });
      const response = await apiClient.post('http://localhost:4000/history/addHistory', {
        videoId: item._id,
        title: item.title,
        thumbnail: item.thumbnail,
        views: item.views,
        user: { _id: item.user._id },
        duration: item.duration,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      console.log("Video added to history successfully:", response.data);
    } catch (err) {
      console.error("Error adding to history:", err);
    }
  };

  return (
    <div className="youtube_Video" onClick={handleVideoClick}>
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
        <div className="commentFuntionSectionBox">
          <div className="commentFuntionToggle" onClick={(e) => handleToggleVideoFunction(item._id, e)}>
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </div>
          {showVideoFunction[item._id] && (
            <div className='videoFunction'>
              {item.user._id === userId ? (
                <>
                  <div className="commentReply" onClick={(e) => { handleEvent(e); handleDeleteVideo(item._id, item._id, e); }}>
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
                  <hr className="header-modal-separator" />
                  <div className="videoFunctionItem" onClick={handleEvent}>
                    <i className="fa-solid fa-ban"></i>
                    Hide
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

export default SubscriptionPage;