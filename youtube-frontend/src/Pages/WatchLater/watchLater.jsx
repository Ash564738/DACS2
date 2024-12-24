import React from 'react'
import './watchLater.css'
import SideNavbar from '../../Component/SideNavbar/sideNavbar'
import WatchLaterPage from '../../Component/WatchLaterPage/watchLaterPage.jsx'
const WatchLater = ({sideNavbar}) => {
  return (
    <div className='watchlater'>
        <SideNavbar sideNavbar={sideNavbar}/>
        <WatchLaterPage sideNavbar={sideNavbar}/>
    </div>
  )
}
export default WatchLater