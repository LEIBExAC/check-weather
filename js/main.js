import { getWeatherByCity, getWeatherByCoords } from "./api.js";
import { displayWeather, showError, displayForecast } from "./dom.js";
import { setupGeolocationButton } from "./geolocation.js";
import { getFiveDayForecast } from "./api.js";
import { saveFavorite, renderFavorites } from "./favorites.js";

let currentUnit = "metric"; // Default to Celsius
let lastQuery = null; // Store last searched city or coordinates

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
// const unitToggle = document.getElementById("unitToggle");
const saveFavoriteBtn = document.getElementById("saveFavoriteBtn");
const weatherForm = document.querySelector("#weatherForm");

weatherForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  currentUnit = currentUnit === "metric" ? "imperial" : "metric";
  // unitToggle.textContent =
  //   currentUnit === "metric" ? "Switch to °F" : "Switch to °C";

  if (!lastQuery) return;

  try {
    let data;
    if (lastQuery.type === "city") {
      data = await getWeatherByCity(lastQuery.value, currentUnit);
    } else if (lastQuery.type === "coords") {
      const { lat, lon } = lastQuery.value;
      data = await getWeatherByCoords(lat, lon, currentUnit);
    }
    displayWeather(data, currentUnit);
  } catch (error) {
    showError("Error updating units");
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
    // renderFavorites(handleFavoriteSelect); // Refresh favorite buttons

    // saveFavoriteBtn.onclick = () => {
    //   saveFavorite(data.name); // Add city name to favorites
    //   // renderFavorites(handleFavoriteSelect); // Refresh buttons
    // };

    const forecastData = await getFiveDayForecast(city, currentUnit);
    displayForecast(forecastData);

    // lastQuery = { type: "city", value: city };
  } catch (error) {
    showError(error.message);
  }
});

// unitToggle.addEventListener("click", async () => {
//   currentUnit = currentUnit === "metric" ? "imperial" : "metric";
//   unitToggle.textContent =
//     currentUnit === "metric" ? "Switch to °F" : "Switch to °C";

//   if (!lastQuery) return;

//   try {
//     let data;
//     if (lastQuery.type === "city") {
//       data = await getWeatherByCity(lastQuery.value, currentUnit);
//     } else if (lastQuery.type === "coords") {
//       const { lat, lon } = lastQuery.value;
//       data = await getWeatherByCoords(lat, lon, currentUnit);
//     }
//     displayWeather(data, currentUnit);
//   } catch (error) {
//     showError("Error updating units");
//   }
// });

// setupGeolocationButton((coords) => {
//   lastQuery = { type: "coords", value: coords };
// });

// function handleFavoriteSelect(city) {
//   getWeatherByCity(city, currentUnit)
//     .then((data) => {
//       displayWeather(data, currentUnit);
//       getFiveDayForecast(city, currentUnit).then(displayForecast);
//       cityInput.value = city;
//     })
//     .catch((err) => showError(err.message));
// }
