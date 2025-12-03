const CACHE_NAME='ept-cache-v1';
const urlsToCache=['/','/index.html','/login.html','/cursos.html','/tareas.html','/admin.html','/style.css','/app.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(urlsToCache)));self.skipWaiting();});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{caches.open(CACHE_NAME).then(c=>{try{c.put(e.request,resp.clone())}catch(e){}});return resp;})).catch(()=>caches.match('/index.html')));});
