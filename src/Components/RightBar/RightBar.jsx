import React, { useState } from "react";
import { SelectComp } from "../SelectComp/SelectComp";
import { ToastComp } from "../ToastComp/ToastComp";
import "./RightBar.css";

import { useAuth } from "../../Contexts/auth-context";
import axios  from 'axios';
export function RightBar({
	tags,
	noteSelected,
	setNoteSelected,
	notes,
	setNotes,
}) {
	const [showToast, setShowToast] = useState(false);
	const [saved, setSaved] = useState(false);
	const [localTag, setLocalTag] = useState("All Notes");
	const { auth } = useAuth();


	async function submitHandler(e) {
		e.preventDefault();
		let today = new Date();
		let edit =
			today.getDate() +
			"-" +
			(today.getMonth() + 1) +
			"-" +
			today.getFullYear();
			try {
				const res = await axios.post(
					"https://devnotes-1.rushi173.repl.co/data/notes",
					{
						notes: notes.map((note) => {
							if (note.id === noteSelected.id) {
								return {
									...note,
									title: noteSelected.title,
									text: noteSelected.text,
									edited: edit.toLocaleString(),
									tag: localTag,
								};
							}
							return note;
						}),
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
	
		setSaved(true);

		setTimeout(() => {
			setSaved(false);
		}, 2500);
	}

	function textHandler(e) {
		setNoteSelected({ ...noteSelected, text: e });
	}

	function titleHandler(e) {
		setNoteSelected({ ...noteSelected, title: e });
	}

	async function noteDeleteHandler() {
		if (notes.length > 1) {
			try {
				const res = await axios.post(
					"https://devnotes-1.rushi173.repl.co/data/notes",
					{
						notes: notes.filter((note) => note.id !== noteSelected.id),
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

			if (noteSelected === notes[0]) setNoteSelected(notes[1]);
			else setNoteSelected(notes[0]);
		} else {
			setShowToast(true);

			setTimeout(() => {
				setShowToast(false);
			}, 3000);
		}
	}

	return (
		<div className="right-bar">
			<div className="right-bar-header">
				<div className="header-upper">
					Edit your note content below.
					<div className="add-tag">
						Select Tag:
						<SelectComp
							localTag={localTag}
							setLocalTag={setLocalTag}
							tags={tags}
						/>
					</div>
					<div>
						<button onClick={noteDeleteHandler} className="btn btn-danger">
							Delete
						</button>
						<button form="save-form" type="submit" className="btn btn-primary">
							SAVE
						</button>
					</div>
				</div>
				<div className="header-lower">
					Last edited on {noteSelected.edited}
					<div>(Don't forget to Save)</div>
				</div>
			</div>
			<form
				id="save-form"
				onSubmit={(e) => submitHandler(e)}
				className="right-bar-content"
			>
				<div className="content-title">
					<input
						value={noteSelected.title}
						onChange={(e) => titleHandler(e.target.value)}
						placeholder="Title"
						autoFocus
					/>
				</div>
				<div className="content-text">
					<textarea
						value={noteSelected.text}
						onChange={(e) => textHandler(e.target.value)}
						placeholder="Start writing here"
					/>
				</div>
				<ToastComp
					showToast={saved}
					variant="success"
					message="Successfully Saved"
				/>
			</form>
		</div>
	);
}
