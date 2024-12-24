import React from 'react';
import './userMessage.css';

const userMessage = ({ message }) => {
    return (
        <div className="user-message">
            {message}
        </div>
    );
};

export default userMessage;