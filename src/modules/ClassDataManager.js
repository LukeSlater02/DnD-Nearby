const data = 'http://localhost:8088'

// export const getRogueWeapons = () => {
//     return fetch(`${data}/classWeapons?classId=8&_expand=weapon&_expand=class`)
//     .then(res => res.json())
// }

export const getAllClasses = () => {
    return fetch(`${data}/classes`).then(res => res.json())
}