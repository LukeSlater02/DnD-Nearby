const spellData = "http://localhost:7077"
const data = 'http://localhost:8088'


let counter = 0
export const getAllSpells = () => {
    return fetch(`${spellData}/spells`).then(res => res.json()).then(data => {
        for (let obj of data) {
            obj.id = counter
            let stringData = JSON.stringify(obj, null, 2)
            fs.writeFileSync('newSpells.json', stringData)
            counter++
        }
    })
}


export const addCharacterSpell = (spell) => {
    return fetch(`${data}/characterSpells`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spell)
    }).then(res => res.json())
}

export const getSpellByCharacter = charId => {
    return fetch(`${data}/characterSpells?characterId=${charId}`).then(res => res.json())
}

export const getSpellByIndex = index => {
    return fetch(`https://www.dnd5eapi.co/api/spells/${index}`).then(res => res.json())
}