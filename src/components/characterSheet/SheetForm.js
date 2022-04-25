import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserSheet } from "../../modules/SheetDataManager";
import { getClassById } from "../../modules/ClassDataManager";
import { calcPB, calcMod } from "./StatCalculations";

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
            initiative: 0,
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

    const calcHP = (classObj, charObj) => {
        let totalHP = 0
        let lvlPastOne = charObj.level - 1
        let totalConMod = parseInt(calcMod(character.con)) * character.level
        return classObj.hpLevelOne + classObj.hpPerLevel * lvlPastOne + totalConMod


    }

    let userId = parseInt(sessionStorage.getItem("dnd_user"))
    let navigate = useNavigate()
    let PB = calcPB(character.level)
    let HP = calcHP(charClass, character)
    let strMod = parseInt(calcMod(character.str))
    let dexMod = parseInt(calcMod(character.dex))
    let conMod = parseInt(calcMod(character.con))
    let intMod = parseInt(calcMod(character.int))
    let wisMod = parseInt(calcMod(character.wis))
    let chaMod = parseInt(calcMod(character.cha))

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


    return (
        <div className="character-sheet">
            {console.log(dexMod)}
            <header>
                <section className="top-info">
                    {character.name} - {charClass.className} Level {character.level} {character.background} <br></br>
                    {character.race} {character.alignment}
                </section>
            </header>

            <section className="stats">
                <div className="statBox">
                    {character.str} <br></br>
                    {calcMod(character.str)}<br></br>
                    <span className="statName">strength</span>
                </div>
                <div className="statBox">
                    {character.dex} <br></br>
                    {calcMod(character.dex)} <br></br>
                    <span className="statName">Dexterity</span>
                </div>
                <div className="statBox">
                    {character.con} <br></br>
                    {calcMod(character.con)} <br></br>
                    <span className="statName">Constitution</span>
                </div>
                <div className="statBox">
                    {character.int} <br></br>
                    {calcMod(character.int)} <br></br>
                    <span className="statName">Intelligence</span>
                </div>
                <div className="statBox">
                    {character.wis} <br></br>
                    {calcMod(character.wis)} <br></br>
                    <span className="statName">Wisdom</span>
                </div>
                <div className="statBox">
                    {character.cha} <br></br>
                    {calcMod(character.cha)} <br></br>
                    <span className="statName">Charisma</span>
                </div>


            </section>

            <section className="skills">
                {character.acrobatics ? <input type="checkbox" checked={true} readOnly={true} />
                    : <input type="checkbox" checked={false} readOnly={true} />} {character.acrobatics ? dexMod + PB : dexMod} <button className="statRoll" onClick={() => rolld20(dexMod)}>Acrobatics</button> <br></br>

                {character.animalHandling ? <input type="checkbox" checked={true} readOnly={true} />
                    : <input type="checkbox" checked={false} readOnly={true} />} {character.animalHandling ? wisMod + PB : wisMod} <button className="statRoll" onClick={() => rolld20(wisMod)}>Animal Handling</button> <br></br>

                {character.arcana ? <input type="checkbox" checked={true} readOnly={true} />
                    : <input type="checkbox" checked={false} readOnly={true} />} {character.arcana ? intMod + PB : intMod} <button className="statRoll" onClick={() => rolld20(intMod)}>Arcana</button> <br></br>

                {character.athletics ? <input type="checkbox" checked={true} readOnly={true} />
                    : <input type="checkbox" checked={false} readOnly={true} />} {character.athletics ? strMod + PB : strMod} <button className="statRoll" onClick={() => rolld20(strMod)}>Athletics</button> <br></br>

                {character.deception ? <input type="checkbox" checked={true} readOnly={true} />
                    : <input type="checkbox" checked={false} readOnly={true} />} {character.deception ? chaMod + PB : chaMod} <button className="statRoll" onClick={() => rolld20(chaMod)}>Deception</button> <br></br>

                {character.history ? <input type="checkbox" checked={true} readOnly={true} />
                    : <input type="checkbox" checked={false} readOnly={true} />} {character.history ? intMod + PB : intMod} <button className="statRoll" onClick={() => rolld20(intMod)}>History</button> <br></br>

                {character.insight ? <input type="checkbox" checked={true} readOnly={true} />
                    : <input type="checkbox" checked={false} readOnly={true} />} {character.insight ? wisMod + PB : wisMod} <button className="statRoll" onClick={() => rolld20(wisMod)}>Insight</button> <br></br>

                {character.intimidation ? <input type="checkbox" checked={true} readOnly={true} />
                    : <input type="checkbox" checked={false} readOnly={true} />} {character.intimidation ? chaMod + PB : chaMod} <button className="statRoll" onClick={() => rolld20(chaMod)}>Intimidation</button> <br></br>

                {character.investigation ? <input type="checkbox" checked={true} readOnly={true} />
                    : <input type="checkbox" checked={false} readOnly={true} />} {character.investigation ? intMod + PB : intMod} <button className="statRoll" onClick={() => rolld20(intMod)}>Investigation</button> <br></br>

                {character.medicine ? <input type="checkbox" checked={true} readOnly={true} />
                    : <input type="checkbox" checked={false} readOnly={true} />} {character.medicine ? wisMod + PB : wisMod} <button className="statRoll" onClick={() => rolld20(wisMod)}>Medicine</button> <br></br>

                {character.nature ? <input type="checkbox" checked={true} readOnly={true} />
                    : <input type="checkbox" checked={false} readOnly={true} />} {character.nature ? intMod + PB : intMod} <button className="statRoll" onClick={() => rolld20(intMod)}>Nature</button> <br></br>

                {character.perception ? <input type="checkbox" checked={true} readOnly={true} />
                    : <input type="checkbox" checked={false} readOnly={true} />} {character.perception ? wisMod + PB : wisMod} <button className="statRoll" onClick={() => rolld20(wisMod)}>Perception</button> <br></br>

                {character.performance ? <input type="checkbox" checked={true} readOnly={true} />
                    : <input type="checkbox" checked={false} readOnly={true} />} {character.performance ? chaMod + PB : chaMod} <button className="statRoll" onClick={() => rolld20(chaMod)}>Performance</button> <br></br>

                {character.persuasion ? <input type="checkbox" checked={true} readOnly={true} />
                    : <input type="checkbox" checked={false} readOnly={true} />} {character.persuasion ? chaMod + PB : chaMod} <button className="statRoll" onClick={() => rolld20(chaMod)}>Persuasion</button> <br></br>

                {character.religion ? <input type="checkbox" checked={true} readOnly={true} />
                    : <input type="checkbox" checked={false} readOnly={true} />} {character.religion ? intMod + PB : intMod} <button className="statRoll" onClick={() => rolld20(intMod)}>Religion</button> <br></br>

                {character.sleightOfHand ? <input type="checkbox" checked={true} readOnly={true} />
                    : <input type="checkbox" checked={false} readOnly={true} />} {character.sleightOfHand ? dexMod + PB : dexMod} <button className="statRoll" onClick={() => rolld20(dexMod)}>Sleight of Hand</button> <br></br>

                {character.stealth ? <input type="checkbox" checked={true} readOnly={true} />
                    : <input type="checkbox" checked={false} readOnly={true} />} {character.stealth ? dexMod + PB : dexMod} <button className="statRoll" onClick={() => rolld20(dexMod)}>Stealth</button> <br></br>

                {character.survival ? <input type="checkbox" checked={true} readOnly={true} />
                    : <input type="checkbox" checked={false} readOnly={true} />} {character.survival ? wisMod + PB : wisMod} <button className="statRoll" onClick={() => rolld20(wisMod)}>Survival</button> <br></br>
            </section>



            <section className="saves">
                <h4> +{PB} Proficiency Bonus</h4>

                <h3>Saving Throws</h3>
                {charClass.strSave ? <input type="checkbox" checked={true} readOnly={true} />
                    : <input type="checkbox" checked={false} readOnly={true} />} {charClass.strSave ? strMod + PB : strMod} <button className="statRoll" onClick={() => rolld20(strMod)}>Strength</button> <br></br>

                {charClass.dexSave ? <input type="checkbox" checked={true} readOnly={true} />
                    : <input type="checkbox" checked={false} readOnly={true} />} {charClass.dexSave ? dexMod + PB : dexMod} <button className="statRoll" onClick={() => rolld20(dexMod)}>Dexterity</button> <br></br>

                {charClass.conSave ? <input type="checkbox" checked={true} readOnly={true} />
                    : <input type="checkbox" checked={false} readOnly={true} />} {charClass.conSave ? conMod + PB : conMod} <button className="statRoll" onClick={() => rolld20(conMod)}>Constitution</button> <br></br>

                {charClass.intSave ? <input type="checkbox" checked={true} readOnly={true} />
                    : <input type="checkbox" checked={false} readOnly={true} />} {charClass.intSave ? intMod + PB : intMod} <button className="statRoll" onClick={() => rolld20(intMod)}>Intelligence</button> <br></br>

                {charClass.wisSave ? <input type="checkbox" checked={true} readOnly={true} />
                    : <input type="checkbox" checked={false} readOnly={true} />} {charClass.wisSave ? wisMod + PB : wisMod} <button className="statRoll" onClick={() => rolld20(wisMod)}>Wisdom</button> <br></br>

                {charClass.chaSave ? <input type="checkbox" checked={true} readOnly={true} />
                    : <input type="checkbox" checked={false} readOnly={true} />} {charClass.chaSave ? chaMod + PB : chaMod} <button className="statRoll" onClick={() => rolld20(chaMod)}>Charisma</button> <br></br>
            </section>

            <section className="mid-info">
                <strong>Armor Class</strong> <br></br>
                {character.armorClass} <br></br>

                <strong>Initiative</strong> <br></br>
                {character.initiative} <br></br>

                <strong>Speed</strong> <br></br>
                {character.speed} <br></br>

                <strong>Hit Points</strong> <br></br>
                <input type="number" placeholder={HP}></input> / {HP} <br></br>

                <strong>Temporary Hit Points</strong> <br></br>
                <input type="number" placeholder={0}></input><br></br>

                <strong>Hit Dice</strong> <br></br>
                <input type="number" placeholder={character.level}></input> / {character.level} <br></br>

                <strong>Death Saves</strong> <br></br>
                Successes <input type="checkbox"></input> <input type="checkbox"></input> <input type="checkbox"></input> <br></br>
                Failures <input type="checkbox"></input> <input type="checkbox"></input> <input type="checkbox"></input>
            </section>

            <section className="weapons">
                <button onClick={() => {
                    rollDamage(calcMod(character.str), 6, 2)
                    rolld20(calcMod(character.str))
                }}>Longsword</button> <br></br>

                <button onClick={() => {
                    rollDamage(calcMod(character.dex), 8, 2)
                    rolld20(calcMod(character.dex))
                }}>Unarmed Strike</button> <br></br>
            </section>

            <section className="roll">
                <strong>d20 Roll:</strong> {d20Result} <br></br>
                <strong>Damage:</strong> {damageRollResult}
            </section>

            <button onClick={() => navigate("/character-edit")}>Edit</button>
        </div>
    )
}