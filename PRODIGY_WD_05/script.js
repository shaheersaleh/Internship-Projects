const apiKey = 'your_openweathermap_api_key';

function initializeAutocomplete() {
    const input = document.getElementById('location-input');
    const autocomplete = new google.maps.places.Autocomplete(input, {
        types: ['(cities)'], 
    });
    autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        console.log('Selected city:', place.name); 
    });
}
document.getElementById('fetch-weather').addEventListener('click', () => {
    const location = document.getElementById('location-input').value;
    fetchWeatherData(location);
});
function fetchWeatherData(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => alert('Location not found!'));
}

function displayWeather(data) {
    if (data.cod !== 200) {
        alert('Location not found!');
        return;
    }

    const locationName = data.name;
    const temperature = data.main.temp;
    const conditions = data.weather[0].description;
    const weatherMain = data.weather[0].main.toLowerCase();

    document.getElementById('location-name').innerText = locationName;
    document.getElementById('temperature').innerText = `${temperature}°C`;
    document.getElementById('conditions').innerText = conditions;

    document.getElementById('weather-info').classList.remove('hidden');

    if (weatherMain.includes('rain')) {
        document.body.classList.add('rainy');
        document.body.classList.remove('sunny');
    } else if (weatherMain.includes('clear')) {
        document.body.classList.add('sunny');
        document.body.classList.remove('rainy');
    } else {
        document.body.classList.remove('sunny', 'rainy');
    }
}
google.maps.event.addDomListener(window, 'load', initializeAutocomplete);
