import { applyWeatherTheme } from "./theme.js";
import { getIcon } from "./utils.js";

const illustrationMap = {
  Clear: "./assets/sunny.jpg",
  Clouds: "./assets/cloudy.jpg",
  Rain: "./assets/rainy.jpg",
  Thunderstorm: "./assets/thunder.jpg",
  Snow: "./assets/snowy.jpg",
  Fog: "./assets/foggy.jpg",
};

function updateIllustration(condition) {
  const img = document.getElementById("weatherIllustration");
  if (img) {
    img.src = illustrationMap[condition] || "./assets/pexels-d-ng-nhan-324384-1529881.jpg";
  }
}

export function displayWeather(data, unit = "metric") {
  const weatherResult = document.getElementById("weatherResult");

  if (!data || !weatherResult) return;

  const {
    name,
    dt,
    sys: { sunrise, sunset },
    main: { temp },
    weather,
  } = data;

  const description = weather[0].description;
  const icon = weather[0].icon;
  const condition = weather[0].main;

  const unitSymbol = unit === "metric" ? "°C" : "°F";

  const isDaytime = dt >= sunrise && dt < sunset;

  applyWeatherTheme(condition, isDaytime);
  updateIllustration(condition);

  weatherResult.innerHTML = `
    <h2 class="text-xl font-semibold mb-2">${name}</h2>
    <iconify-icon 
      icon="${getIcon(condition)}" 
      width="64" 
      height="64" 
      class="mx-auto weather-icon weather-icon-${condition.toLowerCase()}"
      title="${description}"
    ></iconify-icon>
    <p class="text-lg capitalize">${temp.toFixed(1)}${unitSymbol} - ${description}</p>
  `;
}

export function showError(message) {
  const weatherResult = document.getElementById("weatherResult");
  if (weatherResult) {
    weatherResult.innerHTML = `<p class="text-red-500 font-semibold"></p>`;
  }
}

export function displayForecast(forecastData) {
  const forecastDiv = document.getElementById("forecastResult");
  if (!forecastDiv || !forecastData) return;

  const forecastsByDate = {};

  forecastData.list.forEach((entry) => {
    const [date, time] = entry.dt_txt.split(" ");
    if (!forecastsByDate[date]) {
      forecastsByDate[date] = [];
    }
    forecastsByDate[date].push(entry);
  });

  const dailyForecasts = [];

  for (const date in forecastsByDate) {
    const middayEntry = forecastsByDate[date].reduce((prev, curr) => {
      const prevDiff = Math.abs(parseInt(prev.dt_txt.split(" ")[1].split(":")[0]) - 12);
      const currDiff = Math.abs(parseInt(curr.dt_txt.split(" ")[1].split(":")[0]) - 12);
      return currDiff < prevDiff ? curr : prev;
    });
    dailyForecasts.push(middayEntry);
  }

  const nextFiveDays = dailyForecasts.slice(0, 5);

  forecastDiv.innerHTML = nextFiveDays
    .map((day) => {
      const dateObj = new Date(day.dt * 1000);
      const dayName = dateObj.toLocaleDateString(undefined, { weekday: "short" });
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
