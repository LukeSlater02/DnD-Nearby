import React, { useEffect, useState } from "react";
import { getAllClasses } from "../../modules/ClassDataManager";
import { ClassCard } from "./ClassCard";

export const ClassList = () => {
    const [classes, setClasses] = useState([])

    useEffect(() => {
        getAllClasses().then(setClasses)
    }, [])

    return (
        <>
            <h2>Choose a Class to Begin</h2>
            <div className="classCardsList">
                {classes.map(c => {
                    return <ClassCard key={c.id} classObj={c}/>
                })}
            </div>
        </>
    )
}