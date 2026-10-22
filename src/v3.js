// ================= v3 polish: scene party, bus stops, castle decorating, pet the kitties =================
// Mommy and Daddy never share a scene: on any day only one of them comes along.
function sceneParty(){const p=SAVE.party.filter(k=>FR[k]);if(p.indexOf('mom')>=0&&p.indexOf('dad')>=0){const d=new Date().getDate()%2?'mom':'dad';return p.filter(k=>k!==d)}return p}
function busStops(){const fam=['dad','alex','mom'],p=sceneParty();const o=p.filter(k=>fam.indexOf(k)>=0).concat(p.filter(k=>fam.indexOf(k)<0));
  const s=o.slice(0,3).map(k=>({k:k}));['peach','rosa','elsa'].forEach(k=>{if(s.length<3&&o.indexOf(k)<0)s.push({k:k})});
  const dk=dressedKits()[0];if(dk&&s.length<4)s.push({kit:dk});return s}
// hellos when family shows up
(function(){['ball','tea'].forEach(k=>{const s=SCR[k].show;SCR[k].show=function(r){s.call(this,r);const p=sceneParty();const h=p.indexOf('dad')>=0?'dad_hi':p.indexOf('alex')>=0?'alex_hi':null;if(h)later(1800,()=>AUD.say(h))}})})();
// ---------- Castle decorating ----------
const DECO=['🛋️','🪑','🪴','🌷','🌻','🌈','⭐','🎀','🧸','🕯️','🦄','👑','🎈','🏰','💖','🐱'];const PORT=['zoe','peach','rosa','elsa','anna','alex'];
function decoHtml(e,s){if(e.indexOf('p:')===0){const k=e.slice(2),o=k==='zoe'?zoe():(FR[k]&&!FR[k].grp?FR[k].o:zoe());return `<div style="position:absolute;left:0;top:0;width:${s}px;height:${s*1.25}px;border-radius:14px;background:#fff6dc;border:${s*.09}px solid #e0a83a;box-shadow:0 4px 10px rgba(0,0,0,.25);overflow:hidden"><div style="position:absolute;left:${s*.1}px;top:${s*.02}px;width:${s*.62}px;height:${s*1.1}px">${person(o).replace('viewBox="0 0 200 330"','viewBox="30 0 140 200"')}</div></div>`}return `<div style="font-size:${s}px;line-height:${s*1.1}px">${e}</div>`}
SCR.deco={bg:'castle',show(r){AUD.music('home');AUD.say('deco');SAVE.deco=SAVE.deco||[];
  const room=el('div',r,`position:absolute;left:0;top:0;width:${W}px;height:${H}px`);let drag=null;
  function place(d){const s=d.e.indexOf('p:')===0?110:96;const n=el('div',room,`position:absolute;left:${d.x-s/2}px;top:${d.y-s/2}px;width:${s}px;height:${s}px;z-index:${10+(d.y/10|0)};cursor:pointer;touch-action:none`,decoHtml(d.e,s));n.querySelectorAll('svg').forEach(v=>v.style.cssText='width:100%;height:100%');n.d=d;
    n.addEventListener('pointerdown',ev=>{ev.preventDefault();ev.stopPropagation();const p=stagePt(ev);drag={n:n,ox:p[0]-d.x,oy:p[1]-d.y,mv:0};n.style.zIndex=90});return n}
  SAVE.deco.forEach(place);
  r.addEventListener('pointermove',ev=>{if(!drag)return;const p=stagePt(ev),d=drag.n.d;d.x=Math.max(50,Math.min(W-50,p[0]-drag.ox));d.y=Math.max(130,Math.min(H-200,p[1]-drag.oy));drag.mv++;const s=drag.n.offsetWidth;drag.n.style.left=(d.x-s/2)+'px';drag.n.style.top=(d.y-s/2)+'px'});
  r.addEventListener('pointerup',()=>{if(!drag)return;const n=drag.n;n.style.zIndex=10+(n.d.y/10|0);if(drag.mv<3){anim(n,'hop');AUD.sfx('chime')}else{AUD.sfx('pop');burst(r,n.d.x,n.d.y,['✨'],4)}drag=null;save()});
  // palette strip
  const pal=el('div',r,`position:absolute;left:20px;top:${H-170}px;width:${W-200}px;height:150px;border-radius:30px;background:rgba(255,255,255,.85);box-shadow:0 6px 16px rgba(0,0,0,.2);overflow-x:auto;overflow-y:hidden;-webkit-overflow-scrolling:touch;white-space:nowrap;z-index:95`);
  DECO.map(e=>e).concat(PORT.map(k=>'p:'+k)).forEach((e,i)=>{const b=el('div',pal,`position:relative;display:inline-block;vertical-align:top;margin:15px 8px;width:110px;height:120px;cursor:pointer`,decoHtml(e,e.indexOf('p:')===0?90:90));b.querySelectorAll('svg').forEach(v=>v.style.cssText='width:100%;height:100%');
    tap(b,()=>{if(SAVE.deco.length>=40){const old=SAVE.deco.shift();room.childNodes.forEach(c=>{if(c.d===old)c.remove()})}const d={e:e,x:W*.25+Math.random()*W*.5,y:H*.3+Math.random()*H*.3};SAVE.deco.push(d);save();const n=place(d);anim(n,'hop');AUD.sfx('magic');AUD.say('deco_put');if(SAVE.deco.length>=5&&SAVE.decoSt!==TODAY){SAVE.decoSt=TODAY;save();later(900,()=>stickerUp(r))}})});
  btn(r,'🧹',`left:${W-160}px;top:${H-170}px;width:130px;height:140px;font-size:70px;z-index:95`,()=>{SAVE.deco=[];save();room.innerHTML='';AUD.sfx('sparkle')});
  const z=chr(r,zoe(),W-110,H-190,240,'bob');z.style.zIndex=80;tap(z,()=>{anim(z,'spin');AUD.say('fl_zoe')})}};
