import React, { useEffect, useState, useCallback } from 'react';
import './shortPage.css';
import axios from 'axios';
const ShortPage = ({ sideNavbar }) => {
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
  return (
    <div className={sideNavbar ? 'shortPage' : 'fullShortPage'}>
      <div className="short_mainPage">
        {loading ? (
          <p>Loading videos...</p>
        ) : error ? (
          <p>{error}</p>
        ) : data.length > 0 ? (
          data.map((item) => (
            <ShortItem key={item._id} item={item} />
          ))
        ) : (
          <p>No videos available.</p>
        )}
      </div>
    </div>
  );
};
const ShortItem = ({ item }) => {
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [showComments, setShowComments] = useState(false); // State to toggle comment visibility

  const fetchComments = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:4000/commentApi/getCommentByVideoId/${item._id}`);
      setComments(response.data.comments || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoadingComments(false);
    }
  }, [item._id]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const toggleComments = () => {
    setShowComments(prev => !prev); // Toggle the visibility of the comment box
  };
  return (
    <div className="shortVideoBlock">
      <div className="shortcontentBox">
        <video src={item.videoLink} controls className="shortcontentVideo" />
        <div className="shortTitleBox">
          <div className="shortTitleBoxProfile">
            <img
              src={item.user?.profilePic || "default_profile.jpg"}
              alt={`${item.user?.name || "Unknown"} profile`}
              className="shortTitleBoxProfilePic"
            />
          </div>
          <div className="shortTitleBoxTitle">
            <div className="shortUserName">{item.user?.name || "Unknown Channel"}</div>
            <div className="shortVideoTitle">{item.title || "Untitled Video"}</div>
            <div className="shortVideoDescription">{item.description || "Untitled Description"}</div>
          </div>
        </div>
      </div>
      <div className="shortsidebar">
        <div className="shortLikeBox">
          <i className="fas fa-thumbs-up"></i>
        </div>
        <span>{item.like.length}</span>
        <div className="shortDislikeBox">
          <i className="fas fa-thumbs-down"></i>
        </div>
        <span>{item.dislike.length}</span>
        <div className="shortViewsBox">
          <i className="fas fa-eye"></i>
        </div>
        <span>{item.views}</span>
        <div
          className="shortCommentBox"
          onClick={toggleComments}
        >
          <i className="fas fa-comment"></i>
        </div>
        <span>{loadingComments ? 'Loading comments...' : comments.length}</span>
      </div>
      {showComments && (
          <div className="commentsBox">
            <h3>Comments</h3>
            {loadingComments ? (
              <p>Loading...</p>
            ) : comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="comment">
                  <p><strong>{comment.user.name}:</strong> {comment.message}</p>
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
        )}
    </div>
  );
};
export default ShortPage;