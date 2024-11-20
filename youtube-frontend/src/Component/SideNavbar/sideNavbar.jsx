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
        subscriptions: false,
        history: false,
        playlist: false,
        yourVideos: false,
        watchLater: false,
        likedVideos: false,
        trending: false,
        music: false,
        gaming: false,
        news: false,
        sports: false,
        settings: false,
        reportHistory: false,
        help: false,
        sendFeedback: false
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
                withCredentials: true,
            });
            setSubscriptions(response.data.subscribedUsers || []);
        } catch (error) {
            console.error("Error fetching subscriptions:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        const pathToIcon = {
            "/": "home",
            "/short": "shorts",
            "/socialMedia": "socialMedia",
            "/subscription": "subscriptions",
            "/history": "history",
            "/playlist": "playlist",
            "/your-videos": "yourVideos",
            "/watch-later": "watchLater",
            "/likedVideo": "likedVideos",
            "/trending": "trending",
            "/music": "music",
            "/gaming": "gaming",
            "/news": "news",
            "/sports": "sports",
            "/settings": "settings",
            "/report-history": "reportHistory",
            "/help": "help",
            "/send-feedback": "sendFeedback"
        };
        const activeIcon = pathToIcon[location.pathname];
        setActiveIcons((prevIcons) => ({
            ...prevIcons,
            [activeIcon]: true
        }));
    }, [location.pathname]);

    const handleIconToggle = (iconName) => {
        setActiveIcons((prevIcons) => ({
            ...prevIcons,
            [iconName]: !prevIcons[iconName]
        }));
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
            link: "/subscription",
            name: "subscriptions"
        }
    ];

    const middleOptions = [
        { icon: activeIcons.history ? <History /> : <History />, label: "History", link: "/history", name: "history" },
        { icon: activeIcons.playlist ? <PlaylistAdd /> : <PlaylistAdd />, label: "Playlist", link: "/playlist", name: "playlist" },
        { icon: activeIcons.yourVideos ? <SmartDisplayRounded /> : <SmartDisplayOutlined />, label: "Your Videos", link: "/your-videos", name: "yourVideos" },
        { icon: activeIcons.watchLater ? <WatchLaterRounded /> : <WatchLaterOutlined />, label: "Watch Later", link: "/watch-later", name: "watchLater" },
        { icon: activeIcons.likedVideos ? <ThumbUpAltRounded /> : <ThumbUpAltOutlined />, label: "Liked Videos", link: "/likedVideo", name: "likedVideos" }
    ];

    const exploreOptions = [
        { icon: activeIcons.trending ? <TrendingUp /> : <TrendingUp />, label: "Trending", link: "/trending", name: "trending" },
        { icon: activeIcons.music ? <MusicNoteRounded /> : <MusicNoteRounded />, label: "Music", link: "/music", name: "music" },
        { icon: activeIcons.gaming ? <VideogameAssetRounded /> : <VideogameAssetOutlinedIcon />, label: "Gaming", link: "/gaming", name: "gaming" },
        { icon: activeIcons.news ? <NewspaperRounded /> : <NewspaperRounded />, label: "News", link: "/news", name: "news" },
        { icon: activeIcons.sports ? <EmojiEventsRounded /> : <EmojiEventsOutlinedIcon />, label: "Sports", link: "/sports", name: "sports" }
    ];

    const footerOptions = [
        { icon: activeIcons.settings ? <Settings /> : <SettingsOutlinedIcon />, label: "Settings", link: "/settings", name: "settings" },
        { icon: activeIcons.reportHistory ? <FlagRounded /> : <EmojiFlagsIcon />, label: "Report History", link: "/report-history", name: "reportHistory" },
        { icon: activeIcons.help ? <HelpOutlineOutlined /> : <HelpOutlineOutlined />, label: "Help", link: "/help", name: "help" },
        { icon: activeIcons.sendFeedback ? <FeedbackOutlined /> : <FeedbackOutlined />, label: "Send Feedback", link: "/send-feedback", name: "sendFeedback" }
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
                    <Link to={option.link} key={index} className="home_sideNavbarTopOption" onClick={() => handleIconToggle(option.name)}>
                        {option.icon}
                        <div className="home_sideNavbarTopOptionTitle">{option.label}</div>
                    </Link>
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
                <Link to="/all-subscriptions" className="home_sideNavbarTopOption">
                    <List />
                    <div className="home_sideNavbarTopOptionTitle">All Subscriptions</div>
                </Link>
            </div>
            <div className="home_sideNavbarMiddle">
                <div className="home_sideNavbarTopOption">
                    <div className="home_sideNavbarTopOptionTitleHeader">Explore</div>
                </div>
                {exploreOptions.map((option, index) => (
                    <Link to={option.link} key={index} className="home_sideNavbarTopOption" onClick={() => handleIconToggle(option.name)}>
                        {option.icon}
                        <div className="home_sideNavbarTopOptionTitle">{option.label}</div>
                    </Link>
                ))}
            </div>
            <div className="home_sideNavbarMiddle">
                {footerOptions.map((option, index) => (
                    <Link to={option.link} key={index} className="home_sideNavbarTopOption" onClick={() => handleIconToggle(option.name)}>
                        {option.icon}
                        <div className="home_sideNavbarTopOptionTitle">{option.label}</div>
                    </Link>
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