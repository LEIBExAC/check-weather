const weatherThemes = {
  Clear: "bg-gradient-to-b from-yellow-100 to-yellow-800",
  Clouds: "bg-gradient-to-b from-gray-400 to-gray-600",
  Rain: "bg-gradient-to-b from-blue-400 to-blue-700",
  Drizzle: "bg-gradient-to-b from-blue-200 to-blue-400",
  Thunderstorm: "bg-gradient-to-b from-purple-600 to-indigo-900",
  Snow: "bg-gradient-to-b from-gray-100 to-white",
  Mist: "bg-gradient-to-b from-gray-200 to-gray-400",
  Fog: "bg-gradient-to-b from-gray-300 to-gray-500",
  Haze: "bg-gradient-to-b from-yellow-100 to-yellow-300",
  Tornado: "bg-gradient-to-b from-red-400 to-red-700",
};

export function applyWeatherTheme(condition) {
  const body = document.body;
  const defaultTheme = "bg-gradient-to-b from-blue-100 to-blue-300";

  // Remove old background classes
  body.className = body.className
    .split(" ")
    .filter(
      (cls) =>
        !cls.startsWith("bg-") &&
        !cls.startsWith("from-") &&
        !cls.startsWith("to-")
    )
    .join(" ");

  const themeClass = weatherThemes[condition] || defaultTheme;
  body.classList.add(...themeClass.split(" "));
}
