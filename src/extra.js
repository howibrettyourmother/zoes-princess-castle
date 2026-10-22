// ================= add-ons: kitty princesses, daily birthday party, unicorn race, bus ride, school =================
const TODAY=new Date().toLocaleDateString('en-CA');
function rng(seed){let s=0;for(const c of seed)s=(s*31+c.charCodeAt(0))>>>0;return()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296}}
const sayQ=(ks,gap)=>ks.forEach((k,i)=>timers.push(setTimeout(()=>{if(cur)AUD.say(k)},i*(gap||1700))));
// kitty friends (same looks as Doodle & Zoe's kitties)
const KITS={doodle:{c:'#f5a142',d:'#d9822b',w:'#fff3e0',eye:'#6d4c41',ear:'#ffb3c7',bow:'#ff5c9e',stripes:1},
  snow:{c:'#fffdfb',d:'#e6dce3',w:'#ffffff',eye:'#64b5f6',ear:'#ffc1d6',fluff:1},
  galaxy:{c:'#9b7be0',d:'#7a5cc8',w:'#dccbff',eye:'#ffd54f',ear:'#ffc1e3',stars:1},
  tiny:{c:'#bbb6c1',d:'#9e98a6',w:'#f6f3f8',eye:'#81c784',ear:'#ffc1d6',small:1},
  calico:{c:'#fffaf3',d:'#efe2d2',w:'#ffffff',eye:'#8d6e63',ear:'#ffc1d6',calico:1},
  bow:{c:'#ffe4ef',d:'#f7c8db',w:'#ffffff',eye:'#ab47bc',ear:'#ffb3d0',bow:'#ff5c9e'}};
const KITK=Object.keys(KITS);SAVE.kc=SAVE.kc||{};SAVE.kitSel=SAVE.kitSel||'doodle';
const kOut=k=>SAVE.kc[k]||(SAVE.kc[k]={});
const dressedKits=()=>KITK.filter(k=>{const o=SAVE.kc[k];return o&&(o.g||o.c||o.p||o.w||o.n)}).sort((a,b)=>(SAVE.kc[b].at||0)-(SAVE.kc[a].at||0));
function crownSvg(c,x,y,s){s=s||1;const g=`transform="translate(${x},${y}) scale(${s})"`;
  if(c==='crown')return`<g ${g}><path d="M-34,0 L-34,-34 L-17,-14 L0,-40 L17,-14 L34,-34 L34,0 Z" fill="#ffd34d" stroke="#e0a800" stroke-width="3"/><circle cx="0" cy="-12" r="6" fill="#ff5fb4"/><circle cx="-20" cy="-8" r="4" fill="#6cc6ff"/><circle cx="20" cy="-8" r="4" fill="#7ee08a"/></g>`;
  if(c==='tiara')return`<g ${g}><path d="M-38,0 Q0,-44 38,0 Q0,-22 -38,0Z" fill="#e8f4ff" stroke="#9fc8ee" stroke-width="3"/><circle cx="0" cy="-26" r="7" fill="#b28dff"/><circle cx="-18" cy="-18" r="4" fill="#ff8fc8"/><circle cx="18" cy="-18" r="4" fill="#ff8fc8"/></g>`;
  if(c==='star')return`<g ${g}><path d="M0,-44 L9,-20 L34,-20 L14,-6 L22,18 L0,4 L-22,18 L-14,-6 L-34,-20 L-9,-20Z" transform="scale(.8)" fill="#ffe66d" stroke="#f0b400" stroke-width="3"/></g>`;
  if(c==='flower')return`<g ${g}>${[0,72,144,216,288].map(a=>`<circle cx="${Math.cos(a*Math.PI/180)*13}" cy="${-18+Math.sin(a*Math.PI/180)*13}" r="11" fill="#ff8fc8"/>`).join('')}<circle cx="0" cy="-18" r="8" fill="#ffd34d"/></g>`;
  return''}
