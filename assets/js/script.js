var htmlInput = document.querySelector("#cityName"); //input
var citySearch = document.querySelector("#citySearch"); //button

//get user's current weather from api
var getCurrentWeather = function (cityName) {
    var openWeatherApi = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=552d4c7d171826087d706ba7bce893dc";
    //making a request to get the api's info
    fetch(openWeatherApi)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(city) {
                    console.log(city)
                });
            }
        });
        
};

//get forecast of five from api
var getFiveCast = function (cityName) {
    var openWeatherApi = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=552d4c7d171826087d706ba7bce893dc";
    //making a request to get the api's info
    fetch(openWeatherApi)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(city) {
                    console.log(city)
                });
            }
        });
};

//get value from input and pass it to getCityWeather
var weatherInput = function () {
    var cityName = htmlInput.value;
    handleSearch(cityName);
}

//master event that triggers everything else
var handleSearch = function (cityName) {

//get current weather
    getCurrentWeather(cityName);
//get forecast
    getFiveCast(cityName)
//display both
//add current city into local storage
//display current city in history sidebar
}


var startApplication = function () {
    //load history from storage and display it
}

citySearch.addEventListener("click", weatherInput);