
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


let dayDate = document.querySelector ("#day-date");
dayDate.innerHTML = `on ${actualDate()}`


function handleSubmit(event){
event.preventDefault();
console.log("running function");

let inputPlace = document.querySelector ("#place");
let inputFormField = document.querySelector ("#input-form-city");

let valuePlace = inputFormField.value;
inputPlace.innerHTML = valuePlace;

}


let inputFormField = document.querySelector("#input-form");
inputFormField.addEventListener ("submit", handleSubmit);


