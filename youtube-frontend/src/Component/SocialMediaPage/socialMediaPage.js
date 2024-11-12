import './socialMediaPage.css'
import React, { useEffect, useState } from 'react';
import 'flatpickr/dist/flatpickr.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import apiClient from '../../Utils/apiClient.js';
const SocialMediaPage = ({ sideNavbar }) => {
  return (
    <div className={sideNavbar ? 'socialMediaPage' : 'fullSocialMediaPage'}>
    <div className="main-content">
            <div className="story-gallery">
                <div className="story story1">
                    <img src="/youtube-frontend/public/upload.png" alt=""/>
                    <p>Post Story</p>
                </div>

                <div className="story story2">
                    <img src="https://i.pinimg.com/736x/3b/ab/83/3bab8337c383e9481acfac14bea5d65c.jpg" alt=""/>
                    <p>Mèo méo meo mèo meo</p>
                </div>

                <div className="story story3">
                    <img src="https://i.pinimg.com/736x/3b/ab/83/3bab8337c383e9481acfac14bea5d65c.jpg" alt=""/>
                    <p>Hông biết nựa</p>
                </div>

                <div className="story story4">
                    <img src="https://i.pinimg.com/736x/3b/ab/83/3bab8337c383e9481acfac14bea5d65c.jpg" alt=""/>
                    <p>Sợ hãi</p>
                </div>

                <div className="story story5">
                    <img src="https://i.pinimg.com/736x/3b/ab/83/3bab8337c383e9481acfac14bea5d65c.jpg" alt=""/>
                    <p>Buồn ngủ</p>
                </div>
            </div>

            <div className="write-post-container">
                <div className="user-profile">
                    <img src="/youtube-frontend/public/logo192.png" alt=""/>
                    <div>
                        <p>Nheeeeeeee</p>
                        <small>Public <i className="fa-solid fa-caret-down"></i></small>
                    </div>
                </div>

                <div className="post-input-container">
                    <textarea rows="3" placeholder="What's on your mind, Nheeeeeee"></textarea>

                    <div className="add-post-links">
                        <a href="#"><img src="/youtube-frontend/public/live-video.png" alt=""/>Like Video</a>
                        <a href="#"><img src="/youtube-frontend/public/photo.png" alt=""/>Photo/Video</a>
                        <a href="#"><img src="/youtube-frontend/public/feeling.png" alt=""/>Feeling/Activity</a>
                    </div>
                </div>
            </div>

            <div className="post-container">
                <div className="post-row">
                    <div className="user-profile">
                        <img src="/youtube-frontend/public/logo192.png" alt=""/>
                        <div>
                            <p>Nheeeeeeee</p>
                            <span>June 24 2021, 13:40 pm</span>
                        </div>
                    </div>

                    <a href="#"><i className="fa-solid fa-ellipsis-vertical"></i></a>
                </div>
                <p className="post-text">Subscribe <span>@Easy Tutorials</span> Youtube channel to watch more videos on website development and UI designs. <a href="#">#EasyTutorials</a> <a href="#">#YoutubeChannel</a></p>
                <img src="https://i.ytimg.com/vi/Om6VGYXZAas/maxresdefault.jpg" className="post-img"/>

                <div className="post-row">
                    <div className="activity-icons">
                        <div><img src="/youtube-frontend/public/like-blue.png" alt=""/> 120</div>
                        <div><img src="/youtube-frontend/public/comments.png" alt=""/> 45</div>
                        <div><img src="/youtube-frontend/public/share.png" alt=""/> 20</div>

                    </div>

                    <div className="post-profile-icon">
                        <img src="/youtube-frontend/public/logo192.png" alt=""/><i className="fa-solid fa-caret-down"> </i>
                    </div>
                </div>
            </div>

            <div className="post-container">
                <div className="post-row">
                    <div className="user-profile">
                        <img src="/youtube-frontend/public/logo192.png" alt=""/>
                        <div>
                            <p>Nheeeeeeee</p>
                            <span>June 24 2021, 13:40 pm</span>
                        </div>
                    </div>

                    <a href="#"><i className="fa-solid fa-ellipsis-vertical"></i></a>
                </div>
                <p className="post-text">Subscribe <span>@Easy Tutorials</span> Youtube channel to watch more videos on website development and UI designs. <a href="#">#EasyTutorials</a> <a href="#">#YoutubeChannel</a></p>
                <img src="https://nyse.edu.vn/wp-content/uploads/2023/03/1678290201_321_Nguon-goc-meme-chu-de-dong-vat-game-thu-say.jpg" className="post-img"/>

                <div className="post-row">
                    <div className="activity-icons">
                        <div><img src="/youtube-frontend/public/like-blue.png" alt=""/> 120</div>
                        <div><img src="/youtube-frontend/public/comments.png" alt=""/> 45</div>
                        <div><img src="/youtube-frontend/public/share.png" alt=""/> 20</div>

                    </div>

                    <div className="post-profile-icon">
                        <img src="/youtube-frontend/public/logo192.png" alt=""/><i className="fa-solid fa-caret-down"> </i>
                    </div>
                </div>
            </div>

            <div className="post-container">
                <div className="post-row">
                    <div className="user-profile">
                        <img src="/youtube-frontend/public/logo192.png" alt=""/>
                        <div>
                            <p>Nheeeeeeee</p>
                            <span>June 24 2021, 13:40 pm</span>
                        </div>
                    </div>

                    <a href="#"><i className="fa-solid fa-ellipsis-vertical"></i></a>
                </div>
                <p className="post-text">Like and share this picture with friends, tag <span>@Easy Tutorials</span> facebook page on your post. Ask your doubts in the comments <a href="#">#EasyTutorials</a> <a href="#">#YoutubeChannel</a></p>
                <img src="https://i.pinimg.com/originals/cc/75/85/cc758589c5fc64edc7794567c076ce5c.jpg" className="post-img"/>

                <div className="post-row">
                    <div className="activity-icons">
                        <div><img src="/youtube-frontend/public/like-blue.png" alt=""/> 120</div>
                        <div><img src="/youtube-frontend/public/comments.png" alt=""/> 45</div>
                        <div><img src="/youtube-frontend/public/share.png" alt=""/> 20</div>

                    </div>

                    <div className="post-profile-icon">
                        <img src="/youtube-frontend/public/logo192.png" alt=""/><i className="fa-solid fa-caret-down"> </i>
                    </div>
                </div>
            </div>
            <button type="button" className="load-more-btn">Load More</button>
        </div>
        <div className="right-sidebar">
            <div className="sidebar-title">
                <h4>Events</h4>
                <a href="#">See All</a>
            </div>

            <div className="event">
                <div className="left-event">
                    <h3>18</h3>
                    <span>March</span>
                </div>
                <div className="right-event">
                    <h4>Social Media</h4>
                    <p><i className="fa-solid fa-location-dot"></i> Willson Tech Park</p>
                    <a href="#">More Info</a>
                </div>
            </div>

            <div className="event">
                <div className="left-event">
                    <h3>22</h3>
                    <span>June</span>
                </div>
                <div className="right-event">
                    <h4>Mobile Marketing</h4>
                    <p><i className="fa-solid fa-location-dot"></i> Willson Tech Park</p>
                    <a href="#">More Info</a>
                </div>
            </div>

            <div className="sidebar-title">
                <h4>Advertisement</h4>
                <a href="#">Close</a>
            </div>

            <img src="https://devo.vn/wp-content/uploads/2023/01/oe.jpg" alt="" className="sidebar-ads"/>

            <div className="sidebar-title">
                <h4>Conversation</h4>
                <a href="#">Hide Chat</a>
            </div>

            <div className="online-list">
                <div className="online">
                    <img src="https://thuthuatnhanh.com/wp-content/uploads/2022/06/hinh-meme-meo-dap-mat-na.jpg" alt=""/>
                </div>
                <p>Mèo méo meo mèo meo</p>
            </div>

            <div className="online-list">
                <div className="online">
                    <img src="https://i.pinimg.com/736x/f7/a0/24/f7a024308c46cc9d9d4660efda1af734.jpg" alt=""/>
                </div>
                <p>Hông biết nựa</p>
            </div>

            <div className="online-list">
                <div className="online">
                    <img src="https://i.pinimg.com/736x/39/9e/41/399e41e882c143c64948007dce366c7f.jpg" alt=""/>
                </div>
                <p>Sợ hãi</p>
            </div>
        </div>
        </div>
  )
}
export default SocialMediaPage