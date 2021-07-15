import React from 'react'
import {NoteContainer} from '../NoteContainer/NoteContainer'
import './NotesNavBar.css'
import {NewNote} from '../NewNote/NewNote'

export function NotesNavBar({noteSelected, setNoteSelected, notes, tagSelected, setNotes}) {
    return (
        <div className="notes-nav-bar">
            <NewNote
                setNoteSelected ={setNoteSelected}
                setNotes = {setNotes}
                notes={notes} />
            <div className="header">
                <div className="current-tag">
                    {tagSelected}
                </div>
                <div className="note-count">
                    {notes.length === 1 ? `${notes.length}  note` : `${notes.length}  notes`}
                </div>
            </div>

            <div className="notes-container">
                {
                    notes.map((note, index) => {
                        if (note.tag === tagSelected || tagSelected === "All Notes") {
                            return (
                                <div
                                    onClick = {() => setNoteSelected(note)}
                                    key={index}>
                                    <NoteContainer
                                        noteSelected = {noteSelected}
                                        note={note} />
                                </div>
                            )
                        } else {
                            return false
                        }
                    })
                }
            </div>
        </div>
    )
}

