const apiKey = 'c4586307cbf9788ac5bd1f6e5735e4f1'; // Replace with your OpenWeatherMap API key
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const temp = document.getElementById('temp');
const weatherCondition = document.getElementById('weather-condition');
const currentTime = document.getElementById('current-time');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        getWeatherData(city);
    }
});

async function getWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            updateWeatherUI(data);
        } else {
            alert('City not found');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function updateWeatherUI(data) {
    const { name, weather, main } = data;

    // Update city name and weather information
    cityName.textContent = name;
    weatherCondition.textContent = weather[0].description;
    temp.textContent = `${main.temp}°C`;

    // Add weather icon
    const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;
    weatherIcon.innerHTML = `<img src="${iconUrl}" alt="${weather[0].description}" />`;

    // Change background color based on weather condition
    if (weather[0].main === 'Clear') {
        document.body.style.background = 'linear-gradient(135deg, #ff7e5f, #feb47b)';
    } else if (weather[0].main === 'Clouds') {
        document.body.style.background = 'linear-gradient(135deg, #6e7dff, #3f51b5)';
    } else if (weather[0].main === 'Rain') {
        document.body.style.background = 'linear-gradient(135deg, #4e73df, #2d4d9c)';
    }

    // Display current time
    displayCurrentTime();
}

function displayCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const time = `${hours}:${minutes}`;
    currentTime.textContent = `Current Time: ${time}`;
}
