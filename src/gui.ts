export function createWeatherBox(weatherCondition: string, date: string, location: string, iconPath: string, timeState: string) {
    // Create and append the background image
    const backgroundDiv = document.createElement('img');
    backgroundDiv.src = '/src/assets/images/India_Gate.jpeg';
    backgroundDiv.classList.add('background-image');
    document.body.appendChild(backgroundDiv);
  
    // Create the weather container
    const weatherContainer = document.createElement('div');
    // Set the appropriate class based on the time state
    if (timeState === 'day') {
      weatherContainer.classList.add('weather-box');
    } else {
      weatherContainer.classList.add('weather-box-night');
    }
  
    // Create and append the date and location
    const dateLocation = document.createElement('div');
    dateLocation.classList.add('date-location');
    dateLocation.style.fontFamily = 'Josefin Sans, sans-serif';
    dateLocation.style.fontWeight = '500';
    dateLocation.textContent = `${date} - ${location}`;
    weatherContainer.appendChild(dateLocation);
  
    // Create and append the weather icon
    const weatherIcon = document.createElement('img');
    weatherIcon.src = iconPath;
    weatherIcon.classList.add('logo');
    document.body.appendChild(weatherIcon);
  
    // Create and append the weather report
    const weatherReport = document.createElement('div');
    weatherReport.textContent = weatherCondition;
    weatherReport.classList.add('weather-report');
    weatherReport.style.fontFamily = 'Josefin Sans, sans-serif';
    weatherReport.style.fontWeight = '500';
    document.body.appendChild(weatherReport);
  
    // Append the weather container and weather report to the document body
    document.body.appendChild(weatherContainer);
  }
  