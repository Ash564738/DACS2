import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import './shortPage.css';
import apiClient from '../../Utils/apiClient.js';
import axios from 'axios';
import { toast } from 'react-toastify';
import CommentSection from '../VideoPage/commentSection';

const ShortItem = ({ item, userId, userPic, token }) => {
    const [comments, setComments] = useState([]);
    const [message, setMessage] = useState("");
    const [showComments, setShowComments] = useState(false);
    const [data, setData] = useState(null);
    const [like, setLike] = useState(0);
    const [dislike, setDislike] = useState(0);
    const [userLiked, setUserLiked] = useState(false);
    const [userDisliked, setUserDisliked] = useState(false);
    const [hasIncremented, setHasIncremented] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const videoRef = useRef(null);
    const MAX_DESCRIPTION_LENGTH = 70;

    const getShortDescription = (description) => {
        if (!description) return "No description available";
        return description.length > MAX_DESCRIPTION_LENGTH
            ? `${description.substring(0, MAX_DESCRIPTION_LENGTH)}...`
            : description;
    };

    const fetchLikeDislikeData = useCallback(async () => {
        try {
            const videoResponse = await axios.get(`http://localhost:4000/api/getVideoById/${item._id}`);
            const videoData = videoResponse.data.video;
            setData(videoData);
            setLike(videoData.like ? videoData.like.length : 0);
            setDislike(videoData.dislike ? videoData.dislike.length : 0);
            if (userId) {
                setUserLiked(videoData.like.includes(userId));
                setUserDisliked(videoData.dislike.includes(userId));
            }
            if (userId) {
                const subscriptionResponse = await apiClient.get(`http://localhost:4000/auth/getSubscriptions`, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true
                });
                const subscribedIds = subscriptionResponse.data.subscribedUsers?.map(sub => sub._id) || [];
                setIsSubscribed(subscribedIds.includes(videoData.user._id));
            }
        } catch (error) {
            console.error("Error fetching like/dislike data:", error);
        }
    }, [item._id, userId, token]);

    useEffect(() => {
        if (item && item._id) {
            fetchLikeDislikeData();
        }
    }, [fetchLikeDislikeData, item]);

    const fetchComments = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:4000/commentApi/getCommentByVideoId/${item._id}`);
            const commentsData = response.data.comments || [];
            const commentsWithReplies = await Promise.all(commentsData.map(async (comment) => {
                try {
                    const repliesResponse = await axios.get(`http://localhost:4000/commentApi/getRepliesByCommentId/${comment._id}`);
                    return {
                        ...comment,
                        replies: repliesResponse.data.replies || []
                    };
                } catch (error) {
                    console.error(`Error fetching replies for comment ${comment._id}:`, error);
                    return comment;
                }
            }));
            setComments(commentsWithReplies);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    }, [item._id]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    const handleVideoLikeDislike = async (action) => {
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
            console.error("Error in like/dislike video:", error);
        }
    };

    const handleCommentLikeDislike = async (commentId, action) => {
        try {
            const response = await apiClient.put(`http://localhost:4000/commentApi/toggleCommentLikeDislike/${commentId}?action=${action}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            });
            const { like, dislike } = response.data;
            setComments((prevComments) =>
                prevComments.map((comment) =>
                    comment._id === commentId
                        ? { ...comment, like, dislike }
                        : comment
                )
            );
        } catch (error) {
            toast.error("Please login first to like/dislike");
            console.error("Error in like/dislike comment:", error);
        }
    };

    const handleComment = async () => {
        const body = { message, video: item._id, user: data.userId };
        try {
            const resp = await apiClient.post('http://localhost:4000/commentApi/addComment', body, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            });
            const newComment = resp.data.comment;
            setComments([newComment, ...comments]);
            setMessage("");
        } catch (err) {
            console.error("Error in handleComment:", err);
            toast.error("Please login first to comment");
        }
    };

    const handleViewIncrement = useCallback(async () => {
        if (!hasIncremented) {
            try {
                await axios.put(`http://localhost:4000/api/incrementViews/${item._id}`);
                setHasIncremented(true);
            } catch (error) {
                console.error("Error incrementing views:", error);
                toast.error("Failed to increment views");
            }
        }
    }, [hasIncremented, item._id]);

    useEffect(() => {
        if (data && !hasIncremented) {
            handleViewIncrement();
            setHasIncremented(true);
        }
    }, [data, hasIncremented, handleViewIncrement]);

    const handleSubscribe = async () => {
        try {
            const response = await apiClient.post(`http://localhost:4000/auth/toggleSubscription/${data.user._id}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            });
            setIsSubscribed(prev => !prev);
            toast.success(response.data.isSubscribed ? "Subscribed successfully!" : "Unsubscribed successfully!");
            window.location.reload();
        } catch (error) {
            toast.error("Please login first to subscribe");
        }
    };

    const toggleComments = () => setShowComments((prev) => !prev);

    const handlePlayPause = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    };

    const handleMuteUnmute = () => {
        videoRef.current.muted = !videoRef.current.muted;
    };

    const handleFullScreen = () => {
        if (videoRef.current.requestFullscreen) {
            videoRef.current.requestFullscreen();
        } else if (videoRef.current.mozRequestFullScreen) {
            videoRef.current.mozRequestFullScreen();
        } else if (videoRef.current.webkitRequestFullscreen) {
            videoRef.current.webkitRequestFullscreen();
        } else if (videoRef.current.msRequestFullscreen) {
            videoRef.current.msRequestFullscreen();
        }
    };

    const getTotalCommentsAndReplies = () => {
        return comments.reduce((total, comment) => total + 1 + (comment.replies ? comment.replies.length : 0), 0);
    };

    return (
        <div className="shortVideoBlock">
            <div className="shortContentBox">
                <video ref={videoRef} src={item.videoLink} className="shortContentVideo" />
                <div className="shortContentOverlay"></div>
                <div className="shortTitleBox">
                    <div className="shortTitleBoxTitle">
                        <Link to={`/user/${item?.user?._id}`} className="shortTitleBoxProfilePic">
                            <img src={item.user?.profilePic || "default_profile.jpg"} alt={`${item.user?.name || "Unknown"} profile`} />
                        </Link>
                        <Link to={`/user/${item?.user?._id}`} className="shortUserName">{item.user?.name || "Unknown Channel"}</Link>
                        {item?.user?._id !== userId && (
                            <div className="subscribeBtnYoutube" onClick={handleSubscribe}>
                                {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
                            </div>
                        )}
                    </div>
                    <div className="shortVideoTitle">{item.title || "Untitled Video"}</div>
                    <p className="shortVideoDescription">
                        {getShortDescription(item.description)}
                    </p>
                </div>
                <div className="customControls">
                    <div>
                        <button onClick={handlePlayPause}>
                            {videoRef.current?.paused ? <i className="fa-solid fa-play"></i> : <i className="fa-solid fa-pause"></i>}
                        </button>
                        <button onClick={handleMuteUnmute}>
                            {videoRef.current?.muted ? <i className="fa-solid fa-volume-xmark"></i> : <i className="fa-solid fa-volume-high"></i>}
                        </button>
                    </div>
                    <button onClick={handleFullScreen}>
                        <i className="fa-solid fa-expand"></i>
                    </button>
                </div>
            </div>
            <div className="shortSideBar">
                <div className="shortLikeBox" onClick={() => handleVideoLikeDislike("like")}>
                    <i className={userLiked ? "fa-solid fa-thumbs-up" : "fa-regular fa-thumbs-up"}></i>
                </div>
                <span>{like}</span>
                <div className="shortDislikeBox" onClick={() => handleVideoLikeDislike("dislike")}>
                    <i className={userDisliked ? "fa-solid fa-thumbs-down" : "fa-regular fa-thumbs-down"}></i>
                </div>
                <span>{dislike}</span>
                <div className="shortCommentBox" onClick={toggleComments}>
                    <i className="fas fa-comment"></i>
                </div>
                <span>{getTotalCommentsAndReplies()}</span>
                <div className="shortShareBox">
                    <i className="fas fa-share"></i>
                </div>
                <Link to={`/user/${item?.user?._id}`} className="shortProfileBox">
                    <img src={item.user?.profilePic || "default_profile.jpg"} alt={`${item.user?.name || "Unknown"} profile`} />
                </Link>
            </div>
            {showComments && (
                <div className="commentBox">
                    <CommentSection id={item._id} comments={comments} setComments={setComments} fetchComments={fetchComments} userId={userId} userPic={userPic} message={message} setMessage={setMessage} data={data} handleComment={handleComment} handleCommentLikeDislike={handleCommentLikeDislike} token={token}/>
                </div>
            )}
        </div>
    );
};

export default ShortItem;