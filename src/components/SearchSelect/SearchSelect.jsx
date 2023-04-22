import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react";
import '../base.css';
import './SearchSelect.css'
import ARROW from "../../images/icons/arrow-bottom.svg";
import SEARCH from "../../images/icons/search-gray.svg";
import Auth from "../../store/helper/Auth";

const SearchSelect = observer(({allArr, setRecipient, id}) => {
	const [arr, setArr] = useState(allArr)
	const [mainValue, setMainValue] = useState('')
	const toggleSelect = () => {
		document.getElementsByClassName("wrapper")[0].classList.toggle("active")
	}
	const updateName = (e, student) => {
		let el = e.target;
		let wrapper = document.getElementsByClassName("wrapper")[0]
		wrapper.classList.remove("active");
		setMainValue(el.innerText)
		setRecipient(student)
	}


	useEffect(() => {
		setArr(allArr)
		if (id) {
			// console.log("allArr", allArr)
			let defaultRec = allArr.find(item => item.id === +id)
			// console.log(defaultRec)
			setRecipient(defaultRec)
			setMainValue(`${defaultRec?.first_name} ${defaultRec?.last_name}`)
		}

		let wrapper = document.getElementsByClassName("wrapper")[0]
		const searchInp = wrapper.getElementsByClassName("search-input")[0]

		searchInp.addEventListener("keyup", () => {
			let searchWord = searchInp.value.toLowerCase();
			setArr(allArr.filter(data => {
				return `${data?.first_name} ${data?.last_name}`.toLowerCase().includes(searchWord);
			}))
		});

	}, [allArr])

	return (
		<div className="wrapper">
			<div className="select-btn datalist" onClick={() => toggleSelect()}>
				<span>{mainValue ? mainValue : "Выберите получателя"}</span>
				<img src={ARROW} alt=""/>
			</div>
			<div className="content">
				<div className="search">
					<img alt="" src={SEARCH}/>
					<input className="search-input" spellCheck="false" type="text" placeholder="Поиск"/>
				</div>
				<ul className="options">
					{arr.length > 0 ? arr.map((name, index) => {
						if (name.id !== Auth.profileInfo.id) {
							return (<li onClick={(e) => updateName(e, name)}
													className={`${name?.first_name} ${name?.last_name}` === mainValue ? "selected" : ""}
													key={index}>{name.first_name} {name.last_name}</li>)
						}
					}) : "Студентов по вашему запросу не найдено"}
				</ul>
			</div>
		</div>
	);
})

export default SearchSelect;