const apiKey = '3696c726e1b29975cd9317fb27b0d0b4';
const input = document.getElementById('location-input');
const suggestionsList = document.getElementById('suggestions');

input.addEventListener('input', function() {
    const query = input.value;
    if (query.length > 2) {
        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                suggestionsList.innerHTML = '';

            
                data.forEach(city => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${city.name}, ${city.country}`;
                    listItem.classList.add('cursor-pointer', 'p-2', 'hover:bg-gray-200');
                    listItem.addEventListener('click', () => {
                        input.value = `${city.name}, ${city.country}`;
                        suggestionsList.innerHTML = '';
                    });
                    suggestionsList.appendChild(listItem);
                });
            });
    } else {
        suggestionsList.innerHTML = '';
    }
});
