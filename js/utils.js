export function getIcon(condition) {
  const icons = {
    Clear: 'mdi:weather-sunny',
    Clouds: 'mdi:weather-cloudy',
    Rain: 'mdi:weather-rainy',
    Drizzle: 'mdi:weather-partly-rainy',
    Thunderstorm: 'mdi:weather-lightning',
    Snow: 'mdi:weather-snowy',
    Mist: 'mdi:weather-fog',
    Smoke: 'mdi:smog',
    Haze: 'mdi:weather-hazy',
    Fog: 'mdi:weather-fog',
    Tornado: 'mdi:weather-tornado',
  };
  return icons[condition] || 'mdi:weather-partly-cloudy';
}
