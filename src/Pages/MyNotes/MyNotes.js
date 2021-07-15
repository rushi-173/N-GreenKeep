import { useState, useEffect } from 'react';
import './MyNotes.css';
import { EditModal, NotesNavBar, RightBar, TopNavBar } from '../../Components';
import { tagList, noteList } from '../../Database';

import { useAuth } from "../../Contexts/auth-context";
import axios  from 'axios';
export const fetchAndSetData = async (auth, url, cb) => {
  if (auth) {
      try {
          const res = await axios.get(
              url,
              {
                  headers: {
                      "Token": auth.token,
                  },
              }
          );
          console.log("wishes initialize", res);
          res.data && cb(res.data.notes, res.data.tags);
      } catch (err) {
          console.log(err);
      }
  }
};
export function MyNotes() {
  const [tags, setTags] = useState(tagList);
  const [tagSelected, setTagSelected] = useState("All Notes");
  const [notes, setNotes] = useState(noteList);
  const [noteSelected, setNoteSelected] = useState(notes[0]);
  const [editModal, setEditModal] = useState(false);
	const { auth } = useAuth();
  console.log(auth);
  // console.log(notes)
  // console.log(noteSelected.text)
  function setNotesAndTags(notes,tags){
    setNotes(notes);
    setTags(tags)
  }
  useEffect( () => {
    fetchAndSetData(auth, "https://devnotes-1.rushi173.repl.co/data" , setNotesAndTags)
  },[auth])

  return (
    <div className="App">
      <TopNavBar
        setNoteSelected ={setNoteSelected}
        setEditModal = {setEditModal}
        notes={notes}
        setNotes = {setNotes}
        tagSelected={tagSelected}
        setTagSelected = {setTagSelected}
        tags={tags}
        setTags={setTags} />
    <div class="main-div">
        <NotesNavBar
          noteSelected={noteSelected}
          setNoteSelected = {setNoteSelected}
          notes = {notes}
          tagSelected = {tagSelected}
          setNotes={setNotes}
        />
        <RightBar
          setNoteSelected={setNoteSelected}
          noteSelected={noteSelected}
          notes={notes}
          setNotes={setNotes}
          tags={tags}
        /></div>
      {editModal && <EditModal
        setEditModal={setEditModal}
        setTags = {setTags}
        tags={tags} />}
    </div>
  );
}