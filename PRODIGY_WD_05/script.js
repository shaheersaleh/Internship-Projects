const apiKey = 'your_openweathermap_api_key';

document.getElementById('fetch-weather').addEventListener('click', getWeather);

function getWeather() {
    const location = document.getElementById('location-input').value || 'auto:ip';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`)
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
