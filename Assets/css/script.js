const apiKey = "6c9f72feb86cd98bc2b2150eabe1f0f9"
var today = moment().format('L');
var locationHistory = [];
function initial() {
    const historyEl = document.getElementById("history");
    let searchHistory = JSON.parse(localstorage.getItem("search-hist")) || [];
    const searchEL = document.getElementById("search");
    const cityEl = document.getElementById("enter-city");
    const clearEl = document.getElementById("clear");
    const nameEl = document.getElementById("city-name");
    const currentPicEl = document.getElementById("current-pic");
    const currentTempEl = document.getElementById("current--temp");
    const currentWindEl = document.getElementById("wind");
    const currentUVEl = document.getElementById("UV");
    var fiveDayForecastEl = document.getElementById("forecast");
    var todayweatherEL=document.getElementById("current-weather");

}

function cityWeather(city) {
    let queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`;

    $.ajax({
     url:queryURL,
     method:"GET"
    }).then(function(cityWeatherResponse){
        console.log(cityWeatherResponse);
    })
};
