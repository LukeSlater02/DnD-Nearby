import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createSheet } from "../../modules/SheetDataManager";

// create a form that the user can input 1) Name, 2) Date and 3) City, then Click submit. 
//on submit, we want to use the EventManager to add new event to DB, then route to the eventList. 

export const SheetForm = () => {
   

    const [sheet, setSheet] = useState({
            classId: 0,
            userId: 0,
            level: 1,
            background: "",
            alignment: "",
            str: 0,
            dex: 0,
            con: 0,
            int: 0,
            wis: 0,
            cha: 0,
            proficiencyBonus: 0,
            hitPoints: 0,
            armorClass: 0
    })

    const [isLoading, setIsLoading] = useState(false)

    const formattedDate = event?.date ? epochDateConverter(event.date, 'yyy-MM-dd') : 'ss'
  
    const navigate = useNavigate();
    const handleControlledInputChange = (e) => {
        const isDate = e.target.id === 'date'
      let epochDate = ''
        if(e.target.id === 'date'){
           epochDate = new Date(e.target.value).getTime()/1000
     

       }
       console.log(e.target.value)
        const newEvent = {...event}
        let selectedVal = isDate? epochDate : e.target.value;
   

        newEvent[e.target.id] = selectedVal;
        setEvent(newEvent);
    }

    const handleClickSaveEvent = (e) => {
        e.preventDefault();
        
        if(event.name !== "" && event.date !== "" && event.location !== "") {
            setIsLoading(true);
            addEvent(event)
            .then(() => navigate('/events'))
        } else {
            window.alert("Complete Each Field")
        }
    }
  
    return (
        <>
            {console.log(sessionStorage.getItem("nutshell_user"))}
            <form className="event__form">
                <h2 className="event__header">Create New Event</h2>

                <fieldset className="event__fields">
                    <div>
                        <label htmlFor="date">Date:</label>
                        <input type="date" id="date" onChange={handleControlledInputChange} required className="form-control" placeholder="event date" value={formattedDate}/>
                    </div>
                </fieldset>

                <fieldset className="event__fields">
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" onChange={handleControlledInputChange} required className="form-control name" placeholder="event name" value={event.name}/>
                    </div>
                </fieldset>


                <fieldset className="event__fields">
                    <div>
                        <label htmlFor="location">Location:</label>
                        <input type="text" id="location" onChange={handleControlledInputChange} required className="form-control location" placeholder="event location" value={event.location}/>
                    </div>
                </fieldset>

                <button 
				    type="button" 
				    className="submit__event__button"
				    disabled={isLoading}
				    onClick={handleClickSaveEvent}>
				    Save Event
          </button>

            </form>
        </>
    )




}