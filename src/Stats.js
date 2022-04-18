import React, { useState } from "react";

export const Stats = () => {
    const [sheet, updateSheet] = useState(
        {
            name: "",
            level: 0,
            str: '',
            strMod: '',
            dex: '',
            dexMod: '',
            con: '',
            conMod: '',
            int: '',
            intMod: '',
            wis: '',
            wisMod: '',
            cha: '',
            chaMod: '',
        }
    )

    const handleInput = event => {
        const newSheet = { ...sheet }
        let selectedVal = event.target.value

        newSheet[event.target.id] = selectedVal
        updateSheet(newSheet)
    }

    const calculateModifier = stat => {
        let parsedStat = parseInt(stat)
        switch (true) {
            case parsedStat === 1:
                return '-5'
            case parsedStat < 0:
                return 'Stat too low to calculate modifier'
            case parsedStat <= 3:
                return '-4'
            case parsedStat <= 5:
                return '-3'
            case parsedStat <= 7:
                return '-2'
            case parsedStat <= 9:
                return '-1'
            case parsedStat <= 11:
                return '+0'
            case parsedStat <= 13:
                return '+1'
            case parsedStat <= 15:
                return '+2'
            case parsedStat <= 17:
                return '+3'
            case parsedStat <= 19:
                return '+4'
            case parsedStat <= 21:
                return '+5'
            case parsedStat <= 23:
                return '+6'
            case parsedStat > 23:
                return 'Stat too high to calculate modifier.'
            default:
                return ''
        }
    }

    const handleBlur = (statVal, stat) => {   
        const newSheet = { ...sheet }
        newSheet[`${stat}Mod`] = calculateModifier(statVal)

        updateSheet(newSheet)
    }

    return (
        <>
        <div>
            <label>STRENGTH</label>
            <input
                type="number"
                id="str"
                value={sheet.str}
                onChange={handleInput}
                required
                autoFocus
                autoComplete="off"
                onBlur={() => handleBlur(sheet.str, 'str')}>
            </input>
            <div>{sheet.strMod}</div>

            <label>DEXTERITY</label>
            <input
                type="number"
                id="dex"
                value={sheet.dex}
                onChange={handleInput}
                required
                autoFocus
                autoComplete="off"
                onBlur={() => handleBlur(sheet.dex, 'dex')}>
            </input>
            <div>{sheet.dexMod}</div>

            <label>CONSTITUTION</label>
            <input
                type="number"
                id="con"
                value={sheet.con}
                onChange={handleInput}
                required
                autoFocus
                autoComplete="off"
                onBlur={() => handleBlur(sheet.con, 'con')}>
            </input>
            <div>{sheet.conMod}</div>

            <label>INTELLIGENCE</label>
            <input
                type="number"
                id="int"
                value={sheet.int}
                onChange={handleInput}
                required
                autoFocus
                autoComplete="off"
                onBlur={() => handleBlur(sheet.int, 'int')}>
            </input>
            <div>{sheet.intMod}</div>

            <label>WISDOM</label>
            <input
                type="number"
                id="wis"
                value={sheet.wis}
                onChange={handleInput}
                required
                autoFocus
                autoComplete="off"
                onBlur={() => handleBlur(sheet.wis, 'wis')}>
            </input>
            <div>{sheet.wisMod}</div>

            <label>CHARISMA</label>
            <input
                type="number"
                id="cha"
                value={sheet.cha}
                onChange={handleInput}
                required
                autoFocus
                autoComplete="off"
                onBlur={() => handleBlur(sheet.cha, 'cha')}>
            </input>
            <div>{sheet.chaMod}</div>

        </div>
        </>
    )
}