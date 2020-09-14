var htmlInput = document.querySelector("#cityName"); //input
var citySearch = document.querySelector("#citySearch"); //button
var cityHistory

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

//get UV index //gets lon and lat from current weather api
var getUvIndex = function (lat, lon) {
    var openWeatherApi = `http://api.openweathermap.org/data/2.5/uvi?appid=552d4c7d171826087d706ba7bce893dc&lat=${lat}&lon=${lon}`;
    //making a request to get the api's info
    fetch(openWeatherApi)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(sun) {
                    displayUvIndex(sun);
                });
            }
        });
}

//displays current weather
var displayCurrentWeather = function (data) {
    // console.log("I", data);
    var cityName = data.name;
    var date = moment().format('L');
    var iconUrl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    var temperature = data.main.temp;
    var humidity = data.main.humidity;
    var windSpeed = data.wind.speed;
    var uvLat = data.coord.lat;
    var uvLon = data.coord.lon;

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

    //fetches and displays
    getUvIndex(uvLat, uvLon);
}

var displayUvIndex = function (sun) {
    var uvIndex = sun.value;
    //add colors for each uv thing
    var uvColor 
    switch (true) {
        case (uvIndex <= 2) :
            uvColor = "badge-primary"
            break;
        case (uvIndex <= 5) :
            uvColor = "badge-success"
            break;
        case (uvIndex <= 7) : 
            uvColor = "badge-warning"
            break;
        case (uvIndex <= 10) :
            uvColor = "badge-danger"
            break;
        case (uvIndex > 10) :
            uvColor = "badge-dark"
            break;
    }
    //make elements
    var indexEl = $("<p>").text("UV Index: ");
    var badgeEl = $("<span>")
        .text(uvIndex)
        .addClass(`badge badge-pill ${uvColor}`);
    var currentContainerEl = $("#current-weather");
    //apppend element
    indexEl.append(badgeEl);
    currentContainerEl.append(indexEl);
};


var displayForecastWeather = function (data) {
    // console.log("am", data);
    //filters for the forecast at new for a fake high temp
    var cards = data.list.filter(function(card) {
        if (card["dt_txt"].endsWith("12:00:00")) {
            return true;
        }
        return false;
    });
    //clear previous search
    $("#forecast-row").html("");
    $.each(cards, displayCard);
};

//loops thru to display one card at a time
var displayCard = function (i, day) {
    var date = moment(day["dt_txt"]).format('L');
    var iconUrl = "http://openweathermap.org/img/w/" + day.weather[0].icon + ".png";
    var temperature = day.main.temp;
    var humidity = day.main.humidity;

    //making elements
    var col = $("<div>").addClass("col pr-1");
    var card = $("<div>").addClass("card text-white bg-primary mb-3");
    var cardBody = $("<div>").addClass("card-body");
    var cardTitle = $("<h5>").addClass("card-title").text(date);
    var cardIcon = $("<img>").attr("src", iconUrl);
    var cardTemp = $("<p>").addClass("card-text").text("Temperature: " + temperature + " \u00B0F");
    var cardHumid = $("<p>").addClass("card-text").text("Humidity: " + humidity + "%");
    //append them!
    cardBody.append(cardTitle);
    cardBody.append(cardIcon);
    cardBody.append(cardTemp);
    cardBody.append(cardHumid);
    card.append(cardBody);
    col.append(card);
    $("#forecast-row").append(col);
}



//get value from input and pass it to getCityWeather
var searchButton = function () {
    var cityName = htmlInput.value;
    handleSearch(cityName);
};

var searchInput = function (event) {
    var cityName = event.target.value;
    if (event.key === "Enter") {
        handleSearch(cityName);
    }
}

//master event that triggers everything else
var handleSearch = function (cityName) {
    //get current weather
    getCurrentWeather(cityName);
    //get forecast
    getFiveCast(cityName);
    //add current city into local storage
    saveCities(cityName);
    //display current city in history sidebar
    displayCityHistory();
};

var saveCities = function (cityName) {
    // get city from local storage
    var localStorageCities = loadCities();
    var cityExists = localStorageCities.includes(cityName)
    if (cityExists === false || localStorageCities.length === 0) {
        localStorageCities.push(cityName);
    }
    // save local storage
    localStorage.setItem("city", JSON.stringify(localStorageCities));
    //global variable to local storage
    cityHistory = localStorageCities;
};

//load cities from local storage
var loadCities = function () {
    var localStorageCities = JSON.parse(localStorage.getItem("city"));
  
    // if nothing in localStorage, create a new object to track all task status arrays
    if (!localStorageCities) {
      localStorageCities =  [];
    }
    return localStorageCities;
};

var displayCityHistory = function () {
    $("#history").html("");
    $.each(cityHistory, function(i, city) {
        var cityContainerEl = $("<button>")
            .addClass("list-group-item list-group-item-action")
            .attr("type", "button")
            .text(city)
            .on("click", function(){
                handleSearch(city);
            });
        $("#history").append(cityContainerEl);
    
    });
} 

var startApplication = function () {
    //load history from storage and display it
    cityHistory = loadCities();
    displayCityHistory();
}

//event listeners
citySearch.addEventListener("click", searchButton);
htmlInput.addEventListener("keydown", searchInput);

startApplication();
