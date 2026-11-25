/* Günlük Defter service worker: uygulamayı çevrimdışı açılabilir yapar.
   Bir dosyayı değiştirip yayınladığında SURUM'u artır; eski önbellek silinir. */
const SURUM = 'v1';
const KABUK = 'defter-kabuk-' + SURUM;
const FONT = 'defter-font';
const DOSYALAR = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(KABUK).then(c => c.addAll(DOSYALAR)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== KABUK && k !== FONT).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Sayfanın kendisi: önce ağ (güncel sürüm gelsin), ağ yoksa önbellek.
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(r => {
      if (r.ok) { const k = r.clone(); caches.open(KABUK).then(c => c.put('./index.html', k)); }
      return r;
    }).catch(() => caches.match('./index.html', { cacheName: KABUK })));
    return;
  }

  // Google Fonts: önbellekten hemen ver, arkada yenile.
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open(FONT).then(async c => {
      const hit = await c.match(req);
      const net = fetch(req).then(r => { if (r.ok || r.type === 'opaque') c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }

  // Kendi dosyalarımız (ikonlar, manifest): önce önbellek.
  if (url.origin === self.location.origin) {
    e.respondWith(caches.match(req, { cacheName: KABUK }).then(hit => hit || fetch(req)));
  }
});
