import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react";
import '../base.css';
import './SearchSelect.css'
import ARROW from "../../images/icons/arrow-bottom.svg";

const Select = observer(({allArr, setElement}) => {
	const [arr, setArr] = useState(allArr)
	const [mainValue, setMainValue] = useState('')
	const toggleSelect = () => {
		document.getElementsByClassName("wrapper")[0].classList.toggle("active")
	}
	const updateName = (e, element) => {
		let el = e.target;
		let wrapper = document.getElementsByClassName("wrapper")[0]
		wrapper.classList.remove("active");
		setMainValue(el.innerText)
		setElement(element)
	}

	useEffect(() => {
		setArr(allArr)
	}, [allArr])

	return (
		<div className="wrapper">
			<div className="select-btn datalist" onClick={() => toggleSelect()}>
				<span>{mainValue ? mainValue : "Выберите направление"}</span>
				<img src={ARROW} alt=""/>
			</div>
			<div className="content select-content">
				<ul className="options">
					{arr.length > 0 ? arr.map((el, index) => {
							return (<li onClick={(e) => updateName(e, el)}
													className={el?.name === mainValue ? "selected" : ""}
													key={index}>{el.name}</li>)
					}) : "По вашему запросу ничего не найдено"}
				</ul>
			</div>
		</div>
	);
})

export default Select;