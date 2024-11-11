import React, { useState, useEffect, useCallback } from 'react';
import './video.css';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    const fetchVideoById = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/getVideoById/${id}`);
            setData(response.data.video);
            setVideoURL(response.data.video.videoLink);
            setLike(response.data.video.like.length);
            setDislike(response.data.video.dislike.length);
        } catch (err) {
            console.error(err);
        }
    }, [id]);
    const getCommentByVideoId = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:4000/commentApi/comment/${id}`);
            setComments(response.data.comments);
        } catch (err) {
            console.error(err);
        }
    }, [id]);
    useEffect(() => {
        fetchVideoById();
        getCommentByVideoId();
    }, [fetchVideoById, getCommentByVideoId]);
    const handleViewIncrement = async () => {
        if (!hasIncremented) {
            try {
                console.log("Incrementing view count...");
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
    }, [data, hasIncremented]);    
    const handleComment = async () => {
        const body = { message, video: id };
        try {
            const resp = await axios.post('http://localhost:4000/commentApi/comment', body, { withCredentials: true });
            const newComment = resp.data.comment;
            setComments([newComment, ...comments]);
            setMessage("");
        } catch (err) {
            toast.error("Please login first to comment");
        }
    };
    const handleSubscribe = async () => {
        try {
            const response = await axios.put(`http://localhost:4000/api/toggleSubscription/${data.user._id}`, {}, { withCredentials: true });
            setIsSubscribed(response.data.isSubscribed);
        } catch (error) {
            console.error("Error subscribing:", error);
        }
    };
    const handleLike = async () => {
        try {
            const response = await axios.put(`http://localhost:4000/api/video/like/${id}`, {}, { withCredentials: true });
            setLike(response.data.like);
            setDislike(response.data.dislike);
        } catch (error) {
            console.error("Error liking video:", error);
        }
    };
    const handleDislike = async () => {
        try {
            const response = await axios.put(`http://localhost:4000/api/video/dislike/${id}`, {}, { withCredentials: true });
            setLike(response.data.like);
            setDislike(response.data.dislike);
        } catch (error) {
            console.error("Error disliking video:", error);
        }
    };
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
                                <img className='youtube_video_ProfileBlock_left_image' src={data?.user?.profilePic} alt="User Profile" />
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
                            <div className="youtube_video_likeBlock_Like" onClick={handleLike}>
                                <ThumbUpOutlinedIcon />
                                <div className="youtube_video_likeBlock_NoOfLikes">{like}</div>
                            </div>
                            <div className="youtubeVideoDivider"></div>
                            <div className="youtube_video_likeBlock_Like" onClick={handleDislike}>
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
                <div className="youtubeCommentSection">
                    <div className="youtubeCommentSectionTitle">{comments.length} Comments</div>
                    <div className="youtubeSelfComment">
                        <img className='video_youtubeSelfCommentProfile' src="https://th.bing.com/th/id/OIP.x-zcK4XvIdKjt7s4wJTWAgAAAA?w=360&h=360&rs=1&pid=ImgDetMain" alt="User Profile" />
                        <div className="addAComment">
                            <input type="text" className="addAcommentInput" placeholder="Add a comment..." value={message} onChange={(e) => setMessage(e.target.value)} />
                            <div className="cancelSubmitComment">
                                <div className="cancelComment" onClick={() => setMessage("")}>Cancel</div>
                                <div className="cancelComment" onClick={handleComment}>Comment</div>
                            </div>
                        </div>
                    </div>
                    <div className="youtubeOthersComments">
                        {comments.map((item, index) => (
                            <div className="youtubeSelfComment" key={item._id || index}>
                                <img className='video_youtubeSelfCommentProfile' src={item?.user?.profilePic} alt="User Profile" />
                                <div className="others_commentSection">
                                    <div className="others_commentSectionHeader">
                                        <div className="channelName_comment">{item?.user?.username}</div>
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
            </div>
            <div className="videoSuggestions">
                <div className="videoSuggestionsBlock">
                    <div className="video_suggetion_thumbnail">
                        <video autoPlay muted className='video_suggetion_thumbnail_img'>
                            <source src={"https://videos.pexels.com/video-files/2306150/2306150-hd_1920_1080_30fps.mp4"} type="video/mp4" />
                        </video>
                    </div>
                    <div className="video_suggetions_About">
                        <div className="video_suggetions_About_title">Piano</div>
                        <div className="video_suggetions_About_Profile">SkyeWei</div>
                        <div className="video_suggetions_About_Profile">6.8M views . 11 months ago</div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};
export default Video;