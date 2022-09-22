const apiKey = "6c9f72feb86cd98bc2b2150eabe1f0f9"
var today = moment().format('L');
var locationHistory = [];
function init () {
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
    const currentHumidityEL = document.getElementById("Humidity")
    var fiveDayForecastEl = document.getElementById("forecast");
    var todayweatherEL=document.getElementById("current-weather");

}

function cityWeather(cityName) {
    let queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`;
    axios.get(queryURL)
    .then(function(response){
        console.log(response);

    const currentDate = new Date(response.data.dt*1000);
    console.log(currentDate);
        
    const day= currentDate.getDate();
    const month= currentDate.getMonth();
    const year = currentDate.getFullYear();
        // formats how the weather is displayed
        nameEl.innerHTML = response.data.name + "("+ month + "/" + day + "/" + year + ")"; 
        
        // formats and displays the weather forcast
        let wetPic = response.data.weather[0].icon;
        currentPicEl.setAttribute("src,https://openweathermap.org/img/wn/" + wetPic + "@2x.png");
        currentPicEl.setAttribute("alt",response.data.weather[0].description);

        currentTempEl.innerHTML = "Temperature: " + k2f(response.data.main.temp) + "&#176F";
        currentWindEl.innerHTML = "Wind: " + response.data.wind.speed + "MPH";
        currentHumidityEL.innerHTML = "Humidity: " + respomse.data.humidity + "%";

        let latitude = response.data.coord.lat;
        let longitude = respomse.data.coord.lon;
        let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&cnt=1";
        axios.get(UVQueryURL)
        .then(function(response){
            let UVIndex = document.createElement("span");
            UVIndex.setAttribute("class","badge badge-danger");
            UVIndex.innerHTML = response.data[0].value;
            currentUVEl.innerHTML = "UV: ";
            currentUVEl.append(UVIndex);
        });
        
    
}
init();