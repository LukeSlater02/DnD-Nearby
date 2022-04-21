import React from "react"
import { Routes, Route, Outlet, Navigate } from "react-router-dom"
import { Home } from "./components/Home"
import { Login } from "./components/auth/Login"
import { Register } from "./components/auth/Register"
import { ClassList } from "./components/classes/ClassList"

export const ApplicationViews = ({isAuthenticated, setAuthUser}) => {
  const PrivateOutlet = () => {
		return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
	}
  return (
    <>
    <Routes>
      <Route path="/" element={<PrivateOutlet/>} >
        <Route path='/Home' element={<ClassList/>}/>
      </Route>

      <Route path="/login" element={<Login setAuthUser={setAuthUser}/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
    </>
  )
}