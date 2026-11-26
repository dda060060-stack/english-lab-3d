/* ===========================================================================
   DAVID-DA Speak — Service Worker PWA 100 % Hors-Ligne (GitHub Pages)
   Stratégie : Cache-First avec pré-cache cœur + pré-cache MP3 en arrière-plan
   =========================================================================== */

const CACHE_NAME = 'david-da-speak-v3';

const CORE_ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './lessons.json',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon.svg'
];

const OPTIONAL_PRECACHE_ASSETS = [
  './audio/manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.js',
  'https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800&display=swap'
];

const CACHEABLE_CDN_HOSTS = new Set([
  'cdnjs.cloudflare.com',
  'fonts.googleapis.com',
  'fonts.gstatic.com'
]);

async function safeCacheUrl(cache, url) {
  try {
    const req = new Request(url, { cache: 'default' });
    const res = await fetch(req);
    if (res && (res.ok || res.type === 'opaque')) {
      await cache.put(req, res.clone());
      return true;
    }
  } catch (_) {
    // Ignorer silencieusement si la ressource optionnelle ou CDN est hors-ligne
  }
  return false;
}

async function precacheAudioInBackground() {
  try {
    const cache = await caches.open(CACHE_NAME);
    let manifestRes = await cache.match('./audio/manifest.json');
    if (!manifestRes) {
      try {
        const netRes = await fetch('./audio/manifest.json', { cache: 'default' });
        if (netRes && netRes.ok) {
          await cache.put('./audio/manifest.json', netRes.clone());
          manifestRes = netRes;
        }
      } catch (_) {
        return;
      }
    }
    if (!manifestRes || !manifestRes.ok) return;

    const manifest = await manifestRes.json();
    const rawValues = manifest && typeof manifest === 'object'
      ? Object.values(manifest.entries || manifest.byText || {})
      : [];

    const uniquePaths = Array.from(
      new Set(
        rawValues
          .filter(v => typeof v === 'string' && v.endsWith('.mp3'))
          .map(v => `./${v.replace(/^\.?\//, '')}`)
      )
    );

    if (uniquePaths.length === 0) return;

    // Téléchargement doux par lots de 4 en arrière-plan pour ne jamais ralentir l'interface
    const BATCH_SIZE = 4;
    for (let i = 0; i < uniquePaths.length; i += BATCH_SIZE) {
      const batch = uniquePaths.slice(i, i + BATCH_SIZE);
      await Promise.all(
        batch.map(async (audioPath) => {
          const alreadyCached = await cache.match(audioPath);
          if (alreadyCached) return;
          await safeCacheUrl(cache, audioPath);
        })
      );
    }
  } catch (_) {
    // Repli silencieux si hors-ligne ou manifest absent
  }
}

async function buildRangeResponse(cachedResponse, rangeHeader) {
  try {
    const buf = await cachedResponse.arrayBuffer();
    const total = buf.byteLength;
    const match = /bytes=(\d+)-(\d*)/.exec(rangeHeader);
    if (!match) return cachedResponse;

    const start = Number(match[1]);
    const end = match[2] ? Math.min(Number(match[2]), total - 1) : total - 1;
    if (Number.isNaN(start) || Number.isNaN(end) || start > end || start >= total) {
      return new Response(null, {
        status: 416,
        headers: { 'Content-Range': `bytes */${total}` }
      });
    }

    const sliced = buf.slice(start, end + 1);
    const headers = new Headers(cachedResponse.headers);
    headers.set('Content-Range', `bytes ${start}-${end}/${total}`);
    headers.set('Content-Length', String(sliced.byteLength));
    headers.set('Accept-Ranges', 'bytes');

    return new Response(sliced, {
      status: 206,
      statusText: 'Partial Content',
      headers
    });
  } catch (_) {
    return cachedResponse;
  }
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(CORE_ASSETS);
      // Pré-cache non bloquant de Three.js, Tone.js, Nunito et audio/manifest.json
      await Promise.allSettled(
        OPTIONAL_PRECACHE_ASSETS.map(url => safeCacheUrl(cache, url))
      );
      await self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(oldKey => caches.delete(oldKey))
      );
      await self.clients.claim();
      // Lance le pré-cache des MP3 en arrière-plan sans bloquer l'activation
      precacheAudioInBackground();
    })()
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'PRECACHE_AUDIO') {
    precacheAudioInBackground();
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if ('focus' in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow('./');
    })
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  // Ne jamais mettre en cache la route dynamique locale /tts ni les routes API de compteur
  if (
    url.origin === self.location.origin &&
    (url.pathname.endsWith('/tts') || url.pathname.includes('/api/'))
  ) {
    return;
  }

  const isSameOrigin = url.origin === self.location.origin;
  const isAllowedCdn = CACHEABLE_CDN_HOSTS.has(url.hostname);
  if (!isSameOrigin && !isAllowedCdn) return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const rangeHeader = request.headers.get('range');

      // 1. Stratégie Cache-First (lecture instantanée même en mode avion)
      const cached = (await cache.match(request)) || (rangeHeader ? await cache.match(request.url) : null);
      if (cached) {
        if (rangeHeader && cached.status === 200) {
          return buildRangeResponse(cached, rangeHeader);
        }
        return cached;
      }

      // 2. Sinon réseau + mise en cache dynamique (MP3, Three.js, police Nunito woff2, etc.)
      try {
        const networkResponse = await fetch(request);
        if (networkResponse && (networkResponse.ok || networkResponse.type === 'opaque')) {
          // Ne pas stocker une réponse partielle 206 directement (préférer la ressource complète)
          if (networkResponse.status !== 206) {
            cache.put(request, networkResponse.clone()).catch(() => {});
          }
        }
        return networkResponse;
      } catch (_) {
        // 3. Repli hors-ligne propre
        if (request.mode === 'navigate') {
          const fallbackPage = await cache.match('./index.html');
          if (fallbackPage) return fallbackPage;
        }
        if (url.hostname === 'fonts.googleapis.com') {
          return new Response('', {
            status: 200,
            headers: { 'Content-Type': 'text/css; charset=utf-8' }
          });
        }
        return Response.error();
      }
    })()
  );
});
