import React, { useState, useEffect } from 'react';
import apiClient from '../../Utils/apiClient.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';

const EditPlaylistModal = ({ show, onClose, playlist, token, onSave }) => {
  const [title, setTitle] = useState(playlist.title);
  const [visibility, setVisibility] = useState(playlist.visibility);

  useEffect(() => {
    setTitle(playlist.title);
    setVisibility(playlist.visibility);
  }, [playlist]);

  const handleSave = async () => {
    try {
      const res = await apiClient.put(`http://localhost:4000/playlist/updatePlaylist/${playlist._id}`, {
        title,
        visibility
      }, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      onSave(res.data.playlist);
      toast.success('Playlist updated successfully');
      onClose();
    } catch (error) {
      console.error("Error updating playlist:", error);
      toast.error('Error updating playlist');
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="newPlaylistModal">
      <div className="newPlaylistModalContent">
        <div className="newPlaylistModalHeader d-flex flex-row justify-content-between align-items-center">
            <span>Edit Playlist</span>
            <i className="fa fa-times" onClick={onClose}></i>
        </div>
        <div className="newPlaylistModalBody">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Visibility</label>
            <select
              className="form-control"
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
              <option value="Unlisted">Unlisted</option>
            </select>
          </div>
        </div>
        <div className="newPlaylistModalFooter text-center" onClick={handleSave}>
          Save
        </div>
      </div>
    </div>
  );
};

export default EditPlaylistModal;