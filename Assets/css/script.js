// const apiKey = "6c9f72feb86cd98bc2b2150eabe1f0f9"

function initialize() {
    const cityEl = document.getElementById("enter-city");
    const searchEl = document.getElementById("search-button");
    const clearEl = document.getElementById("clear");
    const nameEl = document.getElementById("city-name");
    const currentPicEl = document.getElementById("current-pic");
    const currentTempEl = document.getElementById("current-temp");
    const currentHumidityEl = document.getElementById("humidity");
    const currentWindEl = document.getElementById("wind-speed");
    const currentUVEl = document.getElementById("UV");
    const historyEl = document.getElementById("history");
    var fiveDayForecastEl = document.getElementById("forecast");
    var todayweatherEl = document.getElementById("current-weather");
    let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
    
  // API Key
    const apiKey = "6c9f72feb86cd98bc2b2150eabe1f0f9";
  
    function getWeather(city) {
      
      let queryURL =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        apiKey;
      axios.get(queryURL).then(function (response) {
        todayweatherEl.classList.remove("d-none");
  
        const currentDate = new Date(response.data.dt * 1000);
        
        const day = currentDate.getDate();   
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
      // formats how the weather is displayed
        nameEl.innerHTML =
          response.data.name + " (" + month + "/" + day + "/" + year + ") ";
  
         // formats and displays the weather forcast
        let weatherPic = response.data.weather[0].icon;
        currentPicEl.setAttribute(
          "src",
          "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png"
        );
        currentPicEl.setAttribute("alt", response.data.weather[0].description);
  
        // gets temp, wind, and Humidity to display
        currentTempEl.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176F";
        currentHumidityEl.innerHTML ="Humidity: " + response.data.main.humidity + "%";
        currentWindEl.innerHTML ="Wind Speed: " + response.data.wind.speed + " MPH";
  
        // Grabs UV based off coordinates
        let lat = response.data.coord.lat;
        let lon = response.data.coord.lon;
     
        //   UV
        let UVQueryURL =
          "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&cnt=1";
        axios.get(UVQueryURL).then(function (response) {
          let UVIndex = document.createElement("span");
  
          // When UV Index is good, shows green, when ok shows yellow, when bad shows red.
          // bg-success shows green=favorable
          if (response.data[0].value < 4) {
            UVIndex.setAttribute("class", "badge bg-success");
          }
          // bg-warning shows yellow=moderate
          else if (response.data[0].value < 8) {
            UVIndex.setAttribute("class", "badge bg-warning");
          }
          // bg-danger shows red=severe
          else {
            UVIndex.setAttribute("class", "badge bg-danger");
          }
          console.log(response.data[0].value);
          UVIndex.innerHTML = response.data[0].value;
          currentUVEl.innerHTML = "UV Index: ";
          currentUVEl.append(UVIndex);
        });
  
        // Gets the 5 day forecast for this city
  
        let cityID = response.data.id;
        let forecastQueryURL =
          "https://api.openweathermap.org/data/2.5/forecast?id=" +
          cityID +
          "&appid=" +
          apiKey;
        axios.get(forecastQueryURL).then(function (response) {
          fiveDayForecastEl.classList.remove("d-none");
  
            // takes all things forcast
          const forecastEl = document.querySelectorAll(".forecast");
          for (i = 0; i < forecastEl.length; i++) {
            forecastEl[i].innerHTML = "";
            const forecastIndex = i * 8 + 4;
            const forecastDate = new Date(
              response.data.list[forecastIndex].dt * 1000
            );
  
          //   retrieve local time
            const forecastDay = forecastDate.getDate();
            const forecastMonth = forecastDate.getMonth() + 1;
            const forecastYear = forecastDate.getFullYear();
            const forecastDateEl = document.createElement("p");
            forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
            forecastDateEl.innerHTML =
              forecastMonth + "/" + forecastDay + "/" + forecastYear;
            forecastEl[i].append(forecastDateEl);
  
            const forecastWeatherEl = document.createElement("img");
  
            forecastWeatherEl.setAttribute(
              "src",
              "https://openweathermap.org/img/wn/" +
                response.data.list[forecastIndex].weather[0].icon +
                "@2x.png"
            );
            forecastWeatherEl.setAttribute(
              "alt",
              response.data.list[forecastIndex].weather[0].description
            );
            forecastEl[i].append(forecastWeatherEl);
            const forecastTempEl = document.createElement("p");
            forecastTempEl.innerHTML =
              "Temp: " +
              k2f(response.data.list[forecastIndex].main.temp) +
              " &#176F";
            forecastEl[i].append(forecastTempEl);
            const forecastHumidityEl = document.createElement("p");
            forecastHumidityEl.innerHTML =
              "Humidity: " +
              response.data.list[forecastIndex].main.humidity +
              "%";
            forecastEl[i].append(forecastHumidityEl);
          }
        });
      });
    }
  
  // search box for history
    searchEl.addEventListener("click", function () {
      const searchTerm = cityEl.value;
      getWeather(searchTerm);
      searchHistory.push(searchTerm);
      localStorage.setItem("search", JSON.stringify(searchHistory));
      renderSearchHistory();
    });
  
  // Clear Search history
    clearEl.addEventListener("click", function () {
      localStorage.clear();
      searchHistory = [];
      renderSearchHistory();
    });
  
  // Changes Temp from kelvin to fahrenheit
    function k2f(K) {
      return Math.floor((K - 273.15) * 1.8 + 32);
    }
  
    // shows history of cities searched
    function renderSearchHistory() {
      historyEl.innerHTML = "";
      for (let i = 0; i < searchHistory.length; i++) {
        const historyItem = document.createElement("input");
        historyItem.setAttribute("type", "text");
        historyItem.setAttribute("readonly", true);
        historyItem.setAttribute("class", "form-control d-block bg-white");
        historyItem.setAttribute("value", searchHistory[i]);
        historyItem.addEventListener("click", function () {
          getWeather(historyItem.value);
        });
        historyEl.append(historyItem);
      }
    }
  
    renderSearchHistory();
    if (searchHistory.length > 0) {
      getWeather(searchHistory[searchHistory.length - 1]);
    }
  }
  
  initialize();