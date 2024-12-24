import './App.css';
import Navbar from './Component/Navbar/navbar';
import Home from './Pages/Home/home';
import Video from './Pages/Video/video';
import { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Profile from './Pages/Profile/profile';
import VideoUpload from './Pages/VideoUpload/videoUpload';
import SignUp from './Pages/SignUp/signUp';
import Short from './Pages/Short/short';
import SocialMedia from './Pages/SocialMedia/socialMedia';
import Subscription from './Pages/Subscription/subscription';
import LikedVideo from './Pages/LikedVideo/likedVideo';
import Chat from '../src/Component/Chat/chat.jsx';
import Search from './Pages/Search/search';
import VideoEdit from './Pages/VideoEdit/videoEdit';
import Playlist from './Pages/Playlist/playlist';
function App() {
  const [sideNavbar, setSideNavbar] = useState(true);
  const [selectedFriendId, setSelectedFriendId] = useState(null);
  const location = useLocation();

  const setSideNavbarFunc = (value) => {
    setSideNavbar(value);
  };

  const handleFriendSelect = (friendId) => {
    setSelectedFriendId(friendId);
  };

  const closeChat = () => {
    setSelectedFriendId(null);
  };

  useEffect(() => {
    if (location.pathname.startsWith('/watch/')) {
      setSideNavbar(false);
    } else {
      setSideNavbar(true);
    }
  }, [location]);

  return (
    <div className="App">
      <Navbar setSideNavbarFunc={setSideNavbarFunc} sideNavbar={sideNavbar} onFriendSelect={handleFriendSelect} />
      <Routes>
        <Route path="/" element={<Home sideNavbar={sideNavbar} />} />
        <Route path="/socialMedia" element={<SocialMedia sideNavbar={sideNavbar} />} />
        <Route path="/short" element={<Short sideNavbar={sideNavbar} />} />
        <Route path="/watch/:id" element={<Video sideNavbar={sideNavbar}/>} />
        <Route path="/user/:id" element={<Profile sideNavbar={sideNavbar} />} />
        <Route path="/:id/upload" element={<VideoUpload />} />
        <Route path="/:id/edit" element={<VideoEdit />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/subscription" element={<Subscription sideNavbar={sideNavbar} />} />
        <Route path="/likedVideo" element={<LikedVideo sideNavbar={sideNavbar} />} />
        <Route path="/search" element={<Search sideNavbar={sideNavbar} />} />
        <Route path = "/playlist" element = {<Playlist sideNavbar={sideNavbar}/>} />
      </Routes>
      {selectedFriendId && <Chat friendId={selectedFriendId} closeChat={closeChat} />}
    </div>
  );
}

export default App;