function displayTime(date) {
  let hours = now.getHours() % 12 || 12;
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `<i class="fa-solid fa-clock"></i> ${hours}:${minutes}`;
}

function changeBackgroundVideo(response) {
  let weatherIcon = response;
  let backgroundVideo = document.querySelector("#background-video");

  if (weatherIcon === "01d") {
    backgroundVideo.setAttribute("src", `videos/sun-shining.mp4`);
  } else if (weatherIcon === "01n") {
    backgroundVideo.setAttribute("src", `videos/clear-night.mp4`);
  } else if (weatherIcon === "50d" || weatherIcon === "50n") {
    backgroundVideo.setAttribute("src", `videos/fog.mp4`);
  } else if (
    weatherIcon === "02d" ||
    weatherIcon === "02n" ||
    weatherIcon === "03d" ||
    weatherIcon === "03n" ||
    weatherIcon === "04d" ||
    weatherIcon === "04n"
  ) {
    backgroundVideo.setAttribute("src", `videos/cloudy-sky.mp4`);
  } else if (
    weatherIcon === "09d" ||
    weatherIcon === "09n" ||
    weatherIcon === "10d" ||
    weatherIcon === "10n" ||
    weatherIcon === "11d" ||
    weatherIcon === "11n"
  ) {
    backgroundVideo.setAttribute("src", `videos/rain2.mp4`);
  } else if (weatherIcon === "13d" || weatherIcon === "13n") {
    backgroundVideo.setAttribute("src", `videos/snow.mp4`);
  }
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

  changeBackgroundVideo(response.data.weather[0].icon);
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

search("San Francisco");
