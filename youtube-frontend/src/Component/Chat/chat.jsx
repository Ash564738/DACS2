import React, { useState, useEffect } from 'react';
import './chat.css';
import axios from 'axios';
import apiClient from '../../Utils/apiClient.js';

const Chat = ({ friendId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isChatVisible, setIsChatVisible] = useState(false);
    const [chatPosition, setChatPosition] = useState({ bottom: 0, right: 267 }); // Tọa độ mặc định
    const userId = localStorage.getItem("userId");
    const [user, setUser] = useState({});
    const [userPic, setUserPic] = useState("https://th.bing.com/th/id/OIP.x-zcK4XvIdKjt7s4wJTWAgAAAA?w=360&h=360&rs=1&pid=ImgDetMain");
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/chat/getMessages/${userId}/${friendId}`);
                setMessages(response.data.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };
        if (userId && friendId) fetchMessages();
    }, [userId, friendId]);

    useEffect(() => {
        if (userId) fetchUserProfile(userId);
    }, [userId]);

    const fetchUserProfile = async (userId) => {
        try {
            const response = await apiClient.get(`http://localhost:4000/auth/getUserById/${userId}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });
            const { profilePic, name } = response.data.user;
            setUser({ name });
            setUserPic(profilePic);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;
        try {
            const response = await axios.post('http://localhost:4000/chat/sendMessage', {
                senderId: userId,
                receiverId: friendId,
                message: newMessage,
            });
            setMessages([...messages, response.data.data]);
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const toggleChat = () => {
        setIsChatVisible(!isChatVisible);
        console.log('Chat visibility:', !isChatVisible); // Debug trạng thái
    };

    const moveChat = (newPosition) => {
        setChatPosition(newPosition);
    };

    return (
        <div>
            <div className="chat-icon" onClick={toggleChat}>
                <i className="fa-solid fa-comment-dots"></i>
            </div>

            {isChatVisible && (
                <div
                    className="chat-container"
                    style={{ bottom: `${chatPosition.bottom}px`, right: `${chatPosition.right}px` }}
                >
                    <div className="chat-header">
                        <img src={userPic} alt="" className="profile-pic" />
                        <h3>{user.name}</h3>
                        <div className="chat-actions">
                            <button>📞</button>
                            <button>📹</button>
                            <button>⬜</button>
                        </div>
                        <button className="close-chat" onClick={toggleChat}>×</button>
                    </div>
                    <div className="chat-body">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.senderId === userId ? 'user-message' : 'friend-message'}`}>
                                {msg.message}
                            </div>
                        ))}
                    </div>
                    <div className="chat-footer">
                        <button>🖼️</button>
                        <button>GIF</button>
                        <textarea
                            type="text"
                            placeholder="Aa"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button onClick={handleSendMessage}>Send</button>
                        <button>👍</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chat;
