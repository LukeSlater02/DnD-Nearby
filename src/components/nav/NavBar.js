import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = ({ }) => {
  const removeUser = () => {
    sessionStorage.clear();
  }
  return (
    <nav>
      <img className="banner1" src="/images/gauntletBanner.svg"></img>
      {sessionStorage.getItem("dnd_user") != null
        ?
        <section className="logo">
          <img src="/images/logo.svg"></img><h3 className="header">NEARBY</h3>
        </section>
        :
        <section className="logo-no-login">
          <img src="/images/logo.svg"></img><h3 className="header">NEARBY</h3>
        </section>
      }

      {sessionStorage.getItem("dnd_user") != null
        ?
        <section className="links"><Link to="/the-tavern">
          Visit the Tavern<br></br>
          <img src="/images/tavern-icon.jpg"></img><br></br></Link>
          <Link className="navbar__link" to="/login" onClick={removeUser}>Logout</Link></section>
        : ""
      }


      <img className="banner2" src="/images/harpersBanner.svg"></img>
    </nav>
  )
}
