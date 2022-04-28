import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteSheet, getSheetById} from "../../modules/SheetDataManager";
import { calcPB, calcMod, DeathSaveFail, DeathSaveSuccess } from "./SheetHelpers";
import { getWeaponsByClass } from "../../modules/WeaponDataManager";

// create a form that the user can input 1) Name, 2) Date and 3) City, then Click submit. 
//on submit, we want to use the EventManager to add new event to DB, then route to the eventList.
export const SheetForm = () => {
    const [character, setCharacter] = useState(
        {
            level: 1,
            classId: null,
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
    const [weapons, setWeapons] = useState([])
    const [damageRollResult, setDamageRollResult] = useState("")
    const [d20Result, setd20Result] = useState("")
    const [customMod, setCustomMod] = useState(0)

    const handleModInput = event => {
        setCustomMod(parseInt(event.target.value) || 0)
    }

    const calcHP = (charObj) => {
        let totalHP = 0
        let lvlPastOne = charObj.level - 1
        let totalConMod = parseInt(calcMod(character.con)) * character.level
        return charObj.hpLevelOne + charObj.hpPerLevel * lvlPastOne + totalConMod


    }

    const {characterId} = useParams()
    let navigate = useNavigate()
    let PB = calcPB(character.level)
    let HP = calcHP(character)
    let strMod = parseInt(calcMod(character.str))
    let dexMod = parseInt(calcMod(character.dex))
    let conMod = parseInt(calcMod(character.con))
    let intMod = parseInt(calcMod(character.int))
    let wisMod = parseInt(calcMod(character.wis))
    let chaMod = parseInt(calcMod(character.cha))

    const getWeapons = (clId) => {
        getWeaponsByClass(clId).then(c => setWeapons(c))
    }

    useEffect(() => {
        getSheetById(characterId).then(data => {
            setCharacter(data)
            getWeapons(data.classId)
        })
    }, [])


    const rollDamage = (stat, count, sides) => {
        let total = 0
        for (let i = 0; i < parseInt(count); i++) {
            total += Math.floor(Math.random() * parseInt(sides)) + 1
        }
        setDamageRollResult(total += parseInt(stat) + customMod)
    }

    const addDiceText = () => {
        document.querySelector('.dice-text').classList.add('text-active')
    }

    const rolld20 = (stat) => {
        setDamageRollResult('')
        document.querySelector(".d20-roll").classList.remove("nat20", "nat1")
        let total = 0
        total += Math.floor(Math.random() * 20) + 1
        if (total == 20) {
            document.querySelector(".d20-roll").classList.add("nat20")
            setd20Result(total += parseInt(stat) + customMod)
        } else if (total === 1) {
            document.querySelector(".d20-roll").classList.add("nat1")
            setd20Result(total += parseInt(stat) + customMod)
        } else {
            setd20Result(total += parseInt(stat) + customMod)
        }
        activateModal()
        setTimeout(addDiceText, 900)
    }

    const modal = document.querySelector('.dice-modal')
    const overlay = document.getElementById('overlay')

    const activateModal = () => {
        modal.classList.add('active')
        overlay.classList.add('active')
        document.querySelector('.dice-roll-gif').setAttribute('src', "../images/d20-dice.gif")
    }

    const closeModal = () => {
        modal.classList.remove('active')
        overlay.classList.remove('active')
        document.querySelector('.dice-roll-gif').setAttribute('src', "../images/d20-dice.gif")
        document.querySelector('.dice-text').classList.remove('text-active')
    }

    const weaponAttack = (weapStat, weapSides, weapCount) => {
        rolld20(parseInt(calcMod(character[`${weapStat}`])) + PB)
        rollDamage(parseInt(calcMod(character[`${weapStat}`])), weapCount, weapSides)

    }

    const checkIfSkillProficient = (skill, stat) => {
        if (character[skill]) {
            return <><input type="checkbox" checked={true} readOnly={true} /> {stat + PB} <button className="stat-roll" onClick={() => rolld20(stat + PB)}>{skill}</button> <br></br></>

        } else {
            return <><input type="checkbox" checked={false} readOnly={true} /> {stat} <button className="stat-roll" onClick={() => rolld20(stat)}>{skill}</button> <br></br></>
        }
    }

    const checkIfSaveProficient = (skill, stat, name) => {
        if (skill) {
            return <><input type="checkbox" checked={true} readOnly={true} /> {stat + PB} <button className="stat-roll" onClick={() => rolld20(stat + PB)}>{name}</button> <br></br></>

        } else {
            return <><input type="checkbox" checked={false} readOnly={true} /> {stat} <button className="stat-roll" onClick={() => rolld20(stat)}>{name}</button> <br></br></>
        }
    }

    return (
        <>
            <div className="character-sheet">
                {/* {console.log('%c Weapons Array', 'color: orange; font-weight: bold;')}
            {console.table(weapons)} */}

                <header>
                    <section className="top-info">
                        {character.name} - {character.className} Level {character.level} <br></br>
                        {character.background} {character.race} {character.alignment}
                    </section>
                </header>

                <section className="stats">
                    <div className="statBox">
                        {character.str} <br></br>
                        {calcMod(character.str)}<br></br>
                        <button onClick={() => rolld20(strMod)} className="statName">strength</button>
                    </div>
                    <div className="statBox">
                        {character.dex} <br></br>
                        {calcMod(character.dex)} <br></br>
                        <button onClick={() => rolld20(dexMod)} className="statName">Dexterity</button>
                    </div>
                    <div className="statBox">
                        {character.con} <br></br>
                        {calcMod(character.con)} <br></br>
                        <button onClick={() => rolld20(conMod)} className="statName">Constitution</button>
                    </div>
                    <div className="statBox">
                        {character.int} <br></br>
                        {calcMod(character.int)} <br></br>
                        <button onClick={() => rolld20(intMod)} className="statName">Intelligence</button>
                    </div>
                    <div className="statBox">
                        {character.wis} <br></br>
                        {calcMod(character.wis)} <br></br>
                        <button onClick={() => rolld20(wisMod)} className="statName">Wisdom</button>
                    </div>
                    <div className="statBox">
                        {character.cha} <br></br>
                        {calcMod(character.cha)} <br></br>
                        <button onClick={() => rolld20(chaMod)} className="statName">Charisma</button>
                    </div>


                </section>

                <section className="skills">
                    {checkIfSkillProficient("acrobatics", dexMod)}

                    {checkIfSkillProficient("animal handling", wisMod)}

                    {checkIfSkillProficient("arcana", intMod)}

                    {checkIfSkillProficient("athletics", strMod)}

                    {checkIfSkillProficient("deception", chaMod)}

                    {checkIfSkillProficient("history", intMod)}

                    {checkIfSkillProficient("insight", wisMod)}

                    {checkIfSkillProficient("intimidation", chaMod)}

                    {checkIfSkillProficient("investigation", intMod)}

                    {checkIfSkillProficient("medicine", wisMod)}

                    {checkIfSkillProficient("nature", intMod)}

                    {checkIfSkillProficient("perception", wisMod)}

                    {checkIfSkillProficient("performance", chaMod)}

                    {checkIfSkillProficient("persuasion", chaMod)}

                    {checkIfSkillProficient("religion", intMod)}

                    {checkIfSkillProficient("sleight of hand", dexMod)}

                    {checkIfSkillProficient("stealth", dexMod)}

                    {checkIfSkillProficient("survival", wisMod)}
                </section>



                <section className="saves">
                    <h4> +{PB} Proficiency Bonus</h4>

                    <h3>Saving Throws</h3>
                    {checkIfSaveProficient(character.strSave, strMod, "Strength")}

                    {checkIfSaveProficient(character.dexSave, dexMod, "Dexterity")}

                    {checkIfSaveProficient(character.conSave, conMod, "Constitution")}

                    {checkIfSaveProficient(character.intSave, intMod, "Intelligence")}

                    {checkIfSaveProficient(character.wisSave, wisMod, "Wisdom")}

                    {checkIfSaveProficient(character.chaSave, chaMod, "Charisma")}
                </section>

                <section className="mid-info">
                    <strong>Custom Roll Modifier</strong>
                    <input type="number" value={customMod} onChange={handleModInput}></input> <br></br>

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
                    Successes <DeathSaveSuccess /><DeathSaveSuccess /><DeathSaveSuccess /> <br></br>
                    Failures <DeathSaveFail /><DeathSaveFail /><DeathSaveFail />
                </section>

                <section className="weapons">
                    <h4>Weapon Attacks</h4>
                    {weapons.map(ele => {
                        if (ele.weapon.name.includes("Martial Arts")) {
                            for (let levelRangeNumber of ele.weapon.levelRange){
                                if (levelRangeNumber === character.level) {
                                    return (
                                        <section key={ele.weapon.id} className="weapon-attack">
                                            <button onClick={() => weaponAttack(ele.weapon.stat, ele.weapon.damageDieSides, ele.weapon.dieCount)}>{ele.weapon.name}</button>
                                        </section>
                                    )
                                }
                            }
                        } else {
                            return (
                                <section key={ele.weapon.id} className="weapon-attack">
                                    <button onClick={() => weaponAttack(ele.weapon.stat, ele.weapon.damageDieSides, ele.weapon.dieCount)}>{ele.weapon.name}</button>
                                </section>
                            )
                        }
                    })}
                </section>

                <div className="dice-modal" id="dice-modal">
                    <img className="dice-roll-gif"></img>
                    <button data-close-button className="close-button" onClick={closeModal}>&times;</button>
                    <div className="dice-text" id="dice-text">
                        <span className="d20-roll">{d20Result}</span>
                    </div>
                    {damageRollResult ? <div className="roll-result"><strong>Damage: {damageRollResult}</strong></div> : ''}
                </div>

                <button onClick={() => navigate(`/character-edit/${characterId}`)}>Edit</button> <button onClick={() => deleteSheet(character.id).then(() => navigate("/home"))}>Delete</button>
            </div>
            <div id="overlay" className=""></div>
        </>
    )
}

