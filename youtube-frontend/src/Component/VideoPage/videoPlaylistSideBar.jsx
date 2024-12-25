import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './videoPlaylistSideBar.css';
import apiClient from '../../Utils/apiClient.js';

const VideoPlaylistSideBar = ({ playlistId, token }) => {
  const [videos, setVideos] = useState([]);
  const [playlistTitle, setPlaylistTitle] = useState('');
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchPlaylistVideos = async () => {
      try {
        const res = await apiClient.get(`http://localhost:4000/playlist/getPlaylistById/${playlistId}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        if (res.data && res.data.playlist) {
          const uniqueVideos = Array.from(new Set(res.data.playlist.videos.map(video => video._id)))
            .map(id => res.data.playlist.videos.find(video => video._id === id));
          setVideos(uniqueVideos);
          setPlaylistTitle(res.data.playlist.title);
        } else {
          console.warn("No videos found in response.");
        }
      } catch (err) {
        console.error("Error fetching playlist videos:", err);
      }
    };

    if (playlistId) {
      fetchPlaylistVideos();
    } else {
      console.error("No playlist ID provided");
    }
  }, [playlistId, token]);

  useEffect(() => {
    if (location.state?.fromPlaylistPage) {
      setCollapsed(false);
    }
  }, [location]);

  const togglePlaylist = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="videoPlaylistSidebar">
      <div className="videoPlaylistSidebarHeader" onClick={togglePlaylist}>
        <span>{playlistTitle}</span>
        <div>
          <i className={`fas fa-chevron-${collapsed ? 'down' : 'up'}`} onClick={togglePlaylist}></i>
        </div>
      </div>
      <div className={`videoPlaylistSidebarList ${collapsed ? 'collapsed' : ''}`} id="videoList">
        {videos.map((video) => {
          console.log(video);
          return (
            <Link 
              to={`/watch/${video._id}`} 
              key={video._id} 
              className="videoPlaylistSidebarItem" 
              state={{ playlistId, fromPage: 'playlistPage' }}
            >
              <div>
                <i className="fas fa-bars"></i>
              </div>
              <div className='videoPlaylistSidebarThumbnailBox'>
                <img src={video.thumbnail || 'https://via.placeholder.com/40'} alt="Video Thumbnail" className="videoPlaylistSidebarItemImg"/>
                <div className="videoPlaylistSidebarDuration">{video.duration || 'Unknown'}</div>
              </div>
              <div>
                <div className="videoPlaylistSidebarTitle">{video.title}</div>
                <div className="videoPlaylistSidebarChannel">
                  {video.user?.name || 'Unknown Channel'} • {video.views} views
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default VideoPlaylistSideBar;