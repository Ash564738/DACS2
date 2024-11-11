import './App.css';
import Navbar from './Component/Navbar/navbar';
import Home from './Pages/Home/home';
import Video from './Pages/Video/video';
import { useState,useEffect } from 'react';
import {Route,Routes} from 'react-router-dom';
import Profile from './Pages/Profile/profile';
import VideoUpload from './Pages/VideoUpload/videoUpload';
import SignUp from './Pages/SignUp/signUp';
import SocialMedia from './Pages/SocialMedia/socialMedia';
import Short from './Pages/Short/short';
import axios from 'axios';
function App() {
  const [sideNavbar,setSideNavbar] = useState(true);
  const setSideNavbarFunc=(value)=>{
    setSideNavbar(value)
  }
  useEffect(()=>{
    axios.get('http://localhost:4000/api/allVideo').then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
  },[])
  return (
    <div className="App">
      <Navbar setSideNavbarFunc={setSideNavbarFunc} sideNavbar={sideNavbar} />
      <Routes>
        <Route path='/' element={<Home sideNavbar={sideNavbar} />} />
        <Route path='/socialMedia' element={<SocialMedia sideNavbar={sideNavbar} />} />
        <Route path='/short' element={<Short sideNavbar={sideNavbar}/>} />
        <Route path='/watch/:id' element={<Video />} />
        <Route path='/user/:id' element={<Profile sideNavbar={sideNavbar} />} />
        <Route path='/:id/upload' element={<VideoUpload/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/socialMedia' element={<SocialMedia/>} />
      </Routes>
    </div>
  );
}
export default App;