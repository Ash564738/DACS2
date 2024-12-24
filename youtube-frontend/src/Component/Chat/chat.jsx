import React, { useState, useEffect } from 'react';
import './chat.css';
import axios from 'axios';
import apiClient from '../../Utils/apiClient.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faVideo, faExpand, faImage, faSmile, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import UserMessage from './userMessage';
import FriendMessage from './friendMessage';

const Chat = ({ friendId, closeChat }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const userId = localStorage.getItem("userId");
    const [friend, setFriend] = useState({});
    const [friendPic, setFriendPic] = useState("https://th.bing.com/th/id/OIP.x-zcK4XvIdKjt7s4wJTWAgAAAA?w=360&h=360&rs=1&pid=ImgDetMain");
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (friendId) {
            fetchFriendProfile(friendId);
        }
    }, [friendId]);

    useEffect(() => {
        if (userId && friendId) {
            fetchMessages(userId, friendId);
        }
    }, [userId, friendId]);

    const fetchFriendProfile = async (friendId) => {
        try {
            const response = await apiClient.get(`http://localhost:4000/auth/getUserById/${friendId}`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });
            const { profilePic, name } = response.data.user;
            setFriend({ name });
            setFriendPic(profilePic);
        } catch (error) {
            console.error("Error fetching friend data:", error);
        }
    };

    const fetchMessages = async (userId, friendId) => {
        try {
            const response = await axios.get(`http://localhost:4000/chat/getMessages/${userId}/${friendId}`);
            setMessages(response.data.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
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
        closeChat();
    };
    if (!friendId) return null;
    return (
        <div>
            <div className="chat-container">
                <div className="chat-header">
                    <img src={friendPic} alt="" className="profile-pic" />
                    <h3>{friend.name}</h3>
                    <div className="chat-actions">
                        <button><FontAwesomeIcon icon={faPhone} /></button>
                        <button><FontAwesomeIcon icon={faVideo} /></button>
                        <button><FontAwesomeIcon icon={faExpand} /></button>
                    </div>
                    <button className="close-chat" onClick={toggleChat}>×</button>
                </div>
                <div className="chat-body">
                    {messages.map((msg, index) => (
                        msg.senderId === userId ? (
                            <UserMessage key={index} message={msg.message} />
                        ) : (
                            <FriendMessage key={index} message={msg.message} friendPic={friendPic} />
                        )
                    ))}
                </div>
                <div className="chat-footer">
                    <button><FontAwesomeIcon icon={faImage} /></button>
                    <button><FontAwesomeIcon icon={faSmile} /></button>
                    <textarea type="text" placeholder="Aa" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                    <button onClick={handleSendMessage}>Send</button>
                    <button><FontAwesomeIcon icon={faThumbsUp} /></button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
