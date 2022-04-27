const data = 'http://localhost:8088'

export const getArmorByClass = cId => {
    return fetch(`${data}/classArmor?classId=${cId}&_expand=armor`).then(res => res.json())
}