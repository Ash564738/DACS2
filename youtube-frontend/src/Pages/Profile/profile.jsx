import React, { useState, useEffect } from 'react';
import './profile.css';
import SideNavbar from '../../Component/SideNavbar/sideNavbar';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
const Profile = ({ sideNavbar }) => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [user, setUser] = useState(null);
    const fetchProfileData = async () => {
        try {
            const userResponse = await axios.get(`http://localhost:4000/api/getUserById/${id}`);
            setUser(userResponse.data.user);
            const videosResponse = await axios.get(`http://localhost:4000/api/getVideosByUserId/${id}`);
            setData(videosResponse.data.videos);
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    };
    useEffect(() => {
        fetchProfileData();
    }, [id]);
    return (
        <div className='profile'>
            <SideNavbar sideNavbar={sideNavbar} />
            <div className={sideNavbar ? "profile_page" : "profile_page_inactive"}>
                <div className="profile_top_section">
                    <div className="profile_top_section_profile">
                        <img className='profile_top_section_img' src={user?.profilePic} alt="Profile" />
                    </div>
                    <div className="profile_top_section_About">
                        <div className="profile_top_section_About_Name">{user?.channelName}</div>
                        <div className="profile_top_section_info">
                            @{user?.username} . {data.length} videos . {user?.subscribersCount || 0} subscribers
                        </div>
                        <div className="profile_top_section_info">
                            About {user?.bio || user?.channelName}
                        </div>
                    </div>
                </div>
                <div className="profile_videos">
                    <div className="profile_videos_title">Videos &nbsp; <ArrowRightIcon /></div>
                    <div className="profileVideos">
                        {
                            data.map((item, key) => (
                                <Link to={`/watch/${item._id}`} className="profileVideo_block" key={item._id}>
                                    <div className="profileVideo_block_thumbnail">
                                        <img src={item.thumbnail} alt="thumbnail" className="profileVideo_block_thumbnail_img" />
                                    </div>
                                    <div className="profileVideo_block_detail">
                                        <div className="profileVideo_block_detail_name">{item.title}</div>
                                        <div className="profileVideo_block_detail_about">Created at {new Date(item.createdAt).toLocaleDateString()}</div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Profile;