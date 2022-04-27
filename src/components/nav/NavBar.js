import React from "react"
import { Link, useLocation } from "react-router-dom"
import "./NavBar.css"


export const NavBar = ({clearUser}) => {
  const location = useLocation();
  return (
    <nav>
        <img src="/images/highElf.svg"></img>
        <p>Flavor text</p>
        <Link to="/home"><img src="/images/logo.svg"></img></Link>
        <h1>NEARBY</h1>
        <img src="/images/gauntletBanner.svg"></img>
        <img src="/images/harpersBanner.svg"></img>
        <Link to="/the-tavern">The Tavern</Link>
        {sessionStorage.getItem("dnd_user") != null ? <Link className="navbar__link" to="/login" onClick={clearUser}>Logout</Link> : ''}
      {/* <ul className="navBar">
        <li className="navBar_item">
 

          <Link className={`navbar__link ${location.pathname === '/home' ? 'active':''}`} to="/Home"> <FontAwesomeIcon icon={faHouse} /> Dashboard</Link>
        </li>
        <li className="navBar_item item_left">
          <Link className={`navbar__link ${location.pathname === '/articles' ? 'active':''}`} to="/articles"> <FontAwesomeIcon icon={faNewspaper} /> Articles</Link>
        </li>
        <li className="navBar_item item_left">
          <Link className={`navbar__link ${location.pathname === '/friends' ? 'active':''}`} to="/friends"> <FontAwesomeIcon icon={faUserGroup} /> Friends</Link>
        </li>
    
        <li className="navBar_item item_left">
          <Link className={`navbar__link ${location.pathname === '/tasks' ? 'active':''}`} to="/tasks"> <FontAwesomeIcon icon={faClipboardCheck} /> Tasks</Link>
        </li>
        <li className="navBar_item item_left">
          <Link className={`navbar__link ${location.pathname === '/events' ? 'active':''}`} to="/events"> <FontAwesomeIcon icon={faCalendarDays} /> Events</Link>
        </li>
        <li className="navBar_item item_left">
        {sessionStorage.getItem("nutshell_user") != null ? <Link className="navbar__link" to="/login" onClick={clearUser}> <FontAwesomeIcon icon={faArrowRightFromBracket} /> Logout</Link> : ''}
        </li>
      </ul> */}
    </nav>
  )
}
