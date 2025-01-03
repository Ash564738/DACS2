import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../Utils/apiClient.js';

const CommentSection = ({ id, comments, setComments, fetchComments, userId, userPic, message, setMessage, data, handleComment, handleCommentLikeDislike, token }) => {
    const [showReplyFunction, setShowReplyFunction] = useState({});
    const [showReplyInput, setShowReplyInput] = useState({});
    const [showReplies, setShowReplies] = useState({});
    const [replyMessage, setReplyMessage] = useState("");
    const [editCommentData, setEditCommentData] = useState({ id: null, message: "" });
    const [editReplyData, setEditReplyData] = useState({ commentId: null, replyId: null, message: "" });

    const toggleReplyFunction = (commentId) => {
        setShowReplyFunction((prev) => ({
            ...prev,
            [commentId]: !prev[commentId]
        }));
    };

    const toggleReplyInput = (commentId) => {
        setShowReplyInput((prev) => ({
            ...prev,
            [commentId]: !prev[commentId]
        }));
    };

    const toggleReplies = (commentId) => {
        setShowReplies((prev) => ({
            ...prev,
            [commentId]: !prev[commentId]
        }));
    };

    const handleReply = async (commentId) => {
        if (!replyMessage) {
            console.log("Reply message is empty");
            return;
        }
        const body = { message: replyMessage, video: id, user: data.userId, parent: commentId };
        try {
            const resp = await apiClient.post(`http://localhost:4000/commentApi/addReply/${commentId}`, body, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            });
            const newReply = resp.data.reply;
            setComments((prevComments) => prevComments.map((comment) =>
                comment._id === commentId
                    ? { ...comment, replies: [newReply, ...comment.replies] }
                    : comment
            ));
            setReplyMessage("");
        } catch (err) {
            console.error("Error in handleReply:", err);
        }
    };

    const handleReplyLikeDislike = async (commentId, replyId, action) => {
        try {
            const resp = await apiClient.put(`http://localhost:4000/commentApi/toggleReplyLikeDislike/${commentId}/${replyId}?action=${action}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            });
            const updatedReply = resp.data.reply;
            setComments((prevComments) => prevComments.map((comment) =>
                comment._id === commentId
                    ? {
                        ...comment,
                        replies: comment.replies.map((reply) =>
                            reply._id === replyId ? { ...reply, like: updatedReply.like, dislike: updatedReply.dislike } : reply
                        )
                    }
                    : comment
            ));
        } catch (err) {
            console.error("Error in handleReplyLikeDislike:", err);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await apiClient.delete(`http://localhost:4000/commentApi/deleteComment/${commentId}`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            });
            setComments((prevComments) => prevComments.filter(comment => comment._id !== commentId));
        } catch (err) {
            console.error("Error in handleDeleteComment:", err);
        }
    };

    const handleDeleteReply = async (commentId, replyId) => {
        try {
            await apiClient.delete(`http://localhost:4000/commentApi/deleteReply/${commentId}/${replyId}`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            });
            setComments((prevComments) => prevComments.map((comment) =>
                comment._id === commentId
                    ? { ...comment, replies: comment.replies.filter(reply => reply._id !== replyId) }
                    : comment
            ));
        } catch (err) {
            console.error("Error in handleDeleteReply:", err);
        }
    };

    const handleEditComment = (commentId, message) => {
        setEditCommentData({ id: commentId, message });
        setEditReplyData({ commentId: null, replyId: null, message: "" });
    };

    const handleEditReply = (commentId, replyId, message) => {
        setEditReplyData({ commentId, replyId, message });
        setEditCommentData({ id: null, message: "" });
    };

    const handleSaveEdit = async () => {
        if (editCommentData.id) {
            try {
                const body = { message: editCommentData.message };
                await apiClient.put(`http://localhost:4000/commentApi/editComment/${editCommentData.id}`, body, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true
                });
                setComments((prevComments) => prevComments.map((comment) =>
                    comment._id === editCommentData.id ? { ...comment, message: editCommentData.message } : comment
                ));
                setEditCommentData({ id: null, message: "" });
            } catch (err) {
                console.error("Error in handleSaveEdit (comment):", err);
            }
        } else if (editReplyData.replyId) {
            try {
                const body = { message: editReplyData.message };
                await apiClient.put(`http://localhost:4000/commentApi/editReply/${editReplyData.commentId}/${editReplyData.replyId}`, body, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true
                });
                setComments((prevComments) =>
                    prevComments.map((comment) =>
                        comment._id === editReplyData.commentId
                            ? {
                                ...comment,
                                replies: comment.replies.map((reply) =>
                                    reply._id === editReplyData.replyId ? { ...reply, message: editReplyData.message } : reply
                                )
                            }
                            : comment
                    )
                );
                setEditReplyData({ commentId: null, replyId: null, message: "" });
            } catch (err) {
                console.error("Error in handleSaveEdit (reply):", err);
            }
        }
    };

    const getTotalCommentsAndReplies = () => {
        return comments.reduce((total, comment) => total + 1 + (comment.replies ? comment.replies.length : 0), 0);
    };

    const handleKeyPress = (event, commentId) => {
        if (event.key === 'Enter') {
            if (commentId) {
                handleReply(commentId);
            } else {
                handleComment();
            }
        }
    };
    const handleEditKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSaveEdit();
        }
    };
    return (
        <div className="youtubeCommentSection">
            <div className="youtubeCommentSectionTitle">{getTotalCommentsAndReplies()} Comments</div>
            <div className="youtubeSelfComment">
                <Link to={`/user/${userId}`}>
                    <img className='video_youtubeSelfCommentProfile' src={userPic} alt="User Profile" />
                </Link>
                <div className="addAComment">
                    <input type="text" className="addAcommentInput" placeholder="Add a comment..." value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={handleKeyPress} />
                    <div className="cancelSubmitComment">
                        <div className="cancelComment" onClick={() => setMessage("")}>Cancel</div>
                        <div className="cancelComment" onClick={handleComment}>Comment</div>
                    </div>
                </div>
            </div>
            <div className="youtubeOthersComments">
                {(comments || []).map((item) => (
                    <div key={item._id || `comment-${item.createdAt}`} >
                        <div className="youtubeSelfComment">
                            <Link to={`/user/${item?.user?._id}`}>
                                <img className='video_youtubeSelfCommentProfile' src={item?.user?.profilePic} alt="User Profile" />
                            </Link>
                            <div className="others_commentSection">
                                <div className="otherCommentSectionHeader">
                                    <div className="channelName_comment">{item?.user?.name}</div>
                                    <div className="commentTimingOthers">
                                        {item?.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Date not available"}
                                    </div>
                                </div>
                                <div className="otherCommentSectionComment">
                                    {editCommentData.id === item._id ? (
                                        <>
                                            <input className="addAcommentInput" type="text" value={editCommentData.message} onChange={(e) => setEditCommentData({ ...editCommentData, message: e.target.value })} onKeyPress={(e) => handleEditKeyPress(e)} />
                                                <div className="cancelSubmitComment">
                                                <div className = "cancelComment" onClick={() => { setEditCommentData({ id: null, message: "" }); setEditReplyData({ commentId: null, replyId: null, message: "" }); }}>Cancel</div>
                                                <div className = "cancelComment" onClick={handleSaveEdit}>Save</div>
                                            </div>
                                        </>
                                    ) : (
                                        item.message
                                    )}
                                </div>
                                <div className="commentActions">
                                    <div className="shortcommentLikeBox" onClick={() => handleCommentLikeDislike(item._id, "like")}>
                                        <i className={item.like.includes(userId) ? "fa-solid fa-thumbs-up" : "fa-regular fa-thumbs-up"}></i>
                                    </div>
                                    <span>{item.like.length}</span>
                                    <div className="shortcommentDislikeBox" onClick={() => handleCommentLikeDislike(item._id, "dislike")}>
                                        <i className={item.dislike.includes(userId) ? "fa-solid fa-thumbs-down" : "fa-regular fa-thumbs-down"}></i>
                                    </div>
                                    <span>{item.dislike.length}</span>
                                    <div className="commentReply" onClick={() => toggleReplyInput(item._id)}>
                                        <i className="fa-solid fa-reply"></i>
                                    </div>
                                    {item.replies.length > 0 && (
                                        <div className="commentReply" onClick={() => toggleReplies(item._id)}>
                                            <i className="fa-brands fa-replyd"></i>
                                        </div>
                                    )}
                                </div>
                                {showReplyInput[item._id] && (
                                    <div>
                                        <div className="youtubeSelfComment">
                                            <img className='video_youtubeSelfCommentProfile' src={userPic} alt="User Profile" />
                                            <input type="text" className="addAcommentInput" placeholder="Add a reply..." value={replyMessage} onChange={(e) => setReplyMessage(e.target.value)} onKeyPress={(e) => handleKeyPress(e, item._id)} />
                                        </div>
                                        <div className="addAComment">
                                            <div className="cancelSubmitComment">
                                                <div className="cancelComment" onClick={() => setReplyMessage("")}>Cancel</div>
                                                <div className="cancelComment" onClick={() => handleReply(item._id)}>Reply</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {showReplies[item._id] && (
                                    <div className="commentReplies">
                                        {item.replies.length > 0 && (
                                            <>
                                                {item.replies.map((reply, index) => (
                                                    <div key={`reply-${index}`} className="replyItem">
                                                        <div className="youtubeSelfComment">
                                                            <Link to={`/user/${reply?.user?._id}`}>
                                                                <img className="video_youtubeSelfCommentProfile" src={reply?.user?.profilePic || "default_profile.jpg"} alt="User Profile" />
                                                            </Link>
                                                            <div className="others_commentSection">
                                                                <div className="otherCommentSectionHeader">
                                                                    <div className="channelName_comment">{reply?.user?.name || "Unknown User"}</div>
                                                                    <div className="commentTimingOthers">
                                                                        {reply?.createdAt ? new Date(reply.createdAt).toLocaleDateString() : "Date not available"}
                                                                    </div>
                                                                </div>
                                                                <div className="otherCommentSectionComment">
                                                                    {editReplyData.replyId === reply._id ? (
                                                                        <>
                                                                            <input className="addAcommentInput" type="text" value={editReplyData.message} onChange={(e) => setEditReplyData({ ...editReplyData, message: e.target.value })} onKeyPress={(e) => handleEditKeyPress(e)} />
                                                                                <div className="cancelSubmitComment">
                                                                                <div className = "cancelComment"onClick={() => { setEditCommentData({ id: null, message: "" }); setEditReplyData({ commentId: null, replyId: null, message: "" }); }}>Cancel</div>
                                                                                <div className = "cancelComment" onClick={handleSaveEdit}>Save</div>
                                                                            </div>
                                                                        </>
                                                                    ) : (
                                                                        reply.message
                                                                    )}
                                                                </div>
                                                                <div className="commentActions">
                                                                    <div className="shortcommentLikeBox" onClick={() => handleReplyLikeDislike(item._id, reply._id, "like")}>
                                                                        <i className={reply.like.includes(userId) ? "fa-solid fa-thumbs-up" : "fa-regular fa-thumbs-up"}></i>
                                                                    </div>
                                                                    <span>{reply.like.length}</span>
                                                                    <div className="shortcommentDislikeBox" onClick={() => handleReplyLikeDislike(item._id, reply._id, "dislike")}>
                                                                        <i className={reply.dislike.includes(userId) ? "fa-solid fa-thumbs-down" : "fa-regular fa-thumbs-down"}></i>
                                                                    </div>
                                                                    <span>{reply.dislike.length}</span>
                                                                </div>
                                                            </div>
                                                            <div className="commentFuntionSectionBox">
                                                                <div className="commentFuntionToggle" onClick={() => toggleReplyFunction(reply._id)}>
                                                                    <i className="fa-solid fa-ellipsis-vertical" ></i>
                                                                </div>
                                                                {showReplyFunction[reply._id] && (
                                                                    <div className='commentFunction'>
                                                                        {reply.user._id === userId ? (
                                                                            <>
                                                                                <div className="commentReply" onClick={() => handleDeleteReply(item._id, reply._id)}>
                                                                                    <i className="fa-solid fa-trash"></i>
                                                                                    Delete
                                                                                </div>
                                                                                <div className='commentReply' onClick={() => handleEditReply(item._id, reply._id, reply.message)}>
                                                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                                                    Edit
                                                                                </div>
                                                                            </>
                                                                        ) : (
                                                                            <div className='commentReply'>
                                                                                <i className="fa-solid fa-flag"></i>
                                                                                Report
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="commentFuntionSectionBox">
                                <div className="commentFuntionToggle" onClick={() => toggleReplyFunction(item._id)}>
                                    <i className="fa-solid fa-ellipsis-vertical" ></i>
                                </div>
                                {showReplyFunction[item._id] && (
                                    <div className='commentFunction'>
                                        {item.user._id === userId ? (
                                            <>
                                                <div className="commentReply" onClick={() => handleDeleteComment(item._id)}>
                                                    <i className="fa-solid fa-trash"></i>
                                                    Delete
                                                </div>
                                                <div className='commentReply' onClick={() => handleEditComment(item._id, item.message)}>
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                    Edit
                                                </div>
                                            </>
                                        ) : (
                                            <div className='commentReply'>
                                                <i className="fa-solid fa-flag"></i>
                                                Report
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentSection;