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