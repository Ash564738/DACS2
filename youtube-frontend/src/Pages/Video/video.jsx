import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import CommentSection from './commentSection.jsx';
import VideoSuggestion from './videoSuggestion.jsx';
import apiClient from '../../Utils/apiClient.js';
import axios from 'axios';
import './video.css';

const Video = () => {
    const [like, setLike] = useState(0);
    const [dislike, setDislike] = useState(0);
    const [userLiked, setUserLiked] = useState(false);
    const [userDisliked, setUserDisliked] = useState(false);
    const [message, setMessage] = useState("");
    const [comments, setComments] = useState([]);
    const [data, setData] = useState(null);
    const [videoUrl, setVideoURL] = useState("");
    const { id } = useParams();
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [hasIncremented, setHasIncremented] = useState(false);
    const [suggestedVideos, setSuggestedVideos] = useState([]);
    const [userPic, setUserPic] = useState("https://th.bing.com/th/id/OIP.x-zcK4XvIdKjt7s4wJTWAgAAAA?w=360&h=360&rs=1&pid=ImgDetMain");
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const fetchUserProfile = useCallback(async (userId) => {
        try {
            const response = await apiClient.get(`http://localhost:4000/auth/getUserById/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            });
            const { profilePic } = response.data.user;
            setUserPic(profilePic);
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    }, [token]);

    useEffect(() => {
        if (userId) {
            fetchUserProfile(userId);
        }
    }, [userId, fetchUserProfile]);

    const fetchVideoData = useCallback(async () => {
        try {
            const videoResponse = await axios.get(`http://localhost:4000/api/getVideoById/${id}`);
            const videoData = videoResponse.data.video;
            setData(videoData);
            setVideoURL(videoData.videoLink);
            setLike(videoData.like ? videoData.like.length : 0);
            setDislike(videoData.dislike ? videoData.dislike.length : 0);
            if (userId) {
                setUserLiked(videoData.like.includes(userId));
                setUserDisliked(videoData.dislike.includes(userId));
            }
            const suggestedResponse = await axios.get(`http://localhost:4000/api/allVideo`);
            setSuggestedVideos(suggestedResponse.data.videos || []);
            if (userId) {
                const subscriptionResponse = await apiClient.get(`http://localhost:4000/auth/getSubscriptions`, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true
                });
                const subscribedIds = subscriptionResponse.data.subscriptions.map(sub => sub._id);
                setIsSubscribed(subscribedIds.includes(videoData.user._id));
            }
        } catch (err) {
            console.error("Error fetching video data:", err);
        } finally {
            setLoading(false);
        }
    }, [id, userId, token]);

    useEffect(() => {
        setData(null);
        setVideoURL("");
        setHasIncremented(false);
        setLoading(true);
        fetchVideoData();
    }, [id, fetchVideoData]);

    const handleViewIncrement = useCallback(async () => {
        if (!hasIncremented) {
            try {
                await axios.put(`http://localhost:4000/api/incrementViews/${id}`);
                setHasIncremented(true);
            } catch (error) {
                console.error("Error incrementing views:", error);
            }
        }
    }, [hasIncremented, id]);

    useEffect(() => {
        if (data && !hasIncremented) {
            handleViewIncrement();
            setHasIncremented(true);
        }
    }, [data, hasIncremented, handleViewIncrement]);

    const fetchComments = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:4000/commentApi/getCommentByVideoId/${id}`);
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
    }, [id]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    const handleComment = async () => {
        const body = { message, video: id, user: data.userId };
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

    const handleSubscribe = async () => {
        try {
            const response = await apiClient.post(`http://localhost:4000/auth/toggleSubscription/${data.user._id}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            });
            setIsSubscribed(response.data.isSubscribed);
        } catch (error) {
            toast.error("Please login first to subscribe");
            console.error("Error in subscribing:", error);
        }
    };

    const handleLikeDislike = async (action) => {
        try {
            const response = await apiClient.put(`http://localhost:4000/api/video/toggleLikeDislike/${id}?action=${action}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
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

    if (loading) {
        return <p>Loading video...</p>;
    }

    return (
        <div className='video'>
            <div className="videoPostSection">
                <div className="video_youtube">
                    {data && (
                        <video controls autoPlay onPlay={handleViewIncrement} className="video_youtube_video">
                            <source src={videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )}
                </div>
                <div className="video_youtubeAbout">
                    <div className="video_uTubeTitle">{data?.title}</div>
                    <div className="youtube_video_ProfileBlock">
                        <div className="youtube_video_ProfileBlock_left">
                            <Link to={`/user/${data?.user?._id}`} className="youtube_video_ProfileBlock_left_img">
                                <img className='youtube_video_ProfileBlock_left_image' src={data?.user?.profilePic} alt={`User Profile of ${data?.user?.name}`} />
                            </Link>
                            <Link to={`/user/${data?.user?._id}`} className="youtubeVideo_subsView">
                                <div className="youtubePostProfileName">{data?.user?.name}</div>
                                <div className="youtubePostProfileSubs">
                                    {data?.user?.subscribers ? `${data.user.subscribers} subscribers` : "No subscribers"}
                                </div>
                            </Link>
                            {data?.user?._id !== userId && (
                                <div className="subscribeBtnYoutube" onClick={handleSubscribe}>
                                    {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
                                </div>
                            )}
                        </div>
                        <div className="youtube_video_likeBlock">
                            <div className="youtube_video_likeBlock_Like" onClick={() => handleLikeDislike("like")}>
                                <i className={userLiked ? "fa-solid fa-thumbs-up" : "fa-regular fa-thumbs-up"}></i>
                                <div className="youtube_video_likeBlock_NoOfLikes">{like}</div>
                            </div>
                            <div className="youtubeVideoDivider"></div>
                            <div className="youtube_video_likeBlock_Like" onClick={() => handleLikeDislike("dislike")}>
                                <i className={userDisliked ? "fa-solid fa-thumbs-down" : "fa-regular fa-thumbs-down"}></i>
                                <div className="youtube_video_likeBlock_NoOfDislikes">{dislike}</div>
                            </div>
                        </div>
                    </div>
                    <div className="youtube_video_About">
                        <div className="youtube_video_Info">
                            <div>{data?.createdAt ? data.createdAt.slice(0, 10) : "Date not available"}</div>
                            <div>{data?.views} views</div>
                        </div>
                        <div>{data?.description}</div>
                    </div>
                </div>
                <CommentSection id={id} comments={comments} setComments={setComments} fetchComments={fetchComments} userId={userId} userPic={userPic} message={message} setMessage={setMessage} data={data} handleComment={handleComment} handleCommentLikeDislike={handleCommentLikeDislike} token={token} />
            </div>
            <VideoSuggestion suggestedVideos={suggestedVideos} />
            <ToastContainer />
        </div>
    );
};

export default Video;