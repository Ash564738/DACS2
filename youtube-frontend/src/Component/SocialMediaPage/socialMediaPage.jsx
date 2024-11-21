import './socialMediaPage.css';
import React, { useState, useEffect, useRef } from 'react';
import 'flatpickr/dist/flatpickr.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import apiClient from '../../Utils/apiClient.js';
import Chat from '../Chat/chat.jsx'
const SocialMediaPage = ({ sideNavbar }) => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');
    const [comment, setComment] = useState('');
    const [user, setUser] = useState({});
    const [friendId, setfriendId] = useState({});
    const [userPic, setUserPic] = useState("https://th.bing.com/th/id/OIP.x-zcK4XvIdKjt7s4wJTWAgAAAA?w=360&h=360&rs=1&pid=ImgDetMain");
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const [inputField, setInputField] = useState({"content": "","image": "","video": ""});
    const fileInputRef = useRef(null);
    const [likedComments, setLikedComments] = useState({});
    const [replyFields, setReplyFields] = useState({});
    const [replyText, setReplyText] = useState({});
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [isChatVisible, setIsChatVisible] = useState(false);

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

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/posts/getAllPosts');
                setPosts(Array.isArray(response.data.posts) ? response.data.posts : []);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, []);

    useEffect(() => {
        console.log('fetchOnlineUsers:');
        const fetchOnlineUsers = async () => {
            try {
                const response = await axios.get('http://localhost:4000/auth/getAllUsers');
                setOnlineUsers(response.data.users);
            } catch (error) {
                console.error('Error fetching online users:', error);
            }
        };
        fetchOnlineUsers();
    }, []);

    const openFileDialog = () => {
        fileInputRef.current.click();
    };

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'Metube');
        const type = file.type.startsWith('image') ? 'image' : 'video';
        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/dicsxejp4/${type}/upload`,
                data
            );
            if (response.data.secure_url) {
                setInputField((prev) => ({
                    ...prev,
                    [type]: response.data.secure_url,
                }));
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handlePostSubmit = async () => {
        if (newPost.trim() || inputField.image || inputField.video) {
            try {
                const postData = {
                    user: userId,
                    content: newPost,
                    image: inputField.image,
                    video: inputField.video,
                };
                const response = await axios.post(
                    'http://localhost:4000/posts/createPost',
                    postData
                );
                setPosts((prevPosts) => [response.data.post, ...prevPosts]);
                setNewPost('');
                setInputField({ content: '', image: '', video: '' });
            } catch (error) {
                console.error('Error creating post:', error);
            }
        } else {
            console.error('Post content or media is required');
        }
    };

    const handleCommentSubmit = (postId) => {
        console.log("In handleCommentSubmit");
        if (comment.trim()) {
            apiClient.post(`http://localhost:4000/posts/${postId}/comments`,{ user: userId, content: comment }, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            }).then(response => {
                setPosts(prevPosts => prevPosts.map(post => post._id === postId ? response.data : post));
                setComment('');
                })
                .catch(error => console.error('Error adding comment:', error));
            }
        };

    const handleLikePost = async (postId) => {
        console.log("In handleLikePost ")
        try {
            const response = await apiClient.post(`http://localhost:4000/posts/${postId}/like`, {}, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });
            setPosts(prevPosts => prevPosts.map(post => post._id === postId ? response.data.post : post));
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    const handleReplySubmit = async (commentId) => {
        if (replyText[commentId]?.trim()) {
            try {
                const response = await apiClient.post(
                    `http://localhost:4000/comments/${commentId}/reply`,
                    { content: replyText[commentId], user: userId },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        withCredentials: true,
                    }
                );
                setPosts((prevPosts) =>
                    prevPosts.map((post) =>
                        post.comments.some((c) => c._id === commentId)
                            ? {
                                  ...post,
                                  comments: post.comments.map((c) =>
                                      c._id === commentId
                                          ? { ...c, replies: [...(c.replies || []), response.data.reply] }
                                          : c
                                  ),
                              }
                            : post
                    )
                );
                setReplyFields((prev) => ({ ...prev, [commentId]: false }));
                setReplyText((prev) => ({ ...prev, [commentId]: '' }));
            } catch (error) {
                console.error('Error submitting reply:', error);
            }
        }
    };
    const handleUserClick = (id) => {
        console.log("Clicked user ID:", id);
        setfriendId(id);
        setIsChatVisible(true);
    };

    return (
        <div className={sideNavbar ? 'socialMediaPage' : 'fullSocialMediaPage'}>
            <div className="main-content">
                <div className="write-post-container">
                    <div className="user-profile">
                        <img src={userPic} alt="User" />
                        <div>
                            <p>{user.name}</p>
                            <small>Public <i className="fa-solid fa-caret-down"></i></small>
                        </div>
                    </div>
                    <div className="post-input-container">
                        <textarea
                            rows="3"
                            placeholder={`What's on your mind, ${user.name}?`}
                            value={newPost}
                            onChange={(e) => setNewPost(e.target.value)}
                        />
                        <button onClick={handlePostSubmit} className="post-button">Post</button>
                    </div>
                    <div className="add-post-links">
                        <a onClick={openFileDialog}>
                            <i className="fa-regular fa-image"></i>Photo/Video
                        </a>
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={uploadImage}
                            accept="image/*,video/*"
                        />
                        <a href="#"><i className="fa-regular fa-face-smile"></i>Feeling/Activity</a>
                    </div>
                </div>
                {posts.map(post => (
                    <div key={post._id} className="post-container">
                        <div className="post-row">
                            <div className="user-profile">
                                <img src={post.user?.profilePic} alt="User" />
                                <div>
                                    <p>{post.user?.name}</p>
                                    <span>{new Date(post.createdAt).toLocaleString()}</span>
                                </div>
                            </div>
                            <a href="#"><i className="fa-solid fa-ellipsis-vertical"></i></a>
                        </div>
                        <p className="post-text">{post.content}</p>
                        <div className="img-post">{post.image && <img src={post.image} className="post-img" alt="Post" />}</div>
                        <div className="post-row">
                            <div className="activity-icons">
                                <div onClick={() => handleLikePost(post._id)}>
                                    <i className={post.like.includes(userId) ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}
                                    style={{ color: post.like.includes(userId) ? 'lightcoral' : 'white' }}>
                                    </i>
                                     {post.like.length}
                                </div>
                                <div><i className="fas fa-share"></i> 20</div>
                            </div>
                            <div className="post-profile-icon">
                                <img src={userPic} alt="User" /><i className="fa-solid fa-caret-down"></i>
                            </div>
                        </div>

                        <div className="comment-input">
                            <input
                                type="text"
                                placeholder="Write a comment..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <button onClick={() => handleCommentSubmit(post._id)} className="comment-button">Comment</button>
                        </div>
                        <div className="commentSection">
                            {post.comments?.map((comment) => (
                                <div key={comment._id} className="comment-item">
                                    <div className="comment-post">
                                    <img src={comment.user?.profilePic} alt="User" className="comment-avatar" />
                                    <div className="comment-details"onClick={() =>setReplyFields((prev) => ({...prev,[comment._id]: !prev[comment._id],}))}>
                                        <p className="comment-user">{comment.user?.name}</p>
                                        <p className="comment-text">{comment.content}</p>
                                    </div>
                                    <div className="comment-icon" onClick={() => {setLikedComments((prev) => ({
                                                ...prev,[comment._id]: !prev[comment._id],}));}}>
                                        <i className={likedComments[comment._id] ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}
                                            style={{ color: likedComments[comment._id] ? 'lightcoral' : 'inherit' }}></i>
                                    </div>
                                    </div>
                                    {replyFields[comment._id] && (
                                        <div className="reply-input">
                                            <input
                                                type="text"
                                                placeholder="Write a reply..."
                                                value={replyText[comment._id] || ''}
                                                onChange={(e) =>
                                                    setReplyText((prev) => ({
                                                        ...prev,
                                                        [comment._id]: e.target.value,
                                                    }))
                                                }/>
                                        <button onClick={() => handleReplySubmit(comment._id)}className="reply-button">Reply</button></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <button type="button" className="load-more-btn">Load More</button>
            </div>

        <div className="right-sidebar">
            <div className="sidebar-title">
                <h4>Events</h4>
                <a href="#">See All</a>
            </div>

            <div className="event">
                <div className="left-event">
                    <h3>18</h3>
                    <span>March</span>
                </div>
                <div className="right-event">
                    <h4>Social Media</h4>
                    <p><i className="fa-solid fa-location-dot"></i> Willson Tech Park</p>
                    <a href="#">More Info</a>
                </div>
            </div>

            <div className="event">
                <div className="left-event">
                    <h3>22</h3>
                    <span>June</span>
                </div>
                <div className="right-event">
                    <h4>Mobile Marketing</h4>
                    <p><i className="fa-solid fa-location-dot"></i> Willson Tech Park</p>
                    <a href="#">More Info</a>
                </div>
            </div>

            <div className="sidebar-title">
                <h4>Advertisement</h4>
                <a href="#">Close</a>
            </div>

            <img src="https://devo.vn/wp-content/uploads/2023/01/oe.jpg" alt="" className="sidebar-ads"/>

            <div className="sidebar-title">
                <h4>Conversation</h4>
                <a href="#">Hide Chat</a>
            </div>

            <div className="online-list">
                {onlineUsers.map((user) => (
                    <div key={user._id} className="online" onClick={() => handleUserClick(user._id)}>
                        <img src={user.profilePic} alt={user.name} />
                        <p>{user.name}</p>
                    </div>
                ))}
            </div>
        </div>
        {isChatVisible && <Chat friendId={friendId} />}
        </div>
    );
};

export default SocialMediaPage;