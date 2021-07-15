import React, { useState } from 'react'
import './EditModal.css'

export function EditModal({setEditModal, setTags,tags}) {

    const [input, setInput] = useState("");

    function submitHandler(e) {
        e.preventDefault();
        if (input.trim().length === 0) {
            return
        }
        if(!tags.includes(input)){
        setTags([...tags, input.toUpperCase() ])}
        setEditModal(false)
    }


    return (
        <div className="edit-modal-bg" onClick={(e) => {
            submitHandler(e)
            setEditModal(false)
        }}>
            <form className="edit-modal" onClick={(e) => e.stopPropagation()} onSubmit = {(e) => submitHandler(e)}>
                <div className="modal-text">
                    Create new tag
                    <svg
                        onClick = {() => setEditModal(false)}
                        width="1em" height="1em" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z" fill="currentColor"></path></svg>
                </div>
                <div className="modal-input">
                    Name
                    <input
                        onChange = {(e) => setInput(e.target.value)}
                        value={input}
                        placeholder="Tag name"
                        autoFocus
                    />
                </div>
                <button type="submit">
                    Create
                </button>
            </form>
        </div>
    )
}

