import React, { useState, useEffect } from 'react';
import './playlistModal.css';
import apiClient from '../../Utils/apiClient.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewPlaylistModal from './newPlaylistModal';

const PlaylistModal = ({ videoId, token, onClose }) => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const [showNewPlaylistModal, setShowNewPlaylistModal] = useState(false);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const res = await apiClient.get('http://localhost:4000/playlist/getUserPlaylists', {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        if (res.data && res.data.playlists) {
          setPlaylists(res.data.playlists);
          const selected = res.data.playlists
            .filter(playlist => playlist.videos.includes(videoId))
            .map(playlist => playlist._id);
          setSelectedPlaylists(selected);
        } else {
          console.warn("No playlists found in response.");
        }
      } catch (err) {
        console.error("Error fetching playlists:", err);
      }
    };

    fetchPlaylists();
  }, [token, videoId]);

  const handleCheckboxChange = async (playlistId) => {
    const isSelected = selectedPlaylists.includes(playlistId);
    setSelectedPlaylists((prevSelected) =>
      isSelected
        ? prevSelected.filter((id) => id !== playlistId)
        : [...prevSelected, playlistId]
    );
    try {
      if (isSelected) {
        await apiClient.post(`http://localhost:4000/playlist/removeVideoFromPlaylist/${playlistId}`, { videoId }, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
      } else {
        await apiClient.post(`http://localhost:4000/playlist/addVideoToPlaylist/${playlistId}`, { videoId }, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
      }
    } catch (error) {
      console.error(`Error ${isSelected ? 'removing' : 'adding'} video to playlist:`, error);
    }
  };

  const handleCreateNewPlaylist = async (newPlaylist) => {
    setPlaylists([...playlists, newPlaylist]);
  };

  const handleOpenNewPlaylistModal = () => {
    setShowNewPlaylistModal(true);
  };

  const handleCloseNewPlaylistModal = () => {
    setShowNewPlaylistModal(false);
    onClose();
  };

  return (
    <>
      {!showNewPlaylistModal && (
        <div className="playlistModal">
          <div className="playlistModalContent">
            <div className="playlistModalHeader d-flex flex-row justify-content-center align-items-center">
                <span>Save video to playlist</span>
                <i className="fa fa-times" onClick={onClose}></i>
            </div>
            <div className="playlistList d-flex flex-column">
              {playlists.map((playlist) => (
                <div key={playlist._id} className="playlistItem">
                  <input type="checkbox" checked={selectedPlaylists.includes(playlist._id)} onChange={() => handleCheckboxChange(playlist._id)}/>
                  <span>{playlist.title}</span>
                  <i className={`fa ${playlist.visibility === 'Public' ? 'fa-globe' : playlist.visibility === 'Private' ? 'fa-lock' : 'fa-eye-slash'}`}></i>
                </div>
              ))}
            </div>
            <div className="newPlaylist" onClick={handleOpenNewPlaylistModal}>
                <i className="fa fa-plus"></i>
                New Playlist
            </div>
          </div>
        </div>
      )}
      {showNewPlaylistModal && (
        <NewPlaylistModal
          onClose={handleCloseNewPlaylistModal}
          onCreate={handleCreateNewPlaylist}
          token={token}
        />
      )}
    </>
  );
};

export default PlaylistModal;