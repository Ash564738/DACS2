import React, { useState, useEffect } from 'react';
import './profile.css';
import SideNavbar from '../../Component/SideNavbar/sideNavbar';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link, useParams } from 'react-router-dom';
import apiClient from '../../Utils/apiClient.js';
import axios from 'axios';
const Profile = ({ sideNavbar }) => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [user, setUser] = useState(null);
    const token = localStorage.getItem("token");
    const fetchProfileData = async () => {
        try {
            const userResponse = await apiClient.get(`http://localhost:4000/auth/getUserById/${id}`, {},{
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            });
            const videosResponse = await axios.get(`http://localhost:4000/auth/getVideosByUserId/${id}`);
            console.log("User data:", userResponse.data);
            console.log("Videos data:", videosResponse.data);
            setUser(userResponse.data.user);
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
                        <div className="profile_top_section_About_Name">{user?.name}</div>
                        <div className="profile_top_section_info">
                            @{user?.userName} . {data.length} videos . {user?.subscribers || 0} subscribers
                        </div>
                        <div className="profile_top_section_info">
                            {user?.about || user?.name}
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
                                        <div className="profileVideo_block_detail_about">Created at {item.createdAt.slice(0, 10)}</div>
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