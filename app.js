/* app.js - EPT (login, users, admin, tasks, submissions, PWA register) */

const COURSES = ["Matematica","Ingles","Comunicacion","EPT","CCSS","CyT","Educacion Fisica","DPCC","Tutoria","Religion","Arte y Cultura"];

const USUARIOS_ORDERED = {
  "aaron_imanol_caceres_rivera": { displayName: "aaron imanol caceres rivera", pass: "ac7", role: "gratis", expires: null },
  "luana_carrion_yufra": { displayName: "Luana Carrión Yufra", pass: "ly4", role: "gratis", expires: null },
  "juan_jesus_cereso_mamani": { displayName: "juan jesús cereso mamani", pass: "jm9", role: "gratis", expires: null },
  "milagros_marilu_cerezo_serrano": { displayName: "milagros marilu cerezo serrano", pass: "ms3", role: "gratis", expires: null },
  "bruno_matias_chipana_paima": { displayName: "bruno matias chipana paima", pass: "bp5", role: "gratis", expires: null },
  "moises_daniel_coaquira_choque": { displayName: "moisés daniel coaquira choque", pass: "mc1", role: "gratis", expires: null },
  "elvis_josue_copari_carita": { displayName: "elvis josue copari carita", pass: "ec8", role: "gratis", expires: null },
  "rosario_del_milagro_flores_cruz": { displayName: "rosario del milagro flores cruz", pass: "rf2", role: "gratis", expires: null },
  "fiorella_del_rosario_llanqui_tapia": { displayName: "fiorella del rosario llanqui tapia", pass: "ft6", role: "gratis", expires: null },
  "luana_victoria_loza_santillan": { displayName: "luana victoria loza santillan", pass: "ls4", role: "gratis", expires: null },
  "keren_milagros_mamani_chino": { displayName: "keren milagros mamani chino", pass: "km2", role: "gratis", expires: null },
  "rodrigo_salvador_martinez_laura": { displayName: "Rodrigo Salvador Martinez Laura", pass: "rl5", role: "gratis", expires: null },
  "rodrigo_abner_martinez_maquera": { displayName: "rodrigo abner martinez maquera", pass: "rm1", role: "gratis", expires: null },
  "rael_octavio_ocana_aedo": { displayName: "rael octavio ocaña aedo", pass: "ra8", role: "gratis", expires: null },
  "eduardo_matias_ochoa_chata": { displayName: "eduardo matias ochoa chata", pass: "eo9", role: "gratis", expires: null },
  "hatsumy_mariana_paco_chura": { displayName: "hatsumy mariana paco chura", pass: "hp3", role: "gratis", expires: null },
  "yaren_adrian_paquita_vilca": { displayName: "yarén adrian paquita vilca", pass: "yv7", role: "gratis", expires: null },
  "sebastian_javier_salinas_huayanay": { displayName: "sebastian javier salinas huayanay", pass: "sh4", role: "gratis", expires: null },
  "yunsei_de_israel_santos_choq": { displayName: "yunsei de israel santos choqueña", pass: "ys2", role: "gratis", expires: null },
  "gianella_sumire_ayala": { displayName: "Gianella Sumire Ayala", pass: "ga1", role: "gratis", expires: null },
  "kevin_stefano_ticona_chata": { displayName: "kevin stefano ticona chata", pass: "kt6", role: "gratis", expires: null },
  "angie_paola_toledo_gallegos": { displayName: "Angie Paola Toledo Gallegos", pass: "ag8", role: "gratis", expires: null },
  "luana_gabriela_torres_vizcarra": { displayName: "luana gabriela torres vizcarra", pass: "lt9", role: "gratis", expires: null },
  "pierina_mercedes_trinidad_tuni": { displayName: "pierina mercedes trinidad tuni", pass: "pt7", role: "gratis", expires: null },
  "rodrigo_fabiano_franco_vega_balboa": { displayName: "rodrigo fabiano franco vega balboa", pass: "rb5", role: "gratis", expires: null },
  "jhoilson_almir_velasquez_condori": { displayName: "jhoilson almir velasquez condori", pass: "jc4", role: "gratis", expires: null },
  "stephano_leonardo_walstrohm_rojas": { displayName: "stephano leonardo walstrohm rojas", pass: "sr6", role: "gratis", expires: null },
  "itzae_wilson_yumpo_bertolotto": { displayName: "Itzae Wilson Yumpo Bertolotto", pass: "iw2", role: "gratis", expires: null },
  "matias_ciro_yupanqui_mamani": { displayName: "matias ciro yupanqui mamani", pass: "mc5", role: "gratis", expires: null },
  "marko_manzano": { displayName: "marko manzano", pass: "mk8", role: "admin", expires: null }
};

