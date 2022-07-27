import React, { useState } from "react";
import { ApplicationViews } from "../ApplicationViews";
import { NavBar } from "./nav/NavBar";
import "../index.css"

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
      <NavBar clearUser={clearUser} isAuthenticated={isAuthenticated}/>
return (
  <>
  <ApplicationViews setAuthUser={setAuthUser}
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}/>
  </>
)}
