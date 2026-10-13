const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const weatherIcon = document.getElementById("weather-icon");

// Using free open-meteo APIs + geocoding
async function checkWeather(city) {
    try {
        // Step 1: Geocoding (Convert city to coordinates)
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`);
        const geoData = await geoResponse.json();

        if(!geoData.results || geoData.results.length === 0) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            return;
        }

        const location = geoData.results[0];
        const lat = location.latitude;
        const lon = location.longitude;
        const cityName = location.name;

        // Step 2: Get Weather Data
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m`);
        const weatherData = await weatherResponse.json();
        
        const current = weatherData.current_weather;
        // get current humidity from hourly array
        const humidity = weatherData.hourly.relativehumidity_2m[0]; 

        // Update UI
        document.getElementById("city-name").innerText = cityName;
        document.getElementById("temp").innerText = Math.round(current.temperature) + "°C";
        document.getElementById("humidity").innerText = humidity + "%";
        document.getElementById("wind-speed").innerText = current.windspeed + " km/h";

        // Update Icon based on weather code (WMO codes)
        updateWeatherIcon(current.weathercode);

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

    } catch (error) {
        console.error("Error fetching weather:", error);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

function updateWeatherIcon(code) {
    // Basic mapping of WMO weather codes to icons
    let iconUrl = "https://cdn-icons-png.flaticon.com/512/3222/3222800.png"; // default clear

    if(code === 0) {
        // Clear sky
        iconUrl = "https://cdn-icons-png.flaticon.com/512/3222/3222800.png";
    } else if (code >= 1 && code <= 3) {
        // Clouds
        iconUrl = "https://cdn-icons-png.flaticon.com/512/414/414927.png";
    } else if (code >= 51 && code <= 67) {
        // Rain
        iconUrl = "https://cdn-icons-png.flaticon.com/512/3313/3313888.png";
    } else if (code >= 71 && code <= 77) {
        // Snow
        iconUrl = "https://cdn-icons-png.flaticon.com/512/642/642102.png";
    } else if (code >= 95 && code <= 99) {
        // Thunderstorm
        iconUrl = "https://cdn-icons-png.flaticon.com/512/1146/1146869.png";
    }

    weatherIcon.src = iconUrl;
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchInput.value);
});

searchInput.addEventListener("keypress", (event) => {
    if(event.key === "Enter") {
        checkWeather(searchInput.value);
    }
});

// Default city on load
checkWeather("Mumbai");
