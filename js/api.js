const API_KEY = "bd5e378503939ddaee76f12ad7a97608";
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const CACHE_DURATION = 10 * 60 * 1000; // ✅ 10 minutes in ms

function getCacheKey(city, unit) {
  return `weather_${city.toLowerCase()}_${unit}`;
}

function getCoordsCacheKey(lat, lon, unit) {
  return `weather_${lat.toFixed(2)}_${lon.toFixed(2)}_${unit}`;
}

function isCacheValid(timestamp) {
  return Date.now() - timestamp < CACHE_DURATION;
}

export async function getWeatherByCity(city, unit = "metric") {
  const cacheKey = getCacheKey(city, unit);
  const cached = localStorage.getItem(cacheKey);

  if (cached) {
    const cachedData = JSON.parse(cached);
    if (isCacheValid(cachedData.timestamp)) {
      return cachedData.data;
    }
  }

  const endpoint = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${unit}`;
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error("City not found or API error");
  }

  const data = await response.json();

  localStorage.setItem(
    cacheKey,
    JSON.stringify({ data, timestamp: Date.now() })
  );

  return data;
}

export async function getWeatherByCoords(lat, lon, unit = "metric") {
  const cacheKey = getCoordsCacheKey(lat, lon, unit);
  const cached = localStorage.getItem(cacheKey);

  if (cached) {
    const cachedData = JSON.parse(cached);
    if (isCacheValid(cachedData.timestamp)) {
      return cachedData.data;
    }
  }

  const endpoint = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`;
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error("Weather data fetch error");
  }

  const data = await response.json();

  localStorage.setItem(
    cacheKey,
    JSON.stringify({ data, timestamp: Date.now() })
  );

  return data;
}

export async function getFiveDayForecast(city, unit = "metric") {
  const endpoint = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${unit}`;
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error("Forecast data fetch error");
  }

  const data = await response.json();
  return data;
}
