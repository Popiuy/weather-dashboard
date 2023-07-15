// Acceptance criteria:
// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city, and that city is added to the search history
// WHEN I view current weather conditions for a city
// THEN I am presented with the city name, date, and an icon representation of weather conditions
// WHEN I view future weather conditions for a city
// THEN I am presented with a 5-day forecast that displays the date and icon
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

// Variable that saves the list of cities
var cities = [];

// Variable that stores an API key (this is not a standard practice)
var apiKey = "7754a5a2cbeb38edf8762e417315fa20";

// Query selectors to append returned information
var currentDay = document.querySelector("#currentDay");
var searchHistory = document.querySelector("#searchHistory");
var input = document.querySelector("#input");
var form = document.querySelector("#form");
var fiveDayForecast = document.querySelector("#fiveDayForecast");

// Function: gets the info from local storage and saves it to the array
function getData() {
  var storedCities = localStorage.getItem("searchHistory");
  if (storedCities !== null) {
    cities = JSON.parse(storedCities);
  } else {
    cities = [];
  }
  generateButtons()
}

// Generate button with the city from the array (searchHistory)
function generateButtons() {
  // var parentDiv = document.getElementById("buttonContainer");
  // // Clear current buttons (target parent div and clear information)(innerHTML)
  // parentDiv.innerHTML = '';
  // Loop over cities and generate elements onto the page
  for (var i = 0; i < cities.length; i++) {
    var city = cities[i];
    var button = document.createElement("button");
    button.textContent = city;
    button.addEventListener("click", function () {
      var clickedCity = this.textContent;
      fetchData(clickedCity);
    });
    searchHistory.appendChild(button);
  }
}

// Event listener that calls the function to display weather data
form.addEventListener("submit", function (event) {
  // Create a variable that holds the input
  var searchInput = input.value.trim();
  // Prevent default form submission behavior
  event.preventDefault();
  // Validate the text field has information
  if (searchInput !== "") {
    saveToCities(searchInput);
    generateButtons();
    fetchData(searchInput);
  } else {
    alert("Please enter a city");
  }
});

// Save input data to the array and local storage
function saveToCities(city) {
  cities.push(city);
  localStorage.setItem("searchHistory", JSON.stringify(cities));
}

// Fetch weather data from the API
function fetchData(city) {
  var fApiURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=imperial&appid=" +
    apiKey;

  var apiURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=" +
    apiKey;
  // Fetch call to pull city weather information and display
  fetch(fApiURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderForecastData(data);
    })
    .catch(function (error) {
      console.log("Error:", error);
    });


  // Fetch call to pull city weather information and display
  fetch(apiURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // renderForecastData(data);
    })
    .catch(function (error) {
      console.log("Error:", error);
    });

}

// Render weather data
function renderForecastData(data) {
  console.log(data);
  currentDay.innerHTML = "";
  fiveDayForecast.innerHTML = "";

  // Get the current weather conditions
  var currentWeather = data.list[0];
  var cityName = data.city.name;
  var date = new Date(currentWeather.dt * 1000);
  var currentDate = date.toLocaleDateString()
  // var currentDate = moment.unix(currentWeather.dt).format("L");
  // var forecastDate = moment.unix(forecastWeather.dt).format("L");
  var iconURL =
    "https://openweathermap.org/img/wn/" +
    currentWeather.weather[0].icon +
    "@2x.png";
  var temperature = currentWeather.main.temp;
  var windSpeed = currentWeather.wind.speed;
  var humidity = currentWeather.main.humidity;

  // Create elements for current weather
  var cityNameEl = document.createElement("h2");
  cityNameEl.textContent = cityName + " (" + currentDate + ")";

  var weatherIconEl = document.createElement("img");
  weatherIconEl.setAttribute("src", iconURL);

  var temperatureEl = document.createElement("p");
  temperatureEl.textContent = "Temperature: " + temperature + " °F";

  var windSpeedEl = document.createElement("p");
  windSpeedEl.textContent = "Wind Speed: " + windSpeed + " MPH";

  var humidityEl = document.createElement("p");
  humidityEl.textContent = "Humidity: " + humidity + "%";

  // Append current weather elements
  currentDay.append(cityNameEl, weatherIconEl, temperatureEl, windSpeedEl, humidityEl);
  // currentDay.appendChild(weatherIconEl);
  // currentDay.appendChild(temperatureEl);
  // currentDay.appendChild(windSpeedEl);
  // currentDay.appendChild(humidityEl);

  // Get the 5-day forecast
  for (var i = 1; i < data.list.length; i += 8) {
    var forecastWeather = data.list[i];
    var forecastDate = moment.unix(forecastWeather.dt).format("MM/DD/YYYY");
    var forecastIconURL =
      "https://openweathermap.org/img/wn/" +
      forecastWeather.weather[0].icon +
      "@2x.png";
      
      var fCityNameEl = document.createElement("h2");
      fCityNameEl.textContent = cityName + " (" + currentDate + ")";
    
      var fWeatherIconEl = document.createElement("img");
      fWeatherIconEl.setAttribute("src", iconURL);
    
      var fTemperatureEl = document.createElement("p");
      fTemperatureEl.textContent = "Temperature: " + temperature + " °F";
    
      var fWindSpeedEl = document.createElement("p");
      fWindSpeedEl.textContent = "Wind Speed: " + windSpeed + " MPH";
    
      var fHumidityEl = document.createElement("p");
      fHumidityEl.textContent = "Humidity: " + humidity + "%";

    // Create elements for forecast
    var forecastDateEl = document.createElement("h3");
    forecastDateEl.textContent = forecastDate;

    var forecastIconEl = document.createElement("img");
    forecastIconEl.setAttribute("src", forecastIconURL);

    // Append forecast elements
    var forecastEl = document.createElement("div");
    forecastEl.appendChild(forecastDateEl);
    forecastEl.appendChild(forecastIconEl);
    fiveDayForecast.appendChild(forecastEl);
  }
}

// Function call to start the app
getData()
