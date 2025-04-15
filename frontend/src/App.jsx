import { Navigate, Route, Routes } from "react-router-dom";
import React from "react";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import { SocketProvider } from './context/SocketContext';

function App() {
	const { authUser } = useAuthContext();
	return (
		<SocketProvider>
			<div className='p-4 h-screen flex items-center justify-center'>
				<Routes>
					<Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
					<Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
					<Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
				</Routes>
				<Toaster />
			</div>
		</SocketProvider>
	);
}

export default App;