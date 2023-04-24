import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Menu from "./components/Menu/Menu";
import {observer} from "mobx-react";
import {useEffect} from "react";
import Auth from "./store/helper/Auth";
import Login from "./components/Auth/Login";
import Profile from "./components/Profile/Profile";
import StudentRegistration from "./components/Auth/StudentRegistration";
import TransactionPage from "./components/TransactionPage/TransactionPage";
import Students from "./components/Students/Students";
import {SkeletonTheme} from "react-loading-skeleton";
import Employees from "./components/Employees/Employees";
import Bank from "./components/Bank/Bank";


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
			token?.access ? role = getRole() : role = null
		});
		console.log('role', role, Auth.role)
		console.log('token',token, Auth.token)
	}, []);

	return (
		<SkeletonTheme baseColor="#CCCCCC" highlightColor="#ffffff">
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<Login/>}/>
					<Route path="/regist" element={<StudentRegistration/>}/>
					<Route path="/student" element={(token && role === 'student') ? <Menu/> : <Navigate to="/login" replace/>}>
					{/*<Route path="/student" element={<Menu/>}>*/}
						<Route path="" element={<Profile/>}/>
						<Route path="send" element={<TransactionPage/>}/>
						<Route path="employees" element={<Employees/>}/>
						<Route path="students" element={<Students/>}/>
						<Route path=":id" element={<Profile/>}/>
						<Route path=":id/send" element={<TransactionPage/>}/>
						<Route path="bank" element={<Bank/>}/>
					</Route>
					<Route path="/manager" element={(token && role === 'manager') ? <Menu/> : <Navigate to="/login" replace/>}>
						<Route path="registration" element={<StudentRegistration/>}/>
					</Route>

				</Routes>
			</BrowserRouter>
		</SkeletonTheme>
	);
})

export default App;
