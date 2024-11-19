// Mengimpor FingerprintJS melalui Skypack
import FingerprintJS from 'https://cdn.skypack.dev/@fingerprintjs/fingerprintjs';

// Memuat FingerprintJS
FingerprintJS.load()
    .then(fp => fp.get())
    .then(result => {
        const visitorId = result.visitorId;
        console.log("Unique Visitor ID:", visitorId);
        document.body.insertAdjacentHTML('beforeend', `<p>Visitor ID: ${visitorId}</p>`);
    })
    .catch(error => console.error("Error loading FingerprintJS:", error));