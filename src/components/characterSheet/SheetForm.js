import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserSheet } from "../../modules/SheetDataManager";
import { getClassById } from "../../modules/ClassDataManager";
import { calcPB, calculateModifier } from "./StatCalculations";

// create a form that the user can input 1) Name, 2) Date and 3) City, then Click submit. 
//on submit, we want to use the EventManager to add new event to DB, then route to the eventList. 

export const SheetForm = () => {
    const [character, setCharacter] = useState(
        {
            level: 1,
            classId: 1,
            background: "",
            alignment: "",
            race: "",
            armorClass: 0,
            str: 10,
            dex: 10,
            con: 10,
            int: 10,
            wis: 10,
            cha: 10,
            hitPoints: 0,
            speed: 0,
            initiative: 0
        }
    )

    const [charClass, setCharClass] = useState(
        {
            className: "",
            dexSave: false,
            strSave: false,
            conSave: false,
            intSave: false,
            wisSave: false,
            chaSave: false,
            hpPerLevel: 0,
            hpLevelOne: 0,
            hitDieSides: 0,
        }
    )

    const [weapons, setWeapons] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [damageRollResult, setDamageRollResult] = useState("")
    const [d20Result, setd20Result] = useState("")

    let userId = parseInt(sessionStorage.getItem("dnd_user"))
    let navigate = useNavigate()
    let PB = calcPB(character.level)
    let HP = calcHP(charClass, character)

    useEffect(() => {
        getUserSheet(userId).then(data => {
            setCharacter(data[0])
        })
    }, [])

    useEffect(() => {
        getClassById(character.classId).then(c => setCharClass(c))
    }, [character])


    const rollDamage = (stat, sides, count) => {
        let total = 0
        for (let i = 0; i < parseInt(count); i++) {
            total += Math.floor(Math.random() * parseInt(sides)) + 1
        }
        setDamageRollResult(total += parseInt(stat))
    }

    const rolld20 = (stat) => {
        let total = 0
        total += Math.floor(Math.random() * 20) + 1
        setd20Result(total += parseInt(stat))
    }
    
    const calcHP = (classObj, charObj) => {
        let totalHP = 0
        let lvlPastOne = charObj.level-1
        let totalConMod = parseInt(calculateModifier(character.con)) * character.level
        return classObj.hpLevelOne + classObj.hpPerLevel*lvlPastOne + totalConMod
     
     
     }

    calcHP(charClass, character)
    
    return (
        <div className="character-sheet">
            <header>
                <section className="top-info">
                {charClass.className} Level {character.level}
                </section>
            </header>

            <section className="stats">

            </section>

            <section className="saves">
            <h3>Saving Throws</h3>
            {character.str + PB}
            {charClass.strSave ? <input type="checkbox" defaultChecked={true} id="str" /> : <input type="checkbox" id="str" />} Strength <br></br>
            {charClass.dexSave ? <input type="checkbox" defaultChecked={true} id="dex" /> : <input type="checkbox" id="dex" />} Dexterity <br></br>
            {charClass.conSave ? <input type="checkbox" defaultChecked={true} id="con" /> : <input type="checkbox" id="con" />} Constitution <br></br>
            {charClass.intSave ? <input type="checkbox" defaultChecked={true} id="int" /> : <input type="checkbox" id="int" />} Intelligence <br></br>
            {charClass.wisSave ? <input type="checkbox" defaultChecked={true} id="wis" /> : <input type="checkbox" id="wis" />} Wisdom <br></br>
            {charClass.chaSave ? <input type="checkbox" defaultChecked={true} id="cha" /> : <input type="checkbox" id="cha" />} Charisma <br></br>
            </section>

            <section className="mid-info">
                <strong>Hit Points</strong> <br></br>
                {HP} <br></br>

                +{PB} <strong>Proficiency Bonus</strong> <br></br>
                

            </section>

            <section className="weapons">
                <button onClick={() => {
                    rollDamage(calculateModifier(character.str), 6, 2)
                    rolld20(calculateModifier(character.str))
                }}>Longsword</button> <br></br>

                <button onClick={() => {
                    rollDamage(calculateModifier(character.dex), 8, 2)
                    rolld20(calculateModifier(character.dex))
                }}>Unarmed Strike</button> <br></br>
            </section>

            <section className="roll">
            <strong>To Hit:</strong> {d20Result} <br></br>
            <strong>Damage:</strong> {damageRollResult}
            </section>

            <button onClick={() => navigate("/character-edit")}>Edit</button>
        </div>
    )
}