// ---------- Pet the kitties ----------
SCR.pets={bg:'bedroom2',show(r){AUD.music('home');AUD.say('pets');let purrs=0,lastPurr=0;const ks=shuf(KITK).slice(0,3);
  ks.forEach((k,i)=>{const h=Math.min(330,H*.42),x=W*(.25+i*.25),y=H-60;const d=el('div',r,`position:absolute;left:${x-h*.385}px;top:${y-h}px;width:${h*.77}px;height:${h}px;cursor:pointer;touch-action:none;transition:transform .25s;transform-origin:50% 100%`,kitty(k,SAVE.kc[k]));d.querySelectorAll('svg').forEach(v=>v.style.cssText='width:100%;height:100%');d.className='bob';d.style.animationDelay=(i*.4)+'s';
    let down=null,rub=0,moved=0;
    d.addEventListener('pointerdown',ev=>{ev.preventDefault();down=stagePt(ev);moved=0});
    d.addEventListener('pointermove',ev=>{if(!down)return;const p=stagePt(ev);const dd=Math.hypot(p[0]-down[0],p[1]-down[1]);down=p;rub+=dd;moved+=dd;
      if(Math.random()<.25)burst(r,p[0],p[1],['💖','💕'],1);d.style.transform=`scale(1.04,${.96+Math.sin(rub/30)*.03})`;
      if(rub>420){rub=0;const t=Date.now();if(t-lastPurr>1900){lastPurr=t;AUD.say('purr');burst(r,x,y-h*.8,['💖','💗','✨'],8);if(++purrs===3)later(1900,()=>AUD.say('pets_love'));if(purrs===5&&SAVE.petsSt!==TODAY){SAVE.petsSt=TODAY;save();later(1200,()=>stickerUp(r))}}}});
    const up=()=>{if(down&&moved<15){AUD.say('meow1');anim(d,'hop');burst(r,x,y-h*.7,['🐾','💖'],5)}down=null;d.style.transform=''};['pointerup','pointercancel','pointerleave'].forEach(n=>d.addEventListener(n,up))});
  btn(r,'🧶',`left:${W-150}px;top:130px;width:120px;height:110px;font-size:64px;z-index:40`,()=>{const y=el('div',r,`position:absolute;left:${W*.1}px;top:${H*.4}px;font-size:80px;z-index:30;transition:left 1.6s ease-out,transform 1.6s`,'🧶');requestAnimationFrame(()=>requestAnimationFrame(()=>{y.style.left=(W*.8)+'px';y.style.transform='rotate(720deg)'}));AUD.say('meow1');setTimeout(()=>y.remove(),2200)});
  btn(r,'🐟',`left:${W-150}px;top:260px;width:120px;height:110px;font-size:64px;z-index:40`,()=>{AUD.sfx('chime');AUD.say('meow1');burst(r,W/2,H*.5,['🐟','💖'],8)})}};

// ---------- real recorded animal sounds (CC0/PD, see CREDITS.md) ----------
const MEOWS=['meow1','meow2','meow3','meow4','meow5'];
(function(){const _say=AUD.say,_sfx=AUD.sfx;
  AUD.sfx=function(k){if(k==='meow')return AUD.rec(pick(MEOWS));if(k==='neigh')return AUD.rec('a_horse');return _sfx(k)};
  AUD.say=function(k,t){if(k==='meow1')return AUD.rec(pick(MEOWS));if(k==='purr')return AUD.rec('purr');
    if(k==='kitmeow'||k==='found'){AUD.rec(pick(MEOWS));setTimeout(()=>_say(k),1100);return}
    if(k==='duck'){AUD.rec('a_duck');setTimeout(()=>_say(k),1500);return}
    return _say(k,t)}})();


