import { getWeatherByCoords, getFiveDayForecast } from './api.js';
import { displayWeather, displayForecast, showError } from './dom.js';

export function setupGeolocationButton(saveCoordsCallback) {
  const geoBtn = document.getElementById('geoBtn');

  geoBtn.addEventListener('click', () => {
    if (!navigator.geolocation) {
      showError('Geolocation is not supported by your browser.');
      return;
    }

    geoBtn.disabled = true;
    geoBtn.textContent = 'Getting location...';

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const data = await getWeatherByCoords(latitude, longitude, currentUnit);
          displayWeather(data, currentUnit);

          // Fetch city name from data for forecast API
          const cityName = data.name;
          if (cityName) {
            const forecastData = await getFiveDayForecast(cityName, currentUnit);
            displayForecast(forecastData);
          }

          if (saveCoordsCallback) {
            saveCoordsCallback({ lat: latitude, lon: longitude });
          }
        } catch (error) {
          showError('Unable to fetch weather for your location.');
        } finally {
          geoBtn.disabled = false;
          geoBtn.textContent = 'Use My Location';
        }
      },
      () => {
        showError('Permission denied or location unavailable.');
        geoBtn.disabled = false;
        geoBtn.textContent = 'Use My Location';
      }
    );
  });
}
