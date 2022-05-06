import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSpellBySlug } from "../../modules/SpellDataManager";
import { IoMdArrowRoundBack } from 'react-icons/io'

export const SpellCard = () => {
    const navigate = useNavigate()
    const params = useParams()

    const [spell, setSpell] = useState({})

    useEffect(() => {
        getSpellBySlug(params.spellSlug).then(data => setSpell(data[0]))
    }, [])

    const newDesc = spell.desc?.replaceAll("-", " ").replaceAll(".",
    '').replaceAll(",",
    '').replaceAll("'",
    '')

    const newHigherLevel = spell.higher_level?.replaceAll("-", " ").replaceAll(".",
    '').replaceAll(",",
    '').replaceAll("'",
    '')

    const newComponents = spell.components?.replaceAll(","," ")
    
    const newLevel = spell.level?.replaceAll("-", ' ')

    return (
        <>
            <section className="spell-card-container">
                <button className="back-button" onClick={() => navigate(`/character/${params.characterId}/spellbook`)}><IoMdArrowRoundBack /></button>
                <div className="spell-card-arcane">
                    <strong>{spell.name}</strong>
                    <p>{newLevel} {spell.school} {spell.ritual === "yes" ? "(ritual)" : ""}</p>
                    <p>{newDesc}</p>
                    {spell.higher_level ? <p>{newHigherLevel}</p> : ""}
                    <div className="spell-details">
                        <section className="details-card-container">
                            <section><
                                strong>Casting Time</strong> {spell.casting_time}</section>
                            <section>
                                <strong>Range</strong> {spell.range} </section>

                            <section>
                                <strong>Duration</strong> {spell.duration} {spell.concentration === "yes" ? "concentration" : ""} </section>

                            <section>
                                <strong>Components</strong> {newComponents}</section>
                        </section>
                    </div>
                </div>

                <div className="spell-card">
                    <strong>{spell.name}</strong>
                    <p>{spell.level} {spell.school} {spell.ritual === "yes" ? "(ritual)" : ""}</p>
                    <p>{spell.desc}</p>
                    {spell.higher_level ? <p>{spell.higher_level}</p> : ""}
                    <div className="spell-details">
                        <section className="details-card-container">
                            <section><
                                strong>Casting Time</strong> {spell.casting_time}</section>
                            <section>
                                <strong>Range</strong> {spell.range} </section>

                            <section>
                                <strong>Duration</strong> {spell.duration} {spell.concentration === "yes" ? "(concentration)" : ""} </section>

                            <section>
                                <strong>Components</strong> {spell.components}</section>
                        </section>
                    </div>
                </div>
            </section>
        </>
    )
}