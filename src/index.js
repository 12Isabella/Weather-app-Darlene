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

let valuePlace = inputFormField.value;

inputPlace.innerHTML = valuePlace;
let city= valuePlace;


let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
let apiKey = "2ac6514991aa99cb91e321c9b9758eb6";

axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);



}

function showTemp (response){
    console.log(response.data);
    
    let inputPlace = document.querySelector("#place");
    let tempNow = document.querySelector("#tempNow");
    let temperature = Math.round(response.data.main.temp);
    let description = response.data.weather[0].description;
    tempNow.innerHTML= `Right now: ${temperature} °C, ${description}`;
    inputPlace.innerHTML = `${response.data.name}`;

    let feelsLikeTemp = document.querySelector("#feelsLike");
    let feelTemp = Math.round(response.data.main.feels_like);
    feelsLikeTemp.innerHTML = `Feels like: ${feelTemp} °C`;
}

let dayDate = document.querySelector ("#day-date");
dayDate.innerHTML = `on ${actualDate()}`;

let inputFormField = document.querySelector("#input-form");
inputFormField.addEventListener ("submit", handleSubmit);

let apiKey = "2ac6514991aa99cb91e321c9b9758eb6";
let city = "Oslo";
let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);





