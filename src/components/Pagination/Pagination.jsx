import React, {useState, useEffect} from 'react';
import {observer} from "mobx-react";
import "./pagination.css"
import LEFT from "../../images/icons/arrow-left.svg"
import RIGHT from "../../images/icons/arrow-right.svg"

const Pagination = observer(({pages = 10, currentPage, setCurrentPage, thereIsNothingPhrase}) => {

	const numberOfPages = []
	for (let i = 1; i <= pages; i++) {
		numberOfPages.push(i)
	}

	const [currentButton, setCurrentButton] = useState(1)

	const [arrOfCurrButtons, setArrOfCurrButtons] = useState([])

	useEffect(() => {
		let tempNumberOfPages = [...arrOfCurrButtons]

		let dotsInitial = '...'
		let dotsLeft = '... '
		let dotsRight = ' ...'

		if (numberOfPages.length < 6) {
			tempNumberOfPages = numberOfPages
		} else if (currentButton >= 1 && currentButton <= 3) {
			tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPages.length]
		} else if (currentButton === 4) {
			const sliced = numberOfPages.slice(0, 5)
			tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length]
		} else if (currentButton > 4 && currentButton < numberOfPages.length - 2) {               // from 5 to 8 -> (10 - 2)
			const sliced1 = numberOfPages.slice(currentButton - 2, currentButton)                 // sliced1 (5-2, 5) -> [4,5]
			const sliced2 = numberOfPages.slice(currentButton, currentButton + 1)                 // sliced1 (5, 5+1) -> [6]
			tempNumberOfPages = ([1, dotsLeft, ...sliced1, ...sliced2, dotsRight, numberOfPages.length]) // [1, '...', 4, 5, 6, '...', 10]
		} else if (currentButton > numberOfPages.length - 3) {                 // > 7
			const sliced = numberOfPages.slice(numberOfPages.length - 4)       // slice(10-4)
			tempNumberOfPages = ([1, dotsLeft, ...sliced])
		} else if (currentButton === dotsInitial) {
			setCurrentButton(arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1)
		} else if (currentButton === dotsRight) {
			setCurrentButton(arrOfCurrButtons[3] + 2)
		} else if (currentButton === dotsLeft) {
			setCurrentButton(arrOfCurrButtons[3] - 2)
		}

		setArrOfCurrButtons(tempNumberOfPages)
		setCurrentPage(currentButton)
	}, [currentButton, pages])

	if (pages === 0) {
		return <div className="noinformation">{thereIsNothingPhrase || "По вашему запросу ничего не найдено"}</div>
	}

	return (
		<div className="pagination-container">
			<span
				className={`${currentButton === 1 ? 'disabled' : ''}`}
				onClick={() => setCurrentButton(prev => prev <= 1 ? prev : prev - 1)}
			>
				<img src={LEFT} alt="prev"/>
			</span>

			{arrOfCurrButtons.map(((item, index) => {
				return <span
					key={index}
					className={`${currentPage === item ? 'active' : ''}`}
					onClick={() => setCurrentButton(item)}
				>
					{item}
				</span>
			}))}

			<span
				className={`${currentButton === numberOfPages.length ? 'disabled' : ''}`}
				onClick={() => setCurrentButton(prev => prev >= numberOfPages.length ? prev : prev + 1)}
			>
				<img src={RIGHT} alt="next"/>
			</span>
		</div>
	);
})


export default Pagination