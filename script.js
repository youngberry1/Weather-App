// Get DOM elements
const citySelect = document.getElementById('city-select');
const getWeatherBtn = document.getElementById('get-weather-btn');
const weatherIcon = document.getElementById('weather-icon');
const mainTemperature = document.getElementById('main-temperature');
const weatherMain = document.getElementById('weather-main');
const locationEl = document.getElementById('location');
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const windGust = document.getElementById('wind-gust');


// Fetch weather data
async function getWeather(city) {
    try {
        const response = await fetch(`https://weather-proxy.freecodecamp.rocks/api/city/${encodeURIComponent(city)}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("❌ Fetch error:", error);
        throw error;
    }
}

// Show weather in the UI
async function showWeather(city) {
    try {
        const data = await getWeather(city);

        weatherIcon.src = data.weather?.[0]?.icon || '';
        weatherIcon.alt = data.weather?.[0]?.description || 'Weather Icon';
        mainTemperature.textContent = data.main?.temp !== undefined ? `${data.main.temp} °C` : 'N/A';
        feelsLike.textContent = data.main?.feels_like !== undefined ? `${data.main.feels_like} °C` : 'N/A';
        humidity.textContent = data.main?.humidity !== undefined ? `${data.main.humidity}%` : 'N/A';
        wind.textContent = data.wind?.speed !== undefined ? `${data.wind.speed} m/s` : 'N/A';
        windGust.textContent = data.wind?.gust !== undefined ? `${data.wind.gust} m/s` : 'N/A';
        weatherMain.textContent = data.weather?.[0]?.main || 'N/A';
        locationEl.textContent = data.name || 'N/A';

    } catch (error) {
        alert("Something went wrong, please check the console for details.");
    }
}

// Event listener for button
getWeatherBtn.addEventListener('click', () => {

    const city = citySelect.value.trim();


    if (!city) {
        alert("Please select a city.");
        return;
    }

    showWeather(city);
});
