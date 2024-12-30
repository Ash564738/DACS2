import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiClient from '../../Utils/apiClient.js';
import axios from 'axios';
import CommentSection from './commentSection.jsx';
import PlaylistModal from './playlistModal.jsx';

const VideoPostSection = ({ id, userId, token, data, setData, videoUrl, setVideoURL, like, setLike, dislike, setDislike, userLiked, setUserLiked, userDisliked, setUserDisliked, comments, setComments, userPic, fetchComments }) => {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [hasIncremented, setHasIncremented] = useState(false);
    const [showVideoFunction, setShowVideoFunction] = useState(false);
    const [showPlaylistModal, setShowPlaylistModal] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
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
            if (userId) {
                const subscriptionResponse = await apiClient.get(`http://localhost:4000/auth/getSubscriptions`, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true
                });
                const subscribedIds = subscriptionResponse.data.subscribedUsers?.map(sub => sub._id) || [];
                setIsSubscribed(subscribedIds.includes(videoData.user._id));
            }
        } catch (err) {
            console.error("Error fetching video data:", err);
        }
    }, [id, userId, token, setData, setVideoURL, setLike, setDislike, setUserLiked, setUserDisliked]);

    useEffect(() => {
        setData(null);
        setVideoURL("");
        setHasIncremented(false);
        fetchVideoData();
    }, [id, fetchVideoData, setData, setVideoURL]);

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

    const handleToggleVideoFunction = () => {
        setShowVideoFunction(!showVideoFunction);
    };

    const handleDeleteVideo = async (videoId) => {
        try {
            await apiClient.delete(`http://localhost:4000/api/deleteVideo/${videoId}`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });
            toast.success("Video deleted successfully");
            navigate('/');
        } catch (error) {
            toast.error("Error deleting video");
            console.error("Error deleting video:", error);
        }
    };

    const handleShowPlaylistModal = () => {
        setShowPlaylistModal(true);
    };

    const handleClosePlaylistModal = () => {
        setShowPlaylistModal(false);
    };

    return (
        <div className="videoPostSection">
            {data && (
                <video controls autoPlay onPlay={handleViewIncrement} className="video_youtube_video">
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}
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
                    <div className="youtube_video_ProfileBlock_right">
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
                        <div className="youtube_video_likeBlock">
                            <i className="fa-solid fa-share"></i>
                            <div>Share</div>
                        </div>
                        <div className="youtube_video_likeBlock">
                            <i className="fa-solid fa-download"></i>
                            <div>Download</div>
                        </div>
                        <div className="commentFuntionSectionBox">
                            <div className="youtube_video_likeBlock" onClick={handleToggleVideoFunction}>
                                <i className="fa-solid fa-ellipsis-h"></i>
                            </div>
                            {showVideoFunction && (
                                <div className='videoFunction'>
                                    {data?.user?._id === userId ? (
                                        <>
                                            <div className="videoFunctionItem" onClick={() => handleDeleteVideo(data._id)}>
                                                <i className="fa-solid fa-trash"></i>
                                                Delete
                                            </div>
                                            <div className="videoFunctionItem" onClick={() => navigate(`/${data._id}/edit`)}>
                                                <i className="fa-solid fa-pen-to-square"></i>
                                                Edit
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="videoFunctionItem">
                                                <i className="fa-solid fa-cut"></i>
                                                Clip
                                            </div>
                                            <div className="videoFunctionItem" onClick={handleShowPlaylistModal}>
                                                <i className="fa-solid fa-save"></i>
                                                Save
                                            </div>
                                            <div className="videoFunctionItem">
                                                <i className="fa-solid fa-flag"></i>
                                                Report
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
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
            <CommentSection id={id} comments={comments} setComments={setComments} message = {message} setMessage = {setMessage} handleComment ={handleComment} handleCommentLikeDislike ={handleCommentLikeDislike} fetchComments={fetchComments} userId={userId} userPic={userPic} data={data} token={token} />
            {showPlaylistModal && <PlaylistModal videoId={id} token={token} onClose={handleClosePlaylistModal} />}
        </div>
    );
};

export default VideoPostSection;