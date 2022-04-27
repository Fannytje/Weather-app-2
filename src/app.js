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


function showWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let weatherDescriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  temperatureElement.innerHTML= Math.round(response.data.main.temp);
  weatherDescriptionElement.innerHTML = (response.data.weather[0].description);
  humidityElement.innerHTML = (response.data.main.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute
    ("src", `http://openweathermap.org/img/wn/${(response.data.weather[0].icon)}@2x.png`)
  iconElement.setAttribute
    ("alt", `${(response.data.weather[0].description)}`);
  let lastUpdatedElement =document.querySelector("#last-updated");
  lastUpdatedElement.innerHTML = formatDate(response.data.dt * 1000);  
}

let apiKey = "3bbe90ca885623503d6c25ddf34132b7";
let apiURl = `https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${apiKey}&units=metric`;

axios.get(apiURl).then(showWeather);