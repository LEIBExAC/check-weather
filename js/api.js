const API_KEY = "bd5e378503939ddaee76f12ad7a97608";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const CACHE_DURATION = 10 * 60 * 1000 * 1000; // 10 minutes in ms

function getCacheKey(city, unit) {
  return `weather_${city.toLowerCase()}_${unit}`;
}

function isCacheValid(timestamp) {
  return Date.now() - timestamp < CACHE_DURATION;
}

export async function getWeatherByCity(city, unit = "metric") {
  // const cacheKey = getCacheKey(city, unit);
  // const cached = localStorage.getItem(cacheKey);

  // if (cached) {
  //   const cachedData = JSON.parse(cached);
  //   if (isCacheValid(cachedData.timestamp)) {
  //     return cachedData.data;
  //   }
  // }

  // // Fetch fresh data
  // const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
  //   city
  // )}&appid=${API_KEY}&units=${unit}`;

  // const response = await fetch(endpoint);
  // console.log(response);

  // if (!response.ok) throw new Error("City not found or API error");

  // const data = await response.json();
  // console.log(data);

  // const { name, main, weather } = data;
  // if (!name || !main || !weather) {
  //   throw new Error("Invalid data structure from API");
  // }

  // localStorage.setItem(
  //   cacheKey,
  //   JSON.stringify({ data, timestamp: Date.now() })
  // );

  const a = {
    data: {
      coord: { lon: 12.4, lat: 55.6667 },
      weather: [
        { id: 501, main: "Rain", description: "moderate rain", icon: "10d" },
      ],
      base: "stations",
      main: {
        temp: 66.29,
        feels_like: 66.06,
        temp_min: 66.29,
        temp_max: 66.29,
        pressure: 1007,
        humidity: 73,
        sea_level: 1007,
        grnd_level: 1004,
      },
      visibility: 10000,
      wind: { speed: 4.7, deg: 298, gust: 5.68 },
      rain: { "1h": 1.15 },
      clouds: { all: 56 },
      dt: 1751984874,
      sys: { country: "DK", sunrise: 1751942291, sunset: 1752004342 },
      timezone: 7200,
      id: 2621356,
      name: "Glostrup Municipality",
      cod: 200,
    },
    timestamp: 1751984874098,
  };

  return a.data;
}

