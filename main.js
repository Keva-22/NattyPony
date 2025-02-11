function toggleMenu() {
    const navUl = document.querySelector('#mainNav ul');
    navUl.classList.toggle('show');
}

// main.js (musí se načítat jako ES modul; viz níže v HTML)

// Import proměnných z config.js
import { API_KEY, CHANNEL_ID } from './config.js';

//
// 1) NEJNOVĚJŠÍ VIDEO
//
fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&order=date&maxResults=1&type=video&key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        if (data.items && data.items.length > 0) {
            const latestVideoId = data.items[0].id.videoId;
            document.getElementById("latestVideoFrame").src =
                `https://www.youtube.com/embed/${latestVideoId}`;
        } else {
            console.error("Žádná data pro nejnovější video.");
        }
    })
    .catch(error => console.error("Chyba při získávání nejnovějšího videa:", error));

//
// 2) NEJPOPULÁRNĚJŠÍ VIDEO
//
fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&order=viewCount&maxResults=1&type=video&key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        if (data.items && data.items.length > 0) {
            const popularVideoId = data.items[0].id.videoId;
            document.getElementById("popularVideoFrame").src =
                `https://www.youtube.com/embed/${popularVideoId}`;
        } else {
            console.error("Žádná data pro nejpopulárnější video.");
        }
    })
    .catch(error => console.error("Chyba při získávání nejpopulárnějšího videa:", error));