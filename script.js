
async function getWeather(lat, lon) {
    const apiKey = '5e0cf9bc3938bc361eb60c790555540f';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ua`;

    const response = await fetch(url);
    const data = await response.json();
    console.log('Погода:', data);
  // Тут підставляємо дані в DOM
document.querySelector('.temperature').textContent = Math.round(data.main.temp) + '°';
document.querySelector('.wind').textContent = data.wind.speed;
document.querySelector('.humidity').textContent = data.main.humidity;
document.querySelector('.uv-index').textContent = data.current.uvi;
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
