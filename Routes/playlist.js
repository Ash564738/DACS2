const express = require('express');
const router = express.Router();
const playlistController = require('../Controllers/playlist');
const auth = require('../middleware/authentication');

router.post('/createPlaylist', auth, playlistController.createPlaylist);
router.post('/addVideoToPlaylist/:playlistId', auth, playlistController.addVideoToPlaylist);
router.post('/removeVideoFromPlaylist/:playlistId', auth, playlistController.removeVideoFromPlaylist);
router.get('/getUserPlaylists', auth, playlistController.getUserPlaylists);
router.post('/addCollaborator/:playlistId', auth, playlistController.addCollaborator);
router.post('/removeCollaborator/:playlistId', auth, playlistController.removeCollaborator);
router.put('/updatePlaylist/:playlistId', auth, playlistController.updatePlaylist);
router.delete('/deletePlaylist/:playlistId', auth, playlistController.deletePlaylist);
router.get('/getPlaylistById/:playlistId', auth, playlistController.getPlaylistById);
router.get('/getPlaylistByTitle/:title', auth, playlistController.getPlaylistByTitle);
module.exports = router;