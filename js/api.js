const WEATHER_API_KEY = '26ed082640d97b5f0061ec58b8c12cd6';

export async function fetchWeather(city) {
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`
    );
    if (!res.ok) throw new Error('City not found');
    return res.json();
}

export async function fetchForecast(city) {
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${WEATHER_API_KEY}`
    );
    if (!res.ok) throw new Error('Forecast not available');
    return res.json();
}

export async function fetchCountryInfo(code) {
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
    if (!res.ok) throw new Error('Country not found');
    const data = await res.json();
    return {
        name: data[0].name.common,
        flag: data[0].flags.svg,
        population: data[0].population,
    };
}