function saveUsers(){ localStorage.setItem('ept_users',JSON.stringify(USUARIOS_ORDERED)); }
function loadUsers(){ const s=JSON.parse(localStorage.getItem('ept_users')||'null'); if(s){ for(const k of Object.keys(USUARIOS_ORDERED)){ if(s[k]){ USUARIOS_ORDERED[k].role=s[k].role; USUARIOS_ORDERED[k].expires=s[k].expires||null; } } } else { saveUsers(); } }
loadUsers();

let TAREAS = JSON.parse(localStorage.getItem('ept_tareas')||'[]');
let ENTREGAS = JSON.parse(localStorage.getItem('ept_entregas')||'[]');

function todayISO(){ return new Date().toISOString().slice(0,10); }
function addDaysISO(days){ const d=new Date(); d.setDate(d.getDate()+Number(days)); return d.toISOString().slice(0,10); }

function handleLogin(e){
  if(e) e.preventDefault();
  const sel=document.getElementById('user');
  const username=sel ? sel.value : (document.getElementById('username') && document.getElementById('username').value.trim().toLowerCase());
  const pass=document.getElementById('password').value.trim();
  if(!username || !USUARIOS_ORDERED[username]){ showMsg('Usuario no encontrado'); return; }
  const u=USUARIOS_ORDERED[username];
  if(u.expires && u.expires < todayISO()){ showMsg('Cuenta expirada'); return; }
  if(u.pass !== pass){ showMsg('Contraseña incorrecta'); return; }
  sessionStorage.setItem('ept_session', username);
  if(u.role==='admin') location.href='admin.html'; else location.href='tareas.html';
}
function showMsg(m){ const el=document.getElementById('msg'); if(el){ el.textContent=m; setTimeout(()=>el.textContent='',3000);} }

if('serviceWorker' in navigator){ window.addEventListener('load',()=>{ navigator.serviceWorker.register('/service-worker.js').catch(()=>{}); }); }

function adminAgregarTarea(){
  const titulo=document.getElementById('admin_titulo').value.trim();
  const des=document.getElementById('admin_des').value.trim();
  const curso=document.getElementById('admin_curso').value;
  const tipo=document.getElementById('admin_tipo').value;
  const visibleSelect=document.getElementById('admin_visible');
  const dias=Number(document.getElementById('admin_dias').value||0);
  if(!titulo||!des){ document.getElementById('admin_msg').textContent='Completa título y descripcion'; return; }
  const visible=[...visibleSelect.options].filter(o=>o.selected).map(o=>o.value);
  const tarea={ id:Date.now(), titulo, descripcion:des, curso, tipo, created:new Date().toISOString(), visibleUsers:visible, expires:dias>0?addDaysISO(dias):null };
  TAREAS.unshift(tarea);
  localStorage.setItem('ept_tareas',JSON.stringify(TAREAS));
  document.getElementById('admin_msg').textContent='Tarea guardada';
  renderAdminTables();
}
function renderAdminTables(){
  const usersDiv=document.getElementById('tablaUsuarios');
  if(usersDiv){
    let html='<table class="table"><tr><th>Nombre</th><th>Usuario</th><th>Plan</th><th>Expira</th><th>Acciones</th></tr>';
    for(const k of Object.keys(USUARIOS_ORDERED)){
      const u=USUARIOS_ORDERED[k];
      html+=`<tr><td>${u.displayName}</td><td>${k}</td><td>${u.role}</td><td>${u.expires||'-'}</td><td><button onclick="adminToggleRole('${k}')">Cambiar Rol</button> <button onclick="adminSetExpirePrompt('${k}')">Set Días</button></td></tr>`;
    }
    html+='</table>';
    usersDiv.innerHTML=html;
  }
  const tdiv=document.getElementById('tablaTareas');
  if(tdiv){
    let html='<table class="table"><tr><th>Curso</th><th>Título</th><th>Tipo</th><th>Expira</th><th>Acciones</th></tr>';
    TAREAS.forEach((t,i)=>{ html+=`<tr><td>${t.curso}</td><td>${t.titulo}</td><td>${t.tipo}</td><td>${t.expires||'-'}</td><td><button onclick="adminDeleteTarea(${i})">Eliminar</button></td></tr>`; });
    html+='</table>';
    tdiv.innerHTML=html;
  }
}
function adminToggleRole(key){
  const u=USUARIOS_ORDERED[key]; if(!u) return;
  const next=u.role==='gratis'?'premium':(u.role==='premium'?'full':'gratis'); u.role=next; saveUsers(); renderAdminTables(); alert(`${u.displayName} ahora es ${next}`);
}
function adminSetExpirePrompt(key){
  const d=prompt('Cuántos días desde hoy? (0 = sin expiracion)','7'); if(d===null) return; const days=Number(d||0); if(days>0) USUARIOS_ORDERED[key].expires=addDaysISO(days); else USUARIOS_ORDERED[key].expires=null; saveUsers(); renderAdminTables();
}
function adminDeleteTarea(i){ if(!confirm('Eliminar tarea?')) return; TAREAS.splice(i,1); localStorage.setItem('ept_tareas',JSON.stringify(TAREAS)); renderAdminTables(); }

