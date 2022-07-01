function displayTime(date) {
  let hours = now.getHours() % 12 || 12;
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `<i class="fa-solid fa-clock"></i> ${hours}:${minutes}`;
}

function displayWeather(response) {
  let cityElement = document.querySelector("#city");
  let weatherIcon = document.querySelector("#weather-icon");
  let weatherDescription = document.querySelector("#weather-description");
  let temperatureElement = document.querySelector("#temperature");
  let highTemp = document.querySelector("#high-temp");
  let lowTemp = document.querySelector("#low-temp");

  cityElement.innerHTML = response.data.name;
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
  weatherDescription.innerHTML = response.data.weather[0].description;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  highTemp.innerHTML = Math.round(response.data.main.temp_max);
  lowTemp.innerHTML = Math.round(response.data.main.temp_min);
}

function search(city) {
  let apiKey = "39b37e744d3d61db56e033dc0b8a5694";
  let unit = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}
function showCurrentLocationWeather(position) {
  let apiKey = "39b37e744d3d61db56e033dc0b8a5694";
  let unit = "imperial";
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(displayWeather);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocationWeather);
}

let currentTime = document.querySelector("#current-time");
let now = new Date();
currentTime.innerHTML = displayTime(now);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getLocation);
