import React from 'react';
import './sideNavbar.css';
import { Home, Videocam, Subscriptions, ChevronRight, History, PlaylistAdd, SmartDisplayOutlined, WatchLaterOutlined, ThumbUpAltOutlined, List, TrendingUp, MusicNoteRounded, VideogameAssetRounded, EmojiEventsRounded, NewspaperRounded, Settings, FeedbackOutlined, HelpOutlineOutlined, FlagRounded } from '@mui/icons-material';
const SideNavbar = ({ sideNavbar }) => {
    const sidebarOptions = [
        { icon: <Home />, label: "Home" },
        { icon: <Videocam />, label: "Shorts" },
        { icon: <Subscriptions />, label: "Subscriptions" }
    ];
    const middleOptions = [
        { icon: <History />, label: "History" },
        { icon: <PlaylistAdd />, label: "Playlist" },
        { icon: <SmartDisplayOutlined />, label: "Your Videos" },
        { icon: <WatchLaterOutlined />, label: "Watch Later" },
        { icon: <ThumbUpAltOutlined />, label: "Liked Videos" }
    ];
    const exploreOptions = [
        { icon: <TrendingUp />, label: "Trending" },
        { icon: <MusicNoteRounded />, label: "Music" },
        { icon: <VideogameAssetRounded />, label: "Gaming" },
        { icon: <NewspaperRounded />, label: "News" },
        { icon: <EmojiEventsRounded />, label: "Sports" }
    ];
    const subscriptions = [
        { label: "Dog", imgSrc: 'https://i.pinimg.com/564x/32/2a/27/322a27a8027a524af908b7246a801809.jpg' },
        { label: "Rabbit", imgSrc: 'https://i.pinimg.com/736x/c7/60/ab/c760abe4d6e1abf565e71baec5778247.jpg' },
        { label: "Fox", imgSrc: 'https://i.pinimg.com/564x/85/f6/b3/85f6b3fd42dd521ead51548be0123bb8.jpg' },
        { label: "Raccoon", imgSrc: 'https://i.pinimg.com/736x/0a/56/d9/0a56d92be017160bce393c78a400d37d.jpg' }
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
                    <div key={index} className="home_sideNavbarTopOption">
                        {option.icon}
                        <div className="home_sideNavbarTopOptionTitle">{option.label}</div>
                    </div>
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
                {subscriptions.map((channel, index) => (
                    <div key={index} className="home_sideNavbarTopOption">
                        <img className='home_sideNavbar_ImgLogo' src={channel.imgSrc} alt={`${channel.label} logo`} />
                        <div className="home_sideNavbarTopOptionTitle">{channel.label}</div>
                    </div>
                ))}
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
                {[{ icon: <Settings />, label: "Settings" }, { icon: <FlagRounded />, label: "Report History" }, { icon: <HelpOutlineOutlined />, label: "Help" }, { icon: <FeedbackOutlined />, label: "Send Feedback" }]
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