function kitty(k,o){const K=KITS[k];o=o||{};let s=`<svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg">`;
  if(o.p)s+=`<path d="M62,128 Q100,118 138,128 L176,252 Q100,262 24,252Z" fill="${o.p}" stroke="rgba(0,0,0,.12)" stroke-width="3"/>`;
  s+=`<path d="M145,225 Q195,215 180,160 Q172,140 160,150" fill="none" stroke="${K.d}" stroke-width="18" stroke-linecap="round"/>`;
  s+=`<ellipse cx="100" cy="200" rx="55" ry="54" fill="${K.c}"/><ellipse cx="100" cy="212" rx="32" ry="38" fill="${K.w}"/>`;
  if(K.stripes)s+=`<path d="M58,185 q12,4 18,-6 M56,205 q12,4 18,-6 M142,185 q-12,4 -18,-6 M144,205 q-12,4 -18,-6" stroke="${K.d}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  if(K.calico)s+=`<ellipse cx="72" cy="190" rx="16" ry="12" fill="#f5a142"/><ellipse cx="128" cy="180" rx="14" ry="10" fill="#4a3f45"/>`;
  if(K.stars)s+=`<text x="70" y="200" font-size="18">✦</text><text x="122" y="226" font-size="14">✦</text>`;
  if(o.g)s+=`<path d="M70,150 L130,150 L168,252 Q100,264 32,252Z" fill="${o.g}"/><path d="M70,150 L130,150 L134,170 L66,170Z" fill="rgba(255,255,255,.45)"/><path d="M40,240 Q70,250 100,240 Q130,250 160,240" stroke="rgba(255,255,255,.7)" stroke-width="5" fill="none"/>`;
  s+=`<ellipse cx="78" cy="250" rx="16" ry="9" fill="${K.c}"/><ellipse cx="122" cy="250" rx="16" ry="9" fill="${K.c}"/>`;
  s+=`<path d="M56,80 L52,26 L94,58Z M144,80 L148,26 L106,58Z" fill="${K.c}"/><path d="M60,68 L58,38 L84,58Z M140,68 L142,38 L116,58Z" fill="${K.ear}"/>`;
  s+=`<circle cx="100" cy="100" r="${K.fluff?54:50}" fill="${K.c}"/>`;
  if(K.stripes)s+=`<path d="M88,54 l4,14 M100,51 l0,15 M112,54 l-4,14" stroke="${K.d}" stroke-width="6" stroke-linecap="round"/>`;
  if(K.calico)s+=`<ellipse cx="78" cy="78" rx="18" ry="14" fill="#f5a142"/>`;
  s+=`<ellipse cx="80" cy="100" rx="11" ry="14" fill="${K.eye}"/><ellipse cx="120" cy="100" rx="11" ry="14" fill="${K.eye}"/><ellipse cx="80" cy="102" rx="6" ry="9" fill="#2a1a22"/><ellipse cx="120" cy="102" rx="6" ry="9" fill="#2a1a22"/><circle cx="83" cy="96" r="4" fill="#fff"/><circle cx="123" cy="96" r="4" fill="#fff"/>`;
  s+=`<ellipse cx="66" cy="120" rx="10" ry="6" fill="#ff9cbf" opacity=".6"/><ellipse cx="134" cy="120" rx="10" ry="6" fill="#ff9cbf" opacity=".6"/>`;
  s+=`<path d="M94,114 L106,114 L100,121Z" fill="#ff7aa8"/><path d="M100,121 q-7,9 -14,3 M100,121 q7,9 14,3" stroke="#6b4a52" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  s+=`<path d="M40,112 L72,116 M40,124 L72,122 M160,112 L128,116 M160,124 L128,122" stroke="#8a7a80" stroke-width="2.5"/>`;
  if(K.bow&&!o.c)s+=`<path d="M118,56 l22,-14 l0,28Z M118,56 l-6,-20 l-14,22Z" fill="${K.bow}"/><circle cx="118" cy="56" r="7" fill="#fff"/>`;
  if(o.n)s+=[...Array(9)].map((_,i)=>{const a=(.15+i*.0875)*Math.PI;return`<circle cx="${100+Math.cos(a)*40}" cy="${132+Math.sin(a)*22}" r="6" fill="${i===4?'#ff5fb4':'#fff8fc'}" stroke="#e8c6d8" stroke-width="1.5"/>`}).join('');
  if(o.c)s+=crownSvg(o.c,100,56,1);
  if(o.w)s+=`<path d="M152,214 L186,138" stroke="#c48d00" stroke-width="7" stroke-linecap="round"/><path d="M186,112 l7,16 17,1 -13,11 4,17 -15,-9 -15,9 4,-17 -13,-11 17,-1Z" fill="#ffe66d" stroke="#f0b400" stroke-width="2"/><circle cx="152" cy="214" r="12" fill="${K.c}"/>`;
  return s+'</svg>'}
function kitChr(p,k,x,y,h,cls){const d=el('div',p,`left:${x-h*.385}px;top:${y-h}px;width:${h*.77}px;height:${h}px`,kitty(k,SAVE.kc[k]));d.className='ch '+(cls||'');
  tap(d,()=>{AUD.sfx('meow');anim(d,'spin');burst(p,x,y-h*.6,['🐾','💖','✨'],8)});return d}

