const data = 'http://localhost:8088'

export const getAllWeapons = () => {
    return fetch(`${data}/weapons`).then(res => res.json())
}

export const getWeaponsByClass = classId => {
    return fetch(`${data}/classweapons?classId=${classId}&_expand=weapon`).then(res => res.json())
}