import React, { useState, useEffect, useRef } from 'react';
import './navbar.css';
import {
    Menu as MenuIcon,
    YouTube as YoutubeIcon,
    Search as SearchIcon,
    KeyboardVoice as KeyBoardVoiceIcon,
    VideoCall as VideoCallIcon,
    Notifications as NotificationsIcon,
    Login as LoginIcon,
    Logout as LogoutIcon,
    Brightness3 as Brightness3Icon,
    Settings as SettingsIcon,
    Translate as TranslateIcon,
    Language as LanguageIcon,
    FeedbackOutlined as FeedbackOutlinedIcon,
    HelpOutlineOutlined as HelpOutlineOutlinedIcon,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Navbar = ({ setSideNavbarFunc, sideNavbar }) => {
    const [userPic, setUserPic] = useState("https://th.bing.com/th/id/OIP.x-zcK4XvIdKjt7s4wJTWAgAAAA?w=360&h=360&rs=1&pid=ImgDetMain")
    const [navbarModal,setNavbarModal] = useState(false);
    const [login,setLogin] = useState(false);
    const [isLogedIn,setIsLogedIn] = useState(false)
    const navigate = useNavigate();
    const modalRef = useRef();
    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            fetchUserProfile(userId);
        }
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setNavbarModal(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const fetchUserProfile = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:4000/api/getUserById/${userId}`);
            const { profilePic, username, email } = response.data.user;
            setUserPic(profilePic);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };
    const handleModalToggle = () => {
        setNavbarModal((prev) => !prev);
    };
    const handleProfile = () => {
        const userId = localStorage.getItem("userId");
        navigate(`/user/${userId}`);
        setNavbarModal(false);
    };
    const sideNavbarFunc = () => {
        setSideNavbarFunc(!sideNavbar);
    };
    return (
        <div className="navbar">
            <div className="nav-middle">
                <div className="header__logo-wrap">
                    <div className="barbutton" title="Menu" onClick={sideNavbarFunc}>
                        <MenuIcon sx={{ color: "white" }} />
                    </div>
                    <Link to={'/'} className="logoyoutube">
                        <YoutubeIcon sx={{ fontSize: "34px", color: "red" }} className="logoyoutubeimg" />
                        <div className="youtubetitle">MeTube</div>
                        <span>VN</span>
                    </Link>
                </div>
                <div className="header__center">
                    <div className="header__search">
                        <input type="text" className="header__input" placeholder="Search" />
                        <div className="search--btn">
                            <SearchIcon sx={{ fontSize: "28px", color: "white" }} />
                        </div>
                    </div>
                    <div className="header__mic">
                        <KeyBoardVoiceIcon sx={{ color: "white" }} />
                    </div>
                </div>
                <div className="header__infor">
                    <Link to = {'/763/upload'}>
                        <VideoCallIcon sx={{ color: "white", fontSize: "30px", cursor: "pointer" }} />
                    </Link>
                    <NotificationsIcon sx={{ color: "white", fontSize: "30px", cursor: "pointer" }} />
                    <img onClick={handleModalToggle} src={userPic} className="header__userava" alt="Ava" />
                    {navbarModal && (
                        <div className="header-modal" ref={modalRef}>
                            <div className="header-modal-channel">
                                <img src={userPic} className="header__userava" alt="Ava" />
                                <div className="header-modal-channel-inf">
                                    <div className="header-modal-channel-name">Catto</div>
                                    <div className="header-modal-channel-email">@Catto.gmail.com</div>
                                    <div className="header-modal-channel-profile" onClick={handleProfile}>View your channel</div>
                                </div>
                            </div>
                            <hr className="header-modal-separator" />
                            <Link to={"/signup"} className="header-modal-option">
                                <LoginIcon /> Sign In
                            </Link>
                            <div className="header-modal-option" >
                                <LogoutIcon /> Sign Out
                            </div>
                            <hr className="header-modal-separator" />
                            <div className="header-modal-option">
                                <Brightness3Icon /> Appearance: Dark
                            </div>
                            <div className="header-modal-option">
                                <TranslateIcon /> Language: English
                            </div>
                            <div className="header-modal-option">
                                <LanguageIcon /> Location: US
                            </div>
                            <hr className="header-modal-separator" />
                            <div className="header-modal-option">
                                <SettingsIcon /> Settings
                            </div>
                            <div className="header-modal-option">
                                <HelpOutlineOutlinedIcon /> Help
                            </div>
                            <div className="header-modal-option">
                                <FeedbackOutlinedIcon /> Send Feedback
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Navbar;