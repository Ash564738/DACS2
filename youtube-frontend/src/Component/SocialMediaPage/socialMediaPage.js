import './socialMediaPage.css';
import React, { useState, useEffect } from 'react';
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
        axios.get('http://localhost:4000/posts/getAllPosts')
            .then(response => {
                console.log('API response:', response.data);
                setPosts(Array.isArray(response.data.posts) ? response.data.posts : [])
                console.log('getAllPosts API response:', response.data);

            })
            .catch(error => console.error('Error fetching posts:', error));
    }, []); // Added dependency array to ensure this runs once
    // Create new post
    const handlePostSubmit = () => {
        if (newPost.trim()) {
            axios.post('http://localhost:4000/posts/createPost', { user: user.name, content: newPost }).then(response => {
                console.log('Post creation response:', response.data);
                const newPostData = response.data;
                setPosts(prevPosts => [newPostData, ...prevPosts]);
                setNewPost('');
            }).catch(error => console.error('Error creating post:', error));
        }
    };
    // Like post
    const handleLike = (postId) => {
        axios.put(`http://localhost:4000/posts/${postId}/like`)
            .then(response => {
                setPosts(prevPosts => prevPosts.map(post => post._id === postId ? response.data : post));
            })
            .catch(error => console.error('Error liking post:', error));
    };
    // Submit a comment
    const handleCommentSubmit = (postId) => {
        if (comment.trim()) {
            axios.post(`http://localhost:4000/posts/${postId}/comments`, { user: user.name, content: comment })
                .then(response => {
                    setPosts(prevPosts => prevPosts.map(post => post._id === postId ? response.data : post));
                    setComment('');
                })
                .catch(error => console.error('Error adding comment:', error));
        }
    };
    // Toggle Chat function (moved outside of useEffect for better readability)
    const toggleChat = () => {
        const chatWidget = document.querySelector('.chat-container');
        if (chatWidget) {
            chatWidget.style.display = chatWidget.style.display === 'none' || chatWidget.style.display === '' ? 'block' : 'none';
        }
    };
    // Send Message function (also moved outside of useEffect)
    const sendMessage = () => {
        const inputField = document.getElementById('chatInput');
        const chatBody = document.querySelector('.chat-body');
        const userMessage = inputField.value.trim();
        if (userMessage === '') return;
        const userMessageElement = document.createElement('div');
        userMessageElement.classList.add('message', 'user-message');
        userMessageElement.textContent = userMessage;
        chatBody.appendChild(userMessageElement);
        const systemResponse = generateResponse(userMessage);
        const systemMessageElement = document.createElement('div');
        systemMessageElement.classList.add('message', 'system-message');
        systemMessageElement.textContent = systemResponse;
        chatBody.appendChild(systemMessageElement);
        chatBody.scrollTop = chatBody.scrollHeight;
        inputField.value = '';
    };
    const generateResponse = (userMessage) => {
        const responses = [
            "Xin chào! Tôi có thể giúp gì cho bạn?",
            "Cảm ơn bạn đã nhắn tin!",
            "Để biết thêm thông tin, vui lòng chờ trong giây lát.",
            "Tôi đang xử lý yêu cầu của bạn, xin đợi chút nhé."
        ];
        return responses[Math.floor(Math.random() * responses.length)];
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
                </div>
    {posts.map(post => (
    <div key={post._id} className="post-container">
        <div className="post-row">
            <div className="user-profile">
                <img src={userPic} alt="User" />
                <div>
                    <p>{post.user}</p> {/* Hiển thị người dùng đăng bài */}
                    <span>{new Date(post.createdAt).toLocaleString()}</span> {/* Hiển thị ngày tạo */}
                </div>
            </div>
            <a href="#"><i className="fa-solid fa-ellipsis-vertical"></i></a>
        </div>
        <p className="post-text">{post.content}</p> {/* Nội dung bài đăng */}
        {post.image && <img src={post.image} className="post-img" alt="Post" />}
        <div className="post-row">
            <div className="activity-icons">
                <div onClick={() => handleLike(post._id)}>
                <i className="fas fa-thumbs-up"></i>{post.likes?.length || 0}
                </div>
                <div>
                <i className="fas fa-comment"></i>{post.comments?.length || 0}
                </div>
                <div><i className="fas fa-share"></i> 20</div>
            </div>
            <div className="post-profile-icon">
                <img src={userPic} alt="User" /><i className="fa-solid fa-caret-down"></i>
            </div>
        </div>
        <div className="comment-section">
            <input
                type="text"
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button onClick={() => handleCommentSubmit(post._id)} className="comment-button">Comment</button>
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

        <div className="chat-icon" onClick={toggleChat}>
                <i className="fa-solid fa-comment-dots"></i>
            </div>

            <div className="chat-container">
                <div className="chat-header">
                    <img src="user-profile.jpg" alt="Profile" className="profile-pic" />
                    <div className="user-info">
                        <h3>Mèo méo meo mèo meo</h3>
                        <span>Hoạt động 12 phút trước</span>
                    </div>
                    <div className="chat-actions">
                        <button>📞</button>
                        <button>📹</button>
                        <button>⬜</button>
                    </div>
                    <button className="close-chat" onClick={toggleChat}>×</button>
                </div>
                <div className="chat-body">
                    <div className="message">Hello! How can I help you today?</div>
                </div>
                <div className="chat-footer">
                    <button>🖼️</button>
                    <button>🎥</button>
                    <button>GIF</button>
                    <input id="chatInput" type="text" placeholder="Aa" />
                    <button onClick={sendMessage}>Gửi</button>
                    <button>👍</button>
                </div>
            </div>
        </div>
    );
};

export default SocialMediaPage;