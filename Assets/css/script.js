const apiKey = "6c9f72feb86cd98bc2b2150eabe1f0f9"


function init () {
    const historyEl = document.getElementById("history");
    let searchHistory = JSON.parse(localstorage.getItem("search-hist")) || [];
    const searchEL = document.getElementById("search");
    const cityEl = document.getElementById("enter-city");
    const clearEl = document.getElementById("clear");
    const nameEl = document.getElementById("city-name");
    const currentPicEl = document.getElementById("current-pic");
    const currentTempEl = document.getElementById("current-temp");
    const currentWindEl = document.getElementById("wind");
    const currentUVEl = document.getElementById("UV");
    const currentHumidityEL = document.getElementById("humidity")
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

        // gets temp, wind, and Humidity to display
        currentTempEl.innerHTML = "Temperature: " + k2f(response.data.main.temp) + "&#176F";
        currentWindEl.innerHTML = "Wind: " + response.data.wind.speed + "MPH";
        currentHumidityEL.innerHTML = "Humidity: " + respomse.data.humidity + "%";
      
        // Grabs UV based off coordinates
        let lat = response.data.coord.lat;
        let lon = respomse.data.coord.lon;

        // Displays UV
        let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&cnt=1";
        axios.get(UVQueryURL)
        .then(function(response) {
            let UVIndex = document.createElement("span");
            UVIndex.setAttribute("class","badge badge-danger");
            UVIndex.innerHTML = response.data[0].value;
            currentUVEl.innerHTML = "UV: ";
            currentUVEl.append(UVIndex);
        });

        // Creates the 5 day forcast
        let city = response.data.id;
        let forcastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + city + "&appid=" + apiKey;
        axios.get(forcastQueryURL)
        .then(function (response) {
            fiveDayForecastEl.classList.remove("d-none");
            
            // takes all things forcast
            const forecastEl = document.querySelectorAll(".forcast");
            for (i = 0; i< forecastEl.length; i++){
            forecastEl[i].innerHTML = "";
            const forecastIndex = i*8+4;
            const forecastDate= new Date(response.data.list[forecastIndex].dt*1000);
            
            // retrieves local time 
            const forecastDay= forecastDate.getDate();
            const forecastMonth= forecastDate.getMonth() + 1;
            const forecastYear = forecastDate.getFullYear();
            const forecastDateEl = document.createElement("p");
            forecastDateEl.setAttribute("class","mt-3 ,mb-0 forecast-date");
            forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
            forecastEl[i].append(forecastDateEl);

            const forecastWeatherEl = document.createElement("img");
            forecastWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
            forecastWeatherEl.setAttribute("alt", response.data.list[forecastIndex].weather[0].description);
            forecastEl[i].append(forecastWeatherEl);
            const forecastTempEl=document.createElement("p");
            forecastTempEl.innerHTML = "Temp: " + k2f(response.data.list[forecastIndex].main.temp) + "&#176F";
            forecastEl[i].append(forecastTempEl);
            const forecastHumidityEl= document.createElement("p");
            forecastHumidityEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
            forecastEl[i].append(forecastHumidityEl);
            }
        })
    });
    
}
// search box and history
searchEL.addEventListener("click",function(){
    const searchBox = inputEl.value;
    getWeather(searchBox);
    searchHistory.push(searchBox);
    localStorage.setItem("search",JSON.stringify(searchHistory));
    renderSearchHistory();
})
// Clear Search history
clearEl.addEventListener("click",function(){
searchHistory = [];
renderSearchHistory();
})


init();