function renderCourseTasks(curso){
  const container=document.getElementById('tareasList'); if(!container) return;
  container.innerHTML=''; const session=sessionStorage.getItem('ept_session'); const user=session?USUARIOS_ORDERED[session]:null;
  const lista=TAREAS.filter(t=>{ if(t.curso!==curso) return false; if(t.visibleUsers&&t.visibleUsers.length>0&&session&& !t.visibleUsers.includes(session)) return false; if(t.expires&&t.expires<todayISO()) return false; if(user&&user.expires&&user.expires<todayISO()) return false; if(user){ if(user.role==='gratis'&&t.tipo!=='gratis') return false; if(user.role==='premium'&&(t.tipo==='full')) return false; } return true; });
  if(lista.length===0) container.innerHTML='<div class="small">No hay tareas visibles para este curso.</div>'; else { lista.forEach(t=>{ const el=document.createElement('div'); el.className='task-card'; el.innerHTML=`<h3>${t.titulo}</h3><p>${t.descripcion}</p><small>Tipo: ${t.tipo} • Fecha creación: ${new Date(t.created).toLocaleString()} ${t.expires?('<br>Expira: '+t.expires):''}</small>`; container.appendChild(el); }); }
  const s=document.getElementById('selectTarea'); if(s){ s.innerHTML=''; lista.forEach(t=>{ const opt=document.createElement('option'); opt.value=t.id; opt.textContent=t.titulo+' ('+t.curso+')'; s.appendChild(opt); }); }
}
function enviarEntrega(){
  const session=sessionStorage.getItem('ept_session'); if(!session){ alert('Inicia sesión'); location.href='index.html'; return; }
  const user=USUARIOS_ORDERED[session]; const sel=document.getElementById('selectTarea'); const tareaId=sel?Number(sel.value):null; if(!tareaId){ alert('Selecciona una tarea'); return; }
  const comentario=document.getElementById('entregaText').value||''; const fileInput=document.getElementById('fileInput'); const file=fileInput&&fileInput.files&&fileInput.files[0]; if(file&&user.role!=='full'){ alert('Solo usuarios FULL pueden subir archivos'); return; }
  const saveAndFinish=fileDataUrl=>{ ENTREGAS.push({ id:Date.now(), tareaId, user:session, comentario, file:fileDataUrl||null, fecha:new Date().toISOString() }); localStorage.setItem('ept_entregas',JSON.stringify(ENTREGAS)); alert('Entrega enviada ✔️'); renderMySubmissions(); };
  if(file){ const reader=new FileReader(); reader.onload=e=>saveAndFinish(e.target.result); reader.readAsDataURL(file); } else saveAndFinish(null);
}
function renderMySubmissions(){ const session=sessionStorage.getItem('ept_session'); if(!session) return; const cont=document.getElementById('misEnvios'); if(!cont) return; const my=ENTREGAS.filter(en=>en.user===session); if(my.length===0) cont.innerHTML='<div class="small">No has enviado nada aún.</div>'; else { cont.innerHTML=''; my.forEach(e=>{ const div=document.createElement('div'); div.className='card'; div.innerHTML=`<b>${new Date(e.fecha).toLocaleString()}</b><p>${e.comentario||'-'}</p>${e.file?(`<div><a href="${e.file}" target="_blank">Ver archivo</a></div>`):''}`; cont.appendChild(div); }); } }
document.addEventListener('DOMContentLoaded',()=>{ if(document.body&&document.body.classList&&document.body.classList.contains('admin-body')) renderAdminTables(); if(location.pathname.endsWith('tareas.html')){ const params=new URLSearchParams(location.search); const curso=params.get('curso')||COURSES[0]; document.getElementById('cursoTitulo').textContent=curso; renderCourseTasks(curso); renderMySubmissions(); } });
saveUsers();
