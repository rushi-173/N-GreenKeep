import React, { useEffect } from 'react'
import './NewNote.css'
import uuid from 'react-uuid'

import { useAuth } from "../../Contexts/auth-context";
import axios  from 'axios';


export function NewNote({ setNoteSelected, notes, setNotes }) {
	const { auth } = useAuth();
    
    async function addNewNote() {
        let today = new Date();
        let  date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ':' + today.getMinutes();
        let edit = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
      
		try {
			const res = await axios.post(
				"https://devnotes-1.rushi173.repl.co/data/notes",
				{
					notes: [{
                        id : uuid(),
                        title: "",
                        text: "",
                        tag: "All Notes",
                        time: time.toLocaleString(),
                        date: date.toLocaleString(),
                        edited : edit.toLocaleString()
                    }, ...notes],
				},
				{
					headers: {
						Token: auth.token,
					},
				}
			);
			console.log(res);
            setNotes(res.data.notes)
		} catch (err) {
			console.log(err);
		}
        
    }

    useEffect(() => {
        setNoteSelected(notes[0])
    },[notes])

    return (
        <div className="new-note" onClick={addNewNote}>
            <svg width="1em" height="1em" viewBox="0 0 24 24"><path d="M17 13h-4v4h-2v-4H7v-2h4V7h2v4h4m-5-9A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2z" fill="#00A82D"></path></svg>
            <div>
                New Note
            </div>
        </div>
    )
}

