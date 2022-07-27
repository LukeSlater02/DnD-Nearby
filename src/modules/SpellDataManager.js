const data = 'http://localhost:8088'

export const getAllSpells = () => {
    return fetch(`${data}/spells`).then(res => res.json())
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
    return fetch(`${data}/characterSpells?characterId=${charId}&_expand=spell`).then(res => res.json())
}

export const deleteCharacterSpell = id => {
    return fetch(`${data}/characterSpells/${id}`, {
        method: "DELETE"
    }).then(res => res.json())
}

export const getSpellBySlug = slug => {
    return fetch(`${data}/spells?slug=${slug}`).then(res => res.json())
}