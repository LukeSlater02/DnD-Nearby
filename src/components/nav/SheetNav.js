import React from "react"
import { Link, useLocation } from "react-router-dom"
import "./NavBar.css"

export const SheetNav = ({ }) => {
    const location = useLocation()
    const charId = location.pathname.split("/")[2]

    const removeUser = () => {
        sessionStorage.clear();
    }

    return (
        <section id="sheet-nav">
            <section className="logo">
                <Link to="/home"><img src="/images/logo.svg"></img></Link>
            </section>
            <section className="links"><Link to="/the-tavern">
                Return to the Tavern<br></br>
                <img src="/images/sidebar-tavern.jpg"></img><br></br></Link>
                {sessionStorage.getItem("dnd_user") != null ? <Link className="navbar__link" to="/login" onClick={removeUser}>Logout</Link> : ''}</section>

                {location.pathname.includes("/spellbook") ? <img className="banner2" src="/images/gauntletBanner.svg"></img> : <Link to={`/character/${charId}/spellbook`}><img src="../images/spellbook.gif"></img></Link>}
        </section>
    )
}
