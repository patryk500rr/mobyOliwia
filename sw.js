// Add event listener for beforeinstallprompt event
self.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the default behavior
    event.preventDefault();
    // Store the event object for later use
    deferredPrompt = event;
    // Show a custom install button or other UI element
    showInstallButton();
});

// Function to show a custom install button or other UI element
function showInstallButton() {
    // Show the install button or other UI element
    const installButton = document.getElementById('install-button');
    installButton.style.display = 'block';
    // Add event listener for click event on install button
    installButton.addEventListener('click', () => {
        // Call the prompt() method on the deferredPrompt object
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            // Clear the deferredPrompt object
            deferredPrompt = null;
        });
    });
}
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('pwa-cache').then((cache) => {
            return cache.addAll([
                '/',
                '/dashboard.html',
                '/index.html',
                '/main.css',
                '/script.js'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
