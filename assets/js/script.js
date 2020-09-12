var cityName = document.querySelector("#cityName")


//get api info for current weather
var getCityName = function () {
    var openWeatherApi = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=552d4c7d171826087d706ba7bce893dc";
    //making a request to get the api's info
    fetch(openWeatherApi)
}


//get api info for 5 day forecast