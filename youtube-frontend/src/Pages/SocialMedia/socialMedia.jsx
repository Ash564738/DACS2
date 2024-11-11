import React, { useState } from 'react';
import './socialMedia.css';

const SocialMedia = () => {
    const [posts, setPosts] = useState([]);
    const [newPostText, setNewPostText] = useState('');
    const [newComment, setNewComment] = useState('');

    const handlePostSubmit = () => {
        if (newPostText.trim() === '') return;
        const newPost = {
            id: posts.length + 1,
            text: newPostText,
            likes: 0,
            comments: [],
            timestamp: new Date().toLocaleString(),
        };
        setPosts([newPost, ...posts]);
        setNewPostText('');
    };

    const handleLike = (postId) => {
        setPosts(posts.map(post => 
            post.id === postId ? { ...post, likes: post.likes + 1 } : post
        ));
    };

    const handleCommentSubmit = (postId) => {
        if (newComment.trim() === '') return;
        setPosts(posts.map(post => 
            post.id === postId 
                ? { ...post, comments: [...post.comments, newComment] }
                : post
        ));
        setNewComment('');
    };

    return (
        <div className="container">
            <div className="write-post-container">
                <textarea 
                    rows="3" 
                    placeholder="What's on your mind?"
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                ></textarea>
                <button onClick={handlePostSubmit}>Post</button>
            </div>

            {posts.map(post => (
                <div key={post.id} className="post-container">
                    <div className="post-row">
                        <div className="user-profile">
                            <p>User Name</p>
                            <span>{post.timestamp}</span>
                        </div>
                    </div>
                    <p className="post-text">{post.text}</p>
                    <div className="post-img-container"></div>

                    <div className="post-row">
                        <div className="activity-icons">
                            <div onClick={() => handleLike(post.id)}>
                                <img src="/path/to/like-icon.png" alt="Like"/> {post.likes} Likes
                            </div>
                        </div>
                    </div>

                    <div className="comments-section">
                        {post.comments.map((comment, index) => (
                            <p key={index} className="comment">{comment}</p>
                        ))}
                        <textarea
                            rows="2"
                            placeholder="Write a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        ></textarea>
                        <button onClick={() => handleCommentSubmit(post.id)}>Comment</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SocialMedia;
