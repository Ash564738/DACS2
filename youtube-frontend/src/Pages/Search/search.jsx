import React from 'react'
import './search.css'
import SideNavbar from '../../Component/SideNavbar/sideNavbar'
import SearchPage from '../../Component/SearchPage/searchPage'
const Search = ({sideNavbar}) => {
  return (
    <div className='search'>
        <SideNavbar sideNavbar={sideNavbar}/>
        <SearchPage sideNavbar={sideNavbar}/>
    </div>
  )
}
export default Search