const apiKey = 'your_openweathermap_api_key';
const input = document.getElementById('location-input');
const suggestionsList = document.getElementById('suggestions');
const weatherButton = document.getElementById('fetch-weather');
const weatherInfo = document.getElementById('weather-info');
const locationName = document.getElementById('location-name');
const temperature = document.getElementById('temperature');
const conditions = document.getElementById('conditions');

let selectedCity = null; 
input.addEventListener('input', function () {
    const query = input.value;
    if (query.length > 2) { 
        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                suggestionsList.innerHTML = '';

                data.forEach(city => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${city.name}, ${city.state ? city.state + ', ' : ''}${city.country}`;
                    listItem.classList.add('cursor-pointer', 'p-2', 'hover:bg-gray-200');
                    listItem.addEventListener('click', () => {
                        input.value = `${city.name}, ${city.state ? city.state + ', ' : ''}${city.country}`;
                        selectedCity = city; // Store the selected city
                        suggestionsList.innerHTML = '';
                    });
                    suggestionsList.appendChild(listItem);
                });
            });
    } else {
        suggestionsList.innerHTML = '';
    }
});

weatherButton.addEventListener('click', function () {
    if (selectedCity) {
        fetchWeather(selectedCity.lat, selectedCity.lon);
    } else {
        alert('Please select a city from the suggestions.');
    }
});

function fetchWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            locationName.textContent = `${data.name}, ${data.sys.country}`;
            temperature.textContent = `${Math.round(data.main.temp)}°C`;
            conditions.textContent = data.weather[0].description;

            weatherInfo.classList.remove('hidden');
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Failed to fetch weather data.');
        });
}
