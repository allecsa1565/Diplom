const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.open(options.method || "POST", options.url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(options.params);
    console.log("ПОШЕЛ ЗАПРОС К СЕРВЕРУ!");

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    for (let key in response) {
                        if (response[key].err) {
                            alert(`Ошибка обращения к базе данных ${response[key].err}: ${response[key].errMessage}`);
                            return;
                        }
                    }
                    options.callback(response);
                } catch (err) {
                    alert(`Ошибка ответа: ${err.message}`);
                }
            } else {
                alert(`Ошибка запроса: ${xhr.status} ${xhr.statusText}`);
            }
        }
    };
};