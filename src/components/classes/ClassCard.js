import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./ClassCard.css"
import { addSheet } from "../../modules/SheetDataManager"
import { getWeaponsByClass } from "../../modules/WeaponDataManager"

export const ClassCard = ({ classObj }) => {
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

    const [isLoading, setIsLoading] = useState(false)
    let navigate = useNavigate()
    let currentUserId = sessionStorage.getItem("dnd_user_name")

    const createSheet = e => {
        setIsLoading(true)
        let sheetObj = {
            userId: currentUserId,
            classId: parseInt(e.target.id),
            userId: parseInt(sessionStorage.getItem("dnd_user")),
            name: "",
            level: 1,
            background: "",
            alignment: "",
            race: "",
            armorClass: 10,
            str: '',
            dex: '',
            con: '',
            int: '',
            wis: '',
            cha: '',
            hitPoints: '',
            speed: '',
            initiative: '',
            acrobatics: false,
            animalHandling: false,
            arcana: false,
            athletics: false,
            deception: false,
            history: false,
            insight: false,
            intimidation: false,
            investigation: false,
            medicine: false,
            nature: false,
            perception: false,
            performance: false,
            persuasion: false,
            religion: false,
            sleightOfHand: false,
            stealth: false,
            survival: false,
        }
        addSheet(sheetObj).then(data => navigate(`/character-edit/${data.id}`)).then(setIsLoading(false))
    }
    showSaves(classObj)

    return (
        <div className={`classCard ${classObj.className.toLowerCase()}`}>
            <section className={classObj.className.toLowerCase()}><img className={`class-icon`} src={`${classObj.icon}`} /><h1>{classObj.className}</h1></section>
            <strong>Hit Die:</strong> d{classObj.hitDieSides} <br></br>
            <strong>Saves:</strong> {saves.join(" and ")}<br></br>
            <p>{classObj.desc}</p>
            {/* <strong>Primary Weapons:</strong> {weapons.map(function(item, index) {
            return <span key={item.id}>{ (index ? ', ' : '') + item.weapon.name }</span>;
          })} */}
            {/* <img src="https://i.pinimg.com/originals/ac/98/45/ac9845682c28cd1565b4491f72a7ce3f.gif"></img> */}
            <button id={classObj.id} disabled={isLoading} onClick={createSheet}>Select</button>
        </div>
    )
}