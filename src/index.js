let now = new Date();

function formateDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[now.getDay()];

  let date = now.getDate();
  let month = now.getMonth() + 1;
  let currentHours = now.getHours();
  if (currentHours < 10) {
    currentHours = "0".concat(currentHours);
  }

  let currentMinutes = now.getMinutes();

  if (currentMinutes < 10) {
    currentMinutes = "0".concat(currentMinutes);
  }
  //let nowDate = now.setHours(0, 0, 0, 0);

  let currentDate = `${date}.${month} ${day} ${currentHours}:${currentMinutes}`;
  return currentDate;
}

let dateToday = document.querySelector("p.todayDate");
dateToday.innerHTML = formateDate();

//function search(event) {
// event.preventDefault();
//let citySearch = document.querySelector("#my-city");
//let cityInput = document.querySelector("#enter-yourcity");
//citySearch.innerHTML = cityInput.value;
//}

//let searchForm = document.querySelector("#enter-city");
//searchForm.addEventListener("submit", search);

function displayWeatherCondition(response) {
  document.querySelector("#my-city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

//function showTemperature(response) {
//console.log(response.data);

// let temperature = Math.round(response.data.main.temp);
// let temperatureElement = document.querySelector("#temp");
// temperatureElement.innerHTML = `${temperature}`;
//}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-yourcity").value;
  searchCity(city);
}

let searchForm = document.querySelector("#enter-city");
searchForm.addEventListener("submit", handleSubmit);
searchCity("Kyiv");

function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-position");
currentLocationButton.addEventListener("click", getCurrentLocation);
