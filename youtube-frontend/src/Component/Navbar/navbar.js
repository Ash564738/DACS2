import React, { useState,useEffect } from 'react'
import './navbar.css';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import YoutubeIcon from '@mui/icons-material/YouTube';
import KeyBoardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import SettingsIcon from '@mui/icons-material/Settings';
import TranslateIcon from '@mui/icons-material/Translate';
import LanguageIcon from '@mui/icons-material/Language';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios';
const Navbar = ({setSideNavbarFunc,sideNavbar}) => {
    const [userPic, setUserPic] = useState("https://th.bing.com/th/id/OIP.Wy2uo_y-ttULYs4chLmqSAAAAA?rs=1&pid=ImgDetMain")
    const [navbarModal,setNavbarModal] = useState(false);
    const navigate = useNavigate();
    const handleClickModal =()=>{
        setNavbarModal(prev=>!prev);
    }
    const sideNavbarFunc=()=>{
        setSideNavbarFunc(!sideNavbar)
    }
    const handleprofile =()=>{
        let userId = localStorage.getItem("userId")
        navigate(`/user/${userId}`);
        setNavbarModal(false);
    }
    return (
        <div className="navbar">
            <div className="nav-middle">
                <div className="header__logo-wrap">
                    <div className="barbutton" title="Menu" onClick={sideNavbarFunc}>
                        <MenuIcon sx={{ color: "white" }} />
                    </div>
                    <Link to ={'/'} className="logoyoutube">
                        <YoutubeIcon sx={{ fontSize: "34px", color: "red" }} className="logoyoutubeimg" />
                        <div className="youtubetitle">MeTube</div>
                        <span>VN</span>
                    </Link>
                </div>
                <div className="header__center">
                    <div className="header__search">
                        <input type="text" className="header__input" placeholder="Search"></input>
                        <div className="search--btn">
                            <SearchIcon sx={{ fontSize: "28px", color: "white" }} />
                        </div>
                    </div>
                    <div className="header__mic">
                        <KeyBoardVoiceIcon sx={{ color: "white" }} />
                    </div>
                </div>
                <div className="header__infor">
                    <VideoCallIcon sx={{ color: "white", fontSize: "30px", cursor: "pointer" }} />
                    <NotificationsIcon sx={{ color: "white", fontSize: "30px", cursor: "pointer" }} />
                    <img onClick={handleClickModal} src={userPic} className="header__userava" alt="Ava"/>
                    {navbarModal &&
                        <div className="header-modal">
                            <div className="header-modal-channel">
                                <img src={userPic} className="header__userava" alt="Ava"/>
                                <div className="header-modal-channel-inf">
                                    <div className="header-modal-channel-name">Catto</div>
                                    <div className="header-modal-channel-email">@Catto.gmail.com</div>
                                    <div className="header-modal-channel-profile" onClick={handleprofile}>View your channel</div>
                                </div>
                            </div>
                            <hr className="header-modal-separator" />
                            <div className="header-modal-option">
                                <LoginIcon/>Sign In</div>
                            <div className="header-modal-option"><LogoutIcon/>Sign Out</div>
                            <hr className="header-modal-separator" />
                            <div className="header-modal-option"><Brightness3Icon/>Appearance: Dark</div>
                            <div className="header-modal-option"><TranslateIcon/>Language: English</div>
                            <div className="header-modal-option"><LanguageIcon/>Location: US</div>
                            <hr className="header-modal-separator"/>
                            <div className="header-modal-option"><SettingsIcon/>Settings</div>
                            <div className="header-modal-option"><HelpOutlineOutlinedIcon/>Help</div>
                            <div className="header-modal-option"><FeedbackOutlinedIcon/>Send Feedback</div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar