import React, { useState, useEffect } from 'react'
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
        {/* Please watch the video for the code} */}
    }
    useEffect(() => {
        fetchProfileData()
    }, [])
    return (
        <div className='profile'>
            <SideNavbar sideNavbar={sideNavbar} />
            <div className={sideNavbar ? "profile_page" : "profile_page_inactive"}>
                <div className="profile_top_section">
                    <div className="profile_top_section_profile">
                        <img className='profile_top_section_img' src={user?.profilePic} alt="" />
                    </div>
                    <div className="profile_top_section_About">
                        <div className="profile_top_section_About_Name">ABC</div>
                        <div className="profile_top_section_info">
                            @ABC . 4 videos . 100 subscribers
                        </div>
                        <div className="profile_top_section_info">
                            About abc
                        </div>
                    </div>
                </div>
                <div className="profile_videos">
                    <div className="profile_videos_title">Videos &nbsp; <ArrowRightIcon /></div>
                    <div className="profileVideos">
                        {
                            data.map((item, key) => {
                                return (
                                    <Link to={`/watch/${item._id}`} className="profileVideo_block">
                                        <div className="profileVideo_block_thumbnail">
                                            <img src={item.thumbnail} alt="thumbnail" className="profileVideo_block_thumbnail_img" />
                                        </div>
                                        <div className="profileVideo_block_detail">
                                            <div className="profileVideo_block_detail_name">Video Title</div>
                                            <div className="profileVideo_block_detail_about">Create at 2024-09-12</div>
                                        </div>
                                    </Link>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile