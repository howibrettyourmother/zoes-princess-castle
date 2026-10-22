'use strict';
// ================= audio (WebAudio, pre-recorded Piper clips; never speechSynthesis) =================
const AUD=(()=>{let C=null,M,mus,sfx,vox,clips={},un=false,cur=null,muted=localStorage.getItem('zpc_mute')==='1',song=null,nextT=0,step=0,silentEl=null;
  const mtof=m=>440*Math.pow(2,(m-69)/12),R=Math.random;
  function build(){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;C=new AC();M=C.createGain();M.gain.value=muted?0:1;M.connect(C.destination);
    const b=v=>{const g=C.createGain();g.gain.value=v;g.connect(M);return g};mus=b(.22);sfx=b(.5);vox=b(1.1);setInterval(sched,40)}
  function unlock(){try{if(!C)build();if(!C)return;if(C.state!=='running')C.resume().catch(()=>{});
    if(!silentEl){silentEl=document.createElement('audio');silentEl.setAttribute('playsinline','');silentEl.loop=true;silentEl.src=DATA.silent;silentEl.volume=.01}
    if(silentEl.paused){const p=silentEl.play();p&&p.catch&&p.catch(()=>{})}
    if(!un){un=true;for(const k in DATA.clips){try{const s=atob(DATA.clips[k]),u=new Uint8Array(s.length);for(let i=0;i<s.length;i++)u[i]=s.charCodeAt(i);const p=C.decodeAudioData(u.buffer,x=>{clips[k]=x},()=>{});p&&p.catch&&p.catch(()=>{})}catch(e){}}}}catch(e){}}
  ['pointerdown','touchend','click'].forEach(e=>addEventListener(e,unlock,{capture:true,passive:true}));
  document.addEventListener('visibilitychange',()=>{if(!C)return;if(document.hidden){C.suspend().catch(()=>{});silentEl&&silentEl.pause()}else if(un){C.resume().catch(()=>{})}});
  const ok=()=>C&&C.state==='running';
  function say(k,tries){if(!C){return}if(!clips[k]){if((tries||0)<15)setTimeout(()=>say(k,(tries||0)+1),150);return}if(!ok())return;
    try{if(cur)cur.stop()}catch(e){}const s=C.createBufferSource();s.buffer=clips[k];s.connect(vox);s.start();cur=s;
    mus.gain.setTargetAtTime(.08,C.currentTime,.05);mus.gain.setTargetAtTime(.22,C.currentTime+clips[k].duration,.2)}
  function tone(m,t,v,d,type,out){const g=C.createGain(),o=C.createOscillator();o.type=type||'sine';o.frequency.value=mtof(m);g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+.005);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(out||sfx);o.start(t);o.stop(t+d+.05);
    if(!type||type==='sine'){const g2=C.createGain(),o2=C.createOscillator();o2.frequency.value=mtof(m)*2.76;g2.gain.setValueAtTime(v*.25,t);g2.gain.exponentialRampToValueAtTime(.0001,t+d*.3);o2.connect(g2);g2.connect(out||sfx);o2.start(t);o2.stop(t+d)}}
  const S={chime(){const t=C.currentTime;[88,95,100].forEach((m,i)=>tone(m,t+i*.06,.18,.6))},
    sparkle(){const t=C.currentTime;for(let i=0;i<6;i++)tone([96,98,100,103,105,108][(R()*6)|0],t+i*.05,.07,.4)},
    pop(){const t=C.currentTime;const g=C.createGain(),o=C.createOscillator();o.frequency.setValueAtTime(500,t);o.frequency.exponentialRampToValueAtTime(1400,t+.08);g.gain.setValueAtTime(.3,t);g.gain.exponentialRampToValueAtTime(.0001,t+.15);o.connect(g);g.connect(sfx);o.start(t);o.stop(t+.2)},
    jump(){const t=C.currentTime;const g=C.createGain(),o=C.createOscillator();o.type='triangle';o.frequency.setValueAtTime(400,t);o.frequency.exponentialRampToValueAtTime(900,t+.18);g.gain.setValueAtTime(.25,t);g.gain.exponentialRampToValueAtTime(.0001,t+.25);o.connect(g);g.connect(sfx);o.start(t);o.stop(t+.3)},
    magic(){const t=C.currentTime;[72,76,79,84,88,91,96,100].forEach((m,i)=>tone(m,t+i*.05,.12,.7))},
    yum(){const t=C.currentTime;[72,79,84].forEach((m,i)=>tone(m,t+i*.1,.2,.25,'triangle'))},
    fanfare(){const t=C.currentTime;[[72,0],[76,.15],[79,.3],[84,.45],[79,.7],[84,.85]].forEach(([m,d])=>{tone(m,t+d,.18,.5,'triangle');tone(m+12,t+d,.1,.6)})}};
  // original little tunes (pentatonic, composed here) -- [melody notes per 8th, bass per bar]
  const SONGS={home:{bpm:100,mel:[76,79,81,79,76,74,72,74, 76,79,84,81,79,76,79,0, 81,84,86,84,81,79,76,79, 81,79,76,74,72,0,72,0],bass:[48,53,55,48],wave:'sine'},
    ball:{bpm:126,mel:[72,72,79,79,81,84,81,79, 77,77,76,76,74,79,72,0, 76,79,84,79,76,79,84,86, 84,81,79,76,74,76,72,0],bass:[48,45,41,43],wave:'triangle',beat:1},
    lull:{bpm:66,mel:[79,0,76,0,72,0,76,79, 81,0,79,0,76,0,0,0, 74,0,76,0,79,0,76,74, 72,0,0,0,0,0,0,0],bass:[48,53,48,43],wave:'sine'}};
  function sched(){if(!song||!ok())return;const s=SONGS[song],e=60/s.bpm/2;if(nextT<C.currentTime)nextT=C.currentTime+.05;
    while(nextT<C.currentTime+.25){const m=s.mel[step%s.mel.length];if(m)tone(m,nextT,.22,e*2.2,s.wave==='sine'?undefined:s.wave,mus);
      if(step%8===0){tone(s.bass[(step/8|0)%s.bass.length],nextT,.3,e*7,'triangle',mus)}
      if(s.beat&&step%2===0){const g=C.createGain(),o=C.createOscillator();o.frequency.setValueAtTime(140,nextT);o.frequency.exponentialRampToValueAtTime(50,nextT+.12);g.gain.setValueAtTime(step%4===0?.5:.15,nextT);g.gain.exponentialRampToValueAtTime(.0001,nextT+.15);o.connect(g);g.connect(mus);o.start(nextT);o.stop(nextT+.2)}
      nextT+=e;step++}}
  return {say,sfx:k=>{try{ok()&&S[k]()}catch(e){}},music:k=>{if(song!==k){song=k;step=0}},
    get muted(){return muted},toggle(){muted=!muted;localStorage.setItem('zpc_mute',muted?'1':'0');if(M)M.gain.value=muted?0:1;return muted},unlock}})();

