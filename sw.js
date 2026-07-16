const CACHE='hell-corridor-v6-8';
const CORE=['./hell_corridor_iv.html','./manifest.webmanifest','./app-icon.svg','./demon_sprites.png','./environment_atlas.png','./equipment_sprites.png','./effects_pickups_atlas.png','./chainsaw_sprite.png','./stalker_sprites.png','./vanover_taunt_poses.png','./goyboy_faces.png','./hell_scenery.png','./infernal_props_atlas.png','./smolder_bomb.png','./vanover_smoking.png','./infernal_reign_theme.mp3','./demon_growl.mp3','./demon_attack.mp3','./demon_hurt.mp3','./demon_death.mp3','./boss_roar.mp3','./shooter_cast.mp3','./stalker_taunt1.m4a','./stalker_taunt2.m4a','./stalker_hidden.m4a','./stalker_attack.m4a','./stalker_hurt.m4a','./stalker_death.m4a'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  if(event.request.mode==='navigate'){
    event.respondWith(fetch(event.request).then(response=>{let copy=response.clone();caches.open(CACHE).then(cache=>cache.put('./hell_corridor_iv.html',copy));return response}).catch(()=>caches.match('./hell_corridor_iv.html')));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{if(response.ok){let copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy))}return response})));
});
