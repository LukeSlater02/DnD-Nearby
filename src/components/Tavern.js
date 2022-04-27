import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getUserSheet } from "../modules/SheetDataManager"
import { deleteSheet } from "../modules/SheetDataManager"

export const Tavern = () => {
    const [character, setCharacter] = useState([])

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
        </div>
    )
}