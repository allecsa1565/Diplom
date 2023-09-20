const selectSeanse = JSON.parse(localStorage.getItem("buyingMeta"));

let places = "";
let price = 0;

selectSeanse.salesPlaces.forEach(salePlace => {
	if (places) {
		places += ", ";
	};
	places += `${salePlace.row}/${salePlace.place}`;
	price += salePlace.type === "standart" ? Number(selectSeanse.priceStandart) : Number(selectSeanse.priceVip);
});

document.querySelector(".ticket__title").innerHTML = selectSeanse.filmName; 
document.querySelector(".ticket__chairs").innerHTML = places; 
document.querySelector(".ticket__hall").innerHTML = selectSeanse.hallName;
document.querySelector(".ticket__cost").innerHTML = price; 

const newHallConfig = selectSeanse.hallConfig.replace(/selected/g, "taken");
document.querySelector(".acceptin-button").addEventListener("click", (event) => {
    event.preventDefault();
    fetch("https://jscp-diplom.netoserver.ru/", {
        method: "POST",
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        body: `event=sale_add&timestamp=${selectSeanse.seanceTimeStamp}&hallId=${selectSeanse.hallId}&seanceId=${selectSeanse.seanceId}&hallConfiguration=${newHallConfig}`,
    });
});