// ---- extra sound effects + tunes ----
AUD.extra=AUD.extra||{};

// ---- kitty princess dress-up ----
SCR.kitty={bg:'castle',show(r){AUD.music('home');AUD.say('kitpick');let k=SAVE.kitSel,big;
  const draw=()=>{if(big)big.remove();big=el('div',r,`left:${W/2-210}px;top:${H-560}px;width:420px;height:546px`,kitty(k,kOut(k)));big.className='ch bob';
    tap(big,()=>{AUD.sfx('meow');AUD.say(Math.random()<.5?'kitmeow':'kitpretty');big.classList.remove('bob');anim(big,'spin');setTimeout(()=>big.classList.add('bob'),850);burst(r,W/2,H-320,['💖','✨','👑','🐾'],14)})};
  const pick=[];KITK.forEach((q,i)=>{const b=el('div',r,`position:absolute;left:${W/2-345+i*115}px;top:18px;width:100px;height:100px;border-radius:50%;background:rgba(255,255,255,.85);overflow:hidden;cursor:pointer;box-shadow:0 5px 12px rgba(0,0,0,.18)`,`<div style="width:100px;height:130px">${kitty(q,{}).replace('viewBox="0 0 200 260"','viewBox="40 20 120 120"')}</div>`);pick.push(b);
    tap(b,()=>{k=SAVE.kitSel=q;save();AUD.sfx('meow');sel();draw()})});
  const sel=()=>pick.forEach((b,i)=>b.style.outline=KITK[i]===k?'8px solid #ff5fb4':'');sel();
  const set=(f,v)=>{const o=kOut(k);o[f]=o[f]===v?0:v;o.at=Date.now();save();draw();AUD.sfx('sparkle');burst(r,W/2,H-330,['✨','💖'],8);
    const n=['g','c','p','w','n'].filter(x=>o[x]).length;if(n>=3&&!o.st){o.st=1;save();setTimeout(()=>{AUD.say('kitpretty');stickerUp(r)},400)}};
  ['#ff8fc8','#b28dff','#7fd6e8','#ffd34d','#7ee08a','#ffffff'].forEach((c,i)=>{const s=el('div',r,`left:${W*.05+(i%2)*115}px;top:${160+(i/2|0)*112}px;background:${c}`);s.className='sw';tap(s,()=>set('g',c))});
  ['#d0459b','#5b7be0','#e8f4ff'].forEach((c,i)=>{const s=el('div',r,`left:${W*.05+(i%2)*115}px;top:${520+(i/2|0)*112}px;background:${c};border-radius:24px 24px 50% 50%`);s.className='sw';tap(s,()=>set('p',c))});
  ['crown','tiara','star','flower'].forEach((c,i)=>{const b=el('div',r,`position:absolute;left:${W*.95-230+(i%2)*120}px;top:${150+(i/2|0)*125}px;width:110px;height:110px;border-radius:24px;background:rgba(255,255,255,.85);cursor:pointer;box-shadow:0 5px 12px rgba(0,0,0,.18)`,`<svg viewBox="-50 -60 100 80" style="width:100%;height:100%">${crownSvg(c,0,10,1)}</svg>`);tap(b,()=>set('c',c))});
  btn(r,'🪄',`left:${W*.95-230}px;top:420px;width:110px;height:110px;font-size:64px`,()=>set('w',1));
  btn(r,'📿',`left:${W*.95-110}px;top:420px;width:110px;height:110px;font-size:64px`,()=>set('n',1));
  btn(r,'💃',`left:${W*.95-230}px;top:560px;width:230px;height:120px;font-size:72px`,()=>{AUD.say('ball');go('ball')});
  draw()}};

