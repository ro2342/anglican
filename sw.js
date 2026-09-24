// Service worker do "Via Média". Estratégia: network-first com cache de
// respaldo, e qualquer página visitada uma vez fica salva automaticamente —
// não precisa listar todo capítulo novo aqui manualmente.

const CACHE_NAME = "via-media-v1";

const SHELL = [
  "index.html",
  "teologia/index.html",
  "historia/index.html",
  "fontes/index.html",
  "css/style.css",
  "js/app.js",
  "js/conteudo.js",
  "manifest.json",
  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png",
  "assets/icons/maskable-192.png",
  "assets/icons/maskable-512.png",
  "teologia/via-media.html",
  "teologia/escritura-tradicao-razao.html",
  "teologia/trinta-nove-artigos.html",
  "historia/henrique-viii-ruptura.html",
  "historia/bcp-1662.html",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((chaves) => Promise.all(chaves.filter((c) => c !== CACHE_NAME).map((c) => caches.delete(c))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  event.respondWith(
    fetch(req)
      .then((res) => {
        const copia = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, copia));
        return res;
      })
      .catch(async () => {
        const cache = await caches.open(CACHE_NAME);
        const cacheado = await cache.match(req);
        if (cacheado) return cacheado;
        if (req.mode === "navigate") return cache.match("index.html");
        return Response.error();
      })
  );
});
