
import { useState, useEffect } from 'react';
import './App.css';
import { MyNotes, Home, Login, Signup, Profile, PageNotFound } from './Pages';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
	useNavigate,
	useParams,
	useLocation,
} from "react-router-dom";
import { useToast } from "./Contexts/toast-context";
import { useAuth } from "./Contexts/auth-context";
import axios  from 'axios';
import { Navbar } from "./Components";

function App() {
  const { toasts } = useToast();
	const { auth } = useAuth();

  const PrivateRoute = ({ path, element, children }) => {
		if (auth) {
			return element || children;
		} else {
			return <Navigate to="/login" state={{ from: path }} />;
		}
	};


	


  return (
    <div >
		<Router>
		<Navbar/>
      	<div className="display-main">
				<Routes>
					<PrivateRoute path="/mynotes">
						<MyNotes />
					</PrivateRoute>
					
					<Route exact path="/">
						<Home />
					</Route>

					<PrivateRoute path="/profile">
						<Profile />
					</PrivateRoute>

					<Route exact path="/login" element={<Login />} />
					<Route exact path="/signup" element={<Signup />} />
					
					<Route path="*" element={<PageNotFound />} />
				</Routes>
		</div>
		
		</Router>
     
    </div>
  );
}

export default App;
