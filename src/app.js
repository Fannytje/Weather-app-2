function formatDate(timestamp) {
  let date = new Date(timestamp);
  let minutes = date.getMinutes();
  if (minutes <10) {
    minutes = `0${minutes}`;
  }

  let hours = date.getHours();
  if (hours <10) {
    hours = `0${hours}`
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000)
  let day = date.getDay();
  let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]

  return days[day];
}


function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class=row>`;

  forecast.forEach(function(forecastDay, index) {
    if (index <6) {
    forecastHTML = forecastHTML + `
          <div class="col-2">
            <div class="forecast-day">
              ${formatDay(forecastDay.dt)}
            </div>
            <img
              class="forecast-icon"
              src="src/icons/${forecastDay.weather[0].icon}.png"
              alt=""
              width="48"
              />
            <div class="forecast-temperature">
              <span class="temp-max">${Math.round(forecastDay.temp.max)}°</span>   
              <span class="temp-min">${Math.round(forecastDay.temp.min)}°</span>
            </div>
          </div>
      `
    }
  });
  
  forecastHTML = forecastHTML + `</div>`
  forecastElement.innerHTML = forecastHTML;   
}


function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "3bbe90ca885623503d6c25ddf34132b7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  let cityElement = document.querySelector("#city")
  let countryElement = document.querySelector("#country");
  let temperatureElement = document.querySelector("#temperature");
  let weatherDescriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  

  cityElement.innerHTML = (response.data.name);
  countryElement.innerHTML = (response.data.sys.country);
  temperatureElement.innerHTML= Math.round(response.data.main.temp);
  weatherDescriptionElement.innerHTML = (response.data.weather[0].description);
  humidityElement.innerHTML = (response.data.main.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute
    ("src", `src/icons/${response.data.weather[0].icon}.png`)
  iconElement.setAttribute
    ("alt", `${(response.data.weather[0].description)}`);

  let lastUpdatedElement =document.querySelector("#last-updated");
  lastUpdatedElement.innerHTML = formatDate(response.data.dt * 1000);  

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "3bbe90ca885623503d6c25ddf34132b7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event){
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let apiKey = "3bbe90ca885623503d6c25ddf34132b7";
let apiURl = `https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${apiKey}&units=metric`;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

axios.get(apiURl).then(showWeather);
