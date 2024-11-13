import React from 'react';
import { Link } from 'react-router-dom';
const CommentSection = ({ comments, userId, userPic, message, setMessage, handleComment }) => (
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
            {(comments || []).map((item, index) => (
                <div className="youtubeSelfComment" key={item._id || index}>
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
                    </div>
                </div>
            ))}
        </div>
    </div>
);
export default CommentSection;
