import React, { useState } from "react";
import "./Kasimir.css"

export const CharacterInfo = () => {
    
    const [alignment, setAlignment] = useState("")

    const modal = document.querySelector('.kasimir-modal')
    const overlay = document.getElementById('overlay')

    const handleInput = (event) => {
        let selectedVal = event.target.value
        setAlignment(selectedVal)
        if (selectedVal.includes("evil")){
            modal.classList.add('active')
            overlay.classList.add('active')
            event.target.blur()
        }
    }

    const closeModal = () => {
        modal.classList.remove('active')
        overlay.classList.remove('active')
    }

    return (
        <>
        <label htmlFor="alignment" data-modal-target="kasimir-modal">Alignment</label>
        <div className="kasimir-modal" id="kasimir-modal">
            
            <div className="kasimir-header">
                <div className="kasimir-header-title"><em>A wise old monk approaches...</em></div>
                <button data-close-button className="close-button" onClick={closeModal}>&times;</button>
            </div>
            <div className="modal-body">
            "To truly find yourself, you should play hide and seek alone."
            </div>
        </div>
        <div id="overlay" className=""></div>
        <input type="text" className="alignment" value={alignment} onChange={handleInput}></input>
        </>
    )
}
