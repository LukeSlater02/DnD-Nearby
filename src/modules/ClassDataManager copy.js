const data = 'http://localhost:8088'

export const getAllClasses = () => {
    return fetch(`${data}/classes`).then(res => res.json())
}

export const getClassById = id => {
    return fetch(`${data}/classes/${id}`).then(res => res.json())
}