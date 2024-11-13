import React from 'react';
import { Link } from 'react-router-dom';
const VideoSuggestion = ({ suggestedVideos }) => (
    <div className="videoSuggestions">
        {suggestedVideos && suggestedVideos.length > 0 ? (
            suggestedVideos.map((item) => (
                <div className="videoSuggestionsBlock" key={item._id}>
                    <Link to={`/watch/${item._id}`} className="video_suggestion_link">
                        <div className="video_suggetion_thumbnail">
                            <img className='video_suggetion_thumbnail_img' src={item.thumbnail} alt={`Thumbnail of ${item.title}`} />
                        </div>
                        <div className="video_suggetions_About">
                            <div className="video_suggetions_About_title">{item.title}</div>
                            <div className="video_suggetions_About_Profile">{item.user?.name}</div>
                            <div className="video_suggetions_About_Profile">
                                {item.views ? `${item.views} views` : "0 views"} . {item.createdAt ? item.createdAt.slice(0, 10) : "Date not available"}
                            </div>
                        </div>
                    </Link>
                </div>
            ))
        ) : (
            <p>No suggestions available.</p>
        )}
    </div>
);
export default VideoSuggestion;
