import React from "react"
import "./ClassCard.css"

export const ClassCard = ({classObj}) => {
    let saves = []
    const showSaves = cObj => {
        if (cObj.strSave) saves.push("Strength")
        if (cObj.dexSave) saves.push("Dexterity")
        if (cObj.conSave) saves.push("Constitution")
        if (cObj.wisSave) saves.push("Wisdom")
        if (cObj.intSave) saves.push("Intelligence")
        if (cObj.chaSave) saves.push("Charisma")
        
        return saves
    }

    showSaves(classObj)
    
return (
        <div className={`classCard ${classObj.className.toLowerCase()}`}>
            <section className={classObj.className.toLowerCase()}><img className={`class-icon`} src={`${classObj.icon}`}></img><h1>{classObj.className}</h1></section>
            <strong>Hit Die:</strong> d{classObj.hitDieSides} <br></br>
            <strong>Saves:</strong> {saves.join(" and ")}<br></br>
            {/* <strong>Primary Weapons:</strong> {weapons.map(function(item, index) {
            return <span key={item.id}>{ (index ? ', ' : '') + item.weapon.name }</span>;
          })} */}
            {/* <img src="https://i.pinimg.com/originals/ac/98/45/ac9845682c28cd1565b4491f72a7ce3f.gif"></img> */}
            <button>Select</button>
        </div>
    )
}