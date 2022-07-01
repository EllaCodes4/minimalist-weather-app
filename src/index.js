function displayWeather(response) {
  console.log(response.data);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.weather[0].description;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let highTemp = document.querySelector("#high-temp");
  highTemp.innerHTML = Math.round(response.data.main.temp_max);
  let lowTemp = document.querySelector("#low-temp");
  lowTemp.innerHTML = Math.round(response.data.main.temp_min);
}

let apiKey = "39b37e744d3d61db56e033dc0b8a5694";
let unit = "imperial";
let city = "New York";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

axios.get(apiUrl).then(displayWeather);
