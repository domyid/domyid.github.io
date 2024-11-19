// Mengimpor modul dari CDN
import FingerprintJS from 'https://cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs@3/dist/fp.min.js';

// Memuat FingerprintJS
const fpPromise = FingerprintJS.load();

// Mendapatkan visitor ID
fpPromise
    .then(fp => fp.get())
    .then(result => {
        const visitorId = result.visitorId;
        console.log("Unique Visitor ID:", visitorId);
        document.body.insertAdjacentHTML('beforeend', `<p>Visitor ID: ${visitorId}</p>`);
    })
    .catch(error => console.error("Error loading FingerprintJS:", error));