// ---------- Animal Sounds (farm) ----------
const ANI=[['cat','🐱','meow'],['dog','🐶','a_dog'],['cow','🐮','a_cow'],['horse','🐴','a_horse'],['duck','🦆','a_duck'],['sheep','🐑','a_sheep'],['pig','🐷','a_pig'],['rooster','🐓','a_rooster'],['owl','🦉','a_owl'],['frog','🐸','a_frog']];
function aniPlay(a){if(a[2]==='meow')AUD.rec(pick(MEOWS));else AUD.rec(a[2])}
SCR.farm={bg:'stable',show(r){AUD.music('home');let streak=0,ans=null,busyF=false,prev=null;
  const free=!!ARG.farmFree;
  btn(r,free?'🎯':'🎹',`left:${W-150}px;top:130px;width:120px;height:110px;font-size:64px;z-index:40`,()=>{ARG.farmFree=!free;go('farm')});
  if(free){AUD.say('an_free');const cols=5,bw=Math.min(190,(W-200)/cols-24);ANI.forEach((a,i)=>{const b=btn(r,a[1],`left:${(W-cols*(bw+24))/2+(i%cols)*(bw+24)}px;top:${H*.22+(i/cols|0)*(bw+40)}px;width:${bw}px;height:${bw}px;font-size:${bw*.62|0}px`,()=>{aniPlay(a);anim(b,'hop');burst(r,W/2,H*.5,['🎵','💖'],4);setTimeout(()=>AUD.say('an_'+a[0]),1700)})});return}
  const stars=el('div',r,`position:absolute;left:${W/2-200}px;top:120px;width:400px;height:70px;text-align:center;font-size:52px`,'');
  const sp=btn(r,'🔊',`left:${W/2-90}px;top:${H*.24}px;width:180px;height:140px;font-size:84px;z-index:40`,()=>{if(ans){aniPlay(ans);anim(sp,'hop')}});
  let tiles=[];
  function round(){busyF=false;tiles.forEach(t=>t.remove());tiles=[];
    do{ans=pick(ANI)}while(ans===prev);prev=ans;const ch=shuf([ans].concat(shuf(ANI.filter(a=>a!==ans)).slice(0,2)));
    const bw=Math.min(260,(W-160)/3-50,H*.36);
    ch.forEach((a,i)=>{const b=btn(r,a[1],`left:${W/2+(i-1)*(bw+50)-bw/2}px;top:${H*.24+170}px;width:${bw}px;height:${bw}px;font-size:${bw*.66|0}px`,()=>{if(busyF)return;
      if(a===ans){busyF=true;streak++;stars.innerHTML='⭐'.repeat(Math.min(streak,6));AUD.sfx('chime');aniPlay(a);burst(r,W/2,H*.6,['⭐','💖','✨'],14);anim(b,'spin');
        setTimeout(()=>AUD.say('an_'+a[0]),1500);if(streak%5===0&&SAVE.farmSt!==TODAY+streak){SAVE.farmSt=TODAY+streak;save();later(3400,()=>stickerUp(r))}later(streak%5===0?6200:4200,round)}
      else{aniPlay(a);anim(b,'wob');burst(r,W/2,H*.6,['🎵'],3)}});tiles.push(b)});
    AUD.say('an_q');later(1700,()=>aniPlay(ans))}
  later(600,round)}};

// ---------- Words tracing ----------
const WDS=[['Mom','👩'],['Dad','👨'],['Alex','👦'],['dog','🐶'],['cat','🐱'],['sun','☀️'],['hat','👒'],['bus','🚌'],['cow','🐮'],['pig','🐷'],['red','🔴'],['bed','🛏️'],['cup','🥤'],['star','⭐'],['love','❤️']];
SAVE.wd=SAVE.wd||{};
SCR.words={bg:'school',show(r){AUD.music('home');AUD.say('words');const cols=5,bw=Math.min(170,(W-220)/cols-24,(H-200)/3-60);
  WDS.forEach(([w,e],i)=>{const d=SAVE.wd[w];btn(r,`<span>${e}</span><i style="position:absolute;left:0;width:100%;bottom:2px;text-align:center;font-size:${bw*.2|0}px;font-style:normal;color:#b03a8a">${w.toUpperCase()}</i>${d?'<i style="position:absolute;right:-6px;top:-10px;font-size:40px;font-style:normal">⭐</i>':''}`,`left:${(W-cols*(bw+24))/2+(i%cols)*(bw+24)}px;top:${140+(i/cols|0)*(bw+40)}px;width:${bw}px;height:${bw}px;font-size:${bw*.5|0}px;${d?'background:linear-gradient(#fff6c9,#d9ffe0)':''}`,()=>{ARG.w=i;AUD.say('wd_'+w.toLowerCase());go('tw')})});
  btn(r,'✍️',`left:30px;top:${H-150}px;width:120px;height:110px;font-size:60px`,()=>go('name'));btn(r,'🔤',`left:${W-150}px;top:${H-150}px;width:120px;height:110px;font-size:60px`,()=>go('abc'))}};
