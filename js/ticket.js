const selectSeance = JSON.parse(localStorage.getItem("selectSeance"));

document.addEventListener("DOMContentLoaded", () => {
  let places = [];
  selectSeance.salesPlaces.forEach((elem) => {
    places.push(" " + elem.row + "/" + elem.place);
  });

  document.querySelector(".ticket__title").innerHTML = selectSeance.filmName;
  document.querySelector(".ticket__hall").innerHTML = selectSeance.hallName;
  document.querySelector(".ticket__start").innerHTML = selectSeance.seanceTime;
  document.querySelector(".ticket__chairs").innerHTML = places;

  const date = new Date(Number(selectSeance.seanceTimeStamp * 1000));
  const strDate = date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  //Формируем данные для QR кода
  let textQR = `    
  Фильм: ${selectSeance.filmName}
  Зал: ${selectSeance.hallName}
  Ряд/Место ${places}
  Дата: ${strDate}
  Начало сеанса: ${selectSeance.seanceTime}
  Билет действителен строго на свой сеанс`;

  const qr = QRCreator(textQR, { image: "SVG" }); //Создаем QR

  document.querySelector(".ticket__info-qr").append(qr.result); //Добавляем готовый QR на страницу
});
