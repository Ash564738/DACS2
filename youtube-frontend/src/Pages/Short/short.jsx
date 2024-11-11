import React from 'react'
import './short.css'
import SideNavbar from '../../Component/SideNavbar/sideNavbar'
import ShortPage from '../../Component/ShortPage/shortPage'
const Short = ({sideNavbar}) => {
  return (
    <div className='short'>
        <SideNavbar sideNavbar={sideNavbar}/>
        <ShortPage sideNavbar={sideNavbar}/>
    </div>
  )
}

export default Short