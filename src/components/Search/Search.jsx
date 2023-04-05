import React, {useEffect} from 'react';
import {observer} from "mobx-react";
import '../base.css';
import './Search.css'
import SEARCH from "../../images/icons/search-black.svg";

const Search = observer(({students, setArr}) => {
	const allArr = students

	useEffect(() => {
		const searchInp = document.getElementsByClassName("search-input")[0]

		searchInp.addEventListener("keyup", () => {
			let searchWord = searchInp.value.toLowerCase();
			setArr(allArr.filter(data => {
				return data.name.toLowerCase().includes(searchWord);
			}))
		});

	}, [])

	return (
		<div className="search-block">
			<img alt="" src={SEARCH}/>
			<input className="search-input" spellCheck="false" type="text" placeholder="Поиск"/>
		</div>
	);
})

export default Search;