SCR.tw={bg:'school',show(r){AUD.music('home');const [w,e]=WDS[ARG.w||0];const g=w.toUpperCase().split('');
  el('div',r,`position:absolute;left:${W/2-400}px;top:110px;width:800px;height:${H-140}px;border-radius:40px;background:rgba(255,255,255,.85)`);
  const pic=el('div',r,`position:absolute;left:${W/2-90}px;top:112px;width:180px;height:150px;font-size:120px;text-align:center;line-height:150px`,e);tap(pic,()=>{AUD.say('wd_'+w.toLowerCase());anim(pic,'hop')});
  sayQ(['wd_'+w.toLowerCase(),'wd_go'],400);
  tracer(r,g,{x:W/2-360,y:290,w:720,h:Math.min(250,H-360)},{gap:36,pause:1100,glyph(i,ch){AUD.say('ln_'+ch);anim(pic,'hop')},done(){
    g.forEach((c,i)=>later(300+i*800,()=>AUD.say('ln_'+c)));later(500+g.length*800,()=>{AUD.say('wd_'+w.toLowerCase());anim(pic,'spin')});
    later(1700+g.length*800,()=>{AUD.say('wd_yay');confetti(r,40);const first=!SAVE.wd[w];SAVE.wd[w]=1;save();if(first)later(1800,()=>stickerUp(r));
      later(3600,()=>{btn(r,'📝',`left:${W/2-230}px;top:${H-170}px;width:200px;height:140px;font-size:84px;z-index:60`,()=>go('words'));btn(r,'➡️',`left:${W/2+30}px;top:${H-170}px;width:200px;height:140px;font-size:84px;z-index:60`,()=>{ARG.w=((ARG.w||0)+1)%WDS.length;go('tw')})})})}})}};
// full name: ZOE then WILSON
SCR.fullname={bg:'bedroom2',show(r){AUD.music('home');AUD.say('fullname');
  el('div',r,`position:absolute;left:${W/2-420}px;top:110px;width:840px;height:${H-140}px;border-radius:40px;background:rgba(255,255,255,.85)`);
  const z=chr(r,zoe(),W*.08,H-20,260,'bob');const bh=Math.min(220,(H-200)/2-20);
  tracer(r,['Z','O','E'],{x:W/2-200,y:130,w:400,h:bh},{gap:30,pause:1100,glyph(i,ch){AUD.say('ln_'+ch);anim(z,'hop')},done(){later(700,()=>{
    tracer(r,'WILSON'.split(''),{x:W/2-380,y:150+bh,w:760,h:bh},{gap:24,pause:1100,glyph(i,ch){AUD.say('ln_'+ch);anim(z,'hop')},done(){later(700,()=>{AUD.say('fn_yay');confetti(r,60);anim(z,'spin');
      const first=!SAVE.fullSt;SAVE.fullSt=1;save();if(first||SAVE.fullDay!==TODAY){SAVE.fullDay=TODAY;save();later(3000,()=>stickerUp(r))}
      later(4600,()=>{btn(r,'🔁',`left:${W/2-230}px;top:${H-170}px;width:200px;height:140px;font-size:84px;z-index:60`,()=>go('fullname'));btn(r,'📝',`left:${W/2+30}px;top:${H-170}px;width:200px;height:140px;font-size:84px;z-index:60`,()=>go('words'))})})}})})}})}};
// links: Words from Letters & Numbers and from the name screen
(function(){const a=SCR.abc.show;SCR.abc.show=function(r){a.call(this,r);const b=btn(r,'📝',`left:${W-170}px;top:130px;width:140px;height:130px;font-size:74px;z-index:40`,()=>{AUD.say('words');go('words')});b.classList.add('hub')};
  const n=SCR.name.show;SCR.name.show=function(r){n.call(this,r);btn(r,'📝',`left:${W-190}px;top:280px;width:160px;height:110px;font-size:60px;z-index:40`,()=>go('words'));btn(r,'<span style="font-size:30px;line-height:1">ZOE<br>WILSON</span>',`left:${W-190}px;top:410px;width:160px;height:110px;z-index:40`,()=>go('fullname'))}})();
