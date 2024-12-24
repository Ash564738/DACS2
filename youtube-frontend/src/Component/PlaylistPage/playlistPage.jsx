import React, { useEffect, useState } from 'react';
import './playlistPage.css';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../Utils/apiClient.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditPlaylistModal from './EditPlaylistModal';
import { Link } from 'react-router-dom';

const PlaylistPage = ({ sideNavbar }) => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("a-z");
  const [showPlaylistFunction, setShowPlaylistFunction] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const res = await apiClient.get('http://localhost:4000/playlist/getUserPlaylists', {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        if (res.data && res.data.playlists) {
          setPlaylists(res.data.playlists);
        } else {
          console.warn("No playlists found in response.");
        }
      } catch (err) {
        console.error("Error fetching playlists:", err);
        setError("Failed to load playlists.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, [token]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleTogglePlaylistFunction = (playlistId, e) => {
    e.stopPropagation();
    setShowPlaylistFunction((prev) => ({
      ...prev,
      [playlistId]: !prev[playlistId],
    }));
  };

  const handleDeletePlaylist = async (playlistId) => {
    try {
      await apiClient.delete(`http://localhost:4000/playlist/deletePlaylist/${playlistId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setPlaylists(playlists.filter(playlist => playlist._id !== playlistId));
      toast.success('Playlist deleted successfully');
    } catch (error) {
      console.error("Error deleting playlist:", error);
      toast.error('Error deleting playlist');
    }
  };

  const handleEditPlaylist = (playlist) => {
    setSelectedPlaylist(playlist);
    setShowEditModal(true);
  };

  const handleSavePlaylist = (updatedPlaylist) => {
    setPlaylists(playlists.map(playlist => playlist._id === updatedPlaylist._id ? updatedPlaylist : playlist));
  };

  const handleEvent = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const sortedPlaylists = [...playlists].sort((a, b) => {
    if (sortOption === "a-z") {
      return a.title.localeCompare(b.title);
    } else if (sortOption === "z-a") {
      return b.title.localeCompare(a.title);
    } else if (sortOption === "recent") {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    }
    return 0;
  });

  return (
    <div className={sideNavbar ? 'playlistPage' : 'fullPlaylistPage'}>
      <ToastContainer />
      <div className="playlist_mainPage">
        <h1>Playlists</h1>
        <div className="filter-bar">
          <span>Sort by:</span>
          <select value={sortOption} onChange={handleSortChange}>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
            <option value="recent">Recently Updated</option>
          </select>
        </div>
        <div className="playlistContent">
          {loading ? (
            <p>Loading playlists...</p>
          ) : error ? (
            <p>{error}</p>
          ) : sortedPlaylists.length > 0 ? (
            sortedPlaylists.map((playlist) => (
              playlist.videos.length > 0 ? (
                <Link
                  to={`/watch/${playlist.videos[0]._id}`}
                  state={{ playlistId: playlist._id, fromPlaylistPage: true }}
                  className="youtube_Video"
                  key={playlist._id}
                >
                  <div className='youtube_thumbnailBox'>
                    <img className="youtube_thumbnailPic" src={playlist.videos.length > 0 ? playlist.videos[0].thumbnail : "https://via.placeholder.com/250x140"} alt={`${playlist.title} thumbnail`} />
                    <div className="youtube_timingThumbnail">
                      {playlist.videos.length} videos
                    </div>
                  </div>
                  <div className="d-flex flex-row mt-2 w-100 justify-content-between">
                    <div className="d-flex flex-column">
                      <div className="youtube_videoTitle">{playlist.title}</div>
                      <div className="youtubeVideo_views">{playlist.visibility} • {playlist.videos.length} videos</div>
                      <div className="youtubeVideo_views" onClick={(e) => { e.preventDefault(); navigate(`/playlist/${playlist._id}`); }}>View full playlist</div>
                    </div>
                    {playlist.title !== "Liked Video" && playlist.title !== "Watch Later" && (
                      <div className="commentFuntionSectionBox" onClick={handleEvent}>
                        <div className="commentFuntionToggle" onClick={(e) => { handleEvent(e); handleTogglePlaylistFunction(playlist._id, e);}}>
                          <i className="fa-solid fa-ellipsis-vertical"></i>
                        </div>
                        {showPlaylistFunction[playlist._id] && (
                          <div className='playlistFunction'>
                            {playlist.user.toString() === userId ? (
                              <>
                                <div className="commentReply" onClick={(e) => { handleEvent(e); handleDeletePlaylist(playlist._id); }}>
                                  <i className="fa-solid fa-trash"></i>
                                  Delete
                                </div>
                                <div className='commentReply' onClick={(e) => { handleEvent(e); handleEditPlaylist(playlist); }}>
                                  <i className="fa-solid fa-pen-to-square"></i>
                                  Edit
                                </div>
                              </>
                            ) : null}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              ) : null
            ))
          ) : (
            <p>No playlists available.</p>
          )}
        </div>
      </div>
      {selectedPlaylist && (
        <EditPlaylistModal
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          playlist={selectedPlaylist}
          token={token}
          onSave={handleSavePlaylist}
        />
      )}
    </div>
  );
};

export default PlaylistPage;