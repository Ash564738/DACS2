import React, { useEffect, useState } from 'react';
import './likedVideoPage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const LikedVideoPage = ({ sideNavbar }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const options = [
    "All",
    "Music",
    "Animation",
    "Documentary",
    "Education",
    "Entertainment",
    "Playlists",
    "Mixes",
    "Gaming",
    "Food",
    "Comedy",
    "Recently Uploaded",
    "Watched",
    "New to you",
  ];

  return (
    <div className={sideNavbar ? 'likedVideoPage' : 'fullLikedVideoPage'}>
      <div className={sideNavbar ? "likedVideo_mainPage" : "likedVideo_mainPageWithoutLink"}>
        <div className="likedVideoCard">
          <img className="likedVideoCardImg" src="https://images.pexels.com/photos/5859225/pexels-photo-5859225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Nat King Cole L-O-V-E" />
          <div className="likedVideoCardInfo">
            <span>Liked videos</span>
            <span className="likedVideoCardOwner">Kiều Trang</span>
            <span>585 videos · No views · Updated today</span>
            <div className="likedVideoCardControl">
              <div>
                <span>Play all</span>
              </div>
              <div>
              <span>Shuffle</span>
              </div>
            </div>
          </div>
        </div>
        <div className="likedVideoWrapper">
          <div className="likedVideoPage_options">
            {options.map((item, index) => (
              <div 
                key={index} 
                className={`likedVideoPage_option ${selectedCategory === item ? "active" : ""}`} 
                // onClick={() => handleCategoryClick(item)}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="likedVideoList">
            <div className="likedVideo">
              <div className="likedVideoIndex">
                <span>1</span>
              </div>
              <div className="likedVideoContent">
                <img src="https://i.ytimg.com/vi/tDukIfFzX18/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLA0F06QIAvjOJc_7TmQYcfKN5Zfaw" alt="L-O-V-E" className="likedVideoThumbnail" />
                <div className="likedVideoDetails">
                  <span className="likedVideoTitle">L-O-V-E</span>
                  <span className="likedVideoInfo">Nat King Cole · 3.9M views · 8 years ago</span>
                </div>
              </div>
              <div className="likedVideoFunctions">
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </div>
            </div>
            <div className="likedVideo">
              <div className="likedVideoIndex">
                <span>2</span>
              </div>
              <div className="likedVideoContent">
                <img src="https://i.ytimg.com/vi/sLWpTooEttI/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDYVwNLjNjcmEiCkUep7SIo8xinzg" alt="Write This Down" className="likedVideoThumbnail" />
                <div className="likedVideoDetails">
                  <span className="likedVideoTitle">SoulChef - Write This Down (Feat. Nieve)</span>
                  <span className="likedVideoInfo">Délicieuse Musique · 27M views · 11 years ago</span>
                </div>
              </div>
              <div className="likedVideoFunctions">
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </div>
            </div>
            <div className="likedVideo">
              <div className="likedVideoIndex">
                <span>3</span>
              </div>
              <div className="likedVideoContent">
                <img src="https://i.ytimg.com/vi/sLWpTooEttI/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDYVwNLjNjcmEiCkUep7SIo8xinzg" alt="Everyday Normal Guy 2" className="likedVideoThumbnail" />
                <div className="likedVideoDetails">
                  <span className="likedVideoTitle">Everyday Normal Guy 2</span>
                  <span className="likedVideoInfo">Jon Lajoie · 108M views · 16 years ago</span>
                </div>
              </div>
              <div className="likedVideoFunctions">
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </div>
            </div>
            <div className="likedVideo">
              <div className="likedVideoIndex">
                <span>4</span>
              </div>
              <div className="likedVideoContent">
                <img src="https://i.ytimg.com/vi/y5BJHYrbg1U/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCaPOJfXMr_-XFivzxwjW0Qc4uYBQ" alt="Jagwar Twin - Bad Feeling" className="likedVideoThumbnail" />
                <div className="likedVideoDetails">
                  <span className="likedVideoTitle">Jagwar Twin - Bad Feeling (Oompa Loompa)</span>
                  <span className="likedVideoInfo">Jagwar Twin · 17M views · 11 months ago</span>
                </div>
              </div>
              <div className="likedVideoFunctions">
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikedVideoPage;