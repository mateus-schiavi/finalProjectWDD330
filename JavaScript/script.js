const apiKey = '26ed082640d97b5f0061ec58b8c12cd6';
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const currentWeatherDiv = document.getElementById('currentWeather');
const forecastWeatherDiv = document.getElementById('forecastWeather');

// Default city
let searchCity = 'Suzano';

// Trigger search on click
searchBtn.addEventListener('click', () => {
  searchCity = cityInput.value.trim();
  if (searchCity) {
    fetchWeatherData();
  }
});

window.addEventListener('load', () => {
  fetchWeatherData(); // Load default city
});

function fetchWeatherData() {
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=metric`;

  fetch(currentWeatherUrl)
    .then(res => {
      if (!res.ok) throw new Error('Failed to fetch current weather');
      return res.json();
    })
    .then(data => {
      displayCurrentWeather(data);
      const { lat, lon } = data.coord;
      fetchForecastData(lat, lon);
    })
    .catch(err => {
      currentWeatherDiv.innerHTML = `<p>Error: ${err.message}</p>`;
    });
}

function fetchForecastData(lat, lon) {
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(forecastUrl)
    .then(res => {
      if (!res.ok) throw new Error('Failed to fetch forecast');
      return res.json();
    })
    .then(data => {
      displayForecast(data);
    })
    .catch(err => {
      forecastWeatherDiv.innerHTML = `<p>Error: ${err.message}</p>`;
    });
}

function displayCurrentWeather(data) {
  const { name, sys, main, weather } = data;

  currentWeatherDiv.innerHTML = `
    <h2>${name}, ${sys.country}</h2>
    <p><strong>Temperature:</strong> ${main.temp}°C</p>
    <p><strong>Condition:</strong> ${weather[0].description}</p>
  `;
}

function displayForecast(data) {
  forecastWeatherDiv.innerHTML = '';
  const list = data.list.filter((_, index) => index % 8 === 0); // Every 24h

  list.forEach(item => {
    const date = new Date(item.dt_txt);
    forecastWeatherDiv.innerHTML += `
      <div class="forecast-item">
        <p><strong>${date.toDateString()}</strong></p>
        <p>Temp: ${item.main.temp}°C</p>
        <p>${item.weather[0].description}</p>
      </div>
    `;
  });
}
