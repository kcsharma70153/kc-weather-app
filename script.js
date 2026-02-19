const apiKey = '013f096f144dd5b456e64d37da4f0cf8';  // Replace this with your OpenWeatherMap API key

// Function to fetch current weather and forecast
async function getWeatherData() {
    const city = document.getElementById('city').value;
    if (city === '') {
        alert('Please enter a city name');
        return;
    }

    // Fetch current weather
    const currentWeatherData = await fetchWeatherData(city);
    if (currentWeatherData) {
        displayCurrentWeather(currentWeatherData);
    }

    // Fetch forecast
    const forecastData = await fetchForecastData(city);
    if (forecastData) {
        displayForecast(forecastData);
    }
}

// Fetch current weather data
async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
        alert('City not found');
        return null;
    }

    return data;
}

// Fetch weather forecast data
async function fetchForecastData(city) {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&exclude=hourly,minutely&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
        alert('Error fetching forecast');
        return null;
    }

    return data.daily;
}

// Display current weather on the page
function displayCurrentWeather(data) {
    document.getElementById('city-name').textContent = data.name;
    document.getElementById('current-temp').textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById('current-description').textContent = `Description: ${data.weather[0].description}`;
}

// Display forecast on the page
function displayForecast(forecast) {
    const forecastList = document.getElementById('forecast-list');
    forecastList.innerHTML = '';

    forecast.forEach(day => {
        const listItem = document.createElement('li');
        const date = new Date(day.dt * 1000);
        listItem.innerHTML = `${date.toDateString()}: ${day.temp.day}°C, ${day.weather[0].description}`;
        forecastList.appendChild(listItem);
    });
}
