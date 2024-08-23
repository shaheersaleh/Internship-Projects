const apiKey = '3696c726e1b29975cd9317fb27b0d0b4';
const weatherInfo = document.getElementById('weather-info');
const errorMessage = document.getElementById('error-message');
const cityNameElement = document.getElementById('city-name');
const timeElement = document.getElementById('time');
const temperatureElement = document.getElementById('temperature');
const conditionsElement = document.getElementById('conditions');
const additionalInfoElement = document.getElementById('additional-info');
const fetchWeatherButton = document.getElementById('fetch-weather');
const locationInput = document.getElementById('location-input');
const suggestionsDiv = document.getElementById('suggestions');

const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville"];

locationInput.addEventListener('input', () => {
    const input = locationInput.value.toLowerCase();
    suggestionsDiv.innerHTML = ''; 
    if (input) {
        const filteredCities = cities.filter(city => city.toLowerCase().startsWith(input));
        if (filteredCities.length > 0) {
            suggestionsDiv.style.display = 'block';
            filteredCities.forEach(city => {
                const suggestion = document.createElement('div');
                suggestion.textContent = city;
                suggestion.addEventListener('click', () => {
                    locationInput.value = city;
                    suggestionsDiv.style.display = 'none';
                });
                suggestionsDiv.appendChild(suggestion);
            });
        } else {
            suggestionsDiv.style.display = 'none';
        }
    } else {
        suggestionsDiv.style.display = 'none';
    }
});

document.addEventListener('click', (event) => {
    if (!suggestionsDiv.contains(event.target) && event.target !== locationInput) {
        suggestionsDiv.style.display = 'none';
    }
});

fetchWeatherButton.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location) {
        getWeatherByCity(location);
    } else {
        getWeatherByGeolocation();
    }
});

async function getWeatherByCity(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        showError(error.message);
    }
}

function getWeatherByGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
                const data = await response.json();
                displayWeather(data);
            } catch (error) {
                showError('Unable to fetch weather data');
            }
        }, () => {
            showError('Geolocation access denied');
        });
    } else {
        showError('Geolocation is not supported by your browser');
    }
}
function displayWeather(data) {
    weatherInfo.classList.remove('hidden');
    errorMessage.classList.add('hidden');

    const utcSeconds = data.dt;
    const localDate = new Date(utcSeconds * 1000);

    const localTime = localDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

    cityNameElement.textContent = `${data.name}, ${data.sys.country}`;
    timeElement.textContent = `Local Time: ${localTime}`;
    temperatureElement.textContent = `Temperature: ${data.main.temp}°C`;
    conditionsElement.textContent = `Conditions: ${data.weather[0].description}`;
    additionalInfoElement.textContent = `Humidity: ${data.main.humidity}% | Wind Speed: ${data.wind.speed} m/s`;

    updateBackground(data.weather[0].main);
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    weatherInfo.classList.add('hidden');
}

function updateBackground(condition) {
    const body = document.body;
    if (condition.toLowerCase().includes('rain')) {
        body.className = 'flex items-center justify-center min-h-screen bg-gray-800 text-white';
    } else if (condition.toLowerCase().includes('clear')) {
        body.className = 'flex items-center justify-center min-h-screen bg-gray-100 text-white';
    } else if (condition.toLowerCase().includes('cloud')) {
        body.className = 'flex items-center justify-center min-h-screen bg-gray-200 text-white';
    } 
    else if (condition.toLowerCase().includes('smoke')) {
        body.className = 'flex items-center justify-center min-h-screen bg-gray-400 text-white';
    }
    else {
        body.className = 'flex items-center justify-center min-h-screen bg-white-300 text-white';
    }
}
