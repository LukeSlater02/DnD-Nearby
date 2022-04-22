import React, { useEffect, useState } from "react";
import { getAllClasses } from "../../modules/ClassDataManager";
import { ClassCard } from "./ClassCard";
import { useNavigate } from "react-router-dom";
import { addSheet } from "../../modules/SheetDataManager";

export const ClassList = () => {
    const [classes, setClasses] = useState([])

    useEffect(() => {
        getAllClasses().then(setClasses)
    }, [])

    return (
        <>
            <h2>Choose a Class to Begin</h2>
            <div className="classCardsList">
                {/* NEED TO ADD SELECT CLASS BUTTON FUNCTION */}
                {classes.map(c => {
                    return <ClassCard key={c.id} classObj={c}/>
                })}
            </div>
        </>
    )
}