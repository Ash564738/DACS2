import React, { useEffect, useState, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import './shortPage.css';
import apiClient from '../../Utils/apiClient.js';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
const ShortPage = ({ sideNavbar }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [user, setUser] = useState({});
    const [hasIncremented, setHasIncremented] = useState(false);
    const [userPic, setUserPic] = useState("https://th.bing.com/th/id/OIP.x-zcK4XvIdKjt7s4wJTWAgAAAA?w=360&h=360&rs=1&pid=ImgDetMain");
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    useEffect(() => {
        if (userId) {
            fetchUserProfile(userId);
        }
    }, []);
    const fetchUserProfile = async (userId) => {
        try {
            const response = await apiClient.get(`http://localhost:4000/auth/getUserById/${userId}`, {},{
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            });
            const { profilePic, name, userName, about } = response.data.user;
            setUser({ name, userName, about });
            setUserPic(profilePic);
        } catch (error) {
            toast.error("Failed to fetch user profile");
        }
    };
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/allVideo');
                setData(res.data?.videos || []);
                if (userId) {
                    const subscriptionResponse = await apiClient.get(`http://localhost:4000/auth/getSubscriptions`, {
                        headers: { Authorization: `Bearer ${token}` },
                        withCredentials: true
                    });
                    const subscribedIds = subscriptionResponse.data.subscriptions.map(sub => sub._id);
                    if (res.user && res.user._id) {
                        setIsSubscribed(subscribedIds.includes(res.user._id));
                    }
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
    const handleViewIncrement = async (itemId) => {
        if (!hasIncremented && itemId) {
            try {
                await axios.put(`http://localhost:4000/api/incrementViews/${itemId}`);
                setHasIncremented(true);
            } catch (error) {
                toast.error("Failed to increment views");
            }
        }
    };    
    useEffect(() => {
        if (data && !hasIncremented) {
            handleViewIncrement();
            setHasIncremented(true);
        }
    }, [data, hasIncremented, handleViewIncrement]);
    return (
        <div className={sideNavbar ? 'shortPage' : 'fullShortPage'}>
            <div className="short_mainPage">
                {loading ? (<p>Loading videos...</p>) : error ? (<p>{error}</p>) : data.length > 0 ? 
                (data.map((item) =><ShortItem key={item._id} item={item} isSubscribed={isSubscribed} setIsSubscribed={setIsSubscribed} handleViewIncrement={handleViewIncrement}
                />))
                : (<p>No videos available.</p>)}
            </div>
        </div>
    );
};
const ShortItem = ({ item, isSubscribed, setIsSubscribed, handleViewIncrement }) => {
    const [comments, setComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(true);
    const [showComments, setShowComments] = useState(false);
    const [message, setMessage] = useState("");
    const [like, setLike] = useState(0);
    const [dislike, setDislike] = useState(0);
    const [userLiked, setUserLiked] = useState(false);
    const [userDisliked, setUserDisliked] = useState(false);
    const [hasIncremented, setHasIncremented] = useState(false);
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    useEffect(() => {
        const fetchLikeDislikeData = async () => {
            try {
                const response = await apiClient.get(`http://localhost:4000/api/getVideoById/${item._id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                });
                const videoData = response.data;
                const likes = videoData.like || [];
                const dislikes = videoData.dislike || [];
                setLike(likes.length);
                setDislike(dislikes.length);
                if (userId) {
                    setUserLiked(likes.includes(userId));
                    setUserDisliked(dislikes.includes(userId));
                }
            } catch (error) {
                console.error("Error fetching like/dislike data:", error);
            }
        };
        fetchLikeDislikeData();
    }, [item._id, userId, token]);
    const handleLikeDislike = async (action) => {
        try {
            const response = await apiClient.put(`http://localhost:4000/api/video/toggleLikeDislike/${item._id}?action=${action}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });
            setLike(response.data.like);
            setDislike(response.data.dislike);
            if (action === "like") {
                setUserLiked(!userLiked);
                if (userDisliked) setUserDisliked(false);
            } else if (action === "dislike") {
                setUserDisliked(!userDisliked);
                if (userLiked) setUserLiked(false);
            }
        } catch (error) {
            toast.error("Please login first to like/dislike");
        }
    };
    const fetchComments = useCallback(async () => {
        console.log("Fetching comments for video:", item._id);
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
    const handleComment = async () => {
        const body = { message, video: item._id, user: item.user._id };
        try {
            const resp = await apiClient.post('http://localhost:4000/commentApi/comment', body, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });
            setComments([resp.data.comment, ...comments]);
            setMessage("");
        } catch (err) {
            toast.error("Failed to add comment.");
        }
    };
    useEffect(() => {
        if (item && !hasIncremented) {
            handleViewIncrement(item._id); 
            setHasIncremented(true);
        }
    }, [item, hasIncremented]);
    const handleSubscribe = async () => {
        try {
            const response = await apiClient.post(`http://localhost:4000/auth/toggleSubscription/${item.user._id}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            });
            setIsSubscribed(response.data.isSubscribed);
        } catch (error) {
            toast.error("Please login first to subscribe");
        }
    };
    const toggleComments = () => setShowComments((prev) => !prev);
    return (
        <div className="shortVideoBlock">
            <div className="shortcontentBox">
                <video src={item.videoLink} controls className="shortcontentVideo" />
                <div className="shortTitleBox">
                    <Link to={`/user/${item?.user?._id}`} className="shortTitleBoxProfile">
                        <img src={item.user?.profilePic || "default_profile.jpg"} alt={`${item.user?.name || "Unknown"} profile`} className="shortTitleBoxProfilePic"/>
                    </Link>
                    <div className="shortTitleBoxTitle">
                        <div>
                            <Link to={`/user/${item?.user?._id}`} className="shortUserName">{item.user?.name || "Unknown Channel"}</Link>
                            {item?.user?._id !== userId && (
                                <div className="subscribeBtnYoutube" onClick={handleSubscribe}>
                                    {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
                                </div>
                            )}
                        </div>
                        <div className="shortVideoTitle">{item.title || "Untitled Video"}</div>
                        <p className="shortVideoDescription">{item.description || "No description available"}</p>
                    </div>
                </div>
            </div>
            <div className="shortSideBar">
                <div className="shortLikeBox" onClick={() => handleLikeDislike("like")}>
                    <i className={userLiked ? "fa-solid fa-thumbs-up" : "fa-regular fa-thumbs-up"}></i>
                    <span>{like}</span>
                </div>
                <div className="shortDislikeBox" onClick={() => handleLikeDislike("dislike")}>
                    <i className={userDisliked ? "fa-solid fa-thumbs-down" : "fa-regular fa-thumbs-down"}></i>
                    <span>{dislike}</span>
                </div>
                <div className="shortCommentBox" onClick={toggleComments}>
                    <i className="fas fa-comment"></i>
                </div>
                <span>{loadingComments ? 'Loading comments...' : comments.length}</span>
                <div className="shortShareBox">
                    <i className="fas fa-share"></i>
                </div>
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
                            <input type="text"className="addAcommentInput"placeholder="Add a comment..."value={message}onChange={(e) => setMessage(e.target.value)}/>
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