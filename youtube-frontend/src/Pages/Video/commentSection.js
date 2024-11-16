import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../Utils/apiClient.js';

const CommentSection = ({ id, comments, setComments, userId, userPic, message, setMessage, data, handleComment, handleCommentLikeDislike, token }) => {
    const [showReplyFunction, setShowReplyFunction] = useState({});
    const [showReplyInput, setShowReplyInput] = useState({});
    const [replyMessage, setReplyMessage] = useState("");

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

    return (
        <div className="youtubeCommentSection">
            <div className="youtubeCommentSectionTitle">{comments.length} Comments</div>
            <div className="youtubeSelfComment">
                <Link to={`/user/${userId}`}>
                    <img className='video_youtubeSelfCommentProfile' src={userPic} alt="User Profile" />
                </Link>
                <div className="addAComment">
                    <input type="text" className="addAcommentInput" placeholder="Add a comment..." value={message} onChange={(e) => setMessage(e.target.value)} />
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
                                <div className="others_commentSectionHeader">
                                    <div className="channelName_comment">{item?.user?.userName}</div>
                                    <div className="commentTimingOthers">
                                        {item?.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Date not available"}
                                    </div>
                                </div>
                                <div className="otherCommentSectionComment">{item.message}</div>
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
                                </div>
                                {showReplyInput[item._id] && (
                                    <div>
                                        <div className="youtubeSelfComment">
                                            <img className='video_youtubeSelfCommentProfile' src={userPic} alt="User Profile" />
                                            <input type="text" className="addAcommentInput" placeholder="Add a reply..." value={replyMessage} onChange={(e) => setReplyMessage(e.target.value)} />
                                        </div>
                                        <div className="addAComment">
                                            <div className="cancelSubmitComment">
                                                <div className="cancelComment" onClick={() => setReplyMessage("")}>Cancel</div>
                                                <div className="cancelComment" onClick={() => handleReply(item._id)}>Reply</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="commentReplies">
                                    {item.replies.length > 0 && (
                                        <div className="commentReplies">
                                            {item.replies.map((reply, index) => (
                                                <div key={`reply-${index}`} className="replyItem">
                                                    <div className="youtubeSelfComment">
                                                        <Link to={`/user/${reply?.user?._id}`}>
                                                            <img className="video_youtubeSelfCommentProfile" src={reply?.user?.profilePic || "default_profile.jpg"} alt="User Profile" />
                                                        </Link>
                                                        <div className="others_commentSection">
                                                            <div className="others_commentSectionHeader">
                                                                <div className="channelName_comment">{reply?.user?.userName || "Unknown User"}</div>
                                                                <div className="commentTimingOthers">
                                                                    {reply?.createdAt ? new Date(reply.createdAt).toLocaleDateString() : "Date not available"}
                                                                </div>
                                                            </div>
                                                            <div className="otherCommentSectionComment">{reply?.message}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="commentReplySection">
                                <i className="fa-solid fa-ellipsis-vertical" onClick={() => toggleReplyFunction(item._id)}></i>
                                {showReplyFunction[item._id] && (
                                    <div className='commentReplyFunction'>
                                        <div className="commentReply">
                                            <i className="fa-solid fa-trash"></i>
                                        </div>
                                        <div className='commentReply'>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                        </div>
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