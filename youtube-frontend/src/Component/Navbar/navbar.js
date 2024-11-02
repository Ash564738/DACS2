import React from 'react'
import './navbar.css';
const navbar = () => {
  return (
    <div className="navbar">
      <div className ="header">
        <div className ="header__logo-wrap">
            <button className="barbutton" title="Menu">
            </button>        
            <div className ="logoyoutube">
            
            <span>VN</span>
        </div>
        </div>
        <div className ="header__search">
            <input type="text" className ="header__input" placeholder=" Search"></input>
            <button className="search--btn" title="Search">

            </button>

            </div>
        <div className ="header__infor">
                   
        <img src="/asset/img/profile.png" alt=""/>
        </div>
    </div>
    <div className ="container">
        <div className ="grid__row">
            <div className ="grid__column--sidebar">
                <ul className ="sidebar__list">
                    <li className ="sidebar__item">
                        <a href="#" className ="sidebar__item--link">
                            <div className ="sidebaricon"></div>
                            <span className ="sidebartext">Home</span>
                        </a>
                    </li>
                    <li className ="sidebar__item">
                        <a href="#" className ="sidebar__item--link">
                            <div className ="sidebaricon"></div>
                            <span className ="sidebartext">Shorts</span>
                        </a>
                    </li>
                    <li className ="sidebar__item">
                        <a href="#" className ="sidebar__item--link">
                            <div className ="sidebaricon"></div>
                            <span className ="sidebartext">Subscription</span>
                        </a>
                    </li>
                </ul>
                <div className ="hr"></div>
                <ul className ="sidebar__list">
                    <li className ="sidebar__item">
                        <a className ="sidebar__item--link">
                            <span className ="text">You</span>
                            <div className ="sidebaricon"></div>
                        </a>
                    </li>
                    <li className ="sidebar__item">
                        <a href="#" className ="sidebar__item--link">
                            <div className ="sidebaricon"></div>
                            <span className ="sidebartext">Video viewed</span>
                        </a>
                    </li>
                    <li className ="sidebar__item">
                        <a href="#" className ="sidebar__item--link">
                            <div className ="sidebaricon"></div>
                            <span className ="sidebartext">Playlist</span>
                        </a>
                    </li>

                    <li className ="sidebar__item">
                        <a href="#" className ="sidebar__item--link">
                            <div className ="sidebaricon"></div>
                            <span className ="sidebartext">Your videos</span>
                        </a>
                    </li>

                    <li className ="sidebar__item">
                        <a href="#" className ="sidebar__item--link">
                            <div className ="sidebaricon"></div>
                            <span className ="sidebartext">Watch later</span>
                        </a>
                    </li>

                    <li className ="sidebar__item">
                        <a href="#" className ="sidebar__item--link">
                            <div className ="sidebaricon"></div>
                            <span className ="sidebartext">Liked videos</span>
                        </a>
                    </li>
                </ul>
                <div className ="hr"></div>
                <div className ="sidebar__categories">
                    Subscription
                </div>
                <ul className ="sidebar__list">
                    <li className ="sidebar__item">
                        <a href="#" className ="sidebar__item--link">
                            <div className ="sidebaricon">
                                <img src="/asset/img/baemon channel.jpg" alt=""/>  
                            </div>
                            <span className ="sidebartext">BABYMONSTER</span>
                        </a>
                    </li>

                    <li className ="sidebar__item">
                        <a href="#" className ="sidebar__item--link">
                            <div className ="sidebaricon"></div>
                            <span className ="sidebartext">Browse channels</span>
                        </a>
                    </li>
                </ul>
                <div className ="hr"></div>
                <div className ="sidebar__categories">
                    Explore
                </div>
                <ul className ="sidebar__list">
                    <li className ="sidebar__item">
                        <a href="#" className ="sidebar__item--link">
                            <div className ="sidebaricon"></div>
                            <span className ="sidebartext">Trending</span>
                        </a>
                    </li>

                    <li className ="sidebar__item">
                        <a href="#" className ="sidebar__item--link">
                            <div className ="sidebaricon">
                                </div>
                            <span className ="sidebartext">Music</span>
                        </a>
                    </li>

                    <li className ="sidebar__item">
                        <a href="#" className ="sidebar__item--link">
                            <div className ="sidebaricon"></div>
                            <span className ="sidebartext">Game</span>
                        </a>
                    </li>

                    <li className ="sidebar__item">
                        <a href="#" className ="sidebar__item--link">
                            <div className ="sidebaricon"></div>
                                <span className ="sidebartext">News</span>
                        </a>
                    </li>

                    <li className ="sidebar__item">
                        <a href="#" className ="sidebar__item--link">
                            <div className ="sidebaricon"></div>
                                <span className ="sidebartext">Sports</span>
                        </a>
                    </li>
                </ul>
                <div className ="hr"></div>
                <ul className ="sidebar__list">
                    <li className ="sidebar__item">
                        <a href="#" className ="sidebar__item--link">
                            <div className ="sidebaricon">
                            </div>
                            <span className ="sidebartext">Settings</span>
                        </a>
                    </li>
                    <li className ="sidebar__item">
                        <a href="#" className ="sidebar__item--link">
                            <div className ="sidebaricon"></div>
                            <span className ="sidebartext">Report history</span>
                        </a>
                    </li>
                    <li className ="sidebar__item">
                        <a href="#" className ="sidebar__item--link">
                            <div className ="sidebaricon"></div>
                            <span className ="sidebartext">Help</span>
                        </a>
                    </li>
                    <li className ="sidebar__item">
                        <a href="#" className ="sidebar__item--link">
                            <div className ="sidebaricon"></div>
                            <span className ="sidebartext">Feedback</span>
                        </a>
                    </li>
                </ul>
                <div className ="hr"></div>
                <div className ="copyright">
                    <ul className ="copyright__list">
                        <li className ="copyright__list-item">
                            <a href="#">About</a>
                        </li>
                        <li className ="copyright__list-item">
                            <a href="#">Press</a>
                        </li>
                        <li className ="copyright__list-item">
                            <a href="#">Copyright</a>
                        </li>
                    </ul>
                    <ul className ="copyright__list">
                        <li className ="copyright__list-item">
                            <a href="#">Contact us</a>
                        </li>
                        <li className ="copyright__list-item">
                            <a href="#">Creators</a>
                        </li>
                    </ul>
                    <ul className ="copyright__list copyright__list--margin">
                        <li className ="copyright__list-item">
                            <a href="#">Advertise</a>
                        </li>
                        <li className ="copyright__list-item">
                            <a href="#">Developers</a>
                        </li>
                    </ul>
                    <ul className ="copyright__list">
                        <li className ="copyright__list-item">
                            <a href="#">Terms</a>
                        </li>
                        <li className ="copyright__list-item">
                            <a href="#">Privacy</a>
                        </li>
                        <li className ="copyright__list-item">
                            <a href="#">Policy & Safety</a>
                        </li>
                    </ul>
                    <ul className ="copyright__list copyright__list--last">
                        <li className ="copyright__list-item">
                            <a href="#">How Metube works</a>
                        </li>
                    </ul>
                    <ul className ="copyright__list">
                        <li className ="copyright__list-item">
                            <a href="#">Test new features</a>
                        </li>
                    </ul>
                    <span className ="copyright--text">© 2024 Google LLC</span>
                </div>
            </div>
            <div className ="grid__column--videowrap">
                <div className ="grid__columnn--categories">
                    <button className ="categories-item categories-item--active">All</button>
                    <button className ="categories-item" title="Game">Game</button>
                    <button className ="categories-item" title ="Music">Music</button>
                    <button className ="categories-item" title ="Livestream">Livestream</button>
                    <button className ="categories-item" title ="Javascript">Javascript</button>
                    <button className ="categories-item" title ="Computers">Computers</button>
                    <button className ="categories-item" title ="Java">Java</button>
                    <button className ="categories-item" title ="C++">C++</button>
                    <button className ="categories-item" title ="ASMR">ASMR</button>
                    <button className ="categories-item" title ="Rap">Rap</button>
                    <button className ="categories-item" title ="Cooking">Cooking</button>
                    <button className ="categories-item" title ="Viewed">Viewed</button>
                    <button className ="categories-item" title ="Action-adventure Game">Action-adventure Game</button>
                    <button className ="categories-item" title ="Combined List">Combined List</button>
                    <button className ="categories-item" title ="New Proposal">New Proposal</button>
                    <button className ="categories-item categories-item--last" title ="Categories Item"></button>
                </div>
                <div className ="grid__column--videos">
                    <div className ="grid__column--video">
                        <div className ="imgwrap">
                            <img src="/asset/img/drip baemon.jpg" alt=""/>
                            <span className ="img-timetext">3:09</span>
                            <div className ="iconvideowrap">
                            </div>
                        </div>
                        <div className ="video__title--wrap">
                            <div className ="imgchannel"><img src="/asset/img/baemon channel.jpg" alt=""/></div>
                            <div className ="videointrotitle">
                                <div className ="video--title">BABYMONSTER-'DRIP' M/V</div>
                                <div className ="video--channelimg-text videodescription">BABYMONSTER</div>
                                <span className ="viewtime">24M views</span>
                                <span className ="dot">.</span>
                                <span className ="timewatch">1 day ago</span>
                            </div>
                        </div>
                    </div>

                    <div className ="grid__column--video">
                        <div className ="imgwrap">
                            <img src="/asset/img/batter up.jpg" alt=""/>
                            <span className ="img-timetext">3:19</span>
                            <div className ="iconvideowrap">
                            </div>
                        </div>
                        <div className ="video__title--wrap">
                            <div className ="imgchannel"><img src="/asset/img/baemon channel.jpg" alt=""/></div>
                            <div className ="videointrotitle">
                                <div className ="video--title">BABYMONSTER-'BATTER UP' M/V</div>
                                <div className ="video--channelimg-text videodescription">BABYMONSTER</div>
                                <span className ="viewtime">287M views</span>
                                <span className ="dot">.</span>
                                <span className ="timewatch">11 months ago</span>
                            </div>
                        </div>
                    </div>

                    <div className ="grid__column--video">
                        <div className ="imgwrap">
                            <img src="/asset/img/forever.jpg" alt=""/>
                            <span className ="img-timetext">3:54</span>
                            <div className ="iconvideowrap">
                            </div>
                        </div>
                        <div className ="video__title--wrap">
                            <div className ="imgchannel"><img src="/asset/img/baemon channel.jpg" alt=""/></div>
                            <div className ="videointrotitle">
                                <div className ="video--title">BABYMONSTER-'FOREVER' M/V</div>
                                <div className ="video--channelimg-text videodescription">BABYMONSTER</div>
                                <span className ="viewtime">147M views</span>
                                <span className ="dot">.</span>
                                <span className ="timewatch">4 months ago</span>
                            </div>
                        </div>
                    </div>

                    <div className ="grid__column--video">
                        <div className ="imgwrap">
                            <img src="/asset/img/drip album.jpg" alt=""/>
                            <span className ="img-timetext">3:19</span>
                            <div className ="iconvideowrap">
                            </div>
                        </div>
                        <div className ="video__title--wrap">
                            <div className ="imgchannel"><img src="/asset/img/baemon channel.jpg" alt=""/></div>
                            <div className ="videointrotitle">
                                <div className ="video--title">Woke Up In Tokyo (RUKA & ASA)</div>
                                <div className ="video--channelimg-text videodescription">BABYMONSTER</div>
                                <span className ="viewtime">907N views</span>
                                <span className ="dot">.</span>
                                <span className ="timewatch">1 day ago</span>
                            </div>
                        </div>
                    </div>

                    <div className ="grid__column--video">
                        <div className ="imgwrap">
                            <img src="/asset/img/drip album.jpg" alt=""/>
                            <span className ="img-timetext">3:08</span>
                            <div className ="iconvideowrap">
                            </div>
                        </div>
                        <div className ="video__title--wrap">
                            <div className ="imgchannel"><img src="/asset/img/baemon channel.jpg" alt=""/> </div>
                            <div className ="videointrotitle">
                                <div className ="video--title">Love, Maybe</div>
                                <div className ="video--channelimg-text videodescription">BABYMONSTER</div>
                                <span className ="viewtime">904N views</span>
                                <span className ="dot">.</span>
                                <span className ="timewatch">1 day ago</span>
                            </div>
                        </div>
                    </div>

                    <div className ="grid__column--video">
                        <div className ="imgwrap">
                            <img src="/asset/img/drip album.jpg" alt=""/>
                            <span className ="img-timetext">2:38</span>
                            <div className ="iconvideowrap">
                            </div>
                        </div>
                        <div className ="video__title--wrap">
                            <div className ="imgchannel"><img src="/asset/img/baemon channel.jpg" alt=""/></div>
                            <div className ="videointrotitle">
                                <div className ="video--title">BILLIONAIRE</div>
                                <div className ="video--channelimg-text videodescription">BABYMONSTER</div>
                                <span className ="viewtime">1tr views</span>
                                <span className ="dot">.</span>
                                <span className ="timewatch">1 day ago</span>
                            </div>
                        </div>
                    </div>
                    <div className ="grid__column--video">
                        <div className ="imgwrap">
                            <img src="/asset/img/drip album.jpg" alt=""/>
                            <span className ="img-timetext">3:12</span>
                            <div className ="iconvideowrap">
                            </div>
                        </div>
                        <div className ="video__title--wrap">
                            <div className ="imgchannel"><img src="/asset/img/baemon channel.jpg" alt=""/></div>
                            <div className ="videointrotitle">
                                <div className ="video--title">Love In My Heart</div>
                                <div className ="video--channelimg-text videodescription">BABYMONSTER</div>
                                <span className ="viewtime">762N views</span>
                                <span className ="dot">.</span>
                                <span className ="timewatch">1 day ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default navbar