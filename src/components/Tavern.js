import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getUserSheet } from "../modules/SheetDataManager"
import { deleteSheet } from "../modules/SheetDataManager"

export const Tavern = () => {
    const [character, setCharacter] = useState([])

    const clearUser = () => {
        sessionStorage.clear();
    }

    let currentUser = sessionStorage.getItem("dnd_user")
    useEffect(() => {
        getUserSheet(currentUser).then(data => {
            setCharacter(data || {
                name: "",
                level: ""
            })
        }
        )
    }, [])

    return (
        <div className="roster">
            <div className="tavern-characters">
                <div className="links">
                    <img className="logo" src="./images/logo.svg"></img><br></br>
                    <Link to="/home" className="home">Home</Link> <br></br>
                    {sessionStorage.getItem("dnd_user") != null ? <Link className="navbar__link" to="/login" onClick={clearUser}>Logout</Link> : ''}
                </div>
                {character.map(ele => {
                    return (
                        <section className="character-card">
                            <img src={ele.icon}></img>
                            <section key={ele.id}>
                                <Link to={`/character/${ele.id}`}><h4>{ele.name}</h4></Link>
                                {ele.race} {ele.className}<br></br>
                                Level {ele.level} <br></br>
                                <button onClick={() => deleteSheet(ele.id).then(() => getUserSheet(currentUser).then(data => {
                                    setCharacter(data || {
                                        name: "",
                                        level: ""
                                    })
                                })
                                )}>Delete</button>
                            </section>
                        </section>
                    )
                })}
            </div>
            <section className="flavor">
                <p><em>This small tavern on the far side of town is a warm relief from the chill evening air. The floorboards of its threshold are well-worn with use and the door swings open smoothly as you enter.</em></p>
                <p><em>The air is heavy with smoke and dim murmurs. Looking around, you see a ragged assortment of thugs and low-lives, who eye you with an amused sort of malice. Surely, even in a place like this, you can manage to find a few capable adventurers willing to aid your cause...</em></p>
            </section>
            <section className="img">
            </section>
        </div>
    )

}