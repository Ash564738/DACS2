import React from 'react'
import './history.css'
import SideNavbar from '../../Component/SideNavbar/sideNavbar'
import HistoryPage from '../../Component/HistoryPage/historyPage.jsx'
const History = ({sideNavbar}) => {
  return (
    <div className='history'>
        <SideNavbar sideNavbar={sideNavbar}/>
        <HistoryPage sideNavbar={sideNavbar}/>
    </div>
  )
}
export default History