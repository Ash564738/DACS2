import React from 'react'
import SideNavbar from '../../Component/SideNavbar/sideNavbar'
import YourVideosPage from '../../Component/YourVideosPage/yourVideosPage.jsx'
const YourVideos = ({sideNavbar}) => {
  return (
    <div className='watchlater'>
        <SideNavbar sideNavbar={sideNavbar}/>
        <YourVideosPage sideNavbar={sideNavbar}/>
    </div>
  )
}
export default YourVideos