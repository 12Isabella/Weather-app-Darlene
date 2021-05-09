function actualDate () {
let now = new Date ();
let dayNumber = now.getDay ();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
let day = days[dayNumber];

let date = now.getDate ();
let monthNumber = now.getMonth ();
let months = ["01.", "02.", "03.", "04.", "05.", "06.", "07.","08.","09.","10.","11.","12."];
let month = months[monthNumber];
let year = now.getFullYear();

return `${day}, ${date}.${month}${year}`
}

function handleSubmit(event){
event.preventDefault();
console.log("running function");

let inputPlace = document.querySelector ("#place");
let inputFormField = document.querySelector ("#input-form-city");

let valuePlace = inputFormField.value.trim();

inputPlace.innerHTML = valuePlace;
city = valuePlace;

apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

function updateUnitC () {
  tempUnit = "C";
  handleSubmit ();
}

function showTemp (response){
    console.log(response.data);
    
    let inputPlace = document.querySelector("#place");
    let tempNow = document.querySelector("#tempNow");
    let descriptionWeather = document.querySelector("#descriptionWeather")
    let temperature = Math.round(response.data.main.temp);
    let description = response.data.weather[0].description;
    let feelsLikeTemp = document.querySelector("#feelsLike");
    let feelTemp = Math.round(response.data.main.feels_like);
    
    descriptionWeather.innerHTML = `${description}`;
    if (tempUnit === "C"){    tempNow.innerHTML= `${temperature}`;
    feelsLikeTemp.innerHTML = `Feels like: ${feelTemp} °C`;}
    if (tempUnit === "F"){
    tempNow.innerHTML= `${(temperature*(9/5)+32)}`;
    feelsLikeTemp.innerHTML = `Feels like: ${(feelTemp*(9/5)+32)} °F`;}
    
    inputPlace.innerHTML = `${response.data.name}`;
    
}

function retrievePosition() {
  navigator.geolocation.getCurrentPosition(showWeatherForPosition);}
  
function showWeatherForPosition(position) {
  //let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemp);
  }

let tempUnit = "C";
let city = "Oslo";
let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
let apiKey = "2ac6514991aa99cb91e321c9b9758eb6";


axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);

let dayDate = document.querySelector ("#day-date");
dayDate.innerHTML = `on ${actualDate()}`;

let inputFormField = document.querySelector("#input-form");
inputFormField.addEventListener ("submit", handleSubmit);

let tempC = document.querySelector("#tempC");
tempC.addEventListener ("click", updateUnitC);

let tempF = document.querySelector("#tempF");
tempF.addEventListener ("click", showTemp );

let weatherButton = document.querySelector("#weatherNowButton");
weatherButton.addEventListener("click", retrievePosition);





