const CACHE_NAME = 'weather-app-v1';
const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/manifest.json',
    '/img/gis.svg',
    '/img/search.svg',
    '/img/sun_filled.svg',
    '/img/temperature.svg',
    '/img/wind.svg',
    '/img/humidity.svg',
    '/img/uv-index.svg',
    '/img/home.svg',
    '/img/map.svg',
    '/img/radar.svg',
    '/img/setting.svg',
    '/img/icons/icon-192.png',
    '/img/icons/icon-512.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => response || fetch(event.request))
    );
});
