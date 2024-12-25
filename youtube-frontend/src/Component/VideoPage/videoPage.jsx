import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import VideoSuggestion from './videoSuggestion.jsx';
import VideoPostSection from './videoPostSection.jsx';
import apiClient from '../../Utils/apiClient.js';
import axios from 'axios';
import './videoPage.css';
import VideoPlaylistSideBar from './videoPlaylistSideBar.jsx';

const VideoPage = ({ sideNavbar }) => {
    const [like, setLike] = useState(0);
    const [dislike, setDislike] = useState(0);
    const [userLiked, setUserLiked] = useState(false);
    const [userDisliked, setUserDisliked] = useState(false);
    const [comments, setComments] = useState([]);
    const [data, setData] = useState(null);
    const [videoUrl, setVideoURL] = useState("");
    const { id } = useParams();
    const location = useLocation();
    const [userPic, setUserPic] = useState("https://th.bing.com/th/id/OIP.x-zcK4XvIdKjt7s4wJTWAgAAAA?w=360&h=360&rs=1&pid=ImgDetMain");
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
            console.log("User profile fetched:", response.data.user);
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    }, [token]);

    useEffect(() => {
        if (userId) {
            fetchUserProfile(userId);
        }
    }, [userId, fetchUserProfile]);

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
            console.log("Comments fetched:", commentsWithReplies);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    }, [id]);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

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
            console.log("Video data fetched:", videoData);
        } catch (err) {
            console.error("Error fetching video data:", err);
        }
    }, [id, userId, setData, setVideoURL, setLike, setDislike, setUserLiked, setUserDisliked]);

    useEffect(() => {
        setData(null);
        setVideoURL("");
        fetchVideoData();
    }, [id, fetchVideoData, setData, setVideoURL]);

    const fromPage = location.state?.fromPage;
    const playlistId = location.state?.playlistId;

    return (
        <div className='videoPage'>
            <VideoPostSection
                id={id}
                userId={userId}
                token={token}
                data={data}
                setData={setData}
                videoUrl={videoUrl}
                setVideoURL={setVideoURL}
                like={like}
                setLike={setLike}
                dislike={dislike}
                setDislike={setDislike}
                userLiked={userLiked}
                setUserLiked={setUserLiked}
                userDisliked={userDisliked}
                setUserDisliked={setUserDisliked}
                comments={comments}
                setComments={setComments}
                userPic={userPic}
                fetchComments={fetchComments}
            />
            <div className="videoRightSideBar">
                {(fromPage === 'playlistPage' || fromPage === 'likedVideoPage' || fromPage === 'watchLaterPage') && playlistId && (
                    <VideoPlaylistSideBar playlistId={playlistId} token={token} />
                )}
                <VideoSuggestion id={id} />
            </div>
            <ToastContainer />
        </div>
    );
};

export default VideoPage;