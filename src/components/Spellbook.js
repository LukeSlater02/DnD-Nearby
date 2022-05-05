import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addCharacterSpell, deleteCharacterSpell, getAllSpells, getSpellByCharacter, getSpellByIndex } from "../modules/SpellDataManager";

export const Spellbook = () => {
    const location = useLocation()
    const charId = location.pathname.split("/")[2]
    const navigate = useNavigate()

    const [spells, setSpells] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [searchInput, setSearchInput] = useState("")
    const [recordedSpells, setRecordedSpells] = useState([])

    useEffect(() => {
        getAllSpells().then(data => setSpells(data))
    }, [])

    useEffect(() => {
        getSpellByCharacter(charId).then(setRecordedSpells || [])
    }, [])

    const handleInput = (event) => {
        let searchInput = event.target.value
        setSearchInput(searchInput)

        let filteredSpells = spells.filter(ele => {
            return ele.name.toLowerCase().includes(searchInput.toLowerCase())
        })

        if (searchInput === "") {
            setFilteredData([])
        } else {
            setFilteredData(filteredSpells)
        }
    }

    const handleX = () => {
        setFilteredData([])
        setSearchInput("")
    }

    const handleClick = (spellName) => {
        setFilteredData([])
        setSearchInput(spellName)
    }

    const handleAdd = () => {
        spells.filter(ele => {
            if (ele.name.toLowerCase() === searchInput.toLowerCase()) {
                let characterSpell = {
                    characterId: parseInt(charId),
                    spellId: ele.id
                }
                addCharacterSpell(characterSpell).then(() => getSpellByCharacter(charId)).then(setRecordedSpells).then(setSearchInput(''))
            }
        })
    }

    const handleDelete = event => {
        deleteCharacterSpell(event.target.id).then(() => getSpellByCharacter(charId).then(setRecordedSpells))
    }

    const handleSpellClick = event => {
        let foundSpell = recordedSpells.find(ele => ele.spell.id === parseInt(event.target.id))
        let spell = foundSpell.spell
        console.log(spell);
        document.querySelector('.spellbook-container').innerHTML =  `
        <section class="spell-desc">
        <strong class="spell-desc-name">${spell.name}</strong> <button class="spell-desc-close">&times;</button>
        <p>${spell.level} ${spell.school}</p>
        <p>${spell.desc}</p>
        <p><strong>Casting Time</strong>: ${spell.casting_time} <strong>Range</strong>: ${spell.range} <strong>Duration</strong>: ${spell.duration} ${spell.concentration === "yes" ? "(concentration)" : ""} <strong>Components</strong>: ${spell.components}</p>
        </strong>
        `
        document.querySelector('.spellbook-container').addEventListener('click', () => {
            window.location.reload()
        })

    }

    return (
        <section className="spellbook-container">
            <div className="search">
                <div className="spellbook-entry">
                    <input type="text" placeholder="Inscribe a spell..." value={searchInput} onChange={handleInput}></input><button className="x" onClick={handleX}>&times;</button><button className="add" onClick={handleAdd}>Add</button>
                </div>


                {filteredData.length != 0 &&
                    <div className="search-results">
                        {filteredData.slice(0, 15).map(spell => {
                            return <div onClick={() => handleClick(spell.name)} key={spell.id} className="search-item">{spell.name}</div>
                        })}
                    </div>
                }
            </div>
            <section className="spell-list-container">
                <h3>Recorded Spells</h3>
                <section className="spell-list">
                    {recordedSpells.map(ele => {
                        return (
                            <div className="spell-card">
                                <button onClick={handleSpellClick} className="spell-button" id={ele.spellId} key={ele.id}>{ele.spell?.name}</button><button className="spell-delete" id={ele.id} onClick={handleDelete}>&times;</button>
                            </div>
                        )
                    })}
                </section>
            </section>
        </section>
    )
}