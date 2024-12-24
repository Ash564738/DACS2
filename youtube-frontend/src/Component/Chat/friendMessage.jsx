import React from 'react';
import './friendMessage.css';

const friendMessage = ({ message, friendPic }) => {
    return (
        <div className="friend-message">
            <img src={friendPic} alt="Friend" className="friend-pic" />
            <div className="text">{message}</div>
        </div>
    );
};

export default friendMessage;