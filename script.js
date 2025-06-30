const form = document.querySelector('#search-form'); 
const cityInput = document.querySelector('#city-input'); 
const cityTitle = document.querySelector('.current_city');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;

  try {
    const apiKey = "2c6ee5b098af0170395ead365d5813b1";
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

   // if (!response.ok) throw new Error("City not found");

    const data = await response.json(); 

    cityTitle.textContent = data.name;
    document.querySelector('.temperature').textContent = Math.round(data.main.feels_like) + '°';
    document.querySelector('.wind').textContent = data.wind.speed;
    document.querySelector('.humidity').textContent = data.main.humidity;
    document.querySelector('.pressure').textContent = data.main.pressure + ' hPa';

    cityInput.value = '';
  } catch (error) {
    alert("City not found. Please try again");
    console.error(error);
  }
});



async function getWeather(lat, lon) {
    const apiKey = '5e0cf9bc3938bc361eb60c790555540f';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ua`;

    const response = await fetch(url);
    const data = await response.json();
    console.log('Weather:', data);
  // Тут підставляємо дані в DOM
document.querySelector('.temperature').textContent = Math.round(data.main.temp) + '°';
document.querySelector('.wind').textContent = data.wind.speed;
document.querySelector('.humidity').textContent = data.main.humidity;
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
      .then(reg => console.log('✅ Service Worker зареєстровано', reg))
      .catch(err => console.error('❌ SW помилка:', err));
  });
}
