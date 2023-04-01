import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react";
import '../base.css';
import './SearchSelect.css'
import ARROW from "../../images/icons/arrow-bottom.svg";
import SEARCH from "../../images/icons/search-gray.svg";

const SearchSelect = observer(({props}) => {
	const allArr = props
	const [arr, setArr] = useState(allArr)
	const [mainValue, setMainValue] = useState('')
	const toggleSelect = () => {
		document.getElementsByClassName("wrapper")[0].classList.toggle("active")
	}
	const updateName = (e) => {
		let el = e.target;
		let wrapper = document.getElementsByClassName("wrapper")[0]
		// document.getElementsByClassName("search-input")[0].value = "";
		wrapper.classList.remove("active");
		setMainValue(el.innerText)
	}


	useEffect(() => {
		let wrapper = document.getElementsByClassName("wrapper")[0]
		const selectBtn = wrapper.getElementsByClassName("select-btn")[0]
		const searchInp = wrapper.getElementsByClassName("search-input")[0]
		console.log("wrapper", wrapper)
		console.log("selectBtn", selectBtn)

		searchInp.addEventListener("keyup", () => {
			let searchWord = searchInp.value.toLowerCase();
			setArr(allArr.filter(data => {
				return data.toLowerCase().startsWith(searchWord);
			}))
		});


	}, [])

	return (
		<div className="wrapper">
			<div className="select-btn datalist" onClick={() => toggleSelect()}>
				<span>{mainValue ? mainValue : "Выберите получателя"}</span>
				<img src={ARROW} alt=""/>
			</div>
			<div className="content">
				<div className="search">
					<img alt="" src={SEARCH}/>
					<input className="search-input" spellCheck="false" type="text" placeholder="Search"/>
				</div>
				<ul className="options">
					{arr.map((name, index) => {
						return (<li onClick={(e) => updateName(e)}
												className={name === mainValue ? "selected" : ""}
												key={index}>{name}</li>)
					})}
				</ul>
			</div>
		</div>
	);
})

export default SearchSelect;