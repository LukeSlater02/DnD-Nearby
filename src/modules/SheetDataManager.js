const data = 'http://localhost:8088'

export const addSheet = newSheet => {
    return fetch(`${data}/characters`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSheet)
    }).then(res => res.json())
}

export const getUserSheet = userId => {
    return fetch(`${data}/characters?userId=${userId}`).then(res => res.json())
}