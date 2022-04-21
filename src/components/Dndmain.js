import React, { useState } from "react";
import { ApplicationViews } from "../ApplicationViews";
import { NavBar } from "./nav/NavBar";
import "../index.css"

//set state for IsAuthenticated. check for dnd user logged in.
// do it in paren there so it can be passed to AppViews and Navbar. 
//this component renders the page. 

export const DnDMain = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem("dnd_user") !== null);

    const setAuthUser = (user) => {
        sessionStorage.setItem("dnd_user", JSON.stringify(user.id))
        sessionStorage.setItem("dnd_user_name", JSON.stringify(user.firstName))
        setIsAuthenticated(sessionStorage.getItem("dnd_user") !== null)
    }
    
    const clearUser = () => {
        sessionStorage.clear();
        setIsAuthenticated(sessionStorage.getItem("dnd_user") !== null)
      }
    
return (
  <>
  <NavBar clearUser={clearUser} isAuthenticated={isAuthenticated}/>
  <ApplicationViews setAuthUser={setAuthUser}
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}/>
  </>
)}
