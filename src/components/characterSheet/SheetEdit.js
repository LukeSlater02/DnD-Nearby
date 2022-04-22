import React, { useEffect, useState } from "react"
import { getUserSheet } from "../../modules/SheetDataManager"
import { getClassById } from "../../modules/ClassDataManager"

export const SheetEdit = () => {
    const [character, setCharacter] = useState({})
    const [Class, setClass] = useState({})
    let userId = parseInt(sessionStorage.getItem("dnd_user"))
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getUserSheet(userId).then(data => setCharacter(data[0]))
    }, [])
    // console.log(character[0]?.classId != undefined ? character[0].classId : 'Loading'); 


    useEffect(() => {
        getClassById(character[0]?.classId != undefined ? character[0].classId : '').then(setClass).then(() => {
            setIsLoading(false)
        })
    }, [character])

    const handleInput = event => {
        let newCharacter = {...character}
        let input = event.target.value

        newCharacter[event.target.id] = input
        console.log(newCharacter);
        setCharacter(newCharacter)
    }


    if (isLoading === false) {
        return (
            
            <div className="character-sheet">
                <header>
                    <section className="top-info">
                        Alignment<input type="text" id="alignment" value={character.alignment} onChange={handleInput}></input>
                        Class: {Class.className} <label htmlFor="sheet-text">Level</label> <input name="sheet-text" type="text"></input> <label htmlFor="sheet-text">Background</label> <input name="sheet-text" type="text"></input>
                        <label htmlFor="sheet-text">Race</label> <input name="sheet-text" type="text"></input>
                        <label htmlFor="sheet-text">XP</label> <input name="sheet-text" type="text"></input>
                    </section>
                </header>

                <section className="mid-info">
                    <label htmlFor="sheet-text">Armor Class</label> <input name="sheet-text" type="text"></input>
                    <label htmlFor="sheet-text">Initiative</label> <input name="sheet-text" type="text"></input>
                    <label htmlFor="sheet-text">Speed</label> <input name="sheet-text" type="text"></input>
                    <label htmlFor="sheet-text">Hit Points</label> <input name="sheet-text" type="text"></input>
                </section>

                <section className="stats">
                    <label htmlFor="sheet-text">STR</label> <input name="sheet-text" type="numbers" id="str" value={character.str} onChange={handleInput}></input>
                    <label htmlFor="sheet-text">DEX</label> <input name="sheet-text" type="numbers" id="dex" value={character.dex} onChange={handleInput}></input>
                    <label htmlFor="sheet-text">CON</label> <input name="sheet-text" type="numbers" id="con" value={character.con} onChange={handleInput}></input>
                    <label htmlFor="sheet-text">INT</label> <input name="sheet-text" type="numbers" id="int" value={character.int} onChange={handleInput}></input>
                    <label htmlFor="sheet-text">WIS</label> <input name="sheet-text" type="numbers" id="wis" value={character.wis} onChange={handleInput}></input>
                    <label htmlFor="sheet-text">CHA</label> <input name="sheet-text" type="numbers" id="cha" value={character.cha} onChange={handleInput}></input>
                </section>

                <section className="saves-proficiency">
                    <label htmlFor="sheet-text">Proficiency Bonus</label> <input name="sheet-text" type="text"></input>

                    <h3>Saving Throws</h3>
                    <label htmlFor="sheet-text">STR</label> <input name="sheet-text" type="text"></input>
                    <label htmlFor="sheet-text">DEX</label> <input name="sheet-text" type="text"></input>
                    <label htmlFor="sheet-text">CON</label> <input name="sheet-text" type="text"></input>
                    <label htmlFor="sheet-text">INT</label> <input name="sheet-text" type="text"></input>
                    <label htmlFor="sheet-text">WIS</label> <input name="sheet-text" type="text"></input>
                    <label htmlFor="sheet-text">CHA</label> <input name="sheet-text" type="text"></input>
                </section>

                <section className="attacks">

                </section>
            </div>
        )
    } else {
        return (
            <>
                ''
            </>
        )
    }

}