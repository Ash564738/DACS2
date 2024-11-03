import React from 'react'
import './sideNavbar.css'
import HomeIcon from '@mui/icons-material/Home';
import VideocamIcon from '@mui/icons-material/Videocam';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HistoryIcon from '@mui/icons-material/History';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ListIcon from '@mui/icons-material/List';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MusicNoteRoundedIcon from '@mui/icons-material/MusicNoteRounded';
import VideogameAssetRoundedIcon from '@mui/icons-material/VideogameAssetRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import NewspaperRoundedIcon from '@mui/icons-material/NewspaperRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
const SideNavbar = ({sideNavbar}) => {
    return (
        <div className={sideNavbar?"home-sideNavbar":"homeSideNavbarHide"}>
        <div className="home_sideNavbarTop">
            <div className={`home_sideNavbarTopOption`} >
                <HomeIcon />
                <div className="home_sideNavbarTopOptionTitle" >Home</div>
            </div>
            <div className={`home_sideNavbarTopOption`} >
                <VideocamIcon />
                <div className="home_sideNavbarTopOptionTitle" >Shorts</div>
            </div>
            <div className={`home_sideNavbarTopOption`} >
                <SubscriptionsIcon />
                <div className="home_sideNavbarTopOptionTitle" >Subscriptions</div>
            </div>
        </div>
        <div className="home_sideNavbarMiddle">
            <div className={`home_sideNavbarTopOption`} >
                <div className="home_sideNavbarTopOptionTitle" >You</div>
                    <ChevronRightIcon />
            </div>
            <div className={`home_sideNavbarTopOption`} >
                <HistoryIcon />
                <div className="home_sideNavbarTopOptionTitle" >History</div>
            </div>
            <div className={`home_sideNavbarTopOption`} >
                <PlaylistAddIcon />
                <div className="home_sideNavbarTopOptionTitle" >Playlist</div>
            </div>
            <div className={`home_sideNavbarTopOption`} >
                <SmartDisplayOutlinedIcon />
                <div className="home_sideNavbarTopOptionTitle" >Your Videos</div>
            </div>
            <div className={`home_sideNavbarTopOption`} >
                <WatchLaterOutlinedIcon />
                <div className="home_sideNavbarTopOptionTitle" >Watch Later</div>
            </div>
            <div className={`home_sideNavbarTopOption`} >
                <ThumbUpAltOutlinedIcon />
                <div className="home_sideNavbarTopOptionTitle" >Liked Videos</div>
            </div>
        </div>
        <div className="home_sideNavbarMiddle">
            <div className="home_sideNavbarTopOption">
                <div className="home_sideNavbarTopOptionTitleHeader">Subscription</div>
            </div>
            <div className="home_sideNavbarTopOption">
                <img className='home_sideNavbar_ImgLogo' src='https://www.medianews4u.com/wp-content/uploads/2020/04/Aaj-Tak-2.jpg' />
                <div className="home_sideNavbarTopOptionTitle">Aaj Tak</div>
            </div>
            <div className="home_sideNavbarTopOption">
                <img className='home_sideNavbar_ImgLogo' src='https://th.bing.com/th/id/R.bce6ed4af85677ce3b6908ac7e8e631b?rik=DFwXRhY0pZxYIg&pid=ImgRaw&r=0' />
                <div className="home_sideNavbarTopOptionTitle">The LallanTop</div>
            </div>
            <div className="home_sideNavbarTopOption">
                <img className='home_sideNavbar_ImgLogo' src='https://th.bing.com/th/id/OIP.Ptvb889e_arCEj1IgCROgAHaHa?rs=1&pid=ImgDetMain' />
                <div className="home_sideNavbarTopOptionTitle">NDTV India</div>
            </div>
            <div className={`home_sideNavbarTopOption`} >
                <ListIcon />
                <div className="home_sideNavbarTopOptionTitle" >All Subscriptions</div>
            </div>
        </div>
        <div className="home_sideNavbarMiddle">
            <div className="home_sideNavbarTopOption">
                <div className="home_sideNavbarTopOptionTitleHeader">Explore</div>
            </div>
            <div className={`home_sideNavbarTopOption`} >
                <TrendingUpIcon/>
                <div className="home_sideNavbarTopOptionTitle" >Trending</div>
            </div>
            <div className={`home_sideNavbarTopOption`} >
                <MusicNoteRoundedIcon />
                <div className="home_sideNavbarTopOptionTitle" >Music</div>
            </div>
            <div className={`home_sideNavbarTopOption`} >
                <VideogameAssetRoundedIcon/>
                <div className="home_sideNavbarTopOptionTitle" >Gaming</div>
            </div>
            <div className={`home_sideNavbarTopOption`} >
                <NewspaperRoundedIcon/>
                <div className="home_sideNavbarTopOptionTitle" >News</div>
            </div>
            <div className={`home_sideNavbarTopOption`} >
                <EmojiEventsRoundedIcon/>
                <div className="home_sideNavbarTopOptionTitle" >Sports</div>
            </div>
        </div>
        <div className="home_sideNavbarMiddle">
            <div className={`home_sideNavbarTopOption`} >
                <SettingsIcon/>
                <div className="home_sideNavbarTopOptionTitle" >Settings</div>
            </div>
            <div className={`home_sideNavbarTopOption`} >
                <FlagRoundedIcon />
                <div className="home_sideNavbarTopOptionTitle" >Report History</div>
            </div>
            <div className={`home_sideNavbarTopOption`} >
                <HelpOutlineOutlinedIcon/>
                <div className="home_sideNavbarTopOptionTitle" >Help</div>
            </div>
            <div className={`home_sideNavbarTopOption`} >
                <FeedbackOutlinedIcon/>
                <div className="home_sideNavbarTopOptionTitle" >Send Feedback</div>
            </div>
        </div>
        <div className ="copyright">
                <ul className ="copyright__list">
                    <li className ="copyright__list-item">
                        <a href="#">About</a>
                    </li>
                    <li className ="copyright__list-item">
                        <a href="#">Press</a>
                    </li>
                    <li className ="copyright__list-item">
                        <a href="#">Copyright</a>
                    </li>
                </ul>
                <ul className ="copyright__list">
                    <li className ="copyright__list-item">
                        <a href="#">Contact us</a>
                    </li>
                    <li className ="copyright__list-item">
                        <a href="#">Creators</a>
                    </li>
                </ul>
                <ul className ="copyright__list copyright__list--margin">
                    <li className ="copyright__list-item">
                        <a href="#">Advertise</a>
                    </li>
                    <li className ="copyright__list-item">
                        <a href="#">Developers</a>
                    </li>
                </ul>
                <ul className ="copyright__list">
                    <li className ="copyright__list-item">
                        <a href="#">Terms</a>
                    </li>
                    <li className ="copyright__list-item">
                        <a href="#">Privacy</a>
                    </li>
                    <li className ="copyright__list-item">
                        <a href="#">Policy & Safety</a>
                    </li>
                </ul>
                <ul className ="copyright__list copyright__list--last">
                    <li className ="copyright__list-item">
                        <a href="#">How Metube works</a>
                    </li>
                </ul>
                <ul className ="copyright__list">
                    <li className ="copyright__list-item">
                        <a href="#">Test new features</a>
                    </li>
                </ul>
                <span className ="copyright--text">© 2024 Google LLC</span>
            </div>
    </div>
  )
}

export default SideNavbar