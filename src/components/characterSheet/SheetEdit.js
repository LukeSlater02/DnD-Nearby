import React, { useEffect, useState } from "react"
import { getUserSheet } from "../../modules/SheetDataManager"
import { getClassById } from "../../modules/ClassDataManager"
import { getAllWeapons } from "../../modules/WeaponDataManager"
import { updateSheet } from "../../modules/SheetDataManager"
import { useNavigate } from "react-router-dom"

export const SheetEdit = () => {
    const [character, setCharacter] = useState(
        {
            level: 1,
            classId: '',
            background: "",
            alignment: "",
            race: "",
            armorClass: '',
            str: '',
            dex: '',
            con: '',
            int: '',
            wis: '',
            cha: '',
            hitPoints: '',
            speed: '',
            initiative: ''
        }
    )

    const [charClass, setCharClass] = useState({})
    const [weapons, setWeapons] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    let userId = parseInt(sessionStorage.getItem("dnd_user"))
    let navigate = useNavigate()

    useEffect(() => {
        getUserSheet(userId).then(data => {
            setCharacter(data[0])
        })
    }, [])

    useEffect(() => {
        getClassById(character.classId).then(c => setCharClass(c))
    }, [character])

    useEffect(() => {
        getAllWeapons().then(setWeapons)
    }, [])

    const handleInput = event => {
        if (event.target.type === "checkbox"){
            let updatedCharClass = {...charClass}
            updatedCharClass[`${event.target.id}Save`] = !updatedCharClass[`${event.target.id}Save`]
            setCharClass(updatedCharClass)
        } 
        else {
            let newCharacter = { ...character }
            let input = event.target.value

            if (event.target.type === "number"){
                input = parseInt(input)
            }

            newCharacter[event.target.id] = input
            setCharacter(newCharacter)
        }
    }

    const filterWeapons = event => {
        //FIND WAY TO REMOVE SELECTED OPTIONS FROM OTHER SELECTS
    }

    const updateCharacter = () => {
        setIsLoading(true)

        const editedCharacter = {
            id: character.id,
            level: character.level,
            classId: character.classId,
            background: character.background,
            alignment: character.alignment,
            race: character.race,
            armorClass: character.armorClass,
            str: character.str,
            dex: character.dex,
            con: character.con,
            int: character.int,
            wis: character.wis,
            cha: character.cha,
            hitPoints: character.hitPoints,
            speed: character.speed,
            initiative: character.initiative,
        }
        updateSheet(editedCharacter).then(() => navigate("/character")).then(() => setIsLoading(false))
    }


return (
    <div className="character-sheet">
        <header>
            <section className="top-info">
                Alignment<input type="text" id="alignment" value={character.alignment} onChange={handleInput} autoComplete="off"></input>
                Class: {charClass.className} <label htmlFor="sheet-text">Level</label> <input name="sheet-text" type="number" value={character.level} onChange={handleInput} id="level" autoComplete="off"></input>
                <label htmlFor="sheet-text">Background</label> <input name="sheet-text" type="text" value={character.background} onChange={handleInput} id="background" autoComplete="off"></input>
                <label htmlFor="sheet-text">Race</label> <input name="sheet-text" type="text" value={character.race} onChange={handleInput} id="race" autoComplete="off"></input>
            </section>
        </header>

        <section className="mid-info">
            <label htmlFor="sheet-text">Armor Class</label> <input name="sheet-text" type="number" value={character.armorClass} onChange={handleInput} id="armorClass" autoComplete="off"></input>
            <label htmlFor="sheet-text">Initiative</label> <input name="sheet-text" type="number" id="initiative" autoComplete="off"></input>
            <label htmlFor="sheet-text">Speed</label> <input name="sheet-text" value={character.speed} type="number" onChange={handleInput} id="speed" autoComplete="off"></input>
            {/* <label htmlFor="sheet-text">Hit Points</label> <input name="sheet-text" type="text" id="hitPoints" autoComplete="off"></input> */}
        </section>

        <section className="stats">
            <label htmlFor="sheet-text">STR</label> <input name="sheet-text" type="number" id="str" value={character.str} onChange={handleInput} autoComplete="off"></input>
            <label htmlFor="sheet-text">DEX</label> <input name="sheet-text" type="number" id="dex" value={character.dex} onChange={handleInput} autoComplete="off"></input>
            <label htmlFor="sheet-text">CON</label> <input name="sheet-text" type="number" id="con" value={character.con} onChange={handleInput} autoComplete="off"></input>
            <label htmlFor="sheet-text">INT</label> <input name="sheet-text" type="number" id="int" value={character.int} onChange={handleInput} autoComplete="off"></input>
            <label htmlFor="sheet-text">WIS</label> <input name="sheet-text" type="number" id="wis" value={character.wis} onChange={handleInput} autoComplete="off"></input>
            <label htmlFor="sheet-text">CHA</label> <input name="sheet-text" type="number" id="cha" value={character.cha} onChange={handleInput} autoComplete="off"></input>
        </section>

        <section className="saves-proficiency">
            <h3>Saving Throws</h3>
            {charClass.strSave ? <input type="checkbox" defaultChecked={true} id="str" onChange={handleInput} /> : <input type="checkbox" id="str" onChange={handleInput} />} Strength <br></br>
            {charClass.dexSave ? <input type="checkbox" defaultChecked={true} id="dex" onChange={handleInput} /> : <input type="checkbox" id="dex" onChange={handleInput} />} Dexterity <br></br>
            {charClass.conSave ? <input type="checkbox" defaultChecked={true} id="con" onChange={handleInput} /> : <input type="checkbox" id="con" onChange={handleInput} />} Constitution <br></br>
            {charClass.intSave ? <input type="checkbox" defaultChecked={true} id="int" onChange={handleInput} /> : <input type="checkbox" id="int" onChange={handleInput} />} Intelligence <br></br>
            {charClass.wisSave ? <input type="checkbox" defaultChecked={true} id="wis" onChange={handleInput} /> : <input type="checkbox" id="wis" onChange={handleInput} />} Wisdom <br></br>
            {charClass.chaSave ? <input type="checkbox" defaultChecked={true} id="cha" onChange={handleInput} /> : <input type="checkbox" id="cha" onChange={handleInput} />} Charisma <br></br>
        </section>

        <section className="skills">

        </section>

        <section className="weapons">
            <h3>Choose up to 3 Weapons</h3>
            <select>
                <option>---</option>
                {weapons.map(w => {
                    return <option id={w.id} value={w.name} key={w.id}>{w.name}</option>
                })}
            </select>
            <select>
                <option>---</option>
                {weapons.map(w => {
                    return <option id={w.id} value={w.name} key={w.id}>{w.name}</option>
                })}
            </select>
            <select>
                <option>---</option>
                {weapons.map(w => {
                    return <option id={w.id} value={w.name} key={w.id}>{w.name}</option>
                })}
            </select>
        </section>
        <button onClick={updateCharacter}>SAVE</button>
    </div>
)
}