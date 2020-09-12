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
                    displayCurrentWeather(city);
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
                    displayForecastWeather(city);
                });
            }
        });
};

//displays current weather
var displayCurrentWeather = function (data) {
    console.log("I", data);
    var cityName = data.name;
    var date = moment().format('L');
    var iconUrl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    var temperature = data.main.temp;
    var humidity = data.main.humidity;
    var windSpeed = data.wind.speed;
    var uvIndex

    //making elements for the values above
    var currentContainerEl = $("#current-weather");
    var currentHeaderEl = $("<h2>").text(cityName + " (" + date + ")" );
    var weatherIcon = $("<img>").attr("src", iconUrl);
    var temperatureEl = $("<p>").text("Temperature: " + temperature + " \u00B0F");
    var humidityEl = $("<p>").text("Humidity: " + humidity + "%");
    var windSpeedEl = $("<p>").text("Wind Speed: " + windSpeed + " MPH");

    //clear previous search
    currentContainerEl.html("");

    //append chilren to parents
    currentHeaderEl.append(weatherIcon);
    currentContainerEl.append(currentHeaderEl);
    currentContainerEl.append(temperatureEl);
    currentContainerEl.append(humidityEl);
    currentContainerEl.append(windSpeedEl);

}

var displayUvIndex = function () {
    //gets lon and lat from current weather api
    //fetches the api url
    //puts long and lat into url
    //display it
    //add colors for respond 
    // of either getCurrentWeather, yellow, orange, or red 
}


var displayForecastWeather = function (data) {
    console.log("am", data);
    var date = moment().format('L');
    var emoji 
    // var temperature = data.main.temp;
    // var humidity = data.main.humidity;
}



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
    getFiveCast(cityName);
//add current city into local storage
//display current city in history sidebar
}

var saveCities = function () {

}

//load cities from local storage
var loadCities = function () {
    var localStorageCities = JSON.parse(localStorage.getItem("city"));
  
    // if nothing in localStorage, create a new object to track all task status arrays
    if (!localStorageCities) {
      localStorageCities =  [

      ]
    }
    return localStorageCities;
};

var startApplication = function () {
    //load history from storage and display it
}

citySearch.addEventListener("click", weatherInput);