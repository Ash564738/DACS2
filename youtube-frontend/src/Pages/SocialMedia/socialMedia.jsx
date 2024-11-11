import React from 'react'
import './socialMedia.css'
import SideNavbar from '../../Component/SideNavbar/sideNavbar'
import SocialMediaPage from '../../Component/SocialMediaPage/socialMediaPage'
const SocialMedia = ({sideNavbar}) => {
  return (
    <div className='socialmedia'>
        <SideNavbar sideNavbar={sideNavbar}/>
        <SocialMediaPage sideNavbar={sideNavbar}/>
    </div>
  )
}
export default SocialMedia