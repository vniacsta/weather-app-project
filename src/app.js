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

  let hours = ("0" + date.getHours()).slice(-2);
  let minutes = ("0" + date.getMinutes()).slice(-2);

  return `${weekDay} ${hours}:${minutes}`;
}

function displayRealTemp(response) {
  event.preventDefault();

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

  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(response.data.main.temp);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

let city = document.querySelector("#searched-city");

let searchedCity = document.querySelector("#submit-btn");
searchedCity.addEventListener("click", function (event) {
  event.preventDefault();

  let apiKey = "5ce165099db98eb1a4172c9b8eea4597";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayRealTemp);
});

let currentLocation = document.querySelector("#location-btn");
currentLocation.addEventListener("click", function (event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(function (position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let apiKey = "5ce165099db98eb1a4172c9b8eea4597";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

    axios.get(apiUrl).then(displayRealTemp);
  });
});
