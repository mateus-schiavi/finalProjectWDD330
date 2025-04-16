// js/main.js

import { fetchWeather, fetchForecast, fetchCountryInfo } from './api.js';
import { renderCurrentWeather, renderForecast } from './ui.js';

document.getElementById('searchBtn').addEventListener('click', async () => {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) return;

  try {
    const weatherData = await fetchWeather(city);
    const forecastData = await fetchForecast(city);
    const countryData = await fetchCountryInfo(weatherData.sys.country);

    renderCurrentWeather(weatherData, countryData);
    renderForecast(forecastData);
  } catch (err) {
    alert(err.message);
  }
});
