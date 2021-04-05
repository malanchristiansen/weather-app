// Adding dates
function formatDateMonthYear(date) {
  let dateNo = now.getDate();
  let year = now.getFullYear();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let month = months[now.getMonth()];

  return `${dateNo} ${month} ${year}`;
}

function formatDayTime(date) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[now.getDay()]; // 0 - 6

  return `${day} ${hours}:${minutes}`;
}

// getting date month and year
let now = new Date(); // geting the dates
let dateMonthYear = document.querySelector("#date-month-year");
dateMonthYear.innerHTML = formatDateMonthYear(now);

// getting day and time
let dayTime = document.querySelector("#day-and-time"); // getting second line in ul
dayTime.innerHTML = formatDayTime(now);

//Adding API to search engine so temp and city shows!

function displayWeatherTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}

function searchCity(city) {
  let apiKey = "d896dba2c8f72c42ab5071ef3cf94cb9";
  let url = "https://api.openweathermap.org/data/2.5/weather";
  let unit = "metric";
  let apiUrl = `${url}?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  city = document.querySelector("#search-city-input").value;
  searchCity(city);
}

let citySearch = document.querySelector(".search-form");
citySearch.addEventListener("click", handleSubmit);

// Display fake temperature and convert link to fahrenheit
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

// Display fake temperature and convert link to Celcius
function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function searchLocation(position) {
  let apiKey = "d896dba2c8f72c42ab5071ef3cf94cb9";
  let url = "https://api.openweathermap.org/data/2.5/weather";
  let unit = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `${url}?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeatherTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let myLocationButton = document.querySelector("#my-location-button");
myLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Copenhagen"); // default city in browser
