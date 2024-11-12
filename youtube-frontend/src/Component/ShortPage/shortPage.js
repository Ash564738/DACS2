import React, { useEffect, useState, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import './shortPage.css';
import apiClient from '../../Utils/apiClient.js';
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
  const [showComments, setShowComments] = useState(false);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const handleComment = async () => {
    const body = { message, video: item._id, user: item.user._id };
    try {
      const resp = await apiClient.post('http://localhost:4000/commentApi/comment', body, { 
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      });
      const newComment = resp.data.comment;
      setComments([newComment, ...comments]);
      setMessage("");
    } catch (err) {
      console.error("Error adding comment:", err.response?.data || err.message);
      alert("Failed to add comment.");
    }
  };
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
    setShowComments(prev => !prev);
  };
  return (
    <div className="shortVideoBlock">
      <div className="shortcontentBox">
        <video src={item.videoLink} controls className="shortcontentVideo" />
        <div className="shortTitleBox">
          <Link to={`/user/${item?.user?._id}`} className="shortTitleBoxProfile">
            <img src={item.user?.profilePic || "default_profile.jpg"} alt={`${item.user?.name || "Unknown"} profile`} className="shortTitleBoxProfilePic"/>
          </Link>
          <div className="shortTitleBoxTitle">
            <Link to={`/user/${item?.user?._id}`} className="shortUserName">{item.user?.name || "Unknown Channel"}</Link>
            <div className="shortVideoTitle">{item.title || "Untitled Video"}</div>
            <p className="shortVideoDescription">{item.description || "Untitled Description"}</p>
          </div>
        </div>
      </div>
      <div className="shortSideBar">
        <div className="shortLikeBox">
          <i className="fas fa-thumbs-up"></i>
        </div>
        <span>{item.like.length}</span>
        <div className="shortDislikeBox">
          <i className="fas fa-thumbs-down"></i>
        </div>
        <span>{item.dislike.length}</span>
        <div className="shortCommentBox" onClick={toggleComments}>
          <i className="fas fa-comment"></i>
        </div>
        <span>{loadingComments ? 'Loading comments...' : comments.length}</span>
        <div className="shortShareBox">
          <i className="fas fa-share"></i>
        </div>
        <Link to={`/user/${item?.user?._id}`} className="shortProfileBox">
          <img src={item.user?.profilePic || "default_profile.jpg"} alt={`${item.user?.name || "Unknown"} profile`} />
        </Link>
      </div>
      {showComments && (
        <div className="commentBox">
          <h4>Comments ({comments.length})</h4>
          {loadingComments ? (
            <p>Loading...</p>
          ) : comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="comment">
                <Link to={`/user/${comment?.user?._id}`}>
                  <img src={comment.user.profilePic || "default_profile.jpg"} alt={`${comment.user.name} profile`} className="commentProfilePic"/>
                </Link>
                <div className="commentMessage">
                  <span>{comment.user.name}</span>
                  <p>{comment.message}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
          <div className="youtubeSelfComment">
            <Link to={`/user/${item?.user?._id}`}>
              <img className='video_youtubeSelfCommentProfile' src={item.user?.profilePic || "default_profile.jpg"} alt="User Profile" />
            </Link>
            <div className="addAComment">
              <input type="text" className="addAcommentInput" placeholder="Add a comment..." value={message} onChange={(e) => setMessage(e.target.value)} />
              <div className="cancelSubmitComment">
                <div className="cancelComment" onClick={() => setMessage("")}>Cancel</div>
                <div className="cancelComment" onClick={handleComment}>Comment</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ShortPage;