// ---- daily birthday party ----
const GIFTS=['🧸','🦄','👑','🪄','🐱','🌈','🎀','🐶','🦋','🍭','🪀','🎈','🐰','⭐','💎','🧁','🐠','🌸','🪁','🎨','🐻','🦊','🍓','🛼'];
function giftsToday(){if(!SAVE.bd||SAVE.bd.day!==TODAY){const R=rng(TODAY),pool=GIFTS.slice(),g=[];for(let i=0;i<3;i++)g.push(pool.splice((R()*pool.length)|0,1)[0]);SAVE.bd={day:TODAY,g,open:[]};save()}return SAVE.bd}
SCR.bday={bg:'ballroom',show(r){AUD.music('bday');const B=giftsToday();sayQ(['bd_hi']);
  el('div',r,`position:absolute;left:0;right:0;top:120px;text-align:center;font-size:54px;letter-spacing:10px;pointer-events:none`,'🎉🎈🎊🎈🎉🎈🎊🎈🎉');
  const crew=[];crew.push(chr(r,zoe(),W/2-300,H-20,400,'bob'));
  SAVE.party.slice(0,3).forEach((q,i)=>{const c=grpChr(r,q,[W*.1,W*.88,W*.75][i],H-20-(i===2?40:0),340,'bob');c.style.animationDelay=(i*.3)+'s';crew.push(c)});
  dressedKits().slice(0,2).forEach((q,i)=>crew.push(kitChr(r,q,[W/2+260,W*.22][i],H-14,210,'bob')));
  // cake
  const cx=W/2,cw=360,top=H-330;const cake=el('div',r,`position:absolute;left:${cx-cw/2}px;top:${top}px;width:${cw}px;height:320px;z-index:5`,
   `<svg viewBox="0 0 360 320" style="width:100%;height:100%"><ellipse cx="180" cy="300" rx="175" ry="18" fill="#fff" opacity=".8"/><rect x="30" y="170" width="300" height="125" rx="24" fill="#ff9cc9"/><path d="M30,200 q25,25 50,0 q25,25 50,0 q25,25 50,0 q25,25 50,0 q25,25 50,0 q25,25 50,0" fill="#fff" /><rect x="70" y="100" width="220" height="85" rx="20" fill="#b28dff"/><path d="M70,125 q22,20 44,0 q22,20 44,0 q22,20 44,0 q22,20 44,0 q22,20 44,0" fill="#fff"/>${[60,110,160,210,260].map((x,i)=>`<circle cx="${x+10}" cy="${255}" r="9" fill="${['#ffe66d','#7ee08a','#6cc6ff','#ff6b8b','#fff'][i]}"/>`).join('')}${[0,1,2,3,4].map(i=>`<rect x="${98+i*38}" y="40" width="14" height="64" rx="5" fill="${['#ff6b8b','#ffe66d','#7ee08a','#6cc6ff','#b28dff'][i]}" stroke="#fff" stroke-width="3"/>`).join('')}</svg>`);
  let lit=5;const flames=[];
  const light=()=>{lit=5;flames.forEach(f=>f.remove());flames.length=0;for(let i=0;i<5;i++){const f=el('div',r,`position:absolute;left:${cx-cw/2+(105+i*38)-34}px;top:${top-30}px;width:68px;height:80px;font-size:50px;text-align:center;cursor:pointer;z-index:6`,'🔥');f.className='pulse';flames.push(f);
    tap(f,()=>{if(f.dataset.out)return;f.dataset.out=1;f.innerHTML='💨';f.classList.remove('pulse');AUD.sfx('blow');setTimeout(()=>{f.innerHTML=''},500);if(--lit===0)blown()})}};
  const relight=btn(r,'🕯️',`left:${cx+cw/2+10}px;top:${H-150}px;width:110px;height:110px;font-size:62px;z-index:7;display:none`,()=>{relight.style.display='none';AUD.music('bday');AUD.say('bd_wish');light()});
  function blown(){AUD.music('ball');AUD.sfx('fanfare');sayQ(['bd_c1','bd_c2','bd_c3'],1900);crew.forEach((c,i)=>{c.classList.remove('bob');c.classList.add('dance');c.style.animationDelay=(i*.12)+'s'});
    for(let i=0;i<6;i++)timers.push(setTimeout(()=>burst(r,W*(.15+Math.random()*.7),H*(.2+Math.random()*.4),['🎉','🎊','✨','💖','⭐'],14),i*350));
    timers.push(setTimeout(()=>relight.style.display='flex',4000));if(SAVE.bdSt!==TODAY){SAVE.bdSt=TODAY;save();timers.push(setTimeout(()=>stickerUp(r),6000))}}
  light();
  // presents (a new surprise each day)
  B.g.forEach((g,i)=>{const x=W/2-200+i*200;const p=el('div',r,`left:${x-60}px;top:190px;width:120px;height:120px;font-size:100px;text-align:center;line-height:120px`,B.open.includes(i)?g:'🎁');p.className='item bob';p.style.animationDelay=(i*.4)+'s';
    tap(p,()=>{if(B.open.includes(i)){AUD.sfx('sparkle');anim(p,'hop');return}AUD.say('bd_gift');anim(p,'hop');timers.push(setTimeout(()=>{p.innerHTML=g;AUD.sfx('magic');AUD.say('bd_wow');burst(r,x,250,[g,'✨','🎀'],12);B.open.push(i);save()},900))})});
  // balloons to pop
  const hues=[0,40,90,180,260,310];timers.push(setInterval(()=>{if(r.querySelectorAll('.bal').length>6)return;const x=60+Math.random()*(W-120);const b=el('div',r,`position:absolute;left:${x-45}px;top:${H+20}px;font-size:90px;cursor:pointer;z-index:40;filter:hue-rotate(${hues[(Math.random()*6)|0]}deg);transition:transform 9s linear`,'🎈');b.className='bal';
    requestAnimationFrame(()=>requestAnimationFrame(()=>b.style.transform=`translateY(${-H-200}px)`));setTimeout(()=>b.remove(),9200);
    tap(b,()=>{AUD.sfx('pop');const rr=b.getBoundingClientRect(),sr=st.getBoundingClientRect(),k=sr.width/W;burst(r,(rr.left-sr.left)/k+45,(rr.top-sr.top)/k+45,['💥','✨','🎊'],8);b.remove()})},1100))}};

