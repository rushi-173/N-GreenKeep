import React from 'react'
import './TopNavBar.css'

export function TopNavBar({setNoteSelected,setEditModal, notes, setNotes, setTagSelected, tagSelected, tags }) {

    return (
        <div className="top-nav-bar">
            
            
            <div className="top-nav-bar-list">
                <div className="notes">
                <p><b>Your Tags : </b> </p>
                </div>
                <div
                    onClick = {() => setTagSelected("All Notes")}
                    className={tagSelected === "All Notes" ? "notes n-active" : "notes"}
                >
                <svg width="1em" height="1em" viewBox="0 0 24 24"><path d="M4 19h9l-2 2H4c-.5 0-1.03-.21-1.41-.59C2.21 20.03 2 19.5 2 19V9h2v10M17.63 5.84C17.27 5.33 16.67 5 16 5H8c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h8c.67 0 1.27-.34 1.63-.85L22 11l-4.37-5.16z"></path></svg>
                    <div>
                        All Notes
                    </div>
                </div>
                <div className="tag-list">
                    {
                        tags.map((tag,index) => {
                            return (
                                <div
                                    onClick = {() => setTagSelected(tag)}
                                    key={index}
                                    className={tagSelected === tag ? "notes n-active" : "notes"}
                                >
                                    <svg width="1em" height="1em" viewBox="0 0 24 24"><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h11c.67 0 1.27-.34 1.63-.85L22 12l-4.37-6.16z"></path></svg>

                                    <div>
                                        {tag}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="notes tag-add" onClick = {() => setEditModal(true)}>
                    <svg width="1em" height="1em" viewBox="0 0 24 24"><path d="M21.41 11.58l-9-9C12.04 2.21 11.53 2 11 2H4a2 2 0 0 0-2 2v7c0 .53.21 1.04.59 1.41l.41.4c.9-.54 1.94-.81 3-.81a6 6 0 0 1 6 6c0 1.06-.28 2.09-.82 3l.4.4c.37.38.89.6 1.42.6c.53 0 1.04-.21 1.41-.59l7-7c.38-.37.59-.88.59-1.41c0-.53-.21-1.04-.59-1.42M5.5 7A1.5 1.5 0 0 1 4 5.5A1.5 1.5 0 0 1 5.5 4A1.5 1.5 0 0 1 7 5.5A1.5 1.5 0 0 1 5.5 7M10 19H7v3H5v-3H2v-2h3v-3h2v3h3v2z"></path></svg>
                    <div>Add a Tag</div>
                </div>
            </div>
        </div>
    )
}
