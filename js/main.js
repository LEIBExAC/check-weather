import { getWeatherByCity, getWeatherByCoords, getFiveDayForecast } from "./api.js";
import { displayWeather, showError, displayForecast } from "./dom.js";
import { setupGeolocationButton } from "./geolocation.js";
import { saveFavorite, renderFavorites } from "./favorites.js";

let currentUnit = "metric";
let lastQuery = null;

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const saveFavoriteBtn = document.getElementById("saveFavoriteBtn");
const weatherForm = document.querySelector("#weatherForm");

weatherForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  currentUnit = currentUnit === "metric" ? "imperial" : "metric";

  if (!lastQuery) {
    showError("Please search for a city first.");
    return;
  }

  try {
    let data;
    if (lastQuery.type === "city") {
      data = await getWeatherByCity(lastQuery.value, currentUnit);
    } else if (lastQuery.type === "coords") {
      const { lat, lon } = lastQuery.value;
      data = await getWeatherByCoords(lat, lon, currentUnit);
    }
    displayWeather(data, currentUnit);

    if (lastQuery.type === "city") {
      const forecastData = await getFiveDayForecast(lastQuery.value, currentUnit);
      displayForecast(forecastData);
    }
  } catch {
    showError("Error updating units or fetching weather.");
  }
});

searchBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();
  if (!city) {
    showError("Please enter a city name.");
    return;
  }

  try {
    const data = await getWeatherByCity(city, currentUnit);
    displayWeather(data, currentUnit);

    const forecastData = await getFiveDayForecast(city, currentUnit);
    displayForecast(forecastData);

    lastQuery = { type: "city", value: city };

    renderFavorites(handleFavoriteSelect);

    if (saveFavoriteBtn) {
      saveFavoriteBtn.disabled = false;
      saveFavoriteBtn.onclick = () => {
        saveFavorite(data.name);
        renderFavorites(handleFavoriteSelect);
      };
    }
  } catch (error) {
    showError(error.message || "Failed to fetch weather data.");
  }
});

function handleFavoriteSelect(city) {
  getWeatherByCity(city, currentUnit)
    .then((data) => {
      displayWeather(data, currentUnit);
      getFiveDayForecast(city, currentUnit).then(displayForecast);
      cityInput.value = city;
      lastQuery = { type: "city", value: city };
    })
    .catch((err) => showError(err.message));
}

setupGeolocationButton((coords) => {
  lastQuery = { type: "coords", value: coords };
});

renderFavorites(handleFavoriteSelect);

if (saveFavoriteBtn) {
  saveFavoriteBtn.disabled = true;
}
