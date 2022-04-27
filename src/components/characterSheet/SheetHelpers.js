import { Checkbox, FormControlLabel } from "@mui/material";
import { red } from "@mui/material/colors";
import { green } from "@mui/material/colors";
import React, { useState } from "react";

export const DeathSaveSuccess = () => {
    const [checked, setChecked] = useState(false)
    return (
        <FormControlLabel
            control={<Checkbox
                checked={checked}
                sx={{
                    '&.Mui-checked': {
                        color: green[600],
                    },
                }}
            />}
            onChange={(e) => setChecked(e.target.checked)}
            color="success"
        />
    )
}

export const DeathSaveFail = () => {
    const [checked, setChecked] = useState(false)
    return (
        <FormControlLabel
            control={<Checkbox
                checked={checked}
                sx={{
                    '&.Mui-checked': {
                        color: red[600],
                    },
                }}
            />}
            onChange={(e) => setChecked(e.target.checked)}
            color="success"
        />
    )
}

export const calcPB = charLvl => {
    switch (true) {
        case charLvl < 5:
            return 2
        case charLvl < 9:
            return 3
        case charLvl < 13:
            return 4
        case charLvl < 17:
            return 5
        case charLvl < 21:
            return 6
        default:
            return 0
    }
}


export const calcMod = stat => {
    let parsedStat = parseInt(stat)
    switch (true) {
        case parsedStat === '':
            return 0
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
        case parsedStat <= 25:
            return '+7'
        case parsedStat <= 28:
            return '+8'
        case parsedStat > 30:
            return 'Stat too high to calculate modifier'
        default:
            return 0
    }
}