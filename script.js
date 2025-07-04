//Взаємодія з DOM для пошуку міста
const form = document.querySelector('#search-form'); 
const cityInput = document.querySelector('#city-input'); 
const cityTitle = document.querySelector('.current_city');

// Обробник події на форму
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;

  try {
    const apiKey = "5e0cf9bc3938bc361eb60c790555540f";
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

  if (!response.ok) throw new Error("City not found");

    const data = await response.json(); 

    cityTitle.textContent = data.name;
    document.querySelector('.temperature-value').textContent = Math.round(data.main.temp) + '°';
    document.querySelector('.weather-description').textContent = data.weather[0].main;
    document.querySelector('.temperature').textContent = Math.round(data.main.feels_like) + '°';
    document.querySelector('.wind').textContent = data.wind.speed + ' km/h';
    document.querySelector('.humidity').textContent = data.main.humidity + '%';
    document.querySelector('.pressure').textContent = data.main.pressure + ' hPa';
    document.querySelector('.big-weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;


    cityInput.value = '';
    updateHourlyForecast(city);
  } catch (error) {
    alert("City not found. Please try again");
    console.error(error);
  }
});


// Функція для отримання погоди за геолокацією
async function getWeather(lat, lon) {
    const apiKey = '5e0cf9bc3938bc361eb60c790555540f';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ua`;

    const response = await fetch(url);
    const data = await response.json();
    console.log('Weather:', data);
  // Тут підставляємо дані в DOM
document.querySelector('.temperature-value').textContent = Math.round(data.main.temp) + '°';
document.querySelector('.weather-description').textContent = data.weather[0].main;
document.querySelector('.temperature').textContent = Math.round(data.main.temp) + '°';
document.querySelector('.wind').textContent = data.wind.speed + ' km/h';
document.querySelector('.humidity').textContent = data.main.humidity + '%';
document.querySelector('.pressure').textContent = data.main.pressure + ' hPa';
}


navigator.geolocation.getCurrentPosition(
  (position) => {
    const { latitude, longitude } = position.coords;
    console.log('Геолокація:', latitude, longitude);
    getWeather(latitude, longitude);   // Тут викликаємо функцію отримання погоди
  },
  (error) => {
    console.error('Не вдалося отримати геолокацію:', error.message);
  }
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(reg => console.log('Service Worker зареєстровано', reg))
      .catch(err => console.error('SW помилка:', err));
  });
}

// Погодинний прогноз ПРАЦЮЄ!
async function updateHourlyForecast(city) {
  const apiKey = '5e0cf9bc3938bc361eb60c790555540f';

  const geocodeResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
  );
  const geoData = await geocodeResponse.json();
  const { lat, lon } = geoData[0];

  const hourlyResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  );
  const hourlyData = await hourlyResponse.json();

  const hourlyItems = document.querySelector('.hourly-items');
  hourlyItems.innerHTML = '';

  for (let i = 0; i < 5; i++) {
    const hour = hourlyData.list[i]; // крок — кожні 3 години
    const time = new Date(hour.dt * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
    const iconCode = hour.weather[0].icon;
    const temp = Math.round(hour.main.temp) + '°';
    const hourBlock = `
      <div class="hour">
        <p class="hour-time">${time}</p>
        <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="weather icon" class="hour-icon">
        <p class="hour-temp">${temp}</p>
      </div>
    `;
    hourlyItems.innerHTML += hourBlock;
  }
}

