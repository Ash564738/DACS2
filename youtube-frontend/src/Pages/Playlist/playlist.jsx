import React from 'react'
import './playlist.css'
import SideNavbar from '../../Component/SideNavbar/sideNavbar'
import PlaylistPage from '../../Component/PlaylistPage/playlistPage.jsx'
const Playlist = ({sideNavbar}) => {
  return (
    <div className='playlist'>
        <SideNavbar sideNavbar={sideNavbar}/>
        <PlaylistPage sideNavbar={sideNavbar}/>
    </div>
  )
}
export default Playlist