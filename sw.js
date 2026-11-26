/* Günlük Defter service worker: uygulamayı çevrimdışı açılabilir yapar.
   Bir dosyayı değiştirip yayınladığında SURUM'u artır; eski önbellek silinir. */
const SURUM = 'v4';
const KABUK = 'defter-kabuk-' + SURUM;
const DOSYALAR = [
  './',
  './index.html',
  './manifest.webmanifest?v=3',
  './logo.svg?v=3',
  './fonts/inter-latin.woff2',
  './fonts/inter-latin-ext.woff2',
  './icons/gd-favicon-32.png',
  './icons/gd-192.png',
  './icons/gd-512.png',
  './icons/gd-maskable-512.png',
  './icons/gd-apple-180.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(KABUK).then(c => c.addAll(DOSYALAR)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== KABUK).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Sayfanın kendisi: önce ağ (güncel sürüm gelsin), ağ yoksa önbellek.
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(r => {
      if (r.ok) { const k = r.clone(); caches.open(KABUK).then(c => c.put('./index.html', k)); }
      return r;
    }).catch(() => caches.match('./index.html', { cacheName: KABUK })));
    return;
  }

  // Diğer kendi dosyalarımız (yazı tipi, ikonlar, manifest): önce önbellek.
  e.respondWith(caches.match(req, { cacheName: KABUK }).then(hit => hit || fetch(req)));
});
