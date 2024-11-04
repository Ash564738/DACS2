import './App.css';
import Navbar from './Component/Navbar/navbar';
import Home from './Pages/Home/home';
import Video from './Pages/Video/video';
import { useState } from 'react';
import {Route, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
function App() {
  const [sideNavbar,setSideNavbar] = useState(true);
  const setSideNavbarFunc=(value)=>{
    setSideNavbar(value)
  }
  return (
    <div className="App">
      <Navbar setSideNavbarFunc={setSideNavbarFunc} sideNavbar={sideNavbar} />
      <Routes>
        <Route path='/' element={<Home sideNavbar={sideNavbar} />} />
        <Route path='/watch/:id' element={<Video />} />
      </Routes>
    </div>
  );
}
export default App;
