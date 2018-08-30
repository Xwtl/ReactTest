import React from "react"

// Yksittäistä muistiinpanoa mallintava komponentti.
// Parametreina itse muistiinpano sekä tärkeyttä muuttavan napin tapahtumankäsittelijä.
const Note = ({ note, toggleImportance }) => {
    const label = note.important ? "make not important" : "make important"
    return (
        <li>{note.content} <button onClick={toggleImportance}>{label}</button></li>
    )
}

export default Note