import React, { useEffect, useState } from "react"
import { getSheetById, getUserSheet } from "../../modules/SheetDataManager"
import { getClassById } from "../../modules/ClassDataManager"
import { getAllWeapons } from "../../modules/WeaponDataManager"
import { updateSheet } from "../../modules/SheetDataManager"
import { useNavigate, useParams } from "react-router-dom"
import { calcMod } from "./SheetHelpers"
import { getArmorByClass } from "../../modules/ArmorDataManager"

export const SheetEdit = () => {
    const [character, setCharacter] = useState(
        {
            name: "",
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
            initiative: '',
            acrobatics: "",
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
    )

    const [charClass, setCharClass] = useState({})
    const [weapons, setWeapons] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [armorList, setArmorList] = useState([])

    const {characterId} = useParams()
    let navigate = useNavigate()

    const getArmor = id => {
        getArmorByClass(id).then(setArmorList)
    }

    useEffect(() => {
        getSheetById(characterId).then(data => {
            setCharacter(data)
            getArmor(data.classId)
        })
    }, [])

    useEffect(() => {
        getClassById(character.classId).then(c => setCharClass(c))
    }, [character])

    useEffect(() => {
        getAllWeapons().then(setWeapons)
    }, [])

    const handleInput = event => {
        if (event.target.id.includes("Save")) {
            let updatedCharClass = { ...charClass }
            updatedCharClass[event.target.id] = !updatedCharClass[event.target.id]
            setCharClass(updatedCharClass)
        }
        else if (event.target.id.includes("-skill")) {
            let newCharacter = { ...character }
            newCharacter[event.target.id.split("-")[0]] = !newCharacter[event.target.id.split("-")[0]]
            setCharacter(newCharacter)
        } 
        else {
            let newCharacter = { ...character }
            let input = event.target.value

            if (event.target.type === "number") {
                input = parseInt(input)
            }

            newCharacter[event.target.id] = input
            setCharacter(newCharacter)
        }
    }

    const addDexToAC = armorObj => {
        if (armorObj.addDex === true && armorObj.dexMax === false) {
            return armorObj.armorClass + parseInt(calcMod(character.dex))
        } else if (armorObj.addDex){
            let dexMod = parseInt(calcMod(character.dex))
            if (dexMod > 2) {
                return armorObj.armorClass + 2
            } else {
                return armorObj.armorClass + parseInt(calcMod(character.dex))
            }
            
        } else if (armorObj.name === "Unarmored Defense") {
            return 10 + parseInt(calcMod(character.dex)) + parseInt(calcMod(character.wis))
        } 
        else {
            return armorObj.armorClass
        }
    }

    const updateCharacter = () => {
        setIsLoading(true)

        let editedCharacter = {
            id: character.id,
            name: character.name,
            level: character.level || 1,
            classId: character.classId,
            background: character.background,
            alignment: character.alignment,
            race: character.race,
            str: character.str || 0,
            dex: character.dex || 0,
            con: character.con || 0,
            int: character.int || 0,
            wis: character.wis || 0,
            cha: character.cha || 0,
            hitPoints: character.hitPoints,
            speed: character.speed || 0,
            initiative: character.initiative || parseInt(calcMod(character.dex)),
            armorClass: character.armorClass || 10 + parseInt(calcMod(character.dex)),
            acrobatics: character.acrobatics,
            animalHandling: character.animalHandling,
            arcana: character.arcana,
            athletics: character.athletics,
            deception: character.deception,
            history: character.history,
            insight: character.insight,
            intimidation: character.intimidation,
            investigation: character.investigation,
            medicine: character.medicine,
            nature: character.nature,
            perception: character.perception,
            performance: character.performance,
            persuasion: character.persuasion,
            religion: character.religion,
            sleightOfHand: character.sleightOfHand,
            stealth: character.stealth,
            survival: character.survival,
        }

        editedCharacter = {...editedCharacter, ...charClass}
        editedCharacter.id = character.id
        updateSheet(editedCharacter).then(data => navigate(`/character/${data.id}`)).then(() => setIsLoading(false))
    }


    return (
        <div className="character-sheet">
            <header>
                <section className="top-info">
                    <label htmlFor="sheet-text">Name</label> <input name="sheet-text" type="text" value={character.name} onChange={handleInput} id="name" autoComplete="off"></input>
                    Alignment<input type="text" id="alignment" value={character.alignment} onChange={handleInput} autoComplete="off"></input>
                    Class: {charClass.className} <label htmlFor="sheet-text">Level</label> <input name="sheet-text" type="number" value={character.level} max={20} onChange={handleInput} id="level" autoComplete="off"></input>
                    <label htmlFor="sheet-text">Background</label> <input name="sheet-text" type="text" value={character.background} onChange={handleInput} id="background" autoComplete="off"></input>
                    <label htmlFor="sheet-text">Race</label> <input name="sheet-text" type="text" value={character.race} onChange={handleInput} id="race" autoComplete="off"></input>
                </section>
            </header>

            <section className="stats">
                <label htmlFor="sheet-text">STR</label> <input name="sheet-text" type="number" id="str" value={character.str} onChange={handleInput} autoComplete="off"></input>
                <label htmlFor="sheet-text">DEX</label> <input name="sheet-text" type="number" id="dex" value={character.dex} onChange={handleInput} autoComplete="off"></input>
                <label htmlFor="sheet-text">CON</label> <input name="sheet-text" type="number" id="con" value={character.con} onChange={handleInput} autoComplete="off"></input>
                <label htmlFor="sheet-text">INT</label> <input name="sheet-text" type="number" id="int" value={character.int} onChange={handleInput} autoComplete="off"></input>
                <label htmlFor="sheet-text">WIS</label> <input name="sheet-text" type="number" id="wis" value={character.wis} onChange={handleInput} autoComplete="off"></input>
                <label htmlFor="sheet-text">CHA</label> <input name="sheet-text" type="number" id="cha" value={character.cha} onChange={handleInput} autoComplete="off"></input>
            </section>

            <section className="armor">
                <h3>Armor</h3>
                <select id="armorClass" onChange={handleInput}>
                    <option value={10 + parseInt(calcMod(character.dex))}>---</option>
                    {armorList.map(a => {
                        return (
                            <option value={addDexToAC(a.armor)} key={a.id}>{a.armor.name}</option>
                        )
                    })}
                </select>
            </section>

            <section className="skills">
    
                <input type="checkbox" id="acrobatics-skill" onChange={handleInput} checked={character.acrobatics}/> Acrobatics <br></br>

                <input type="checkbox" id="animalHandling-skill" onChange={handleInput} checked={character.animalHandling}/> Animal Handling <br></br>

                <input type="checkbox" id="arcana-skill" onChange={handleInput} checked={character.arcana}/> Arcana <br></br>

                <input type="checkbox" id="athletics-skill" onChange={handleInput} checked={character.athletics}/> Athletics <br></br>

                <input type="checkbox" id="deception-skill" onChange={handleInput} checked={character.deception}/> Deception <br></br>

                <input type="checkbox" id="history-skill" onChange={handleInput} checked={character.history}/> History <br></br>

                <input type="checkbox" id="insight-skill" onChange={handleInput} checked={character.insight}/> Insight <br></br>

                <input type="checkbox" id="intimidation-skill" onChange={handleInput} checked={character.intimidation}/> Intimidation <br></br>

                <input type="checkbox" id="investigation-skill" onChange={handleInput} checked={character.investigation}/> Investigation <br></br>

                <input type="checkbox" id="medicine-skill" onChange={handleInput} checked={character.medicine}/> Medicine <br></br>

                <input type="checkbox" id="nature-skill" onChange={handleInput} checked={character.nature}/> Nature <br></br>

                <input type="checkbox" id="perception-skill" onChange={handleInput} checked={character.perception}/> Perception <br></br>

                <input type="checkbox" id="performance-skill" onChange={handleInput} checked={character.performance}/> Performance <br></br>

                <input type="checkbox" id="persuasion-skill" onChange={handleInput} checked={character.persuasion}/> Persuasion <br></br>

                <input type="checkbox" id="religion-skill" onChange={handleInput} checked={character.religion}/> Religion <br></br>

                <input type="checkbox" id="sleightOfHand-skill" onChange={handleInput} checked={character.sleightOfHand}/> Sleight Of Hand <br></br>

                <input type="checkbox" id="stealth-skill" onChange={handleInput} checked={character.stealth}/> Stealth <br></br>

                <input type="checkbox" id="survival-skill" onChange={handleInput} checked={character.survival}/> Survival <br></br>
            </section>

            <section className="saves-proficiency">
                <h3>Saving Throws</h3>
                <input type="checkbox" id="strSave" onChange={handleInput} checked={charClass.strSave}/> Strength <br></br>
                <input type="checkbox" id="dexSave" onChange={handleInput} checked={charClass.dexSave}/> Dexterity <br></br>
                <input type="checkbox" id="conSave" onChange={handleInput} checked={charClass.conSave}/> Constitution <br></br>
                <input type="checkbox" id="intSave" onChange={handleInput} checked={charClass.intSave}/> Intelligence <br></br>
                <input type="checkbox" id="wisSave" onChange={handleInput} checked={charClass.wisSave}/> Wisdom <br></br>
                <input type="checkbox" id="chaSave" onChange={handleInput} checked={charClass.chaSave}/> Charisma <br></br>
            </section>
                        
            <section className="mid-info">
                <label htmlFor="sheet-text">Armor Class</label> <input name="sheet-text" type="number" value={character.armorClass} onChange={handleInput} id="armorClass" autoComplete="off"></input>
                <label htmlFor="sheet-text">Initiative</label> <input name="sheet-text" type="number" value={character.initiative} onChange={handleInput} id="initiative" autoComplete="off" placeholder={calcMod(character.dex)}></input>
                <label htmlFor="sheet-text">Speed</label> <input name="sheet-text" value={character.speed} type="number" onChange={handleInput} id="speed" autoComplete="off"></input>
            </section>
{/* 
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
            </section> */}
            <button onClick={updateCharacter}>SAVE</button>
        </div>
    )
}