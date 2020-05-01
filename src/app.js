function formatDate(timestamp) {
  let date = new Date(timestamp);

  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekDay = weekDays[date.getDay()];

  return `${weekDay} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);

  let hours = ("0" + date.getHours()).slice(-2);
  let minutes = ("0" + date.getMinutes()).slice(-2);

  return `${hours}:${minutes}`;
}

function displayRealTemp(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let descriptionElement = document.querySelector("#weather-description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let weatherIconElement = document.querySelector("#weather-icon");
  let iconElement = response.data.weather[0].icon;
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconElement}@2x.png`
  );
  weatherIconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemp = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = celsiusTemp;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;

  for (let index = 0; index < 6; index++) {
    let forecast = response.data.list[index];

    let maxTempForecast = Math.round(forecast.main.temp_max);
    let minTempForecast = Math.round(forecast.main.temp_min);

    forecastElement.innerHTML += `
    <div class="col-2">
      <h6>
        ${formatHours(forecast.dt * 1000)}
      </h6>
      <img src="http://openweathermap.org/img/wn/${
        forecast.weather[0].icon
      }@2x.png" alt="${forecast.weather[0].description}" height="75" />
      <div>
        <strong><span class="max-temp">${maxTempForecast}</span></strong><span class="forecast-unit unit">ºC</span> <span class="min-temp">${minTempForecast}</span><span class="forecast-unit unit">ºC</span>
      </div>
    </div>
    `;
  }
}

function search(city) {
  let apiKey = "5ce165099db98eb1a4172c9b8eea4597";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayRealTemp);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

let searchedCity = document.querySelector("#submit-btn");
searchedCity.addEventListener("click", function (event) {
  event.preventDefault();

  let cityInput = document.querySelector("#searched-city");

  search(cityInput.value);
});

let currentLocation = document.querySelector("#location-btn");
currentLocation.addEventListener("click", function (event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(function (position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let apiKey = "5ce165099db98eb1a4172c9b8eea4597";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayRealTemp);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayForecast);
  });
});

let changeUnitToF = document.querySelector("#fahrenheit");
changeUnitToF.addEventListener("click", function (event) {
  event.preventDefault();

  document.getElementById("fahrenheit").style.background = "#f7e4df";
  document.getElementById("celsius").style.background = "none";

  let currentTempF = document.querySelector("#temp");
  currentTempF.innerHTML = Math.round((celsiusTemp * 9) / 5 + 32);

  let unitF = document.querySelectorAll(".unit");
  for (let index = 0; index < unitF.length; index++) {
    unitF[index].innerHTML = "ºF";
  }
});

let changeUnitToC = document.querySelector("#celsius");
changeUnitToC.addEventListener("click", function (event) {
  event.preventDefault();

  document.getElementById("fahrenheit").style.background = "none";
  document.getElementById("celsius").style.background = "#f7e4df";

  let currentTempC = document.querySelector("#temp");
  currentTempC.innerHTML = celsiusTemp;

  let unitC = document.querySelectorAll(".unit");
  for (let index = 0; index < unitC.length; index++) {
    unitC[index].innerHTML = "ºC";
  }
});

let celsiusTemp = null;

search("Porto");