// ================= characters (original SVG art) =================
const SKIN={l:'#ffe0cc',m:'#f3c4a0',t:'#d9a07a',d:'#a8704e'};
function person(o){const sk=o.skin||SKIN.l,h=o.hair||'#7a4a2a',d=o.dress||'#ff8fc8',d2=o.dress2||'#ffd1ea',hs=o.hs||'long';let s='';
  const kid=o.kid,sc=kid?.82:1;
  s+=`<g transform="translate(100 320) scale(${sc}) translate(-100 -320)">`;
  // back hair
  if(hs==='long'||hs==='swoop')s+=`<path d="M48 90 Q50 30 100 32 Q150 30 152 90 L158 200 Q100 215 42 200Z" fill="${h}"/>`;
  if(hs==='pony')s+=`<path d="M140 70 Q185 90 165 170 Q150 140 140 110Z" fill="${h}"/>`;
  if(hs==='short')s+=`<path d="M50 90 Q50 32 100 32 Q150 32 150 90 L152 135 Q100 145 48 135Z" fill="${h}"/>`;
  // body
  if(o.gown!==false){s+=`<path d="M78 160 L122 160 L172 312 Q100 326 28 312Z" fill="${d}"/><path d="M60 250 Q100 266 140 250 L160 300 Q100 316 40 300Z" fill="${d2}" opacity=".7"/>`;
    if(o.star)s+=`<g fill="#fff8b0">${[[60,280],[100,240],[140,285],[90,300]].map(([x,y])=>`<path transform="translate(${x} ${y}) scale(.9)" d="M0-8 2-2 8-2 3 2 5 8 0 4-5 8-3 2-8-2-2-2Z"/>`).join('')}</g>`;
    if(o.snow)s+=`<g stroke="#fff" stroke-width="3" opacity=".9">${[[65,270],[110,250],[135,295],[85,300]].map(([x,y])=>`<path transform="translate(${x} ${y})" d="M-8 0H8M0-8V8M-6-6 6 6M6-6-6 6"/>`).join('')}</g>`;}
  else{s+=`<rect x="84" y="250" width="12" height="62" rx="6" fill="${sk}"/><rect x="104" y="250" width="12" height="62" rx="6" fill="${sk}"/><ellipse cx="88" cy="312" rx="14" ry="7" fill="${o.shoe||'#c2378f'}"/><ellipse cx="112" cy="312" rx="14" ry="7" fill="${o.shoe||'#c2378f'}"/><path d="M76 158 L124 158 L142 262 Q100 272 58 262Z" fill="${d}"/>`}
  s+=`<rect x="78" y="150" width="44" height="50" rx="16" fill="${d}"/><path d="M78 168 Q100 180 122 168" stroke="${d2}" stroke-width="6" fill="none"/>`;
  s+=`<path d="M80 160 Q55 190 62 225" stroke="${sk}" stroke-width="13" fill="none" stroke-linecap="round"/><path d="M120 160 Q145 190 138 225" stroke="${sk}" stroke-width="13" fill="none" stroke-linecap="round"/>`;
  if(o.wand)s+=`<line x1="140" y1="225" x2="160" y2="160" stroke="#ffd34d" stroke-width="6" stroke-linecap="round"/><path transform="translate(162 152) scale(2.2)" d="M0-8 2-2 8-2 3 2 5 8 0 4-5 8-3 2-8-2-2-2Z" fill="#fff36b" stroke="#f4b400" stroke-width="1"/>`;
  s+=`<rect x="92" y="135" width="16" height="20" fill="${sk}"/>`;
  // head
  s+=`<circle cx="100" cy="95" r="48" fill="${sk}"/>`;
  s+=`<ellipse cx="82" cy="98" rx="6" ry="8" fill="#3a2340"/><ellipse cx="118" cy="98" rx="6" ry="8" fill="#3a2340"/><circle cx="84" cy="95" r="2.2" fill="#fff"/><circle cx="120" cy="95" r="2.2" fill="#fff"/>`;
  s+=`<ellipse cx="72" cy="115" rx="9" ry="6" fill="#ff8fb0" opacity=".5"/><ellipse cx="128" cy="115" rx="9" ry="6" fill="#ff8fb0" opacity=".5"/><path d="M88 118 Q100 130 112 118" stroke="#c0446d" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  if(o.freck)s+=`<g fill="#c98a5a"><circle cx="76" cy="108" r="1.8"/><circle cx="82" cy="111" r="1.8"/><circle cx="124" cy="108" r="1.8"/><circle cx="118" cy="111" r="1.8"/></g>`;
  if(o.glasses)s+=`<g stroke="#8a4fa0" stroke-width="3" fill="none"><circle cx="82" cy="98" r="12"/><circle cx="118" cy="98" r="12"/><path d="M94 98h12"/></g>`;
  // front hair
  if(hs==='swoop')s+=`<path d="M52 92 Q52 40 100 40 Q150 40 148 80 Q120 60 95 100 Q80 120 60 125Z" fill="${h}"/>`;
  else if(hs==='bun')s+=`<circle cx="100" cy="40" r="22" fill="${h}"/><path d="M52 92 Q55 42 100 44 Q145 42 148 92 Q130 62 100 62 Q70 62 52 92Z" fill="${h}"/>`;
  else s+=`<path d="M52 92 Q55 40 100 42 Q145 40 148 92 Q135 66 115 70 Q100 56 85 70 Q65 66 52 92Z" fill="${h}"/>`;
  if(hs==='braid')s+=`<g fill="${h}">${[0,1,2,3,4,5].map(i=>`<ellipse cx="${64-i*1.5}" cy="${132+i*22}" rx="${15-i}" ry="14"/>`).join('')}</g><path d="M60 100 Q55 120 64 132" stroke="${h}" stroke-width="16" fill="none"/>`;
  if(hs==='braids2')s+=`<g fill="${h}">${[0,1,2,3].map(i=>`<ellipse cx="55" cy="${120+i*20}" rx="12" ry="12"/><ellipse cx="145" cy="${120+i*20}" rx="12" ry="12"/>`).join('')}</g>`;
  // crown
  const c=o.crown;
  if(c==='crown')s+=`<path d="M70 52 L74 22 L88 40 L100 14 L112 40 L126 22 L130 52Z" fill="#ffd34d" stroke="#e0a800" stroke-width="3"/><circle cx="100" cy="40" r="5" fill="#ff5fa2"/>`;
  if(c==='tiara')s+=`<path d="M74 52 Q100 20 126 52 Q100 42 74 52Z" fill="#e9f3ff" stroke="#9cc3ff" stroke-width="3"/><circle cx="100" cy="33" r="5" fill="#7fd0ff"/>`;
  if(c==='star')s+=`<path transform="translate(100 34) scale(2.6)" d="M0-8 2-2 8-2 3 2 5 8 0 4-5 8-3 2-8-2-2-2Z" fill="#fff36b" stroke="#f4b400" stroke-width=".8"/>`;
  if(c==='flower')s+=`<g transform="translate(130 52)">${[0,72,144,216,288].map(a=>`<circle cx="${10*Math.cos(a*Math.PI/180)}" cy="${10*Math.sin(a*Math.PI/180)}" r="8" fill="#ff8fc8"/>`).join('')}<circle r="6" fill="#ffd34d"/></g>`;
  if(c==='heart')s+=`<path transform="translate(100 30) scale(1.6)" d="M0 8 C-14-2-8-14 0-6 C8-14 14-2 0 8Z" fill="#ff4f9a" stroke="#fff" stroke-width="1.5"/>`;
  if(c==='bow')s+=`<path d="M120 50 l18-12 v24z M120 50 l-18-12 v24z" fill="#ff4f9a"/><circle cx="120" cy="50" r="6" fill="#d8327d"/>`;
  if(c==='snowtiara')s+=`<g stroke="#bfe6ff" stroke-width="4" stroke-linecap="round"><path d="M88 48 L100 26 L112 48"/></g><path transform="translate(100 34)" d="M-8 0H8M0-8V8M-6-6 6 6M6-6-6 6" stroke="#fff" stroke-width="3"/>`;
  s+='</g>';return `<svg viewBox="0 0 200 330" xmlns="http://www.w3.org/2000/svg">${s}</svg>`}
function unicorn(m){const rb=['#ff6b8b','#ffb347','#ffe66d','#7ee08a','#6cc6ff','#b28dff'];const mane=m==='rainbow'?rb:[m,m,'#fff',m,m,'#fff'];const body=m==='rainbow'?'#fff':'#fff';
  let s=`<g>`;s+=`<path d="M40 120 Q-5 120 8 175 Q25 150 40 140Z" fill="${mane[0]}"/><path d="M40 125 Q5 140 15 185 Q30 160 42 145Z" fill="${mane[3]}"/>`;
  [[62,'#f1e6ff'],[82,'#fff'],[130,'#f1e6ff'],[150,'#fff']].forEach(([x,c])=>s+=`<rect x="${x}" y="150" width="16" height="62" rx="8" fill="${c}"/><rect x="${x}" y="200" width="16" height="12" rx="4" fill="#d9a7ff"/>`);
  s+=`<ellipse cx="108" cy="140" rx="70" ry="40" fill="${body}" stroke="#eadcff" stroke-width="3"/>`;
  s+=`<path d="M150 125 Q160 70 180 55 L205 70 Q195 100 175 140Z" fill="${body}"/><ellipse cx="200" cy="72" rx="34" ry="24" fill="${body}" stroke="#eadcff" stroke-width="3"/>`;
  s+=`<path d="M196 50 L212 4 L214 52Z" fill="#ffd34d" stroke="#f0b400" stroke-width="2"/><path d="M200 38 L212 34 M203 26 L213 22" stroke="#f0b400" stroke-width="2"/>`;
  s+=`<circle cx="208" cy="68" r="5" fill="#3a2340"/><circle cx="209.5" cy="66.5" r="1.6" fill="#fff"/><ellipse cx="218" cy="82" rx="6" ry="4" fill="#ffb3cf"/><path d="M180 50 l8-14 6 16z" fill="#fff" stroke="#eadcff"/>`;
  mane.forEach((c,i)=>s+=`<circle cx="${178-i*6}" cy="${52+i*14}" r="13" fill="${c}"/>`);s+='</g>';
  return `<svg viewBox="-10 0 250 220" xmlns="http://www.w3.org/2000/svg">${s}</svg>`}

const SAVE=JSON.parse(localStorage.getItem('zpc')||'{}');SAVE.dress=SAVE.dress||'#ff8fc8';SAVE.crown=SAVE.crown||'crown';SAVE.hair=SAVE.hair||'#7a4a2a';SAVE.uni=SAVE.uni||'rainbow';SAVE.stk=SAVE.stk||0;SAVE.party=SAVE.party||['peach','elsa','anna'];
const save=()=>localStorage.setItem('zpc',JSON.stringify(SAVE));
const zoe=()=>({kid:1,skin:SKIN.l,hair:SAVE.hair,hs:'long',dress:SAVE.dress,dress2:'#fff3fb',crown:SAVE.crown});
const FR={peach:{n:'Princess Peach',o:{skin:SKIN.l,hair:'#ffd560',hs:'long',dress:'#ff9cc9',dress2:'#ff6fae',crown:'crown'},v:'f_peach',fx:'💗'},
  rosa:{n:'Princess Rosalina',o:{skin:SKIN.l,hair:'#f6efc8',hs:'swoop',dress:'#7fd6e8',dress2:'#b6eef7',crown:'star',wand:1,star:1},v:'f_rosa',fx:'⭐'},
  elsa:{n:'Elsa',o:{skin:SKIN.l,hair:'#f3f1ea',hs:'braid',dress:'#9fd8ff',dress2:'#e3f6ff',crown:'snowtiara',snow:1},v:'f_elsa',fx:'❄️'},
  anna:{n:'Anna',o:{skin:SKIN.l,hair:'#c8572a',hs:'braids2',dress:'#3f6fb5',dress2:'#e85d8a',crown:'flower',freck:1},v:'f_anna',fx:'🌸'},
  mom:{n:'Mommy',o:{skin:SKIN.l,hair:'#5a3a22',hs:'long',dress:'#b28dff',dress2:'#e0d0ff',gown:false,shoe:'#7a52c7'},v:'f_mom',fx:'💜'},
  gail:{n:'Grandma Gail',o:{skin:SKIN.l,hair:'#d8d8de',hs:'bun',dress:'#5fc3a8',dress2:'#bff0e2',gown:false,glasses:1,shoe:'#2f8f77'},v:'f_gail',fx:'🌷'},
  gammy:{n:'Gammy',o:{skin:SKIN.l,hair:'#e8d4a8',hs:'short',dress:'#ff9a76',dress2:'#ffd6c6',gown:false,shoe:'#e0663a'},v:'f_gammy',fx:'🌺'},
  amanda:{n:'Teacher Amanda',o:{skin:SKIN.m,hair:'#3b2a20',hs:'pony',dress:'#ffcf4d',dress2:'#fff0b8',gown:false,glasses:1,shoe:'#c48d00'},v:'f_amanda',fx:'🍎'},
  kids:{n:'KiddieKlub friends',grp:[{kid:1,skin:SKIN.t,hair:'#2a1a12',hs:'pony',dress:'#6cc6ff',dress2:'#c9ecff',gown:false,crown:'bow'},{kid:1,skin:SKIN.d,hair:'#1a1210',hs:'short',dress:'#7ee08a',dress2:'#d2f7d8',gown:false}],v:'f_kids',fx:'🎈'}};
const FRK=Object.keys(FR);

// ================= stage =================
const st=document.getElementById('stage'),bgEl=document.getElementById('bg');let W=1200,H=800;
function fit(){const a=innerWidth/innerHeight;if(a>=1.3){H=800;W=Math.round(800*a)}else{W=1040;H=Math.round(1040/a)}const k=innerWidth/W;st.style.width=W+'px';st.style.height=H+'px';st.style.transform=`scale(${k})`;if(cur&&SCR[cur].fit)SCR[cur].fit()}
const el=(t,p,css,html)=>{const e=document.createElement(t);if(css)e.style.cssText=css;if(html!=null)e.innerHTML=html;(p||st).appendChild(e);return e};
const tap=(e,fn)=>{e.addEventListener('pointerdown',ev=>{ev.preventDefault();ev.stopPropagation();e.classList.add('pr');setTimeout(()=>e.classList.remove('pr'),140);fn(ev)})};
function btn(p,html,css,fn){const b=el('div',p,css,html);b.className='btn';tap(b,()=>{AUD.sfx('pop');fn()});return b}
function chr(p,o,x,y,h,cls){const d=el('div',p,`left:${x-h*.3}px;top:${y-h}px;width:${h*.6}px;height:${h}px`,person(o));d.className='ch '+(cls||'');return d}
function grpChr(p,k,x,y,h,cls){const f=FR[k];if(f.grp){const w=el('div',p,`position:absolute;left:${x-h*.45}px;top:${y-h}px;width:${h*.9}px;height:${h}px`);w.className='ch '+(cls||'');
  f.grp.forEach((o,i)=>{const c=el('div',w,`position:absolute;left:${i*h*.36}px;top:${h*.12}px;width:${h*.54}px;height:${h*.88}px`,person(o))});return w}return chr(p,f.o,x,y,h,cls)}
function stagePt(ev){const r=st.getBoundingClientRect(),k=r.width/W;return [(ev.clientX-r.left)/k,(ev.clientY-r.top)/k]}
function burst(p,x,y,chars,n){for(let i=0;i<(n||8);i++){const a=Math.random()*6.28,r=80+Math.random()*120;const f=el('div',p,`left:${x-28}px;top:${y-28}px;--dx:${Math.cos(a)*r}px;--dy:${Math.sin(a)*r-60}px;animation-delay:${i*.03}s`,chars[i%chars.length]);f.className='fx';setTimeout(()=>f.remove(),1300)}}
function anim(e,c){e.classList.remove(c);void e.offsetWidth;e.classList.add(c);setTimeout(()=>e.classList.remove(c),900)}
function stickerUp(p){SAVE.stk++;save();updStk();AUD.sfx('fanfare');setTimeout(()=>AUD.say('sticker'),300);burst(p,W/2,H/2,['🌟','💖','✨','🦄','👑'],20)}
let stkEl;function updStk(){if(stkEl)stkEl.innerHTML='🌟 '+SAVE.stk}

// ================= screens =================
const SCR={};let cur=null,timers=[];
function go(k){timers.forEach(clearInterval);timers=[];if(cur&&SCR[cur].leave)SCR[cur].leave();cur=k;st.innerHTML='';const s=SCR[k];bgEl.style.backgroundImage=`url(${DATA.bg[s.bg]})`;
  const root=el('div',st,'position:absolute;inset:0');s.show(root);if(k!=='title'){stkEl=el('div',root);stkEl.id='stk';updStk()}
  if(k!=='title'&&k!=='hub')btn(root,'🏰','',()=>go('hub')).classList.add('back');}
addEventListener('pointerdown',ev=>{if(!cur)return;const [x,y]=stagePt(ev);if(cur!=='ride')burst(st,x,y,['✨'],3)},{passive:true});

SCR.title={bg:'castle',show(r){AUD.music('home');const t=el('div',r,'','Zoe\'s Princess Castle');t.id='ttl';
  const u=el('div',r,`position:absolute;left:${W*.08}px;top:${H-470}px;width:500px;height:440px`,unicorn(SAVE.uni));u.className='bob';
  el('div',u,'position:absolute;left:150px;top:-40px;width:160px;height:260px',person(zoe()));
  chr(r,FR.peach.o,W*.62,H-40,330,'bob');chr(r,FR.elsa.o,W*.76,H-30,330,'bob').style.animationDelay='.4s';chr(r,FR.anna.o,W*.9,H-36,320,'bob').style.animationDelay='.8s';
  const p=btn(r,'▶️',`left:${W/2-130}px;top:${H*.36}px;width:260px;height:200px;font-size:130px`,()=>{AUD.say('hizoe');go('hub')});p.classList.add('pulse')}};

SCR.hub={bg:'castle',show(r){AUD.music('home');
  chr(r,zoe(),W*.13,H-40,420,'bob');
  const items=[['🦄','ride','ride'],['💃','ball','ball'],['🫖','tea','tea'],['👗','dress','dress'],['🛏️','bed','bed'],['💌','friends','friends']];
  const cols=3,bw=250,bh=230,gx=36,gy=40,x0=Math.max(W*.27,W-30-(cols*bw+(cols-1)*gx)),tw=cols*bw+(cols-1)*gx,x1=x0+((W-30-x0)-tw)/2,y0=(H-(2*bh+gy))/2+30;
  items.forEach(([e,k,v],i)=>{const b=btn(r,e,`left:${x1+(i%cols)*(bw+gx)}px;top:${y0+(i/cols|0)*(bh+gy)}px`,()=>{AUD.say(v);go(k)});b.classList.add('hub');b.dataset.k=k});
  const m=btn(r,AUD.muted?'🔇':'🔊','left:24px;top:22px;width:110px;height:100px;font-size:56px',()=>{m.innerHTML=AUD.toggle()?'🔇':'🔊'})}};

SCR.friends={bg:'castle',show(r){AUD.music('home');setTimeout(()=>AUD.say('friends'),200);
  const cols=5,cw=Math.min(210,(W-200)/cols),ch=300,x0=(W-cols*cw)/2,y0=H/2-ch-10;
  FRK.forEach((k,i)=>{const x=x0+(i%cols)*cw+cw/2,y=y0+(i/cols|0)*(ch+20)+ch;
    const card=el('div',r,`position:absolute;left:${x-cw/2+6}px;top:${y-ch}px;width:${cw-12}px;height:${ch}px;border-radius:30px;background:rgba(255,255,255,.75);box-shadow:0 6px 16px rgba(0,0,0,.15)`);
    const c=grpChr(r,k,x,y-14,ch-40);const badge=el('div',r,`position:absolute;left:${x+cw/2-60}px;top:${y-ch+6}px;font-size:46px`,SAVE.party.includes(k)?'💖':'');
    const hit=el('div',r,`position:absolute;left:${x-cw/2+6}px;top:${y-ch}px;width:${cw-12}px;height:${ch}px;cursor:pointer`);
    tap(hit,()=>{AUD.say(FR[k].v);AUD.sfx('sparkle');anim(c,'hop');burst(r,x,y-ch*.6,[FR[k].fx,'✨','💖'],10);
      if(!SAVE.party.includes(k)){SAVE.party.push(k);if(SAVE.party.length>5)SAVE.party.shift();save();r.innerHTML='';SCR.friends.redraw(r)}})});},
  redraw(r){go('friends')}};
SCR.friends.redraw=function(){const keep=AUD.say;AUD.say=()=>{};go('friends');AUD.say=keep};

SCR.ball={bg:'ballroom',show(r){AUD.music('ball');const lights=el('div',r,'position:absolute;inset:0;pointer-events:none;mix-blend-mode:screen;opacity:0;transition:opacity .4s');let on=false,hue=0;
  timers.push(setInterval(()=>{hue=(hue+40)%360;lights.style.background=`radial-gradient(circle at 30% 30%,hsla(${hue},90%,70%,.45),transparent 40%),radial-gradient(circle at 70% 40%,hsla(${hue+120},90%,70%,.45),transparent 40%)`},400));
  const crew=[['zoe',zoe()]].concat(SAVE.party.map(k=>[k,null]));const n=crew.length,sp=(W-160)/n;
  crew.forEach(([k,o],i)=>{const x=80+sp*(i+.5),y=H-30-(i%2)*30,h=k==='zoe'?380:340;const c=o?chr(r,o,x,y,h,'dance'):grpChr(r,k,x,y,h,'dance');c.style.animationDelay=(i*.15)+'s';
    tap(c,()=>{AUD.sfx('magic');c.classList.remove('dance');anim(c,'spin');setTimeout(()=>c.classList.add('dance'),850);burst(r,x,y-h*.6,[k==='zoe'?'👑':FR[k].fx,'✨'],10)})});
  btn(r,'🪩',`left:${W-150}px;top:130px;width:120px;height:110px;font-size:70px`,()=>{on=!on;lights.style.opacity=on?1:0;AUD.sfx('sparkle')});
  let taps=0;r.addEventListener('pointerdown',()=>{if(++taps===12)stickerUp(r)})}};

SCR.tea={bg:'tea',show(r){AUD.music('home');
  const guests=SAVE.party.slice(0,4);const pos=[[W*.14,H-20],[W*.86,H-20],[W*.27,H*.63],[W*.73,H*.63]];
  const cs=guests.map((k,i)=>grpChr(r,k,pos[i][0],pos[i][1],i<2?360:250));
  const z=chr(r,zoe(),W*.5,H*.55,200);
  const tray=el('div',r,`position:absolute;left:${W/2-390}px;bottom:16px;width:780px;height:130px;border-radius:65px;background:rgba(255,255,255,.85);box-shadow:0 6px 16px rgba(0,0,0,.2);display:flex;justify-content:space-around;align-items:center;font-size:84px;z-index:20`);
  let placed=0,served=0;const spots=[[.36,.66],[.44,.70],[.52,.68],[.60,.70],[.66,.65],[.40,.60],[.56,.61],[.48,.63]];
  ['🧁','🍰','🍪','🫖','🍓','🍩'].forEach(f=>{const b=el('div',tray,'cursor:pointer;padding:0 6px',f);tap(b,()=>{AUD.sfx('pop');const s=spots[placed%spots.length];placed++;
    const it=el('div',r,`left:${W*s[0]-45}px;top:${H*s[1]-50}px;transition:transform .2s`,f);it.className='item';anim(it,'hop');
    tap(it,()=>{const gi=served%Math.max(1,cs.length);const g=cs[gi]||z;AUD.sfx('yum');if(served%2===0)AUD.say('yum');anim(g,'hop');const gr=g.getBoundingClientRect(),sr=st.getBoundingClientRect(),k=sr.width/W;
      burst(r,(gr.left-sr.left+gr.width/2)/k,(gr.top-sr.top+gr.height*.3)/k,['💖','😋','✨'],8);it.remove();served++;if(served===6)stickerUp(r)})})})}};

SCR.dress={bg:'castle',show(r){AUD.music('home');let z;const draw=()=>{if(z)z.remove();z=chr(r,zoe(),W/2,H-20,560);z.classList.add('bob')};draw();
  const dresses=['#ff8fc8','#b28dff','#7fd6e8','#ffd34d','#ff6b6b','#7ee08a','#ffffff','#3f6fb5'];
  dresses.forEach((c,i)=>{const s=el('div',r,`left:${W*.08+(i%2)*120}px;top:${150+(i/2|0)*125}px;background:${c}`);s.className='sw'+(SAVE.dress===c?' sel':'');
    tap(s,()=>{SAVE.dress=c;save();r.querySelectorAll('.sw.d').forEach(x=>x.classList.remove('sel'));s.classList.add('sel');draw();AUD.sfx('sparkle');burst(r,W/2,H/2,['✨','💖'],8)});s.classList.add('d')});
  const crowns=['crown','tiara','star','heart','flower','bow'];
  crowns.forEach((c,i)=>{const b=el('div',r,`position:absolute;left:${W*.92-230+(i%2)*120}px;top:${130+(i/2|0)*150}px;width:110px;height:140px;border-radius:24px;background:rgba(255,255,255,.85);cursor:pointer;overflow:hidden;${SAVE.crown===c?'outline:8px solid #ff5fb4':''}`,`<div style="width:110px;height:180px;margin-top:-6px">${person({kid:0,hair:SAVE.hair,crown:c,dress:'transparent',dress2:'transparent'}).replace('viewBox="0 0 200 330"','viewBox="40 0 120 150"')}</div>`);
    tap(b,()=>{SAVE.crown=c;save();AUD.sfx('magic');go('dress')})});
  ['#7a4a2a','#2a1a12','#ffd560','#c8572a'].forEach((c,i)=>{const s=el('div',r,`left:${W*.08+i*80}px;top:${H-120}px;width:70px;height:70px;background:${c}`);s.className='sw'+(SAVE.hair===c?' sel':'');tap(s,()=>{SAVE.hair=c;save();go('dress')})});
  const tw=btn(r,'💫',`left:${W/2+170}px;top:${H-190}px;width:150px;height:140px;font-size:84px`,()=>{anim(z,'spin');AUD.say('pretty');burst(r,W/2,H/2,['💖','✨','👑','🌸'],16);if(!SAVE.tw){SAVE.tw=1;save();stickerUp(r)}})}};

SCR.bed={bg:'bedroom',show(r){AUD.music('home');const crew=[['zoe',zoe()]].concat(SAVE.party.slice(0,3).map(k=>[k,null]));
  const cs=crew.map(([k,o],i)=>{const x=W*.12+i*W*.13,y=H-30;return o?chr(r,o,x,y,320):grpChr(r,k,x,y,300)});
  const night=el('div',r,'opacity:0');night.className='night';const zz=[];let dark=false;
  const b=btn(r,'🌙',`left:${W-170}px;top:130px;width:140px;height:130px;font-size:80px;z-index:30`,()=>{dark=!dark;night.style.opacity=dark?1:0;b.innerHTML=dark?'☀️':'🌙';
    AUD.music(dark?'lull':'home');if(dark){AUD.say('bed');cs.forEach((c,i)=>{c.style.transition='transform .8s';c.style.transform='rotate(-6deg)';const z=el('div',r,`position:absolute;left:${parseFloat(c.style.left)+40}px;top:${parseFloat(c.style.top)-20}px;font-size:56px;z-index:25`,'💤');z.className='bob';zz.push(z)});
      for(let i=0;i<14;i++){const s=el('div',r,`position:absolute;left:${Math.random()*W}px;top:${Math.random()*H*.5}px;font-size:${30+Math.random()*30}px;z-index:25`,'⭐');s.className='pulse';s.style.animationDelay=Math.random()+'s';zz.push(s)}
      if(!SAVE.bed){SAVE.bed=1;save();setTimeout(()=>stickerUp(r),2500)}}
    else{cs.forEach(c=>c.style.transform='');zz.splice(0).forEach(z=>z.remove());AUD.sfx('chime')}});
  cs.forEach(c=>tap(c,()=>{anim(c,'hop');AUD.sfx('chime');const rr=c.getBoundingClientRect(),sr=st.getBoundingClientRect(),k=sr.width/W;burst(r,(rr.left-sr.left+rr.width/2)/k,(rr.top-sr.top)/k+60,['💖','🤗'],6)}))},
  leave(){}};

// ---- unicorn ride ----
SCR.ride={bg:'meadow',show(r){AUD.music('home');setTimeout(()=>AUD.say('pickuni'),900);
  const cols=['rainbow','#ff8fc8','#b28dff','#6cc6ff','#7ee08a','#ffd34d'];const cw=Math.min(300,(W-200)/3);
  cols.forEach((c,i)=>{const x=(W-3*cw)/2+(i%3)*cw,y=150+(i/3|0)*300;const card=el('div',r,`position:absolute;left:${x+10}px;top:${y}px;width:${cw-20}px;height:270px;border-radius:36px;background:rgba(255,255,255,.8);cursor:pointer;box-shadow:0 8px 0 #e58cc4;${SAVE.uni===c?'outline:8px solid #ff5fb4':''}`,`<div style="width:100%;height:100%;padding:16px">${unicorn(c)}</div>`);card.firstChild.firstChild.style.cssText='width:100%;height:100%';
    tap(card,()=>{SAVE.uni=c;save();AUD.sfx('magic');ride(r)})})}};
