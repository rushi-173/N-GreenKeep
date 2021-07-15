import React from "react";
import "./Home.css";
import {Link} from "react-router-dom";
import Newone from "./newone.png"
export function Home() {

	return (
		<div className="Home">
			<div className="main">
				<h1>
					DEVNOTE - NOTES APPLICATION FOR DEVELOPERS
				</h1>
				<span>
				DevNote is a simple and awesome notepad app. It gives you a quick and simple notepad editing experience when you write notes, memos, e-mails, messages, shopping lists and to-do lists. Taking notes with DevNote Notepad is easier than any other notepad or memo pad app.
				</span>
				<div style={{marginTop: "2rem"}}>
					<Link to="/mynotes"><button className="btn btn-primary" style={{fontSize: "1.5rem"}} ><b>Get Started</b></button></Link> &nbsp; &nbsp;
					<button className="btn btn-outline-primary" style={{fontSize: "1.5rem"}} ><b>Download Guide</b></button>
				</div>
				<p style={{paddingLeft: "0.5rem", marginTop: "1rem"}}>Currently <b>v0.1.0</b></p>
			</div>
			<div className="brand">
				<img src={Newone} alt="notes"/>
				<h1 className="brand-name mainhead" style={{marginTop: "1rem"}}>DEV<span style={{fontSize: "4rem"}}>NOTE</span></h1>
			</div>			
		</div>
	);
}
