var cityName = document.querySelector("#cityName")


//get user's city/location
var getCityName = function (cityName) {
    var openWeatherApi = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=552d4c7d171826087d706ba7bce893dc";
    //making a request to get the api's info
    fetch(openWeatherApi)
        .then(function(response) {
            if (response.ok) {
                response.json()
            }
        })
        console.log(openWeatherApi);
    //click event that sends input on button click to this var
};

getCityName("hollywood");



//put into 5 day area

//put into current weather area 

//have function that saves previously called cities

//have function that loads previously called cities

