import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteSheet, getSheetById } from "../../modules/SheetDataManager";
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
        setCustomMod(parseInt(event.target.value) > 25 ? 25 : parseInt(event.target.value))
    }

    const calcHP = (charObj) => {
        let lvlPastOne = charObj.level - 1
        let totalConMod = parseInt(calcMod(character.con)) * character.level
        return charObj.hpLevelOne + charObj.hpPerLevel * lvlPastOne + totalConMod
    }

    const { characterId } = useParams()
    let navigate = useNavigate()
    let PB = calcPB(character.level)
    let HP = calcHP(character)
    let strMod = parseInt(  calcMod(character.str))
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
            return <><input type="checkbox" checked={true} readOnly={true} /> <span className="skill-bonus">{stat + PB}</span> <label htmlFor="checkbox"><button className="stat-roll" onClick={() => rolld20(stat + PB)}>{skill}</button></label> <br></br></>

        } else {
            return <><input type="checkbox" checked={false} readOnly={true} /> <span className="skill-bonus">{stat}</span> <label htmlFor="checkbox"><button className="stat-roll" onClick={() => rolld20(stat)}>{skill}</button></label> <br></br></>
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
                <div className="sheet-container">
                    <header>
                        <section className="top-info">
                            <span>{character.name}</span> <br></br><strong>Character Name</strong><br></br><br></br>
                    
                            <span>{character.className} {character.level}</span><br></br><strong>Class & Level</strong><br></br><br></br>
                            
                            <span>{character.background}</span> <br></br><strong>Background</strong><br></br><br></br>
                            
                            <span>{character.race}</span> <br></br><strong>Race</strong><br></br><br></br>
                            
                            <span>{character.alignment}</span> <br></br><strong>Alignment</strong><br></br><br></br>
                        </section>
                    </header>

                    <section className="stats">
                        <div className="statBox">
                            <button onClick={() => rolld20(strMod)} className="statName">str</button><br></br>
                            {character.str} <br></br>
                            <span className="stat-mod">{calcMod(character.str)}</span>
                        </div>
                        <div className="statBox">
                            <button onClick={() => rolld20(dexMod)} className="statName">dex</button> <br></br>
                            {character.dex} <br></br>
                            <span className="stat-mod">{calcMod(character.dex)}</span>
                        </div>
                        <div className="statBox">
                            <button onClick={() => rolld20(conMod)} className="statName">con</button> <br></br>
                            {character.con} <br></br>
                            <span className="stat-mod">{calcMod(character.con)}</span>
                        </div>
                        <div className="statBox">
                            <button onClick={() => rolld20(intMod)} className="statName">int</button> <br></br>
                            {character.int} <br></br>
                            <span className="stat-mod">{calcMod(character.int)}</span>
                        </div>
                        <div className="statBox">
                            <button onClick={() => rolld20(wisMod)} className="statName">wis</button> <br></br>
                            {character.wis} <br></br>
                            <span className="stat-mod">{calcMod(character.wis)}</span>
                        </div>
                        <div className="statBox">
                            <button onClick={() => rolld20(chaMod)} className="statName">cha</button> <br></br>
                            {character.cha} <br></br>
                            <span className="stat-mod">{calcMod(character.cha)}</span>
                        </div>


                    </section>

                    <section className="skills-saves-container">
                        <h4 className="prof-bonus"> <span className="pb">+{PB}</span> <span>Proficiency Bonus</span></h4>
                        <section className="saves">
                            {checkIfSaveProficient(character.strSave, strMod, "Strength")}

                            {checkIfSaveProficient(character.dexSave, dexMod, "Dexterity")}

                            {checkIfSaveProficient(character.conSave, conMod, "Constitution")}

                            {checkIfSaveProficient(character.intSave, intMod, "Intelligence")}

                            {checkIfSaveProficient(character.wisSave, wisMod, "Wisdom")}

                            {checkIfSaveProficient(character.chaSave, chaMod, "Charisma")}

                            <h3>Saving Throws</h3>
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

                            <h3>Skills</h3>
                        </section>
                    </section>

                    <section className="mid-info">
                        <section className="ac-init-speed-container">

                            <section className="ac">
                                {character.armorClass}
                            </section>

                            <section className="init">
                                {character.initiative}<br></br>
                                <button className="initiative-roll" onClick={() => rolld20(character.initiative)}>Initiative</button>
                            </section>

                            <section className="speed">
                                {character.speed}<br></br>
                                Speed
                            </section>
                        </section>


                        <section className="hp-container"><input type="number" placeholder={HP || 0}></input> / {HP || 0} <br></br>
                            <h3>Current Hit Points</h3>
                        </section>

                        <section className="temp-hp-container">
                            <input type="number" placeholder={0}></input><br></br>
                            <h3>Temporary Hit Points</h3>
                        </section>

                        <section className="death-saves-container">
                            Successes <DeathSaveSuccess /><DeathSaveSuccess /><DeathSaveSuccess /> <br></br>
                            Failures <span><DeathSaveFail /><DeathSaveFail /><DeathSaveFail /></span> <br></br>
                            <h3>Death Saves</h3>
                        </section>

                        <section className="hit-dice-container">
                            <input type="number" placeholder={character.level}></input> / {character.level}
                            <h3>Hit Dice</h3>
                        </section> <br></br>

                        <section className="roll-mod">
                            <strong>Custom Roll Modifier</strong>
                            <input type="number" value={customMod} onChange={handleModInput}></input> <br></br> <br></br>
                        </section>

                        <section className="edit"><button onClick={() => navigate(`/character-edit/${characterId}`)}>Edit</button> </section>

                        <section className="delete">
                            <button onClick={() => deleteSheet(character.id).then(() => navigate("/home"))}>Delete</button>
                        </section>
                    </section>

                    <section className="weapons">
                        <h3>Weapon Attacks</h3>
                        {weapons.map(ele => {
                            if (ele.weapon.name.includes("Martial Arts")) {
                                for (let levelRangeNumber of ele.weapon.levelRange) {
                                    if (levelRangeNumber === character.level) {
                                        return (
                                            <section key={ele.weapon.id} className="weapon-attack">
                                        <button onClick={() => weaponAttack(ele.weapon.stat, ele.weapon.damageDieSides, ele.weapon.dieCount)}>{ele.weapon.name}<span className="weapon-dice">{ele.weapon.dieCount}d{ele.weapon.damageDieSides}</span></button>
                                            </section>
                                        )
                                    }
                                }
                            } else {
                                return (
                                    <section key={ele.weapon.id} className="weapon-attack">
                                        <button onClick={() => weaponAttack(ele.weapon.stat, ele.weapon.damageDieSides, ele.weapon.dieCount)}>{ele.weapon.name}<span className="weapon-dice">{ele.weapon.dieCount}d{ele.weapon.damageDieSides}</span></button>
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
                </div>
            </div>
            <div id="overlay" className=""></div>
        </>
    )
}

