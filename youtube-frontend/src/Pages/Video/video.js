import React, { useState, useEffect, useCallback } from 'react';
import './video.css';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiClient from '../../Utils/apiClient.js';
const Video = () => {
    const [like, setLike] = useState(0);
    const [dislike, setDislike] = useState(0);
    const [message, setMessage] = useState("");
    const [data, setData] = useState(null);
    const [videoUrl, setVideoURL] = useState("");
    const { id } = useParams();
    const [comments, setComments] = useState([]);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [hasIncremented, setHasIncremented] = useState(false);
    const [suggestedVideos, setSuggestedVideos] = useState([]);
    const [user, setUser] = useState({});
    const [userPic, setUserPic] = useState("https://th.bing.com/th/id/OIP.x-zcK4XvIdKjt7s4wJTWAgAAAA?w=360&h=360&rs=1&pid=ImgDetMain");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");
    useEffect(() => {
        const userId = localStorage.getItem("userId");
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
            console.error("Error fetching user data:", error);
        }
    };
    const fetchVideoData = useCallback(async () => {
        try {
            const videoResponse = await axios.get(`http://localhost:4000/api/getVideoById/${id}`);
            setData(videoResponse.data.video);
            setVideoURL(videoResponse.data.video.videoLink);
            if (videoResponse.data.video) {
                setLike(videoResponse.data.video.like ? videoResponse.data.video.like.length : 0);
                setDislike(videoResponse.data.video.dislike ? videoResponse.data.video.dislike.length : 0);
            } else {
                console.error("Video not found.");
            }
            const commentResponse = await axios.get(`http://localhost:4000/commentApi/getCommentByVideoId/${id}`);
            setComments(commentResponse.data.comments);
            const suggestedResponse = await axios.get(`http://localhost:4000/api/allVideo`);
            setSuggestedVideos(suggestedResponse.data.videos || []);
            const userId = localStorage.getItem("userId");
            if (userId) {
                const subscriptionResponse = await apiClient.get(`http://localhost:4000/auth/getSubscriptions`,{}, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true
                });
                const subscribedIds = subscriptionResponse.data.subscriptions.map(sub => sub._id);
                setIsSubscribed(subscribedIds.includes(videoResponse.data.video.user._id));
            }
        } catch (err) {
            console.error("Error fetching video and comments:", err);
            setError("Failed to load video data.");
        } finally {
            setLoading(false);
        }
    }, [id]);
    useEffect(() => {
        fetchVideoData();
    }, [id, fetchVideoData]);    
    const handleViewIncrement = async () => {
        if (!hasIncremented) {
            try {
                console.log("Incrementing view count on Video/video.js HandleViewIncrement");
                await axios.put(`http://localhost:4000/api/incrementViews/${id}`);
                setHasIncremented(true);
            } catch (error) {
                console.error("Error incrementing view count:", error);
            }
        }
    };
    useEffect(() => {
        if (data && !hasIncremented) {
            handleViewIncrement();
            setHasIncremented(true);
        }
    }, [data, hasIncremented, handleViewIncrement]);
    const handleComment = async () => {
        const body = { message, video: id, user: data.userId };
        try {
            const resp = await apiClient.post('http://localhost:4000/commentApi/comment', body, { 
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            });
            const newComment = resp.data.comment;
            setComments([newComment, ...comments]);
            setMessage("");
        } catch (err) {
            toast.error("Please login first to comment");
        }
    };
    const handleSubscribe = async () => {
        try {
            const response = await apiClient.post(`http://localhost:4000/auth/toggleSubscription/${data.user._id}`,{},{ 
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true
                }
            );
            setIsSubscribed(response.data.isSubscribed);
        } catch (error) {
            console.error("Error subscribing:", error);
        }
    };
    const handleLikeDislike = async (action) => {
        console.log(`${action} video handleLikeDislike on Video/video.js`);
        try {
            const response = await apiClient.put(`http://localhost:4000/api/video/toggleLikeDislike/${id}?action=${action}`, {}, { 
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            });
            setLike(response.data.like);
            setDislike(response.data.dislike);
        } catch (error) {
            console.error(`Error ${action} video:`, error);
        }
    };
    if (loading) {
        return <p>Loading video...</p>;
    }
    if (error) {
        return <p>{error}</p>;
    }
    return (
        <div className='video'>
            <div className="videoPostSection">
                <div className="video_youtube">
                    {data && (
                        <video width="400" controls autoPlay onPlay={handleViewIncrement} className="video_youtube_video">
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
                            <div className="subscribeBtnYoutube" onClick={handleSubscribe}>
                                {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
                            </div>
                        </div>
                        <div className="youtube_video_likeBlock">
                            <div className="youtube_video_likeBlock_Like" onClick={() => handleLikeDislike("like")}>
                                <ThumbUpOutlinedIcon />
                                <div className="youtube_video_likeBlock_NoOfLikes">{like}</div>
                            </div>
                            <div className="youtubeVideoDivider"></div>
                            <div className="youtube_video_likeBlock_Like" onClick={() => handleLikeDislike("dislike")}>
                                <ThumbDownAltOutlinedIcon />
                                <div className="youtube_video_likeBlock_NoOfDislikes">{dislike}</div>
                            </div>
                        </div>
                    </div>
                    <div className="youtube_video_About">
                        <div>{data?.createdAt ? data.createdAt.slice(0, 10) : "Date not available"}</div>
                        <div>{data?.description}</div>
                    </div>
                </div>
                <CommentSection comments={comments} userPic={userPic} message={message} setMessage={setMessage} handleComment={handleComment} />
            </div>
            <SuggestedVideos suggestedVideos={suggestedVideos} />
            <ToastContainer />
        </div>
    );
};
const CommentSection = ({ comments, userPic, message, setMessage, handleComment }) => (
    <div className="youtubeCommentSection">
        <div className="youtubeCommentSectionTitle">{comments.length} Comments</div>
        <div className="youtubeSelfComment">
            <img className='video_youtubeSelfCommentProfile' src={userPic} alt="User Profile" />
            <div className="addAComment">
                <input type="text" className="addAcommentInput" placeholder="Add a comment..." value={message} onChange={(e) => setMessage(e.target.value)} />
                <div className="cancelSubmitComment">
                    <div className="cancelComment" onClick={() => setMessage("")}>Cancel</div>
                    <div className="cancelComment" onClick={handleComment}>Comment</div>
                </div>
            </div>
        </div>
        <div className="youtubeOthersComments">
            {(comments || []).map((item, index) => (
                <div className="youtubeSelfComment" key={item._id || index}>
                    <img className='video_youtubeSelfCommentProfile' src={item?.user?.profilePic} alt="User Profile" />
                    <div className="others_commentSection">
                        <div className="others_commentSectionHeader">
                            <div className="channelName_comment">{item?.user?.userName}</div>
                            <div className="commentTimingOthers">
                                {item?.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Date not available"}
                            </div>
                        </div>
                        <div className="otherCommentSectionComment">{item.message}</div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
const SuggestedVideos = ({ suggestedVideos }) => (
    <div className="videoSuggestions">
        {suggestedVideos && suggestedVideos.length > 0 ? (
            suggestedVideos.map((item) => (
                <div className="videoSuggestionsBlock" key={item._id}>
                    <Link to={`/watch/${item._id}`} className="video_suggestion_link">
                        <div className="video_suggetion_thumbnail">
                            <img className='video_suggetion_thumbnail_img' src={item.thumbnail} alt={`Thumbnail of ${item.title}`} />
                        </div>
                        <div className="video_suggetions_About">
                            <div className="video_suggetions_About_title">{item.title}</div>
                            <div className="video_suggetions_About_Profile">{item.user?.name}</div>
                            <div className="video_suggetions_About_Profile">
                                {item.views ? `${item.views} views` : "0 views"} . {item.createdAt ? item.createdAt.slice(0, 10) : "Date not available"}
                            </div>
                        </div>
                    </Link>
                </div>
            ))
        ) : (
            <p>No suggestions available.</p>
        )}
    </div>
);
export default Video;