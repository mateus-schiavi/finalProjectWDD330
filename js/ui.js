// js/ui.js

export function renderCurrentWeather(data, country) {
    const container = document.getElementById('currentWeather');
    container.innerHTML = `
      <h3>${data.name}, ${data.sys.country}</h3>
      <p>Temp: ${data.main.temp}°C</p>
      <p>${data.weather[0].description}</p>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="icon">
      <p><strong>Country:</strong> ${country.name}</p>
      <img src="${country.flag}" alt="flag" width="50" />
      <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
    `;
  }
  
  export function renderForecast(data) {
    const container = document.getElementById('forecastWeather');
    container.innerHTML = '';
  
    const daily = {};
    for (let forecast of data.list) {
      const date = forecast.dt_txt.split(' ')[0];
      if (!daily[date]) {
        daily[date] = forecast;
      }
    }
  
    Object.values(daily).slice(0, 5).forEach(f => {
      const card = document.createElement('div');
      card.className = 'forecast-card';
      card.innerHTML = `
        <p>${new Date(f.dt_txt).toLocaleDateString()}</p>
        <img src="https://openweathermap.org/img/wn/${f.weather[0].icon}.png" alt="icon">
        <p>${f.main.temp}°C</p>
        <p>${f.weather[0].description}</p>
      `;
      container.appendChild(card);
    });
  }
  