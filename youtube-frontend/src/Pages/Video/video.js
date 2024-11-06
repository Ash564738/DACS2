import React, { useState, useEffect } from 'react';
import './video.css';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
const Video = () => {
    const [message, setMessage] = useState("");
    console.log(message);
    const [data, setData] = useState(null);
    const [videoUrl, setVideoURL] = useState("");
    const { id } = useParams();
    const [comments, setComments] = useState([]);
    const fetchVideoById = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/getVideoById/${id}`);
            setData(response.data.video);
            setVideoURL(response.data.video.videoLink);
        } catch (err) {
            console.error(err);
        }
    };
    const getCommentByVideoId = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/commentApi/comment/${id}`);
            setComments(response.data.comments);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchVideoById();
        getCommentByVideoId();
    }, [id]);
    const handleComment = async () => {
        const body = { message, video: id };
        try {
            const resp = await axios.post('http://localhost:4000/commentApi/comment', body, { withCredentials: true });
            const newComment = resp.data.comment;
            setComments([newComment, ...comments]);
            setMessage("");
        } catch (err) {
            toast.error("Please login first to comment");
        }
    };
    return (
        <div className='video'>
            <div className="videoPostSection">
                {/* <div className="video_youtube">
                    {data && (
                        <video width="400" controls autoPlay className='video_youtube_video'>
                            <source src={videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )}
                </div> */}
                <div className="video_youtube">
                    <video width="400" controls autoPlay className='video_youtube_video'>
                        <source src="https://videos.pexels.com/video-files/1481903/1481903-hd_1920_1080_25fps.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="video_youtubeAbout">
                    <div className="video_uTubeTitle">{data?.title}</div>
                    <div className="youtube_video_ProfileBlock">
                        <div className="youtube_video_ProfileBlock_left">
                            <Link to={`/user/${data?.user?._id}`} className="youtube_video_ProfileBlock_left_img">
                                <img className='youtube_video_ProfileBlock_left_image' src={data?.user?.profilePic} alt="User Profile" />
                            </Link>
                            <div className="youtubeVideo_subsView">
                                <div className="youtubePostProfileName"> {data?.user?.channelName} </div>
                                <div className="youtubePostProfileSubs">{data?.user?.createdAt.slice(0, 10)}</div>
                            </div>
                            <div className="subscribeBtnYoutube">Subscribe</div>
                        </div>
                        <div className="youtube_video_likeBlock">
                            <div className="youtube_video_likeBlock_Like">
                                <ThumbUpOutlinedIcon />
                                <div className="youtube_video_likeBlock_NoOfLikes">{32}</div>
                            </div>
                            <div className="youtubeVideoDivider"></div>
                            <div className="youtube_video_likeBlock_Like">
                                <ThumbDownAltOutlinedIcon />
                            </div>
                        </div>
                    </div>
                    <div className="youtube_video_About">
                        <div>{data?.createdAt.slice(0, 10)}</div>
                        <div>{data?.description}</div>
                    </div>
                </div>
                <div className="youtubeCommentSection">
                    <div className="youtubeCommentSectionTitle">{comments.length} Comments</div>
                    <div className="youtubeSelfComment">
                        <img className='video_youtubeSelfCommentProfile' src="https://th.bing.com/th/id/OIP.x-zcK4XvIdKjt7s4wJTWAgAAAA?w=360&h=360&rs=1&pid=ImgDetMain" alt="User Profile" />
                        <div className="addAComment">
                            <input type="text" className="addAcommentInput" placeholder="Add a comment..." value={message} onChange={(e) => setMessage(e.target.value)} />
                            <div className="cancelSubmitComment">
                                <div className="cancelComment" onClick={() => setMessage("")}>Cancel</div>
                                <div className="cancelComment" onClick={handleComment}>Comment</div>
                            </div>
                        </div>
                    </div>
                    <div className="youtubeOthersComments">
                        {comments.map((item, index) => (
                            <div className="youtubeSelfComment" key={item._id || index}>
                                <img className='video_youtubeSelfCommentProfile' src={item?.user?.profilePic} alt="User Profile" />
                                <div className="others_commentSection">
                                    <div className="others_commentSectionHeader">
                                        <div className="channelName_comment">{item?.user?.username}</div>
                                        <div className="commentTimingOthers">{new Date(item.createdAt).toLocaleDateString()}</div>
                                    </div>
                                    <div className="otherCommentSectionComment">{item.message}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="videoSuggestions">
                <div className="videoSuggestionsBlock">
                    <div className="video_suggetion_thumbnail">
                        <video autoPlay muted className='video_suggetion_thumbnail_img'>
                            <source src={"https://videos.pexels.com/video-files/2306150/2306150-hd_1920_1080_30fps.mp4"} type="video/mp4" />
                        </video>
                    </div>
                    <div className="video_suggetions_About">
                        <div className="video_suggetions_About_title">Piano</div>
                        <div className="video_suggetions_About_Profile">SkyeWei</div>
                        <div className="video_suggetions_About_Profile">6.8M views . 11 months ago</div>
                    </div>
                </div>
                <div className="videoSuggestionsBlock">
                    <div className="video_suggetion_thumbnail">
                        <video autoPlay muted className='video_suggetion_thumbnail_img'>
                            <source src={"https://videos.pexels.com/video-files/1111421/1111421-hd_1920_1080_30fps.mp4"} type="video/mp4" />
                        </video>
                    </div>
                    <div className="video_suggetions_About">
                        <div className="video_suggetions_About_title">Food</div>
                        <div className="video_suggetions_About_Profile">Cricket 320</div>
                        <div className="video_suggetions_About_Profile">136K views . 1 day ago</div>
                    </div>
                </div>
                <div className="videoSuggestionsBlock">
                    <div className="video_suggetion_thumbnail">
                        <video autoPlay muted className='video_suggetion_thumbnail_img'>
                            <source src={"https://videos.pexels.com/video-files/856192/856192-uhd_2560_1440_30fps.mp4"} type="video/mp4" />
                        </video>
                    </div>
                    <div className="video_suggetions_About">
                        <div className="video_suggetions_About_title">Flowers</div>
                        <div className="video_suggetions_About_Profile">Cricket 320</div>
                        <div className="video_suggetions_About_Profile">136K views . 1 day ago</div>
                    </div>
                </div>
                <div className="videoSuggestionsBlock">
                    <div className="video_suggetion_thumbnail">
                        <video autoPlay muted className='video_suggetion_thumbnail_img'>
                            <source src={"https://videos.pexels.com/video-files/3214448/3214448-uhd_2560_1440_25fps.mp4"} type="video/mp4" />
                        </video>
                    </div>
                    <div className="video_suggetions_About">
                        <div className="video_suggetions_About_title">Mountain</div>
                        <div className="video_suggetions_About_Profile">Cricket 320</div>
                        <div className="video_suggetions_About_Profile">136K views . 1 day ago</div>
                    </div>
                </div>
                <div className="videoSuggestionsBlock">
                    <div className="video_suggetion_thumbnail">
                        <video autoPlay muted className='video_suggetion_thumbnail_img'>
                            <source src={"https://videos.pexels.com/video-files/1456996/1456996-hd_1920_1080_30fps.mp4"} type="video/mp4" />
                        </video>
                    </div>
                    <div className="video_suggetions_About">
                        <div className="video_suggetions_About_title">Turtle</div>
                        <div className="video_suggetions_About_Profile">SkyeWei</div>
                        <div className="video_suggetions_About_Profile">6.8M views . 11 months ago</div>
                    </div>
                </div>
                <div className="videoSuggestionsBlock">
                    <div className="video_suggetion_thumbnail">
                        <video autoPlay muted className='video_suggetion_thumbnail_img'>
                            <source src={"https://videos.pexels.com/video-files/856882/856882-hd_1920_1080_24fps.mp4"} type="video/mp4" />
                        </video>
                    </div>
                    <div className="video_suggetions_About">
                        <div className="video_suggetions_About_title">JellyFish</div>
                        <div className="video_suggetions_About_Profile">Cricket 320</div>
                        <div className="video_suggetions_About_Profile">136K views . 1 day ago</div>
                    </div>
                </div>
                <div className="videoSuggestionsBlock">
                    <div className="video_suggetion_thumbnail">
                        <video autoPlay muted className='video_suggetion_thumbnail_img'>
                            <source src={"https://videos.pexels.com/video-files/2554576/2554576-hd_1920_1080_25fps.mp4"} type="video/mp4" />
                        </video>
                    </div>
                    <div className="video_suggetions_About">
                        <div className="video_suggetions_About_title">Otter</div>
                        <div className="video_suggetions_About_Profile">Cricket 320</div>
                        <div className="video_suggetions_About_Profile">136K views . 1 day ago</div>
                    </div>
                </div>
                <div className="videoSuggestionsBlock">
                    <div className="video_suggetion_thumbnail">
                        <video autoPlay muted className='video_suggetion_thumbnail_img'>
                            <source src={"https://videos.pexels.com/video-files/3196463/3196463-uhd_2560_1440_25fps.mp4"} type="video/mp4" />
                        </video>
                    </div>
                    <div className="video_suggetions_About">
                        <div className="video_suggetions_About_title">Cooking</div>
                        <div className="video_suggetions_About_Profile">Cricket 320</div>
                        <div className="video_suggetions_About_Profile">136K views . 1 day ago</div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};
export default Video;