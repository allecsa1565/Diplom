const selectSeanse = JSON.parse(localStorage.getItem('selectSeanse'));

let places = "";
let price = 0;

for (const {
		row, place, type
	}
	of selectSeanse.salesPlaces) {
	if (places !== "") {
		places += ", ";
	}
	places += `${row}/${place}`;
	price += type === "standart" ? Number(selectSeanse.priceStandart) : Number(selectSeanse.priceVip);
}

document.querySelector(".ticket__title").innerHTML = selectSeanse.filmName;  
document.querySelector(".ticket__chairs").innerHTML = places; 
document.querySelector(".ticket__hall").innerHTML = selectSeanse.hallName;  
document.querySelector(".ticket__start").innerHTML = selectSeanse.seanceTime;  
document.querySelector(".ticket__cost").innerHTML = price;  

const newHallConfig = selectSeanse.hallConfig.replace(/selected/g, "taken");

console.log(selectSeanse.seanceTimeStamp);
console.log(selectSeanse.hallId);
console.log(selectSeanse.seanceId);
console.log(newHallConfig);

document.querySelector(".acceptin-button").addEventListener("click", (event) => {
	event.preventDefault();
        createRequest({
	  url: "https://jscp-diplom.netoserver.ru/", 
	  params: `event=sale_add&timestamp=${selectSeanse.seanceTimeStamp}&hallId=${selectSeanse.hallId}&seanceId=${selectSeanse.seanceId}&hallConfiguration=${newHallConfig}`,	
	  callback: (resp) => {
	    if (resp) {
	       //redirect to ticket
            }       You, 1 second ago * Uncommitted changes          
          }
       });		      
    });
