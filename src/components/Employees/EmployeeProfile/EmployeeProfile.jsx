import React, {useRef, useState} from 'react';
import EmployeeCard from "../EmployeeCard";
import Auth from "../../../store/helper/Auth";
import EDIT from "../../../images/icons/edit.svg";
import "../style.css"
import '../../base.css';
import "./EmployeeProfile.css"
import {observer} from "mobx-react";
import {CSSTransition} from "react-transition-group";
import {EditEmployeeModalWindow} from "../../Profile/EditModalWindow/EditEmployeeModalWindow";

const EmployeeProfile = observer(() => {
	const [editVisible, setEditVisible] = useState(false)
	const nodeRef = useRef(null)

	return (
		<div className="container">
			<div className="header-block main-header">
				<h1 className="header1">Моя карточка</h1>
			</div>
			<hr color="#CCCCCC" size="4"/>
			<div className="myEmployeeCard-container">
				<EmployeeCard el={Auth.profileInfo} randomFacts={[
					{fact: Auth.profileInfo?.first_fact, is_true: true},
					{fact: Auth.profileInfo?.second_fact, is_true: true},
					{fact: Auth.profileInfo?.false_fact, is_true: false}
				]}/>
				<button className="button" onClick={() => setEditVisible(true)}>Редактировать
					<img className="button-icon" alt="редактировать" src={EDIT}/>
				</button>
			</div>

			<CSSTransition
				in={editVisible}
				timeout={300}
				classNames="alert"
				unmountOnExit
				nodeRef={nodeRef}
			>
				<EditEmployeeModalWindow ref={nodeRef} setEditVisible={setEditVisible}/>
			</CSSTransition>

		</div>
	);
});

export default EmployeeProfile;