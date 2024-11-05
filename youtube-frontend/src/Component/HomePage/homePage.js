import React, { useEffect, useState } from 'react';
import './homePage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
const HomePage = ({ sideNavbar }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:4000/api/allVideo')
      .then(res => {
        console.log(res.data.videos);
        setData(res.data.videos);
      })
      .catch(err => {
        console.error("Error fetching videos:", err);
      });
  }, []);
  const options = ["All", "Music", "Live", "Mixes", "Gaming", "Debates", "Comedy", "Recently Uploaded", "Watched", "New to you"];
  return (
    <div className={sideNavbar ? 'homePage' : 'fullHomePage'}>
      <div className="homePage_options">
        {options.map((item, index) => (
          <div key={index} className="homePage_option">
            {item}
          </div>
        ))}
      </div>
      <div className={sideNavbar ? "home_mainPage" : "home_mainPageWithoutLink"}>
        {data?.map((item) => (
          <Link key={item._id} to={`/watch/${item._id}`} className="youtube_Video">
            <div className="youtube_thumbnailBox">
              <img src={item.thumbnailUrl || "default_thumbnail.jpg"} alt={`${item.title} thumbnail`} className="youtube_thumbnailPic" />
              <div className="youtube_timingThumbnail">
                {item.duration || "00:00"}
              </div>
            </div>
            <div className="youtubeTitleBox">
              <div className="youtubeTitleBoxProfile">
                <img src={item.channelProfilePic || "default_profile.jpg"} alt={`${item.channelName} profile`} className="youtube_thumbnail_Profile" />
              </div>
              <div className="youtubeTitleBox_Title">
                <div className="youtube_videoTitle">{item.title || "Untitled Video"}</div>
                <div className="youtube_channelName">{item.channelName || "Unknown Channel"}</div>
                <div className="youtubeVideo_views">{item.views ? `${item.views} Likes` : "0 Likes"}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default HomePage;