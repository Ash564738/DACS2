import React from 'react';
import './sideNavbar.css';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import apiClient from '../../Utils/apiClient.js';
import StarsOutlinedIcon from '@mui/icons-material/StarsOutlined';
import StarsIcon from '@mui/icons-material/Stars';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import VideogameAssetOutlinedIcon from '@mui/icons-material/VideogameAssetOutlined';
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ThumbUpAltRounded from '@mui/icons-material/ThumbUpAltRounded';
import WatchLaterRounded from '@mui/icons-material/WatchLaterRounded';
import SmartDisplayRounded from '@mui/icons-material/SmartDisplayRounded';
import { Home, Videocam, Subscriptions, ChevronRight, History, PlaylistAdd, SmartDisplayOutlined, WatchLaterOutlined, ThumbUpAltOutlined, List, TrendingUp, MusicNoteRounded, VideogameAssetRounded, EmojiEventsRounded, NewspaperRounded, Settings, FeedbackOutlined, HelpOutlineOutlined, FlagRounded } from '@mui/icons-material';
import axios from 'axios';
const SideNavbar = ({ sideNavbar }) => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [activeIcons, setActiveIcons] = useState({
        home: false,
        shorts: false,
        socialMedia: false,
        subscriptions: false
    });
    const location = useLocation();
    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) fetchUserSubscriptions(userId);
    }, []);
    const fetchUserSubscriptions = async (userId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await apiClient.get(`http://localhost:4000/auth/getSubscriptions`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true
            });
            console.log("Subscriptions Response:", response.data);
            setSubscriptions(response.data.subscriptions);
        } catch (error) {
            console.error("Error fetching subscriptions:", error.response?.data || error.message);
        }
    };
    useEffect(() => {
        console.log("Updated subscriptions:", subscriptions);
    }, [subscriptions]);
    useEffect(() => {
        const pathToIcon = {
            "/": "home",
            "/short": "shorts",
            "/socialMedia": "socialMedia",
            "/subscriptions": "subscriptions"
        };
        const activeIcon = pathToIcon[location.pathname];
        setActiveIcons({
            home: activeIcon === "home",
            shorts: activeIcon === "shorts",
            socialMedia: activeIcon === "socialMedia",
            subscriptions: activeIcon === "subscriptions"
        });
    }, [location.pathname]);
    const handleIconToggle = (iconName) => {
        setActiveIcons({
            home: iconName === "home",
            shorts: iconName === "shorts",
            socialMedia: iconName === "socialMedia",
            subscriptions: iconName === "subscriptions"
        });
    };
    const sidebarOptions = [
        {
            icon: activeIcons.home ? <Home /> : <HomeOutlinedIcon />,
            label: "Home",
            link: "/",
            name: "home"
        },
        {
            icon: activeIcons.shorts ? <Videocam /> : <VideocamOutlinedIcon />,
            label: "Shorts",
            link: "/short",
            name: "shorts"
        },
        {
            icon: activeIcons.socialMedia ? <StarsIcon /> : <StarsOutlinedIcon />,
            label: "Social Media",
            link: "/socialMedia",
            name: "socialMedia"
        },
        {
            icon: activeIcons.subscriptions ? <Subscriptions /> : <SubscriptionsOutlinedIcon />,
            label: "Subscriptions",
            link: "/subscriptions",
            name: "subscriptions"
        }
    ];
    const middleOptions = [
        { icon: <History />, label: "History" },
        { icon: <PlaylistAdd />, label: "Playlist" },
        { icon: <SmartDisplayOutlined />, label: "Your Videos" }, // SmartDisplayRounded
        { icon: <WatchLaterOutlined />, label: "Watch Later" }, // WatchLaterRounded
        { icon: <ThumbUpAltOutlined />, label: "Liked Videos" } // ThumbUpAltRounded
    ];
    const exploreOptions = [
        { icon: <TrendingUp />, label: "Trending" },
        { icon: <MusicNoteRounded />, label: "Music" },
        { icon: <VideogameAssetOutlinedIcon />, label: "Gaming" }, // VideogameAssetRounded
        { icon: <NewspaperRounded />, label: "News" },
        { icon: <EmojiEventsOutlinedIcon />, label: "Sports" } // EmojiEventsRounded
    ];

    const footerLinks = [
        ["About", "Press", "Copyright"],
        ["Contact us", "Creators"],
        ["Advertise", "Developers"],
        ["Terms", "Privacy", "Policy & Safety"],
        ["How Metube works"],
        ["Test new features"]
    ];

    return (
        <div className={sideNavbar ? "home-sideNavbar" : "homeSideNavbarHide"}>
            <div className="home_sideNavbarTop">
                {sidebarOptions.map((option, index) => (
                    <Link to={option.link} key={index} className="home_sideNavbarTopOption" onClick={() => handleIconToggle(option.name)}>
                        {option.icon}
                        <div className="home_sideNavbarTopOptionTitle">{option.label}</div>
                    </Link>
                ))}
            </div>
            <div className="home_sideNavbarMiddle">
                <div className="home_sideNavbarTopOption">
                    <div className="home_sideNavbarTopOptionTitle">You</div>
                    <ChevronRight />
                </div>
                {middleOptions.map((option, index) => (
                    <div key={index} className="home_sideNavbarTopOption">
                        {option.icon}
                        <div className="home_sideNavbarTopOptionTitle">{option.label}</div>
                    </div>
                ))}
            </div>
            <div className="home_sideNavbarMiddle">
                <div className="home_sideNavbarTopOption">
                    <div className="home_sideNavbarTopOptionTitleHeader">Subscription</div>
                </div>
                {subscriptions && subscriptions.length > 0 ? (
                    subscriptions.map((channel) => (
                        <Link to={`/user/${channel._id}`} key={channel._id} className="home_sideNavbarTopOption">
                            <img className='home_sideNavbar_ImgLogo' src={channel.profilePic} alt={`${channel.name} logo`} />
                            <div className="home_sideNavbarTopOptionTitle">{channel.name}</div>
                        </Link>
                    ))
                ) : (
                    <div className="home_sideNavbarTopOptionTitle">No subscriptions available</div>
                )}
                <div className="home_sideNavbarTopOption">
                    <List />
                    <div className="home_sideNavbarTopOptionTitle">All Subscriptions</div>
                </div>
            </div>
            <div className="home_sideNavbarMiddle">
                <div className="home_sideNavbarTopOption">
                    <div className="home_sideNavbarTopOptionTitleHeader">Explore</div>
                </div>
                {exploreOptions.map((option, index) => (
                    <div key={index} className="home_sideNavbarTopOption">
                        {option.icon}
                        <div className="home_sideNavbarTopOptionTitle">{option.label}</div>
                    </div>
                ))}
            </div>
            <div className="home_sideNavbarMiddle">
                {[{ icon: <SettingsOutlinedIcon />, label: "Settings" }, { icon: <EmojiFlagsIcon />, label: "Report History" }, { icon: <HelpOutlineOutlined />, label: "Help" }, { icon: <FeedbackOutlined />, label: "Send Feedback" }]
                    .map((option, index) => (
                        <div key={index} className="home_sideNavbarTopOption">
                            {option.icon}
                            <div className="home_sideNavbarTopOptionTitle">{option.label}</div>
                        </div>
                    ))}
            </div>
            <div className="copyright">
                {footerLinks.map((links, index) => (
                    <ul key={index} className="copyright__list">
                        {links.map((link, subIndex) => (
                            <li key={subIndex} className="copyright__list-item">
                                <a href="#">{link}</a>
                            </li>
                        ))}
                    </ul>
                ))}
                <span className="copyright--text">© 2024 Google LLC</span>
            </div>
        </div>
    );
};

export default SideNavbar;