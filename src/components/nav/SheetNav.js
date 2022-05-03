import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const SheetNav = ({ }) => {
    const removeUser = () => {
        sessionStorage.clear();
    }
    return (
        <section id="sheet-nav">
            <section className="logo">
                <Link to="/home"><img src="/images/logo.svg"></img></Link>
            </section>
            <section className="links"><Link to="/the-tavern">
                Visit the Tavern<br></br>
                <img src="/images/sidebar-tavern.jpg"></img><br></br></Link>
                {sessionStorage.getItem("dnd_user") != null ? <Link className="navbar__link" to="/login" onClick={removeUser}>Logout</Link> : ''}</section>
            <img className="banner1" src="/images/tyrannyofdragons.svg"></img>
        </section>
    )
}
