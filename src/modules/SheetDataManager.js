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

export const getSheetById = sheetId => {
    return fetch(`${data}/characters/${sheetId}`).then(res => res.json())
}

export const updateSheet = editedSheet => {
    return fetch(`${data}/characters/${editedSheet.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedSheet)
    }).then(data => data.json())
}

export const deleteSheet = sheetId => {
    return fetch(`${data}/characters/${sheetId}`, {
        method: "DELETE"
    }).then(res => res.json())
}