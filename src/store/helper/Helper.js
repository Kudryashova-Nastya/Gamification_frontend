export const getHostInformation = () => process.env.REACT_APP_IP

export const POSTCORS = (data, token) => {
	return ({
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			"Authorization": `Bearer ${token}`,
			'Content-Type': 'application/json'
		}
	})
}

export const CORS = (token) => {
	return ({
		method: 'GET',
		headers: {
			"Authorization": `Bearer ${token}`
		}
	})
};

// Фиксация body
export const bodyFixPosition = () => {
	console.log("заблок")
	// Получаем позицию прокрутки
	let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

	// Ставим нужные стили
	document.body.setAttribute('data-body-scroll-fix', scrollPosition); // Ставим атрибут со значением прокрутки
	document.getElementsByClassName("main-container")[0].style.top = '-' + scrollPosition + 'px';
	document.getElementsByClassName("main-container")[0].style.position = 'fixed';
	document.body.classList.add("lock")
}

// Расфиксация body
export const bodyUnfixPosition = () => {

	// Получаем позицию прокрутки из атрибута
	let scrollPosition = document.body.getAttribute('data-body-scroll-fix');
	document.body.removeAttribute('data-body-scroll-fix');

	document.getElementsByClassName("main-container")[0].style.top = '';
	document.getElementsByClassName("main-container")[0].style.position = 'static';
	document.body.classList.remove("lock")

	// Прокручиваем страницу на полученное из атрибута значение
	window.scroll(0, scrollPosition);

	// }
}
