import React from "react"
import { Routes, Route, Outlet, Navigate } from "react-router-dom"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { ClassList } from "./components/classes/ClassList"
import { SheetEdit } from "./components/characterSheet/SheetEdit"
import { SheetForm } from "./components/characterSheet/SheetForm"
import { Tavern } from "./components/Tavern"

export const ApplicationViews = ({isAuthenticated, setAuthUser}) => {
  const PrivateOutlet = () => {
		return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
	}
  return (
    <>
    <Routes>
      <Route path="/" element={<PrivateOutlet/>} >
        <Route path='/home' element={<ClassList/>}/>
        <Route path="/character-edit/:characterId" element={<SheetEdit/>}/>
        <Route path="/character/:characterId" element={<SheetForm/>}/>
        <Route path="/the-tavern" element={<Tavern/>}/>
      </Route>

      <Route path="/login" element={<Login setAuthUser={setAuthUser}/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
    </>
  )
}