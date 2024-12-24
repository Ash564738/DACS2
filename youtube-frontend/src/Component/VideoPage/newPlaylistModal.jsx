import React, { useState, useEffect } from 'react';
import './newPlaylistModal.css';
import apiClient from '../../Utils/apiClient.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewPlaylistModal = ({ onClose, token, onCreate, videoId }) => {
  const [title, setTitle] = useState('');
  const [visibility, setVisibility] = useState('Private');
  const [collaborate, setCollaborate] = useState(false);
  const [userProfilePic, setUserProfilePic] = useState('');
  const [userName, setUserName] = useState('');
  const [playlistId, setPlaylistId] = useState('');
  const [inviteLink, setInviteLink] = useState('');
  const [showCollaborateModal, setShowCollaborateModal] = useState(false);

  const userId = localStorage.getItem("userId");

  const handleCreate = async () => {
    if (visibility === 'Private' && collaborate) {
      toast.error('Only Public playlists are allowed to Collaborate');
      return;
    }

    try {
      const res = await apiClient.post('http://localhost:4000/playlist/createPlaylist', {
        name: title,
        visibility,
        collaborate
      }, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      const newPlaylistId = res.data.playlist._id;
      setPlaylistId(newPlaylistId);
      setInviteLink(`http://localhost:3000/collaboratePlaylist/${newPlaylistId}`);
      onCreate(res.data.playlist);
      if (videoId) {
        await apiClient.post(`http://localhost:4000/playlist/addVideoToPlaylist/${newPlaylistId}`, { videoId }, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
      }
      toast.success('New playlist created successfully');
      if (collaborate) {
        setShowCollaborateModal(true);
      } else {
        onClose();
      }
    } catch (error) {
      console.error("Error creating new playlist:", error);
      toast.error('Error creating new playlist');
    }
  };

  const handleCollaborateSave = async (e) => {
    setCollaborate(e.target.checked);
    try {
      await apiClient.put(`http://localhost:4000/playlist/updatePlaylist/${playlistId}`, {
        collaborate: e.target.checked
      }, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
    } catch (error) {
      console.error("Error updating playlist:", error);
      toast.error('Error updating playlist');
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await apiClient.get(`http://localhost:4000/auth/getUserById/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        if (res.data && res.data.user) {
          setUserProfilePic(res.data.user.profilePic);
          setUserName(res.data.user.name);
        }
      } catch (err) {
        console.error("Error fetching owner profile:", err);
      }
    };

    fetchUserProfile();
  }, [token, userId]);

  return (
    <>
      <ToastContainer />
      {!showCollaborateModal && (
        <div className="newPlaylistModal">
          <div className="newPlaylistModalContent">
            <div className="newPlaylistModalHeader d-flex flex-row justify-content-between align-items-center">
              <span>New Playlist</span>
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
              <div className="form-group">
                <input
                  type="checkbox"
                  checked={collaborate}
                  onChange={(e) => setCollaborate(e.target.checked)}
                />
                <label className="form-check-label">Allow Collaborate</label>
              </div>
            </div>
            <div className="newPlaylistModalFooter text-center" onClick={handleCreate}>
              Create
            </div>
          </div>
        </div>
      )}

      {showCollaborateModal && (
        <div className="collaborateModal">
          <div className="collaborateModalContent">
            <div className="newPlaylistModalHeader d-flex flex-row justify-content-between align-items-center">
              <span>Collaborate</span>
              <i className="fa fa-times" onClick={onClose}></i>
            </div>
            <div className="form-group">
              <input
                type="checkbox"
                checked={collaborate}
                onChange={handleCollaborateSave}
              />
              <label className="form-check-label">Allow Collaborators to Add Video</label>
            </div>
            <div className="form-group d-flex flex-row">
              <div onClick={() => navigator.clipboard.writeText(inviteLink)} className="collaborateModalCopyLink">
                <i className="fa fa-copy"></i>
                Copy Invite Link
              </div>
            </div>
            <div className="form-group">
              <div className="userInfo">
                <img src={userProfilePic} alt="Owner Profile" className="userProfilePic" />
                <div className="d-flex flex-column">
                  <span>{userName}</span>
                  <label>Owner</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewPlaylistModal;