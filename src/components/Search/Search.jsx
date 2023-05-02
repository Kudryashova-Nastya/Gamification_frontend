import React, {useEffect} from 'react';
import {observer} from "mobx-react";

import '../base.css';
import './Search.css';

import SEARCH from "../../images/icons/search-black.svg";

const Search = observer(({students, setArr, setCurrentPage, sort, by}) => {
	const allArr = students
	let timeoutId

	useEffect(() => {
		const searchInp = document.getElementsByClassName("search-input")[0]

		searchInp.addEventListener("keyup", () => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => { // задержка 600 мс чтобы пользователь дописал запрос
				let searchWord = searchInp.value.toLowerCase()
				let filteredArr = allArr.filter(data => {
					// так как поиск есть и в студентах и в товарах, все вариации поисковых полей необходимо учитывать
					if (data.name) {
						return data.name.toLowerCase().includes(searchWord)
					} else {
						return `${data?.first_name} ${data?.last_name}`.toLowerCase().includes(searchWord)
					}
				})
				if (sort) {
					setArr(sort(by, filteredArr))
				} else {
					setArr(filteredArr)
				}
				if (setCurrentPage) {
					setCurrentPage(1)
				}
			}, 600);
		});
	})

	return (
		<div className="search-block">
			<img alt="" src={SEARCH}/>
			<input className="search-input" spellCheck="false" type="text" placeholder="Поиск"/>
		</div>
	);
})

export default Search;