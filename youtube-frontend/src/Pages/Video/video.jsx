import React from 'react'
import './video.css'
import SideNavbar from '../../Component/SideNavbar/sideNavbar'
import VideoPage from '../../Component/VideoPage/videoPage'
const Video = ({sideNavbar}) => {
  return (
    <div className='video'>
        <SideNavbar sideNavbar={sideNavbar}/>
        <VideoPage sideNavbar={sideNavbar}/>
    </div>
  )
}

export default Video