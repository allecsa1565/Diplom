const selectSeanse = JSON.parse(localStorage.getItem("selectSeanse"));
console.log(selectSeanse);

document.addEventListener("DOMContentLoaded", () => {
	const buttonAcceptin = document.querySelector('.acceptin-button');
	const buyingInfoTitle = document.querySelector('.buying__info-title');
	const buyingInfoStart = document.querySelector('.buying__info-start');
	const buyingInfoHall = document.querySelector('.buying__info-hall');
	const priceStandart = document.querySelector('.price-standart');
	const confStepWrapper = document.querySelector('.conf-step__wrapper');

	buyingInfoTitle.innerHTML = selectSeanse.filmName;
	buyingInfoStart.innerHTML = `Начало сеанса ${selectSeanse.seanceTime}`;
	buyingInfoHall.innerHTML = selectSeanse.hallName;
	priceStandart.innerHTML = selectSeanse.priceStandart;

	const params = `event=get_hallConfig&timestamp=${selectSeanse.seanceTimeStamp}&hallId=${selectSeanse.hallId}&seanceId=${selectSeanse.seanceId}`;

	createRequest({
		url: "https://jscp-diplom.netoserver.ru/",
		params,
		callback: (resp) => {
			console.log(resp);
			if (resp) {
				selectSeanse.hallConfig = resp;
			}
			confStepWrapper.innerHTML = selectSeanse.hallConfig;
			const chairs = [...document.querySelectorAll('.conf-step__row .conf-step__chair')];
			let chairsSelected = [...document.querySelectorAll('.conf-step__row .conf-step__chair_selected')];
			if (chairsSelected.length) {
				buttonAcceptin.removeAttribute("disabled");
			} else {
				buttonAcceptin.setAttribute("disabled", true);
			}
			chairs.forEach((chair) => {
				chair.addEventListener('click', (event) => {
					if (event.target.classList.contains('conf-step__chair_taken')) {
						return;
					}
					event.target.classList.toggle('conf-step__chair_selected');
					chairsSelected = [...document.querySelectorAll('.conf-step__row .conf-step__chair_selected')];
					if (chairsSelected.length) {
						buttonAcceptin.removeAttribute("disabled");
					} else {
						buttonAcceptin.setAttribute("disabled", true);
					}
				});
			});
		}
	});

	// We hang the onclick event on the button
	buttonAcceptin.addEventListener("click", (event) => {
		event.preventDefault();
		// We form a list of selected places
		const selectedPlaces = Array();
		const divRows = Array.from(document.getElementsByClassName("conf-step__row"));
		for (let i = 0; i < divRows.length; i++) {
			const spanPlaces = Array.from(divRows[i].getElementsByClassName("conf-step__chair"));
			for (let j = 0; j < spanPlaces.length; j++) {
				if (spanPlaces[j].classList.contains("conf-step__chair_selected")) {
					// Determine the type of chair chosen
					const typePlace = (spanPlaces[j].classList.contains("conf-step__chair_standart")) ? "standart" : "vip";
					selectedPlaces.push({
						"row": i + 1,
						"place": j + 1,
						"type": typePlace
					});
				}
			}
		}
		// Change the selected seats to occupied and save the new configuration
		const configurationHall = document.querySelector('.conf-step__wrapper').innerHTML;
		// Forming and sending a request
		selectSeanse.hallConfig = configurationHall;
		selectSeanse.salesPlaces = selectedPlaces;
		localStorage.clear();
		localStorage.setItem('selectSeanse', JSON.stringify(selectSeanse));
		const link = document.createElement('a');
		link.href = "payment.html";
		link.click();
	});
});
