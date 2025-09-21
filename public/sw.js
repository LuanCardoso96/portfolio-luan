const STATIC='static-v1'; const DYN='dyn-v1';
const ASSETS=['/','/index.html','/manifest.webmanifest'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(STATIC).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>![STATIC,DYN].includes(k)).map(k=>caches.delete(k)))))});
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET') return;
  const accept=r.headers.get('accept')||'';
  if(accept.includes('text/html')||accept.includes('application/json')){
    e.respondWith((async()=>{
      const cached=await caches.match(r);
      const fetcher=fetch(r).then(res=>{const copy=res.clone(); caches.open(DYN).then(c=>c.put(r,copy)); return res}).catch(()=>cached);
      return cached||fetcher;
    })());
  } else {
    e.respondWith(caches.match(r).then(c=>c||fetch(r).then(res=>{const copy=res.clone(); caches.open(DYN).then(ca=>ca.put(r,copy)); return res})));
  }
});
