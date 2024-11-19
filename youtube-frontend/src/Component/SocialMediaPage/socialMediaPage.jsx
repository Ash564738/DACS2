import './socialMediaPage.css';
import React, { useState, useEffect, useRef } from 'react';
import 'flatpickr/dist/flatpickr.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import apiClient from '../../Utils/apiClient.js';
const SocialMediaPage = ({ sideNavbar }) => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');
    const [comment, setComment] = useState('');
    const [user, setUser] = useState({});
    const [userPic, setUserPic] = useState("https://th.bing.com/th/id/OIP.x-zcK4XvIdKjt7s4wJTWAgAAAA?w=360&h=360&rs=1&pid=ImgDetMain");
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const [selectedFile, setSelectedFile] = useState(null);
    const [inputField, setInputField] = useState({"content": "","image": "","video": ""});
    const fileInputRef = useRef(null);
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
    console.log(inputField);
    useEffect(()=>{
        let isLogin = localStorage.getItem("userId");
        if(isLogin===null){
        }
    },[])

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
    // Toggle like or dislike a post
    const handleLikeDislike = async (postId, action) => {
        try {
            const response = await apiClient.put(
                `http://localhost:4000/posts/${postId}/${action}`, // Updated the URL to target the correct post
                {},
                { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
            );
            setPosts(prevPosts => prevPosts.map(post => post._id === postId ? response.data : post));
        } catch (error) {
            console.error('Error toggling like/dislike:', error);
        }
    };
    // Submit a comment
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
                        {/* Hidden file input */}
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
                            <div onClick={() => handleLikeDislike(post._id, 'like')}>
                                    <i className="fas fa-thumbs-up"></i>{post.like.length}
                                </div>
                                <div onClick={() => handleLikeDislike(post._id, 'dislike')}>
                                    <i className="fas fa-thumbs-down"></i>{post.dislike.length}
                                </div>
                                <div><i className="fas fa-share"></i> 20</div>
                            </div>
                            <div className="post-profile-icon">
                                <img src={userPic} alt="User" /><i className="fa-solid fa-caret-down"></i>
                            </div>
                        </div>

                        {/* Comment input */}
                        <div className="comment-input">
                            <input
                                type="text"
                                placeholder="Write a comment..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <button onClick={() => handleCommentSubmit(post._id)} className="comment-button">Comment</button>
                        </div>

                        {/* Comment display */}
                        <div className="commentSection">
                            {post.comments?.map((comment) => (
                                <div key={comment._id} className="comment-item">
                                    <img src={comment.user?.profilePic} alt="User" className="comment-avatar" />
                                    <div className="comment-details">
                                        <p className="comment-user">{comment.user?.name}</p>
                                        <p className="comment-text">{comment.content}</p>
                                    </div>
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
                <div className="online">
                    <img src="https://thuthuatnhanh.com/wp-content/uploads/2022/06/hinh-meme-meo-dap-mat-na.jpg" alt=""/>
                </div>
                <p>Mèo méo meo mèo meo</p>
            </div>

            <div className="online-list">
                <div className="online">
                    <img src="https://i.pinimg.com/736x/f7/a0/24/f7a024308c46cc9d9d4660efda1af734.jpg" alt=""/>
                </div>
                <p>Hông biết nựa</p>
            </div>

            <div className="online-list">
                <div className="online">
                    <img src="https://i.pinimg.com/736x/39/9e/41/399e41e882c143c64948007dce366c7f.jpg" alt=""/>
                </div>
                <p>Sợ hãi</p>
            </div>
        </div>

        </div>
    );
};

export default SocialMediaPage;