// ---- unicorn race (Zoe can always win; everyone gets a medal) ----
SCR.race={bg:'meadow',show(r){AUD.music('ball');AUD.say('race');
  const others=['peach','rosa','elsa'];const dk=dressedKits()[0];
  const lanes=[{o:FR.peach.o,m:'#ff8fc8'},{o:FR.rosa.o,m:'#7fd6e8'},dk?{kit:dk,m:'#b28dff'}:{o:FR.elsa.o,m:'#b28dff'},{o:zoe(),m:SAVE.uni,z:1}];
  const x0=110,fin=W-230;el('div',r,`position:absolute;left:${fin+110}px;top:200px;width:16px;height:${H-200}px;background:repeating-linear-gradient(#fff 0 20px,#333 20px 40px)`);
  el('div',r,`position:absolute;left:${fin+90}px;top:130px;font-size:70px`,'🏁');
  const rs=lanes.map((L,i)=>{const y=330+i*125;const d=el('div',r,`position:absolute;left:${x0}px;top:${y-150}px;width:190px;height:170px;transform-origin:50% 100%`);
    d.innerHTML=`<div style="position:absolute;left:58px;top:-8px;width:66px;height:${L.kit?86:110}px">${L.kit?kitty(L.kit,SAVE.kc[L.kit]):person(L.o)}</div><div style="position:absolute;left:0;top:40px;width:190px;height:${L.z?140:130}px">${unicorn(L.m)}</div>`;
    d.querySelectorAll('svg').forEach(s=>s.style.cssText='width:100%;height:100%;overflow:visible');return{d,x:0,v:0,L,y,done:false}});
  const Z=rs[3];let go=false,t0=0,fin1=false,last=0,boost=0;
  sayQ(['n3','n2','n1','ready'],900);timers.push(setTimeout(()=>{go=true;last=performance.now()},3000));
  r.addEventListener('pointerdown',()=>{if(go&&!fin1){boost=Math.min(boost+.5,2.2);AUD.sfx('jump');burst(r,x0+95+Z.x,Z.y-60,['✨','💨'],3)}});
  const len=fin-x0;
  function frame(now){if(cur!=='race'||!r.isConnected)return;const dt=Math.min(.05,(now-last)/1000);last=now;
    if(go){boost=Math.max(0,boost-dt*1.2);Z.x+=dt*(len/22)*(1+boost*1.6);
      rs.forEach((q,i)=>{if(q===Z)return;const cap=fin1?len:Math.min(len*.94,Z.x+len*.08);q.x=Math.min(cap,q.x+dt*len/(16+i*1.5))});
      rs.forEach(q=>{q.d.style.transform=`translateX(${q.x}px) translateY(${Math.sin(now/110+q.y)*6}px)`});
      if(Z.x>=len&&!fin1){fin1=true;finish()}}
    requestAnimationFrame(frame)}
  requestAnimationFrame(t=>{last=t;frame(t)});
  function finish(){AUD.sfx('fanfare');AUD.say('win');burst(r,fin,Z.y-80,['🥇','🌟','✨','💖'],20);
    timers.push(setTimeout(()=>{AUD.say('medals');rs.forEach((q,i)=>{const m=el('div',r,`position:absolute;left:${x0+q.x+120}px;top:${q.y-150}px;font-size:70px;z-index:30`,q===Z?'🥇':['🎀','🏅','🎖️'][i]);m.className='hop'})},2200));
    if(SAVE.raceSt!==TODAY){SAVE.raceSt=TODAY;save();timers.push(setTimeout(()=>stickerUp(r),3600))}
    timers.push(setTimeout(()=>{btn(r,'🔁',`left:${W/2-260}px;top:30px;width:200px;height:150px;font-size:96px;z-index:60`,()=>go2('race')).classList.add('pulse');btn(r,'🏰',`left:${W/2+60}px;top:30px;width:200px;height:150px;font-size:96px;z-index:60`,()=>go2('hub'))},4800))}}};
