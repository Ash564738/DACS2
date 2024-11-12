<<<<<<< HEAD
=======
export default SocialMedia;
=======
>>>>>>> 3b3d29c933a62aac23f56b4a4ea73ebfcbdb8051
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