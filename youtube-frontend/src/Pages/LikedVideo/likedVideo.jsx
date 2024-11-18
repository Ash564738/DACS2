import React from 'react'
import './likedVideo.css'
import SideNavbar from '../../Component/SideNavbar/sideNavbar'
import LikedVideoPage from '../../Component/LikedVideoPage/likedVideoPage'
const LikedVideo = ({sideNavbar}) => {
  return (
    <div className='likedvideo'>
        <SideNavbar sideNavbar={sideNavbar}/>
        <LikedVideoPage sideNavbar={sideNavbar}/>
    </div>
  )
}
export default LikedVideo