function ride(r){r.innerHTML='';const back=btn(r,'🏰','',()=>go('hub'));back.classList.add('back');stkEl=el('div',r);stkEl.id='stk';updStk();
  AUD.say('tapjump');const cv=el('canvas',r);r.insertBefore(cv,r.firstChild);const dpr=Math.min(2,devicePixelRatio||1);
  const g=cv.getContext('2d');const bg=new Image();bg.src=DATA.bg.meadow;bgEl.style.backgroundImage='none';bgEl.style.background='#a8dcf7';
  const ui=new Image();ui.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(unicorn(SAVE.uni));const zi=new Image();zi.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(person(zoe()));
  let rect,cw,ch;const size=()=>{rect=cv.getBoundingClientRect();cw=cv.width=Math.round(rect.width*dpr);ch=cv.height=Math.round(rect.height*dpr)};size();
  const GY=H-110,ux=W*.22;let y=0,vy=0,jumps=0,sc=0,got=0,goal=15,items=[],trail=[],done=false,t0=performance.now(),last=t0,spawn=0;
  const cnt=el('div',r,`position:absolute;left:${W/2-150}px;top:24px;width:300px;height:90px;border-radius:45px;background:rgba(255,255,255,.85);font-size:52px;color:#c2378f;display:flex;align-items:center;justify-content:center`,'');
  const upd=()=>{cnt.innerHTML='⭐'.repeat(0)+got+' / '+goal};upd();
  r.addEventListener('pointerdown',()=>{if(done)return;if(jumps<2){vy=-1250+(jumps*150);jumps++;AUD.sfx('jump')}});
  function frame(now){if(cur!=='ride'||!cv.isConnected)return;const dt=Math.min(.04,(now-last)/1000);last=now;sc+=dt*260;
    vy+=2600*dt;y+=vy*dt;if(y>0){y=0;vy=0;jumps=0}
    spawn-=dt;if(spawn<=0&&!done){spawn=.9+Math.random()*.6;const hi=Math.random();items.push({x:W+80,y:GY-120-hi*380,k:Math.random()<.6?'⭐':'💖',ph:Math.random()*6})}
    const k=cw/W;g.setTransform(k,0,0,k,0,0);
    if(bg.complete&&bg.naturalWidth){const bh=H,bw=bh*bg.naturalWidth/bg.naturalHeight;let ox=-(sc*.5)%(bw*2);for(let x=ox;x<W;x+=bw*2){g.drawImage(bg,x,0,bw,bh);g.save();g.translate(x+bw*2,0);g.scale(-1,1);g.drawImage(bg,0,0,bw,bh);g.restore()}}
    const uy=GY+y;trail.push([ux-40,uy-130]);if(trail.length>26)trail.shift();
    const rb=['#ff6b8b','#ffb347','#ffe66d','#7ee08a','#6cc6ff','#b28dff'];rb.forEach((c,j)=>{g.strokeStyle=c;g.lineWidth=9;g.globalAlpha=.75;g.beginPath();trail.forEach((p,i)=>{const px=p[0]-(trail.length-i)*14,py=p[1]+j*9-20;i?g.lineTo(px,py):g.moveTo(px,py)});g.stroke()});g.globalAlpha=1;
    const bob=y===0?Math.sin(now/90)*5:0;
    if(zi.complete)g.drawImage(zi,ux-50,uy-300+bob,130,215);if(ui.complete)g.drawImage(ui,ux-130,uy-210+bob,250,220);
    g.font='80px sans-serif';g.textAlign='center';g.textBaseline='middle';
    items=items.filter(it=>{it.x-=dt*330;const iy=it.y+Math.sin(now/300+it.ph)*14;
      if(Math.hypot(it.x-(ux+20),iy-(uy-140))<130){got++;upd();AUD.sfx('chime');if(got%3===0)AUD.say(it.k==='⭐'?'star':'heart');burst(r,it.x,iy,[it.k,'✨'],6);if(got>=goal)finish();return false}
      g.fillText(it.k,it.x,iy);return it.x>-100});
    requestAnimationFrame(frame)}
  function finish(){if(done)return;done=true;AUD.music('ball');setTimeout(()=>AUD.say('great'),200);stickerUp(r);
    setTimeout(()=>{const again=btn(r,'🔁',`left:${W/2-280}px;top:${H/2-90}px;width:230px;height:190px;font-size:110px`,()=>go('ride'));again.classList.add('pulse');btn(r,'🏰',`left:${W/2+50}px;top:${H/2-90}px;width:230px;height:190px;font-size:110px`,()=>go('hub'))},1500)}
  SCR.ride.fit=size;requestAnimationFrame(frame)}
SCR.ride.leave=()=>{bgEl.style.background='';SCR.ride.fit=null};

addEventListener('resize',fit);addEventListener('orientationchange',()=>setTimeout(fit,200));
document.addEventListener('gesturestart',e=>e.preventDefault());
fit();go(new URLSearchParams(location.search).get('s')||'title');
window.__Z={go,SAVE};
