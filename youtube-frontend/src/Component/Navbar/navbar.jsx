import React, { useState, useEffect, useRef } from 'react';
import './navbar.css';
import Logo from '../../Component/Logo/logo';
import {
    Menu as MenuIcon,
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
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import apiClient from '../../Utils/apiClient.js';
const Navbar = ({ setSideNavbarFunc, sideNavbar }) => {
    const [userPic, setUserPic] = useState("https://th.bing.com/th/id/OIP.x-zcK4XvIdKjt7s4wJTWAgAAAA?w=360&h=360&rs=1&pid=ImgDetMain")
    const [user, setUser] = useState({});
    const [navbarModal,setNavbarModal] = useState(false);
    const [login,setLogin] = useState(false);
    const [isLogedIn,setIsLogedIn] = useState(false)
    const navigate = useNavigate();
    const modalRef = useRef();
    const token = localStorage.getItem('token');
    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) {
            fetchUserProfile(userId);
            setIsLogedIn(true);
        } else {
            console.error("No user ID found in local storage");
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
        if (!userId) {
            console.error("User ID is undefined");
            return;
        }
        try {
            const response = await apiClient.get(`http://localhost:4000/auth/getUserById/${userId}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            });
            const { profilePic, name, userName, about } = response.data.user;
            setUser({ name, userName, about });
            setUserPic(profilePic);
        } catch (error) {
            console.error("Error fetching user data:", error.response ? error.response.data : error.message);
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
    const handleLogout = async() => {
        try {
            await apiClient.post(`http://localhost:4000/auth/logOut`,{},{
                headers: {Authorization: `Bearer ${token}`},
                withCredentials: true
            }).then((response) => {
                if (response.data.success) {
                    toast.success("Logged out successfully");
                    localStorage.removeItem("userId");
                    window.localStorage.clear();
                    window.location.reload();
                    setIsLogedIn(false);
                    navigate("/");
                }
            });
        } catch (error) {
            toast.error("Error logging out");
            console.error("Error fetching user data:", error);
        }
    };
    return (
        <div className="navbar">
            <div className="nav-middle">
                <div className="header__logo-wrap">
                    <div className="barbutton" title="Menu" onClick={sideNavbarFunc}>
                        <MenuIcon sx={{ color: "white" }} />
                    </div>
                    <Link to={'/'} className="logoyoutube">
                        <Logo className="logoyoutubeimg" />
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
                    <Link to = {'/${userId}/upload'}>
                        <VideoCallIcon sx={{ color: "white", fontSize: "30px", cursor: "pointer" }} />
                    </Link>
                    <NotificationsIcon sx={{ color: "white", fontSize: "30px", cursor: "pointer" }} />
                    <img onClick={handleModalToggle} src={userPic} className="header__userava" alt="Ava" />
                    {navbarModal && (
                        <div className="header-modal" ref={modalRef}>
                            <div className="header-modal-channel">
                                <img src={userPic} className="header__userava" alt="Ava" />
                                <div className="header-modal-channel-inf">
                                    <div className="header-modal-channel-name">{user.name}</div>
                                    <div className="header-modal-channel-email">{user.userName}</div>
                                    <div className="header-modal-channel-profile" onClick={handleProfile}>View your channel</div>
                                </div>
                            </div>
                            <hr className="header-modal-separator" />
                            {!isLogedIn && <Link to={"/signup"} className="header-modal-option">
                                <LoginIcon /> Sign In
                            </Link>}
                            {isLogedIn && <Link to={"/signup"} className="header-modal-option">
                                <LoginIcon /> Change Your Account
                            </Link>}
                            {isLogedIn && <div className="header-modal-option" onClick={handleLogout}>
                                <LogoutIcon /> Sign Out
                            </div>}
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
            <ToastContainer />
        </div>
    );
};
export default Navbar;