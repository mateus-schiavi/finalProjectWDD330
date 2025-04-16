// js/main.js

import { fetchWeather, fetchForecast, fetchCountryInfo } from './api.js';
import { renderCurrentWeather, renderForecast } from './ui.js';

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');

searchBtn.addEventListener('click', async () => {
  const city = cityInput.value.trim();
  if (!city) return;

  try {
    localStorage.setItem('lastCity', city);

    const weatherData = await fetchWeather(city);
    const forecastData = await fetchForecast(city);
    const countryData = await fetchCountryInfo(weatherData.sys.country);

    renderCurrentWeather(weatherData, countryData);
    renderForecast(forecastData);
  } catch (err) {
    alert(err.message);
  }
});

window.addEventListener('load', async () => {
  const lastCity = localStorage.getItem('lastCity');
  if (lastCity) {
    cityInput.value = lastCity;

    try {
      const weatherData = await fetchWeather(lastCity);
      const forecastData = await fetchForecast(lastCity);
      const countryData = await fetchCountryInfo(weatherData.sys.country);

      renderCurrentWeather(weatherData, countryData);
      renderForecast(forecastData);
    } catch (err) {
      alert(err.message);
    }
  }
});