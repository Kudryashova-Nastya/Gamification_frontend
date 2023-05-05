import React, {useEffect} from 'react';
import {observer} from "mobx-react";
import '../base.css';
import './Search.css';
import SEARCH from "../../images/icons/search-black.svg";
import MarketStore from "../../store/MarketStore";

const BuysSearch = observer(({setArr}) => {
	const allArr = MarketStore.myBuys
	let timeoutId

	useEffect(() => {
		const searchInp = document.getElementsByClassName("search-input")[0]

		searchInp.addEventListener("keyup", () => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				let searchWord = searchInp.value.toLowerCase()
				let filteredArr = allArr.filter(data => {
					return data.store_product?.name.toLowerCase().includes(searchWord)
				})
				setArr(filteredArr)
			}, 200);
		});
	})

	return (
		<div className="search-block">
			<img alt="" src={SEARCH}/>
			<input className="search-input" spellCheck="false" type="text" placeholder="Поиск"/>
		</div>
	);
})

export default BuysSearch;