const go2=k=>go(k);

// ---- bus ride: pick up friends, end at school ----
function busSvg(){return`<svg viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="30" width="400" height="150" rx="34" fill="#ffcc2e" stroke="#e0a000" stroke-width="5"/><rect x="10" y="130" width="400" height="14" fill="#2a2a2a" opacity=".75"/><rect x="340" y="50" width="60" height="70" rx="12" fill="#bfe8ff" stroke="#fff" stroke-width="4"/><circle cx="398" cy="160" r="9" fill="#fff59d"/><rect x="0" y="150" width="22" height="16" rx="6" fill="#ff6b6b"/></svg>`}
SCR.bus={bg:'town',show(r){AUD.music('wheels');sayQ(['bus','bustap'],1200);bgEl.style.backgroundImage='none';
  const road=el('div',r,`position:absolute;inset:0;background:url(${DATA.bg.town}) 0 0/auto 100% repeat-x`);
  const bx=W*.22,by=H-120;const bus=el('div',r,`position:absolute;left:${bx}px;top:${by-150}px;width:420px;height:220px;z-index:10`,busSvg());
  const wins=[];for(let i=0;i<4;i++){const w=el('div',bus,`position:absolute;left:${36+i*74}px;top:50px;width:62px;height:70px;border-radius:12px;background:#bfe8ff;border:4px solid #fff;overflow:hidden`);wins.push(w)}
  const seat=(w,o,kit)=>{w.innerHTML=`<div style="width:62px;height:76px;margin-top:4px">${kit?kitty(kit,SAVE.kc[kit]).replace('viewBox="0 0 200 260"','viewBox="40 20 120 140"'):person(o).replace('viewBox="0 0 200 330"',o.kid?'viewBox="45 50 110 135"':'viewBox="40 0 120 150"')}</div>`;w.firstChild.firstChild.style.cssText='width:100%;height:100%'};
  seat(wins[0],zoe());const wh=[90,330].map(x=>{const e=el('div',bus,`position:absolute;left:${x-38}px;top:140px;width:76px;height:76px;border-radius:50%;background:radial-gradient(#ddd 0 30%,#333 32% 62%,#222 64%);`,'<div style="position:absolute;left:34px;top:4px;width:8px;height:30px;background:#ddd;border-radius:4px"></div>');return e});
  const stops=[{k:'amanda'},{k:'kids'},{k:'peach'},{k:'rosa'}];const dk=dressedKits()[0];if(dk)stops[3]={kit:dk};
  let dist=0,v=0,gas=0,si=0,next=400,stopEl=null,waiting=false,ended=false,last=performance.now(),rot=0;
  r.addEventListener('pointerdown',()=>{gas=.8});
  btn(r,'📯',`left:${W-170}px;top:130px;width:140px;height:130px;font-size:80px;z-index:50`,()=>{AUD.sfx('honk');anim(bus,'hop')});
  const mk=()=>{const s=stops[si];const d=el('div',r,`position:absolute;top:${by-330}px;width:240px;height:300px;z-index:8`);
    el('div',d,`position:absolute;left:0;top:30px;font-size:90px`,'🚏');const c=s.kit?kitChr(d,s.kit,150,290,180):grpChr(d,s.k,150,290,240);d.style.left=W+'px';return {d,x:W+100,c}};
  function frame(now){if(cur!=='bus'||!r.isConnected)return;const dt=Math.min(.05,(now-last)/1000);last=now;
    if(!waiting&&!ended){if(gas>0){gas-=dt;v=Math.min(420,v+900*dt)}else v=Math.max(0,v-300*dt)}else v=Math.max(0,v-1200*dt);
    dist+=v*dt;road.style.backgroundPosition=`${-dist*.8}px 0`;rot+=v*dt*1.6;wh.forEach(w=>w.style.transform=`rotate(${rot}deg)`);bus.style.transform=`translateY(${v>5?Math.sin(now/70)*3:0}px)`;
    if(!stopEl&&!ended&&dist>next){if(si<stops.length)stopEl=mk();else{ended=true;arrive()}}
    if(stopEl){stopEl.x-=v*dt*.8;stopEl.d.style.left=stopEl.x+'px';
      if(!waiting&&stopEl.x<bx+330){waiting=true;AUD.sfx('honk');AUD.say('busstop');const s=stops[si],cur2=stopEl;
        timers.push(setTimeout(()=>{if(s.k)AUD.say(FR[s.k].v);else AUD.sfx('meow');anim(cur2.c,'hop');},1100));
        timers.push(setTimeout(()=>{cur2.d.remove();seat(wins[si+1]||wins[3],s.k?(FR[s.k].grp?FR[s.k].grp[0]:FR[s.k].o):null,s.kit);AUD.sfx('sparkle');burst(r,bx+200,by-120,['💖','✨'],8);
          si++;next=dist+500;stopEl=null;waiting=false},3200))}}
    requestAnimationFrame(frame)}
  requestAnimationFrame(frame);
  function arrive(){const sc=el('div',r,`position:absolute;left:${W}px;top:${by-330}px;font-size:300px;transition:left 2.5s ease-out;z-index:5`,'🏫');requestAnimationFrame(()=>requestAnimationFrame(()=>sc.style.left=(W*.62)+'px'));
    timers.push(setTimeout(()=>{AUD.say('busschool');AUD.sfx('fanfare');burst(r,W*.72,by-200,['🎉','🍎','✨'],16);if(SAVE.busSt!==TODAY){SAVE.busSt=TODAY;save();stickerUp(r)}},2600));
    timers.push(setTimeout(()=>{const b=btn(r,'🏫',`left:${W/2-110}px;top:150px;width:220px;height:180px;font-size:120px;z-index:60`,()=>{AUD.say('school');go('school')});b.classList.add('pulse')},4500))}}};
