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
import EmployeeProfile from "./components/Employees/EmployeeProfile/EmployeeProfile";
import Market from "./components/Market/Market";


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
		console.log('token', token, Auth.token)
	}, []);

	return (
		<SkeletonTheme baseColor="#CCCCCC" highlightColor="#F0F0F0">
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<Login/>}/>
					<Route path="/regist" element={<StudentRegistration/>}/>
					<Route path="/student"
								 element={(token && role === 'student') ? <Menu role={"student"}/> : <Navigate to="/login" replace/>}>
						<Route path="" element={<Profile/>}/>
						<Route path="send" element={<TransactionPage/>}/>
						<Route path="employees" element={<Employees/>}/>
						<Route path="students" element={<Students/>}/>
						<Route path=":id" element={<Profile/>}/>
						<Route path=":id/send" element={<TransactionPage/>}/>
						<Route path="bank" element={<Bank/>}/>
						<Route path="market" element={<Market canBuy={true}/>}/>
					</Route>

					<Route path="/manager"
								 element={(token && role === 'manager') ? <Menu role={"manager"}/> : <Navigate to="/login" replace/>}>
						<Route path="" element={<EmployeeProfile/>}/>
						<Route path="employees" element={<Employees/>}/>
						<Route path="student-registration" element={<StudentRegistration/>}/>
						<Route path="students" element={<Students canRegister={true}/>}/>
						<Route path=":id" element={<Profile/>}/>
						<Route path="bank" element={<Bank/>}/>
						<Route path="market" element={<Market/>}/>
					</Route>

					<Route path="/couch"
								 element={(token && role === 'couch') ? <Menu role={"couch"}/> : <Navigate to="/login" replace/>}>
						<Route path="student-registration" element={<StudentRegistration/>}/>
						<Route path="employees" element={<Employees/>}/>
						<Route path="students" element={<Students canRegister={true}/>}/>
						<Route path=":id" element={<Profile/>}/>
						<Route path="bank" element={<Bank/>}/>
						<Route path="market" element={<Market/>}/>
					</Route>

					<Route path="/curator"
								 element={(token && role === 'curator') ? <Menu role={"curator"}/> : <Navigate to="/login" replace/>}>
						<Route path="employees" element={<Employees/>}/>
						<Route path="students" element={<Students/>}/>
						<Route path=":id" element={<Profile/>}/>
						<Route path="bank" element={<Bank/>}/>
						<Route path="market" element={<Market/>}/>
					</Route>

				</Routes>
			</BrowserRouter>
		</SkeletonTheme>
	);
})

export default App;
