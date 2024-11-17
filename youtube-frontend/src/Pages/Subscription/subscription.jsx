import React from 'react'
import './subscription.css'
import SideNavbar from '../../Component/SideNavbar/sideNavbar'
import SubscriptionPage from '../../Component/SubscriptionPage/subscriptionPage.jsx'
const Subscription = ({sideNavbar}) => {
  return (
    <div className='subscription'>
        <SideNavbar sideNavbar={sideNavbar}/>
        <SubscriptionPage sideNavbar={sideNavbar}/>
    </div>
  )
}
export default Subscription