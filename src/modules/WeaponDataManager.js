const data = 'http://localhost:8088'

export const getAllWeapons = () => {
    return fetch(`${data}/weapons`).then(res => res.json())
}