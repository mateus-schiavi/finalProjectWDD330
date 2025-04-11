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

function getWeatherIcon(condition) {
  if (condition.includes('cloud')) {
    return 'fas fa-cloud';
  } else if (condition.includes('raind')) {
    return 'fas fa-cloud-showers-heavy';
  } else if (condition.includes('sun')) {
    return 'fas fa-sun';
  } else if (condition.includes('clear')) {
    return 'fas fa-sun';
  } else if (condition.includes('storm') || condition.includes('thunder')) {
    return 'fas fa-bolt';
  } else if (condition.includes('snow')) {
    return 'fas fa-snowflake';
  } else {
    return 'fas fa-smog';
  }

}

function displayCurrentWeather(data) {
  const { name, sys, main, weather } = data;
  const condition = weather[0].main.toLowerCase();
  const icon = getWeatherIcon(condition);
  currentWeatherDiv.innerHTML = `
    <h2><i class="${icon}"></i>${name}, ${sys.country}</h2>
    <p><strong>Temperature:</strong> ${main.temp}°C</p>
    <p><strong>Condition:</strong> ${weather[0].description}</p>
  `;
}

function displayForecast(data) {
  forecastWeatherDiv.innerHTML = '';
  const list = data.list.filter((_, index) => index % 8 === 0); // Every 24h

  list.forEach(item => {
    const date = new Date(item.dt_txt);
    const condition = item.weather[0].main.toLowerCase();
    const iconClass = getWeatherIcon(condition);

    forecastWeatherDiv.innerHTML += `
      <div class="forecast-item">
        <p><strong>${date.toDateString()}</strong></p>
        <i class="${iconClass}"></i>
        <p>Temp: ${item.main.temp}°C</p>
        <p>${condition}</p>
      </div>
    `;
  });
}