function getCoordsCacheKey(lat, lon, unit) {
  return `weather_${lat.toFixed(2)}_${lon.toFixed(2)}_${unit}`;
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

  const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`;
  const response = await fetch(endpoint);
  if (!response.ok) throw new Error("Weather data fetch error");

  const data = await response.json();

  localStorage.setItem(
    cacheKey,
    JSON.stringify({ data, timestamp: Date.now() })
  );

  return data;
}

export async function getFiveDayForecast(city, unit = "metric") {
  // const endpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
  //   city
  // )}&appid=${API_KEY}&units=${unit}`;

  // const response = await fetch(endpoint);
  // if (!response.ok) throw new Error("Forecast data fetch error");

  // const data = await response.json();
  // console.log(data);

  const a = {
    cod: "200",
    message: 0,
    cnt: 40,
    list: [
      {
        dt: 1752008400,
        main: {
          temp: 70.52,
          feels_like: 70.23,
          temp_min: 66.36,
          temp_max: 70.52,
          pressure: 1022,
          sea_level: 1022,
          grnd_level: 1001,
          humidity: 63,
          temp_kf: 2.31,
        },
        weather: [
          {
            id: 803,
            main: "Clouds",
            description: "broken clouds",
            icon: "04n",
          },
        ],
        clouds: {
          all: 78,
        },
        wind: {
          speed: 3.13,
          deg: 100,
          gust: 6.15,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "n",
        },
        dt_txt: "2025-07-08 21:00:00",
      },
      {
        dt: 1752019200,
        main: {
          temp: 69.69,
          feels_like: 69.31,
          temp_min: 68.25,
          temp_max: 69.69,
          pressure: 1021,
          sea_level: 1021,
          grnd_level: 1000,
          humidity: 63,
          temp_kf: 0.8,
        },
        weather: [
          {
            id: 803,
            main: "Clouds",
            description: "broken clouds",
            icon: "04n",
          },
        ],
        clouds: {
          all: 66,
        },
        wind: {
          speed: 1.14,
          deg: 211,
          gust: 4.9,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "n",
        },
        dt_txt: "2025-07-09 00:00:00",
      },
      {
        dt: 1752030000,
        main: {
          temp: 65.61,
          feels_like: 65.3,
          temp_min: 65.61,
          temp_max: 65.61,
          pressure: 1021,
          sea_level: 1021,
          grnd_level: 1000,
          humidity: 73,
          temp_kf: 0,
        },
        weather: [
          {
            id: 803,
            main: "Clouds",
            description: "broken clouds",
            icon: "04n",
          },
        ],
        clouds: {
          all: 83,
        },
        wind: {
          speed: 3.15,
          deg: 237,
          gust: 7.65,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "n",
        },
        dt_txt: "2025-07-09 03:00:00",
      },
      {
        dt: 1752040800,
        main: {
          temp: 72.45,
          feels_like: 72.12,
          temp_min: 72.45,
          temp_max: 72.45,
          pressure: 1023,
          sea_level: 1023,
          grnd_level: 1003,
          humidity: 58,
          temp_kf: 0,
        },
        weather: [
          {
            id: 802,
            main: "Clouds",
            description: "scattered clouds",
            icon: "03d",
          },
        ],
        clouds: {
          all: 49,
        },
        wind: {
          speed: 6.42,
          deg: 204,
          gust: 15.3,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "d",
        },
        dt_txt: "2025-07-09 06:00:00",
      },
      {
        dt: 1752051600,
        main: {
          temp: 82.67,
          feels_like: 82.04,
          temp_min: 82.67,
          temp_max: 82.67,
          pressure: 1021,
          sea_level: 1021,
          grnd_level: 1001,
          humidity: 40,
          temp_kf: 0,
        },
        weather: [
          {
            id: 802,
            main: "Clouds",
            description: "scattered clouds",
            icon: "03d",
          },
        ],
        clouds: {
          all: 26,
        },
        wind: {
          speed: 9.98,
          deg: 170,
          gust: 15.12,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "d",
        },
        dt_txt: "2025-07-09 09:00:00",
      },
      {
        dt: 1752062400,
        main: {
          temp: 81.37,
          feels_like: 81.27,
          temp_min: 81.37,
          temp_max: 81.37,
          pressure: 1019,
          sea_level: 1019,
          grnd_level: 999,
          humidity: 43,
          temp_kf: 0,
        },
        weather: [
          {
            id: 803,
            main: "Clouds",
            description: "broken clouds",
            icon: "04d",
          },
        ],
        clouds: {
          all: 53,
        },
        wind: {
          speed: 9.69,
          deg: 167,
          gust: 14.63,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "d",
        },
        dt_txt: "2025-07-09 12:00:00",
      },
      {
        dt: 1752073200,
        main: {
          temp: 73.13,
          feels_like: 72.91,
          temp_min: 73.13,
          temp_max: 73.13,
          pressure: 1020,
          sea_level: 1020,
          grnd_level: 999,
          humidity: 59,
          temp_kf: 0,
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04d",
          },
        ],
        clouds: {
          all: 96,
        },
        wind: {
          speed: 4.18,
          deg: 90,
          gust: 10.47,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "d",
        },
        dt_txt: "2025-07-09 15:00:00",
      },
      {
        dt: 1752084000,
        main: {
          temp: 73.4,
          feels_like: 73.11,
          temp_min: 73.4,
          temp_max: 73.4,
          pressure: 1021,
          sea_level: 1021,
          grnd_level: 1001,
          humidity: 57,
          temp_kf: 0,
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04n",
          },
        ],
        clouds: {
          all: 98,
        },
        wind: {
          speed: 3.49,
          deg: 126,
          gust: 11.23,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "n",
        },
        dt_txt: "2025-07-09 18:00:00",
      },
      {
        dt: 1752094800,
        main: {
          temp: 72.93,
          feels_like: 72.7,
          temp_min: 72.93,
          temp_max: 72.93,
          pressure: 1021,
          sea_level: 1021,
          grnd_level: 1000,
          humidity: 59,
          temp_kf: 0,
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04n",
          },
        ],
        clouds: {
          all: 100,
        },
        wind: {
          speed: 3.42,
          deg: 148,
          gust: 12.21,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "n",
        },
        dt_txt: "2025-07-09 21:00:00",
      },
      {
        dt: 1752105600,
        main: {
          temp: 70.2,
          feels_like: 69.93,
          temp_min: 70.2,
          temp_max: 70.2,
          pressure: 1020,
          sea_level: 1020,
          grnd_level: 999,
          humidity: 64,
          temp_kf: 0,
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04n",
          },
        ],
        clouds: {
          all: 97,
        },
        wind: {
          speed: 3.65,
          deg: 191,
          gust: 8.84,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "n",
        },
        dt_txt: "2025-07-10 00:00:00",
      },
      {
        dt: 1752116400,
        main: {
          temp: 67.01,
          feels_like: 66.79,
          temp_min: 67.01,
          temp_max: 67.01,
          pressure: 1021,
          sea_level: 1021,
          grnd_level: 1000,
          humidity: 72,
          temp_kf: 0,
        },
        weather: [
          {
            id: 802,
            main: "Clouds",
            description: "scattered clouds",
            icon: "03n",
          },
        ],
        clouds: {
          all: 41,
        },
        wind: {
          speed: 4.7,
          deg: 231,
          gust: 14.05,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "n",
        },
        dt_txt: "2025-07-10 03:00:00",
      },
      {
        dt: 1752127200,
        main: {
          temp: 72.66,
          feels_like: 72.45,
          temp_min: 72.66,
          temp_max: 72.66,
          pressure: 1022,
          sea_level: 1022,
          grnd_level: 1002,
          humidity: 60,
          temp_kf: 0,
        },
        weather: [
          {
            id: 803,
            main: "Clouds",
            description: "broken clouds",
            icon: "04d",
          },
        ],
        clouds: {
          all: 60,
        },
        wind: {
          speed: 7.56,
          deg: 208,
          gust: 12.24,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "d",
        },
        dt_txt: "2025-07-10 06:00:00",
      },
      {
        dt: 1752138000,
        main: {
          temp: 82.18,
          feels_like: 81.86,
          temp_min: 82.18,
          temp_max: 82.18,
          pressure: 1020,
          sea_level: 1020,
          grnd_level: 1000,
          humidity: 42,
          temp_kf: 0,
        },
        weather: [
          {
            id: 801,
            main: "Clouds",
            description: "few clouds",
            icon: "02d",
          },
        ],
        clouds: {
          all: 24,
        },
        wind: {
          speed: 6.15,
          deg: 204,
          gust: 9.91,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "d",
        },
        dt_txt: "2025-07-10 09:00:00",
      },
      {
        dt: 1752148800,
        main: {
          temp: 83.95,
          feels_like: 83.08,
          temp_min: 83.95,
          temp_max: 83.95,
          pressure: 1017,
          sea_level: 1017,
          grnd_level: 997,
          humidity: 39,
          temp_kf: 0,
        },
        weather: [
          {
            id: 802,
            main: "Clouds",
            description: "scattered clouds",
            icon: "03d",
          },
        ],
        clouds: {
          all: 44,
        },
        wind: {
          speed: 3.69,
          deg: 174,
          gust: 6.46,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "d",
        },
        dt_txt: "2025-07-10 12:00:00",
      },
      {
        dt: 1752159600,
        main: {
          temp: 77.81,
          feels_like: 77.59,
          temp_min: 77.81,
          temp_max: 77.81,
          pressure: 1017,
          sea_level: 1017,
          grnd_level: 997,
          humidity: 49,
          temp_kf: 0,
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04d",
          },
        ],
        clouds: {
          all: 99,
        },
        wind: {
          speed: 4.27,
          deg: 95,
          gust: 9.64,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "d",
        },
        dt_txt: "2025-07-10 15:00:00",
      },
      {
        dt: 1752170400,
        main: {
          temp: 74.66,
          feels_like: 74.55,
          temp_min: 74.66,
          temp_max: 74.66,
          pressure: 1019,
          sea_level: 1019,
          grnd_level: 999,
          humidity: 58,
          temp_kf: 0,
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04n",
          },
        ],
        clouds: {
          all: 100,
        },
        wind: {
          speed: 4.7,
          deg: 91,
          gust: 13.56,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "n",
        },
        dt_txt: "2025-07-10 18:00:00",
      },
      {
        dt: 1752181200,
        main: {
          temp: 69.87,
          feels_like: 70.03,
          temp_min: 69.87,
          temp_max: 69.87,
          pressure: 1019,
          sea_level: 1019,
          grnd_level: 999,
          humidity: 74,
          temp_kf: 0,
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04n",
          },
        ],
        clouds: {
          all: 92,
        },
        wind: {
          speed: 3.44,
          deg: 63,
          gust: 6.85,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "n",
        },
        dt_txt: "2025-07-10 21:00:00",
      },
      {
        dt: 1752192000,
        main: {
          temp: 66.24,
          feels_like: 66.33,
          temp_min: 66.24,
          temp_max: 66.24,
          pressure: 1018,
          sea_level: 1018,
          grnd_level: 997,
          humidity: 80,
          temp_kf: 0,
        },
        weather: [
          {
            id: 803,
            main: "Clouds",
            description: "broken clouds",
            icon: "04n",
          },
        ],
        clouds: {
          all: 61,
        },
        wind: {
          speed: 2.06,
          deg: 61,
          gust: 2.8,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "n",
        },
        dt_txt: "2025-07-11 00:00:00",
      },
      {
        dt: 1752202800,
        main: {
          temp: 63.81,
          feels_like: 63.79,
          temp_min: 63.81,
          temp_max: 63.81,
          pressure: 1019,
          sea_level: 1019,
          grnd_level: 999,
          humidity: 83,
          temp_kf: 0,
        },
        weather: [
          {
            id: 800,
            main: "Clear",
            description: "clear sky",
            icon: "01n",
          },
        ],
        clouds: {
          all: 10,
        },
        wind: {
          speed: 2.19,
          deg: 286,
          gust: 2.73,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "n",
        },
        dt_txt: "2025-07-11 03:00:00",
      },
      {
        dt: 1752213600,
        main: {
          temp: 73.06,
          feels_like: 72.88,
          temp_min: 73.06,
          temp_max: 73.06,
          pressure: 1021,
          sea_level: 1021,
          grnd_level: 1000,
          humidity: 60,
          temp_kf: 0,
        },
        weather: [
          {
            id: 802,
            main: "Clouds",
            description: "scattered clouds",
            icon: "03d",
          },
        ],
        clouds: {
          all: 48,
        },
        wind: {
          speed: 4.36,
          deg: 235,
          gust: 7.16,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "d",
        },
        dt_txt: "2025-07-11 06:00:00",
      },
      {
        dt: 1752224400,
        main: {
          temp: 85.01,
          feels_like: 83.98,
          temp_min: 85.01,
          temp_max: 85.01,
          pressure: 1018,
          sea_level: 1018,
          grnd_level: 999,
          humidity: 38,
          temp_kf: 0,
        },
        weather: [
          {
            id: 803,
            main: "Clouds",
            description: "broken clouds",
            icon: "04d",
          },
        ],
        clouds: {
          all: 53,
        },
        wind: {
          speed: 2.37,
          deg: 188,
          gust: 6.17,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "d",
        },
        dt_txt: "2025-07-11 09:00:00",
      },
      {
        dt: 1752235200,
        main: {
          temp: 87.39,
          feels_like: 85.6,
          temp_min: 87.39,
          temp_max: 87.39,
          pressure: 1015,
          sea_level: 1015,
          grnd_level: 995,
          humidity: 33,
          temp_kf: 0,
        },
        weather: [
          {
            id: 802,
            main: "Clouds",
            description: "scattered clouds",
            icon: "03d",
          },
        ],
        clouds: {
          all: 41,
        },
        wind: {
          speed: 1.61,
          deg: 173,
          gust: 4.54,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "d",
        },
        dt_txt: "2025-07-11 12:00:00",
      },
      {
        dt: 1752246000,
        main: {
          temp: 79.09,
          feels_like: 79.09,
          temp_min: 79.09,
          temp_max: 79.09,
          pressure: 1016,
          sea_level: 1016,
          grnd_level: 996,
          humidity: 44,
          temp_kf: 0,
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04d",
          },
        ],
        clouds: {
          all: 97,
        },
        wind: {
          speed: 6.85,
          deg: 89,
          gust: 17.13,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "d",
        },
        dt_txt: "2025-07-11 15:00:00",
      },
      {
        dt: 1752256800,
        main: {
          temp: 71.96,
          feels_like: 72.34,
          temp_min: 71.96,
          temp_max: 71.96,
          pressure: 1019,
          sea_level: 1019,
          grnd_level: 998,
          humidity: 74,
          temp_kf: 0,
        },
        weather: [
          {
            id: 803,
            main: "Clouds",
            description: "broken clouds",
            icon: "04n",
          },
        ],
        clouds: {
          all: 78,
        },
        wind: {
          speed: 5.95,
          deg: 65,
          gust: 15.3,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "n",
        },
        dt_txt: "2025-07-11 18:00:00",
      },
      {
        dt: 1752267600,
        main: {
          temp: 67.46,
          feels_like: 67.91,
          temp_min: 67.46,
          temp_max: 67.46,
          pressure: 1019,
          sea_level: 1019,
          grnd_level: 998,
          humidity: 85,
          temp_kf: 0,
        },
        weather: [
          {
            id: 803,
            main: "Clouds",
            description: "broken clouds",
            icon: "04n",
          },
        ],
        clouds: {
          all: 51,
        },
        wind: {
          speed: 3.83,
          deg: 61,
          gust: 8.43,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "n",
        },
        dt_txt: "2025-07-11 21:00:00",
      },
      {
        dt: 1752278400,
        main: {
          temp: 65.01,
          feels_like: 65.3,
          temp_min: 65.01,
          temp_max: 65.01,
          pressure: 1018,
          sea_level: 1018,
          grnd_level: 997,
          humidity: 87,
          temp_kf: 0,
        },
        weather: [
          {
            id: 802,
            main: "Clouds",
            description: "scattered clouds",
            icon: "03n",
          },
        ],
        clouds: {
          all: 32,
        },
        wind: {
          speed: 2.98,
          deg: 76,
          gust: 3.44,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "n",
        },
        dt_txt: "2025-07-12 00:00:00",
      },
      {
        dt: 1752289200,
        main: {
          temp: 63.18,
          feels_like: 63.46,
          temp_min: 63.18,
          temp_max: 63.18,
          pressure: 1019,
          sea_level: 1019,
          grnd_level: 998,
          humidity: 91,
          temp_kf: 0,
        },
        weather: [
          {
            id: 800,
            main: "Clear",
            description: "clear sky",
            icon: "01n",
          },
        ],
        clouds: {
          all: 3,
        },
        wind: {
          speed: 1.12,
          deg: 80,
          gust: 2.08,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "n",
        },
        dt_txt: "2025-07-12 03:00:00",
      },
      {
        dt: 1752300000,
        main: {
          temp: 75.06,
          feels_like: 75.13,
          temp_min: 75.06,
          temp_max: 75.06,
          pressure: 1020,
          sea_level: 1020,
          grnd_level: 1000,
          humidity: 61,
          temp_kf: 0,
        },
        weather: [
          {
            id: 800,
            main: "Clear",
            description: "clear sky",
            icon: "01d",
          },
        ],
        clouds: {
          all: 3,
        },
        wind: {
          speed: 1.41,
          deg: 204,
          gust: 3.36,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "d",
        },
        dt_txt: "2025-07-12 06:00:00",
      },
      {
        dt: 1752310800,
        main: {
          temp: 85.41,
          feels_like: 84.96,
          temp_min: 85.41,
          temp_max: 85.41,
          pressure: 1018,
          sea_level: 1018,
          grnd_level: 998,
          humidity: 41,
          temp_kf: 0,
        },
        weather: [
          {
            id: 800,
            main: "Clear",
            description: "clear sky",
            icon: "01d",
          },
        ],
        clouds: {
          all: 0,
        },
        wind: {
          speed: 2.01,
          deg: 217,
          gust: 5.84,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "d",
        },
        dt_txt: "2025-07-12 09:00:00",
      },
      {
        dt: 1752321600,
        main: {
          temp: 89.47,
          feels_like: 87.76,
          temp_min: 89.47,
          temp_max: 89.47,
          pressure: 1015,
          sea_level: 1015,
          grnd_level: 995,
          humidity: 32,
          temp_kf: 0,
        },
        weather: [
          {
            id: 800,
            main: "Clear",
            description: "clear sky",
            icon: "01d",
          },
        ],
        clouds: {
          all: 4,
        },
        wind: {
          speed: 1.54,
          deg: 257,
          gust: 5.44,
        },
        visibility: 10000,
        pop: 0.01,
        sys: {
          pod: "d",
        },
        dt_txt: "2025-07-12 12:00:00",
      },
      {
        dt: 1752332400,
        main: {
          temp: 77.5,
          feels_like: 77.72,
          temp_min: 77.5,
          temp_max: 77.5,
          pressure: 1017,
          sea_level: 1017,
          grnd_level: 997,
          humidity: 59,
          temp_kf: 0,
        },
        weather: [
          {
            id: 802,
            main: "Clouds",
            description: "scattered clouds",
            icon: "03d",
          },
        ],
        clouds: {
          all: 50,
        },
        wind: {
          speed: 10.54,
          deg: 81,
          gust: 20.8,
        },
        visibility: 10000,
        pop: 0.04,
        sys: {
          pod: "d",
        },
        dt_txt: "2025-07-12 15:00:00",
      },
      {
        dt: 1752343200,
        main: {
          temp: 74.01,
          feels_like: 74.26,
          temp_min: 74.01,
          temp_max: 74.01,
          pressure: 1019,
          sea_level: 1019,
          grnd_level: 999,
          humidity: 67,
          temp_kf: 0,
        },
        weather: [
          {
            id: 803,
            main: "Clouds",
            description: "broken clouds",
            icon: "04n",
          },
        ],
        clouds: {
          all: 72,
        },
        wind: {
          speed: 6.96,
          deg: 83,
          gust: 16.87,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "n",
        },
        dt_txt: "2025-07-12 18:00:00",
      },
      {
        dt: 1752354000,
        main: {
          temp: 69.69,
          feels_like: 70.12,
          temp_min: 69.69,
          temp_max: 69.69,
          pressure: 1019,
          sea_level: 1019,
          grnd_level: 999,
          humidity: 80,
          temp_kf: 0,
        },
        weather: [
          {
            id: 803,
            main: "Clouds",
            description: "broken clouds",
            icon: "04n",
          },
        ],
        clouds: {
          all: 64,
        },
        wind: {
          speed: 4.72,
          deg: 85,
          gust: 11.43,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "n",
        },
        dt_txt: "2025-07-12 21:00:00",
      },
      {
        dt: 1752364800,
        main: {
          temp: 65.37,
          feels_like: 65.79,
          temp_min: 65.37,
          temp_max: 65.37,
          pressure: 1019,
          sea_level: 1019,
          grnd_level: 998,
          humidity: 89,
          temp_kf: 0,
        },
        weather: [
          {
            id: 802,
            main: "Clouds",
            description: "scattered clouds",
            icon: "03n",
          },
        ],
        clouds: {
          all: 32,
        },
        wind: {
          speed: 2.35,
          deg: 49,
          gust: 2.39,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "n",
        },
        dt_txt: "2025-07-13 00:00:00",
      },
      {
        dt: 1752375600,
        main: {
          temp: 63.84,
          feels_like: 64.2,
          temp_min: 63.84,
          temp_max: 63.84,
          pressure: 1020,
          sea_level: 1020,
          grnd_level: 999,
          humidity: 91,
          temp_kf: 0,
        },
        weather: [
          {
            id: 800,
            main: "Clear",
            description: "clear sky",
            icon: "01n",
          },
        ],
        clouds: {
          all: 0,
        },
        wind: {
          speed: 0.38,
          deg: 149,
          gust: 1.12,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "n",
        },
        dt_txt: "2025-07-13 03:00:00",
      },
      {
        dt: 1752386400,
        main: {
          temp: 75.16,
          feels_like: 75.34,
          temp_min: 75.16,
          temp_max: 75.16,
          pressure: 1022,
          sea_level: 1022,
          grnd_level: 1001,
          humidity: 63,
          temp_kf: 0,
        },
        weather: [
          {
            id: 800,
            main: "Clear",
            description: "clear sky",
            icon: "01d",
          },
        ],
        clouds: {
          all: 0,
        },
        wind: {
          speed: 2.13,
          deg: 181,
          gust: 7.02,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "d",
        },
        dt_txt: "2025-07-13 06:00:00",
      },
      {
        dt: 1752397200,
        main: {
          temp: 88.29,
          feels_like: 88.02,
          temp_min: 88.29,
          temp_max: 88.29,
          pressure: 1019,
          sea_level: 1019,
          grnd_level: 999,
          humidity: 39,
          temp_kf: 0,
        },
        weather: [
          {
            id: 800,
            main: "Clear",
            description: "clear sky",
            icon: "01d",
          },
        ],
        clouds: {
          all: 7,
        },
        wind: {
          speed: 5.48,
          deg: 143,
          gust: 10.78,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "d",
        },
        dt_txt: "2025-07-13 09:00:00",
      },
      {
        dt: 1752408000,
        main: {
          temp: 83.97,
          feels_like: 83.75,
          temp_min: 83.97,
          temp_max: 83.97,
          pressure: 1016,
          sea_level: 1016,
          grnd_level: 997,
          humidity: 43,
          temp_kf: 0,
        },
        weather: [
          {
            id: 802,
            main: "Clouds",
            description: "scattered clouds",
            icon: "03d",
          },
        ],
        clouds: {
          all: 48,
        },
        wind: {
          speed: 1.45,
          deg: 152,
          gust: 6.35,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "d",
        },
        dt_txt: "2025-07-13 12:00:00",
      },
      {
        dt: 1752418800,
        main: {
          temp: 80.11,
          feels_like: 80.71,
          temp_min: 80.11,
          temp_max: 80.11,
          pressure: 1018,
          sea_level: 1018,
          grnd_level: 998,
          humidity: 48,
          temp_kf: 0,
        },
        weather: [
          {
            id: 804,
            main: "Clouds",
            description: "overcast clouds",
            icon: "04d",
          },
        ],
        clouds: {
          all: 90,
        },
        wind: {
          speed: 5.35,
          deg: 132,
          gust: 13.06,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "d",
        },
        dt_txt: "2025-07-13 15:00:00",
      },
      {
        dt: 1752429600,
        main: {
          temp: 73.13,
          feels_like: 73.15,
          temp_min: 73.13,
          temp_max: 73.13,
          pressure: 1020,
          sea_level: 1020,
          grnd_level: 1000,
          humidity: 64,
          temp_kf: 0,
        },
        weather: [
          {
            id: 803,
            main: "Clouds",
            description: "broken clouds",
            icon: "04n",
          },
        ],
        clouds: {
          all: 66,
        },
        wind: {
          speed: 4.9,
          deg: 81,
          gust: 12.66,
        },
        visibility: 10000,
        pop: 0,
        sys: {
          pod: "n",
        },
        dt_txt: "2025-07-13 18:00:00",
      },
    ],
    city: {
      id: 877532,
      name: "Nangoma",
      coord: {
        lat: -11.0688,
        lon: 39.2272,
      },
      country: "MZ",
      population: 38099,
      timezone: 10800,
      sunrise: 1751946171,
      sunset: 1751987584,
    },
  };
  return a;
}
