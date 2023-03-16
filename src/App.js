import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Menu from "./components/Menu/Menu";
import {observer} from "mobx-react";
import {useEffect} from "react";
import Auth from "./store/helper/Auth";
import Login from "./components/Login/Login";


const App = observer(() => {
	let token = Auth.token
	let role = Auth.role

	const getToken = async () => {
		token = await Auth.getToken();
	};

	const getRole = async () => {
		role = await Auth.getRole();
	};

	useEffect(() => {
		// проверяем наличие токенов и роль пользователя
		getToken().then((token) => {
			token ? getRole() : role = null
		});
	});

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login/>}/>
				<Route path="/student" element={(token && role === 'student') ? <Menu/> : <Navigate to="/login" replace/>}>
					{/*<Route path="two" element={<PageTwo/>}/>*/}
				</Route>
				<Route path="/manager" element={(token && role === 'manager') ? <Menu/> : <Navigate to="/login" replace/>}>
					{/*<Route path='/registration' element={<StudentRegistration/>}/>*/}
				</Route>

			</Routes>
		</BrowserRouter>
	);
})

export default App;
