import React, { useEffect, useState } from 'react'
import './homePage.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
const HomePage = ({ sideNavbar }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:4000/api/allVideo').then(res => {
      console.log(res.data.videos)
      setData(res.data.videos);
    }).catch(err => {
      console.log(err);
    })
  }, [])
  const options = ["All", "Music", "Live", "Mixes", "Gaming", "Debates", "Comedy", "Recently Uploaded", "Watched", "New to you"];
  return (
    <div className={sideNavbar ? 'homePage' : 'fullHomePage'}>
      <div className="homePage_options">
        {
          options.map((item, index) => {
            return (
              <div key={index} className="homePage_option">
                {item}
              </div>
            );
          })
        }
      </div>
      <div className={sideNavbar ? "home_mainPage" : "home_mainPageWithoutLink"}>
            <div className="youtube_Video">
                <div className="youtube_thumbnailBox">
                    <img src="https://i.pinimg.com/originals/bb/12/03/bb12038681429c0e313c3001a973ef0f.jpg" alt="thumbnail" className="youtube_thumbnailPic" />
                    <div className="youtube_timingThumbnail">
                        28:05
                    </div>
                </div>
                <div className="youtubeTitleBox">
                    <div className="youtubeTitleBoxProfile">
                        <img src="https://i.pinimg.com/originals/59/54/b4/5954b408c66525ad932faa693a647e3f.jpg" alt="profile" className="youtube_thumbnail_Profile"/>
                    </div>
                    <div className="youtubeTItleBox_Title">
                    <div className="youtube_videoTitle">User1</div>
                    <div className="youtube_channelName">User1</div>
                    <div className="youtubeVideo_views">124 Likes</div>
                    </div>
                </div>
            </div>
            <div className="youtube_Video">
                <div className="youtube_thumbnailBox">
                    <img src="https://i.pinimg.com/originals/bb/12/03/bb12038681429c0e313c3001a973ef0f.jpg" alt="thumbnail" className="youtube_thumbnailPic" />
                    <div className="youtube_timingThumbnail">
                        28:05
                    </div>
                </div>
                <div className="youtubeTitleBox">
                    <div className="youtubeTitleBoxProfile">
                        <img src="https://i.pinimg.com/originals/59/54/b4/5954b408c66525ad932faa693a647e3f.jpg" alt="profile" className="youtube_thumbnail_Profile"/>
                    </div>
                    <div className="youtubeTItleBox_Title">
                    <div className="youtube_videoTitle">User1</div>
                    <div className="youtube_channelName">User1</div>
                    <div className="youtubeVideo_views">124 Likes</div>
                    </div>
                </div>
            </div>
            <div className="youtube_Video">
                <div className="youtube_thumbnailBox">
                    <img src="https://i.pinimg.com/originals/bb/12/03/bb12038681429c0e313c3001a973ef0f.jpg" alt="thumbnail" className="youtube_thumbnailPic" />
                    <div className="youtube_timingThumbnail">
                        28:05
                    </div>
                </div>
                <div className="youtubeTitleBox">
                    <div className="youtubeTitleBoxProfile">
                        <img src="https://i.pinimg.com/originals/59/54/b4/5954b408c66525ad932faa693a647e3f.jpg" alt="profile" className="youtube_thumbnail_Profile"/>
                    </div>
                    <div className="youtubeTItleBox_Title">
                    <div className="youtube_videoTitle">User1</div>
                    <div className="youtube_channelName">User1</div>
                    <div className="youtubeVideo_views">124 Likes</div>
                    </div>
                </div>
            </div>
            <div className="youtube_Video">
                <div className="youtube_thumbnailBox">
                    <img src="https://i.pinimg.com/originals/bb/12/03/bb12038681429c0e313c3001a973ef0f.jpg" alt="thumbnail" className="youtube_thumbnailPic" />
                    <div className="youtube_timingThumbnail">
                        28:05
                    </div>
                </div>
                <div className="youtubeTitleBox">
                    <div className="youtubeTitleBoxProfile">
                        <img src="https://i.pinimg.com/originals/59/54/b4/5954b408c66525ad932faa693a647e3f.jpg" alt="profile" className="youtube_thumbnail_Profile"/>
                    </div>
                    <div className="youtubeTItleBox_Title">
                    <div className="youtube_videoTitle">User1</div>
                    <div className="youtube_channelName">User1</div>
                    <div className="youtubeVideo_views">124 Likes</div>
                    </div>
                </div>
            </div>
            <div className="youtube_Video">
                <div className="youtube_thumbnailBox">
                    <img src="https://i.pinimg.com/originals/bb/12/03/bb12038681429c0e313c3001a973ef0f.jpg" alt="thumbnail" className="youtube_thumbnailPic" />
                    <div className="youtube_timingThumbnail">
                        28:05
                    </div>
                </div>
                <div className="youtubeTitleBox">
                    <div className="youtubeTitleBoxProfile">
                        <img src="https://i.pinimg.com/originals/59/54/b4/5954b408c66525ad932faa693a647e3f.jpg" alt="profile" className="youtube_thumbnail_Profile"/>
                    </div>
                    <div className="youtubeTItleBox_Title">
                    <div className="youtube_videoTitle">User1</div>
                    <div className="youtube_channelName">User1</div>
                    <div className="youtubeVideo_views">124 Likes</div>
                    </div>
                </div>
            </div>
            <div className="youtube_Video">
                <div className="youtube_thumbnailBox">
                    <img src="https://i.pinimg.com/originals/bb/12/03/bb12038681429c0e313c3001a973ef0f.jpg" alt="thumbnail" className="youtube_thumbnailPic" />
                    <div className="youtube_timingThumbnail">
                        28:05
                    </div>
                </div>
                <div className="youtubeTitleBox">
                    <div className="youtubeTitleBoxProfile">
                        <img src="https://i.pinimg.com/originals/59/54/b4/5954b408c66525ad932faa693a647e3f.jpg" alt="profile" className="youtube_thumbnail_Profile"/>
                    </div>
                    <div className="youtubeTItleBox_Title">
                    <div className="youtube_videoTitle">User1</div>
                    <div className="youtube_channelName">User1</div>
                    <div className="youtubeVideo_views">124 Likes</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomePage