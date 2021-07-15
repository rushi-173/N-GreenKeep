import React from 'react'
import './NoteContainer.css'

export function NoteContainer({noteSelected,note}) {
    return (
        <div className={noteSelected === note ? "one-note active-note" : "one-note"}>
            <div className="note-header">
                {note.title === "" ? "Untitled" : `${note.title}`}
            </div>
            <p className="note-text">
                {note.text}
            </p>
            <div className="note-date-time">
                <div>Date : {note.date}</div>
                <div>Time : {note.time}</div>
            </div>
        </div>
    )
}

