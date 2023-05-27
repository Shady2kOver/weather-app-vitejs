import './css/style.css';
import { createWeatherBox } from './gui';
import { apiKey } from './config';


// Function to fetch weather data from API
async function fetchWeatherData() {
  const location = 'New Delhi';
  const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(location)}&days=1&aqi=no&alerts=no`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Function to determine if it's day or night based on time
function isDayOrNight(time: string): string {
  const hour = parseInt(time.split(':')[0]);
  const nightStartHour = 18; // 6 PM
  const nightEndHour = 6; // 6 AM

  if (hour >= nightStartHour || hour < nightEndHour) {
    return 'night';
  } else {
    return 'day';
  }
}

(async () => {

  // Fetch weather data
  const weatherData = await fetchWeatherData();
  console.log(weatherData);

  // Interface for WeatherInfo
  interface WeatherInfo {
    code: number;
    day: string;
    night: string;
    icon: number;
  }

  // Fetch weather icons data
  fetch('./src/weatherinfo.json')
    .then((response) => response.json())
    .then((data: WeatherInfo[]) => {

      const weatherCondition = weatherData.forecast.forecastday[0].day.condition.text;
      const weatherID = data.find((item) => item.day === weatherCondition);

      const timeState = isDayOrNight(weatherData.location.localtime.slice(-5));
      const date = weatherData.location.localtime.slice(10)

      if (weatherID) {
        const IconNumber = weatherID.icon.toString();
        const iconPath = `./src/assets/icons/${timeState}/${IconNumber}.png`;
        // Create weather box in GUI
        createWeatherBox(weatherCondition, date, 'New Delhi', iconPath, timeState);

      }
    })
    .catch((error) => {
      console.error('Error loading icons: ', error);
    });



})();


