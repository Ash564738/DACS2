import React, { useEffect, useState } from 'react';
import './historyPage.css';
import apiClient from '../../Utils/apiClient';

const HistoryPage = ({ sideNavbar }) => {
  const [historyVideos, setHistoryVideos] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchHistory = async () => {
      console.log("Fetching history...");
      try {
        const res = await apiClient.get('http://localhost:4000/history/getHistory', {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        console.log("History fetched successfully:", res.data.history);
        setHistoryVideos(res.data.history || []);
      } catch (err) {
        console.error('Error fetching history:', err);
      }
    };

    fetchHistory();
  }, [token]);

  const handleDeleteVideo = async (historyId) => {
    try {
      await apiClient.delete(`http://localhost:4000/history/deleteHistory/${historyId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setHistoryVideos(historyVideos.filter(historyItem => historyItem._id !== historyId));
    } catch (err) {
      console.error('Error deleting video from history:', err);
    }
  };

  return (
    <div className={sideNavbar ? 'historyPage' : 'fullHistoryPage'}>
      <div className={"history_mainPage"}>
        <h1>History</h1>
        {historyVideos.length > 0 ? (
          historyVideos.map((historyItem) => (
            <div key={historyItem._id} className="video-item">
              <video
                controls
                width="200"
                height="200"
                poster={historyItem.video.thumbnail}
              >
                <source src={historyItem.video.videoLink} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="video-info">
                <h3>{historyItem.video.title}</h3>
                <p>
                  {historyItem.video.user?.name || 'Unknown Channel'} • {historyItem.video.views} views
                </p>
              </div>
              <div className="video-actions">
                <i className="fas fa-times" onClick={() => handleDeleteVideo(historyItem._id)}></i>
                <i className="fas fa-ellipsis-v"></i>
              </div>
            </div>
          ))
        ) : (
          <p>No videos in history.</p>
        )}
      </div>
      <div className="sidebar">
        <input placeholder="Search in video list..." type="text" />
        <ul>
          <li>
            <i className="fas fa-trash-alt"></i> Delete all watch history
          </li>
          <li>
            <i className="fas fa-pause"></i> Pause watch history
          </li>
          <li>
            <i className="fas fa-cog"></i> Manage all activity history
          </li>
          <li>Comments</li>
          <li>Posts</li>
          <li>Live chats</li>
        </ul>
      </div>
    </div>
  );
};

export default HistoryPage;