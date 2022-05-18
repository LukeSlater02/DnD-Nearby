const data = 'https://dnd-nearby-data.herokuapp.com'

export const getArmorByClass = cId => {
    return fetch(`${data}/classArmor?classId=${cId}&_expand=armor`).then(res => res.json())
}