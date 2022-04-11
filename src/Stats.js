import React, { useState } from "react";

export const Stats = () => {
    const [sheet, updateSheet] = useState(
        {
            name: "",
            level: 0,
            str: ''
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

    const handleBlur = (stat) => {   
        document.getElementById("hello").innerHTML = calculateModifier(stat)
    }

    return (
        <>
        <div>
            <label>STR STAT:</label>
            <input
                type="text"
                id="str"
                value={sheet.str}
                onChange={handleInput}
                required
                autoFocus
                autoComplete="off"
                onBlur={() => handleBlur(sheet.str)}
                placeholder="Enter your strength stat.">
            </input>
            {console.log(sheet.str)}

            <div>STR MOD: <span id="hello"></span></div>

        </div>
        </>
    )
}