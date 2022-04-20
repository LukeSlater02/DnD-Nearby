import React, { useEffect, useState } from "react";
import { getRogueWeapons } from "./RogueDataManager";
import "./ClassCard.css"

export const RogueCard = () => {
    const [weapons, setWeapons] = useState([])

    useEffect(() => {
        getRogueWeapons().then(setWeapons)
    }, [])

    // return (
    //     <div className="classStartItemDropdown">
    //     <label htmlFor="rogueWeapons">Choose Your Starting Weapons:</label>
    //     <div>
    //     <select name="rogueWeapons">
    //         <option>---</option>
    //         {weapons.map(ele => {
    //             return <option key={ele.id}>{ele.weapon.name}</option>
    //         })}
    //     </select>
    //     </div>
    //     <div>
    //     <select name="rogueWeapons">
    //         <option>---</option>
    //         {weapons.map(ele => {
    //             return <option key={ele.id}>{ele.weapon.name}</option>
    //         })}
    //     </select>
    //     </div>
    //     <div>
    //     <select name="rogueWeapons">
    //         <option>---</option>
    //         {weapons.map(ele => {
    //             return <option key={ele.id}>{ele.weapon.name}</option>
    //         })}
    //     </select>
    //     </div>
    // </div>
    // )

    return (
        <div className="classCard">
        <h1>ROGUE</h1>
        <strong>Hit Die:</strong> d8 <br></br>
        <strong>Saves:</strong> Dexterity & Intelligence <br></br>
        <strong>Primary Weapons:</strong> {weapons.map(e => `${e.weapon.name} `)}<br></br>
        <img src="https://i.pinimg.com/originals/ac/98/45/ac9845682c28cd1565b4491f72a7ce3f.gif"></img>
        <p>Rogues devote as much effort to mastering the use of a variety of Skills as they do to perfecting their combat⁠ abilities⁠, giving them a broad Expertise that few other Characters can match. Many rogues focus on stealth⁠ and Deception, while others refine the ski⁠lls that help them in a dungeon environm⁠ent, such as climbing, finding and disarming traps, and opening locks.</p>
        <p>When it comes to Combat, rogues prioritize cunning over brute stren⁠gth. A rogue would rather make one precise strike, placing it exactly where the at⁠tack will hurt the target most, than wear an opponent down with a barrage of attacks. Rogues have an almost supernatural knack for avoiding danger, and a few learn magical Tricks to supplement their other abilities⁠.</p>
        </div>
    )
}