SCR.bus.leave=()=>{bgEl.style.backgroundImage=''};

// ---- school with Teacher Amanda ----
SCR.school={bg:'school',show(r){AUD.music('home');sayQ(['s_hi']);const t=chr(r,FR.amanda.o,W*.14,H-20,440,'bob');tap(t,()=>{AUD.say('f_amanda');anim(t,'hop')});
  const z=chr(r,zoe(),W*.3,H-20,330,'bob');z.style.animationDelay='.3s';
  const acts=[['🎨','paint','s_paint'],['⭐','count','s_count'],['🎵','circle','s_circle'],['🍎','snack','s_snack']];
  acts.forEach(([e,k,v],i)=>{const b=btn(r,e,`left:${W*.45+(i%2)*250}px;top:${170+(i/2|0)*260}px;width:220px;height:220px;font-size:120px`,()=>{AUD.say(v);SCH[k](r)});b.classList.add('hub')})}};
function panel(r){r.innerHTML='';const back=btn(r,'🏫','',()=>go('school'));back.classList.add('back');stkEl=el('div',r);stkEl.id='stk';updStk();return r}
const SCH={
 paint(r){panel(r);const pw=W-360,ph=H-200;const cv=el('canvas',r,`position:absolute;left:250px;top:150px;width:${pw}px;height:${ph}px;inset:auto;border-radius:30px;background:#fff;box-shadow:0 10px 30px rgba(0,0,0,.2);touch-action:none`);
  const dpr=Math.min(2,devicePixelRatio||1);let g,k=1;const sz=()=>{const b=cv.getBoundingClientRect();cv.width=b.width*dpr;cv.height=b.height*dpr;k=cv.width/pw;g=cv.getContext('2d');g.lineCap='round';g.lineJoin='round'};setTimeout(sz,30);
  let col='#ff5fb4',size=26,dn=false,lp=null,strokes=0;
  const cols=['#ff5fb4','#ff6b6b','#ffb347','#ffe066','#57c785','#4aa8ff','#9b6bff','#6b4a2a'];
  cols.forEach((c,i)=>{const s=el('div',r,`left:${40+(i%2)*100}px;top:${150+(i/2|0)*105}px;background:${c}`);s.className='sw';tap(s,()=>{col=c;r.querySelectorAll('.sw').forEach(x=>x.classList.remove('sel'));s.classList.add('sel');AUD.sfx('pop')})});
  btn(r,'🌈',`left:${W-100}px;top:160px;width:90px;height:90px;font-size:54px`,()=>{col='rainbow';AUD.sfx('magic')});
  btn(r,'🧽',`left:${W-100}px;top:270px;width:90px;height:90px;font-size:54px`,()=>{g.clearRect(0,0,cv.width,cv.height);AUD.sfx('chime')});
  btn(r,'✅',`left:${W-100}px;top:${H-140}px;width:90px;height:90px;font-size:54px`,()=>{AUD.say('s_good');burst(r,W/2,H/2,['🌟','🎨','💖'],16);if(SAVE.paintSt!==TODAY&&strokes>3){SAVE.paintSt=TODAY;save();stickerUp(r)}});
  let hue=0;const pt=e=>{const b=cv.getBoundingClientRect();return[(e.clientX-b.left)/b.width*cv.width,(e.clientY-b.top)/b.height*cv.height]};
  cv.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();dn=true;lp=pt(e);strokes++;cv.setPointerCapture&&cv.setPointerCapture(e.pointerId)});
  cv.addEventListener('pointermove',e=>{if(!dn)return;const p=pt(e);g.strokeStyle=col==='rainbow'?`hsl(${hue=(hue+6)%360},90%,60%)`:col;g.lineWidth=size*k;g.beginPath();g.moveTo(lp[0],lp[1]);g.lineTo(p[0],p[1]);g.stroke();lp=p});
  ['pointerup','pointercancel','pointerleave'].forEach(n=>cv.addEventListener(n,()=>dn=false))},
 count(r){panel(r);const n=3+((Math.random()*8)|0);let c=0;const used=[];
  for(let i=0;i<n;i++){let x,y,tries=0;do{x=200+Math.random()*(W-400);y=180+Math.random()*(H-330);tries++}while(tries<60&&used.some(([a,b])=>Math.hypot(a-x,b-y)<150));used.push([x,y]);
   const s=el('div',r,`left:${x-60}px;top:${y-60}px;width:120px;height:120px;font-size:100px;text-align:center;line-height:120px;opacity:.55;filter:grayscale(.7)`,'⭐');s.className='item pulse';s.style.animationDelay=(i*.15)+'s';
   tap(s,()=>{if(s.dataset.c)return;s.dataset.c=1;c++;s.style.opacity=1;s.style.filter='';anim(s,'hop');AUD.say('n'+c);AUD.sfx('chime');el('div',r,`position:absolute;left:${x-20}px;top:${y+50}px;font-size:50px;color:#fff;-webkit-text-stroke:3px #c2378f;paint-order:stroke fill`,c);
    if(c===n)timers.push(setTimeout(()=>{AUD.say('s_good');AUD.sfx('fanfare');burst(r,W/2,H/2,['⭐','🌟','✨'],20);const b=btn(r,'🔁',`left:${W/2-100}px;top:${H-190}px;width:200px;height:150px;font-size:90px`,()=>SCH.count(r));b.classList.add('pulse');if(SAVE.countSt!==TODAY){SAVE.countSt=TODAY;save();stickerUp(r)}},900))})}},
 circle(r){panel(r);AUD.music('wheels');const ring=[['zoe',zoe()],['amanda',null],['kids',null]].concat(SAVE.party.slice(0,2).map(k=>[k,null]));
  ring.forEach(([k,o],i)=>{const x=W*.15+i*(W*.7/(ring.length-1)),y=H-60-(i%2)*30;const c=o?chr(r,o,x,y,300,'dance'):grpChr(r,k,x,y,k==='kids'?260:300,'dance');c.style.animationDelay=(i*.18)+'s'});
  const ks=dressedKits()[0];if(ks)kitChr(r,ks,W*.5,H-10,170,'dance');
  [['🥁','drum'],['🔔','bell'],['🪇','shaker'],['🎹','chime']].forEach(([e,s],i)=>btn(r,e,`left:${W/2-290+i*150}px;top:150px;width:130px;height:130px;font-size:80px`,()=>{AUD.sfx(s);burst(r,W/2-225+i*150,215,['🎵','🎶','✨'],5)}))},
 snack(r){panel(r);const z=chr(r,zoe(),W*.5,H-150,380,'bob');const fr=chr(r,FR.amanda.o,W*.2,H-20,420);const kd=grpChr(r,'kids',W*.8,H-20,320);let n=0;
  const tray=el('div',r,`position:absolute;left:${W/2-380}px;bottom:16px;width:760px;height:130px;border-radius:65px;background:rgba(255,255,255,.9);box-shadow:0 6px 16px rgba(0,0,0,.2);display:flex;justify-content:space-around;align-items:center;font-size:84px;z-index:20`);
  ['🍎','🍌','🧀','🥕','🍇','🥛'].forEach(f=>{const b=el('div',tray,'cursor:pointer;padding:0 6px',f);tap(b,()=>{const who=[z,fr,kd][n%3];AUD.sfx('yum');if(n%2===0)AUD.say('yum');anim(who,'hop');
    const rr=who.getBoundingClientRect(),sr=st.getBoundingClientRect(),k=sr.width/W;burst(r,(rr.left-sr.left+rr.width/2)/k,(rr.top-sr.top+rr.height*.3)/k,[f,'😋','💖'],8);n++;if(n===6){AUD.say('s_good');if(SAVE.snackSt!==TODAY){SAVE.snackSt=TODAY;save();stickerUp(r)}}})})}};
