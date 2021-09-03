function actualDate() {
  let now = new Date();
  let dayNumber = now.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayNumber];

  let date = now.getDate();
  let monthNumber = now.getMonth();
  let months = [
    "01.",
    "02.",
    "03.",
    "04.",
    "05.",
    "06.",
    "07.",
    "08.",
    "09.",
    "10.",
    "11.",
    "12.",
  ];
  let month = months[monthNumber];
  let year = now.getFullYear();

  return `${day}, ${date}.${month}${year}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function handleSubmit(event) {
  event.preventDefault();

  let inputPlace = document.querySelector("#place");
  let inputFormField = document.querySelector("#input-form-city");

  let valuePlace = inputFormField.value.trim();

  inputPlace.innerHTML = valuePlace;
  city = valuePlace;

  updateWeather();
}

function updateWeather() {
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

function showTemp(response) {
  console.log(response);

  let inputFormField = document.querySelector("#input-form-city");
  let inputPlaceElement = document.querySelector("#place");
  let tempNowElement = document.querySelector("#tempNow");
  let descriptionWeather = document.querySelector("#descriptionWeather");
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let feelsLikeTemp = document.querySelector("#feelsLike");
  let feelTemp = Math.round(response.data.main.feels_like);
  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.main.humidity;
  let windspeedElement = document.querySelector("#wind");
  let windspeed = response.data.wind.speed;
  let iconElement = document.querySelector("#icon");

  //update the temperatures in all the elements
  tempNowElement.innerHTML = `${temperature}`;
  feelsLikeTemp.innerHTML = `Feels like: ${feelTemp} °C`;
  descriptionWeather.innerHTML = `${description}`;
  humidityElement.innerHTML = `${humidity}`;
  windspeedElement.innerHTML = `${windspeed}`;

  //Update the city that is shown
  inputPlaceElement.innerHTML = `${response.data.name}`;

  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  inputFormField.value = response.data.name;

  getForecast(response.data.coord);
}

function retrievePosition() {
  navigator.geolocation.getCurrentPosition(showWeatherForPosition);
}

function showWeatherForPosition(position) {
  //let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemp);
}

function getForecast(coordinates) {
  let apiKey = "2ac6514991aa99cb91e321c9b9758eb6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2 wholeWeekDay">
              <div class="weather-forecast-Date">${formatDay(
                forecastDay.dt
              )}</div>
              <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max">${Math.round(
                  forecastDay.temp.max
                )}°</span>
                <span class="weather-forecast-temperature-min">${Math.round(
                  forecastDay.temp.min
                )}° </span>
              </div>
            </div>
          `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

let city = "Oslo";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
let apiKey = "2ac6514991aa99cb91e321c9b9758eb6";

axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);

let dayDate = document.querySelector("#day-date");
dayDate.innerHTML = `on ${actualDate()}`;

let inputFormField = document.querySelector("#input-form");
inputFormField.addEventListener("submit", handleSubmit);

let weatherButton = document.querySelector("#weatherNowButton");
weatherButton.addEventListener("click", retrievePosition);
