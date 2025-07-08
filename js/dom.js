import { applyWeatherTheme } from "./theme.js";
import { getIcon } from "./utils.js"; // optional if using custom icons

const illustrationMap = {
  Clear: "./assets/sunny.svg",
  Clouds: "./assets/cloudy.svg",
  Rain: "./assets/rainy.svg",
  Thunderstorm: "./assets/thunder.svg",
  Snow: "./assets/snowy.svg",
  Fog: "./assets/foggy.svg",
};

function updateIllustration(condition) {
  const img = document.getElementById("weatherIllustration");
  if (img) {
    img.src = illustrationMap[condition] || "./assets/default.svg";
  }
}

export function displayWeather(data, unit = "metric") {
  const weatherResult = document.getElementById("weatherResult");

  const {
    name,
    main: { temp },
    weather,
  } = data;

  const description = weather[0].description;
  const icon = weather[0].icon;
  const condition = weather[0].main;

  const unitSymbol = unit === "metric" ? "°C" : "°F";

  const isDaytime = dt >= sunrise && dt < sunset;

  applyWeatherTheme2(condition);
  updateIllustration(condition);
  // applyWeatherTheme(condition); // Apply theme based on condition

  weatherResult.innerHTML = `
    <h2 class="text-xl font-semibold mb-2">${name}</h2>
    <img
      class="mx-auto weather-icon weather-icon-${condition.toLowerCase()}"
      src="https://openweathermap.org/img/wn/${icon}@2x.png"
      alt="${description}"
    />
    <p class="text-lg">${temp.toFixed(1)}${unitSymbol} - ${description}</p>
  `;
}

export function showError(message) {
  const weatherResult = document.getElementById("weatherResult");
  weatherResult.innerHTML = `<p class="text-red-500 font-semibold">${message}</p>`;
}

export function displayForecast(forecastData) {
  const forecastDiv = document.getElementById("forecastResult");

  // Extract one forecast per day around midday (12:00)
  const dailyForecasts = [];

  const forecastsByDate = {};

  forecastData.list.forEach((entry) => {
    const date = entry.dt_txt.split(" ")[0]; // 'YYYY-MM-DD'
    const time = entry.dt_txt.split(" ")[1]; // 'HH:mm:ss'

    // Choose forecast around 12:00:00 or closest
    if (!forecastsByDate[date]) {
      forecastsByDate[date] = [];
    }
    forecastsByDate[date].push(entry);
  });

  for (const date in forecastsByDate) {
    // Find entry closest to 12:00
    const middayEntry = forecastsByDate[date].reduce((prev, curr) => {
      const prevDiff = Math.abs(
        parseInt(prev.dt_txt.split(" ")[1].split(":")[0]) - 12
      );
      const currDiff = Math.abs(
        parseInt(curr.dt_txt.split(" ")[1].split(":")[0]) - 12
      );
      return currDiff < prevDiff ? curr : prev;
    });
    dailyForecasts.push(middayEntry);
  }

  // Show only next 5 days
  const nextFiveDays = dailyForecasts.slice(0, 5);

  forecastDiv.innerHTML = nextFiveDays
    .map((day) => {
      const dateObj = new Date(day.dt * 1000);
      const dayName = dateObj.toLocaleDateString(undefined, {
        weekday: "short",
      });
      const iconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
      const description = day.weather[0].description;
      const minTemp = day.main.temp_min.toFixed(1);
      const maxTemp = day.main.temp_max.toFixed(1);

      return `
        <div class="bg-blue-100 rounded p-2 shadow">
          <h3 class="font-semibold">${dayName}</h3>
          <img src="${iconUrl}" alt="${description}" class="mx-auto" />
          <p class="text-sm capitalize">${description}</p>
          <p class="text-sm">Min: ${minTemp}°</p>
          <p class="text-sm">Max: ${maxTemp}°</p>
        </div>
      `;
    })
    .join("");
}

export function applyWeatherTheme2(condition, isDaytime = true) {
  const body = document.body;

  // Remove previous background/theme classes
  body.classList.remove(
    "bg-clear",
    "bg-clouds",
    "bg-rain",
    "bg-snow",
    "bg-night",
    "light-theme",
    "dark-theme"
  );

  // Weather-specific background
  switch (condition.toLowerCase()) {
    case "clear":
      body.classList.add("bg-clear");
      break;
    case "clouds":
      body.classList.add("bg-clouds");
      break;
    case "rain":
    case "drizzle":
    case "thunderstorm":
      body.classList.add("bg-rain");
      break;
    case "snow":
      body.classList.add("bg-snow");
      break;
    default:
      body.classList.add("bg-clear");
  }

  // Theme mode
  if (isDaytime) {
    body.classList.add("light-theme");
  } else {
    body.classList.add("dark-theme", "bg-night");
  }

  body.style.transition = "background 0.5s ease-in-out, color 0.5s ease-in-out";
}
