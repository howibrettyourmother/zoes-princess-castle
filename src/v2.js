// ================= v2: bedroom, letters & numbers, name tracing, school sign-in, new rooms, mini-games =================
const ctr=e=>{const a=e.getBoundingClientRect(),b=st.getBoundingClientRect(),k=b.width/W;return[(a.left-b.left+a.width/2)/k,(a.top-b.top+a.height/2)/k]};
const cheer=()=>AUD.say('ch'+(1+(Math.random()*4|0)));
const daily=(r,key)=>{if(SAVE[key]!==TODAY){SAVE[key]=TODAY;save();stickerUp(r);return true}return false};
const pick=a=>a[(Math.random()*a.length)|0];
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=(Math.random()*(i+1))|0;const t=a[i];a[i]=a[j];a[j]=t}return a};
const later=(ms,f)=>timers.push(setTimeout(()=>{if(cur)f()},ms));
const ARG={};
// sticker album: remember which room each sticker came from
const ROOM_E={bday:'🎂',ride:'🦄',race:'🏇',bus:'🚌',school:'🏫',kitty:'🐱',ball:'💃',tea:'🫖',dress:'👗',bed:'🛏️',friends:'💌',bath:'🛁',stable:'🐴',garden:'🌷',abc:'🔤',name:'✍️',hide:'🙈',catch:'❄️',mem:'🃏',balloon:'🎈',album:'📒',farm:'🐮',words:'📝',fullname:'✍️',deco:'🖼️',pets:'😻',tl:'🔤',tn:'🔢',num:'🔢',find:'🔍',song:'🎵',pattern:'📿',cnt:'🧁',opp:'🔄'};
const _stickerUp=stickerUp;stickerUp=function(p){SAVE.alb=SAVE.alb||[];SAVE.alb.push(ROOM_E[cur]||'🌟');if(SAVE.alb.length>120)SAVE.alb.shift();_stickerUp(p)};
// say a color name when any color swatch is tapped (dress-up, kitty dress-up, painting)
const CREF=[['c_pink',255,143,200],['c_pink',255,95,180],['c_purple',178,141,255],['c_purple',155,107,255],['c_blue',127,214,232],['c_blue',74,168,255],['c_blue',108,198,255],['c_yellow',255,211,77],['c_yellow',255,224,102],['c_yellow',255,213,96],['c_red',255,107,107],['c_green',126,224,138],['c_green',87,199,133],['c_white',255,255,255],['c_navy',63,111,181],['c_orange',255,179,71],['c_orange',200,87,42],['c_brown',122,74,42],['c_brown',107,74,42],['c_black',42,26,18]];
function colorClip(css){const m=/rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(css||'');if(!m)return null;const r=+m[1],g=+m[2],b=+m[3];let best=null,bd=1e9;CREF.forEach(c=>{const d=(c[1]-r)*(c[1]-r)+(c[2]-g)*(c[2]-g)+(c[3]-b)*(c[3]-b);if(d<bd){bd=d;best=c[0]}});return best}
const HEXC={'#ff8fc8':'c_pink','#b28dff':'c_purple','#7fd6e8':'c_blue','#6cc6ff':'c_blue','#ffd34d':'c_yellow','#ff6b6b':'c_red','#7ee08a':'c_green','#ffffff':'c_white','#fff':'c_white','#3f6fb5':'c_navy','#ffb347':'c_orange',rainbow:'c_rainbow'};
addEventListener('pointerdown',ev=>{const t=ev.target;if(!t||!t.classList||!t.classList.contains('sw'))return;const k=colorClip(getComputedStyle(t).backgroundColor);if(k)setTimeout(()=>AUD.say(k),60)},true);

// ---------- glyph strokes for tracing (box 100 wide x 140 tall) ----------
const Ls=(a,b,c,d)=>{const n=Math.max(2,Math.ceil(Math.hypot(c-a,d-b)/5)),p=[];for(let i=0;i<=n;i++)p.push([a+(c-a)*i/n,b+(d-b)*i/n]);return p};
const As=(cx,cy,rx,ry,a0,a1)=>{const n=Math.max(4,Math.ceil(Math.abs(a1-a0)/6)),p=[];for(let i=0;i<=n;i++){const a=(a0+(a1-a0)*i/n)*Math.PI/180;p.push([cx+rx*Math.cos(a),cy+ry*Math.sin(a)])}return p};
const Jn=function(){const s=[].slice.call(arguments);return s.reduce((a,b)=>a.concat(a.length?b.slice(1):b),[])};
const GL={A:[Ls(50,0,6,140),Ls(50,0,94,140),Ls(24,90,76,90)],B:[Ls(12,0,12,140),Jn(Ls(12,0,52,0),As(52,35,35,35,-90,90),Ls(52,70,12,70)),Jn(Ls(12,70,56,70),As(56,105,35,35,-90,90),Ls(56,140,12,140))],
 C:[As(55,70,45,70,-40,-320)],D:[Ls(12,0,12,140),Jn(Ls(12,0,40,0),As(40,70,50,70,-90,90),Ls(40,140,12,140))],E:[Jn(Ls(88,0,12,0),Ls(12,0,12,140),Ls(12,140,88,140)),Ls(12,70,72,70)],
 F:[Jn(Ls(88,0,12,0),Ls(12,0,12,140)),Ls(12,70,72,70)],G:[Jn(As(55,70,45,70,-40,-360),Ls(100,70,62,70))],H:[Ls(12,0,12,140),Ls(88,0,88,140),Ls(12,70,88,70)],
 I:[Ls(50,0,50,140),Ls(22,0,78,0),Ls(22,140,78,140)],J:[Jn(Ls(72,0,72,100),As(44,100,28,40,0,180))],K:[Ls(14,0,14,140),Ls(88,0,14,82),Ls(38,62,90,140)],L:[Jn(Ls(14,0,14,140),Ls(14,140,86,140))],
 M:[Jn(Ls(6,140,6,0),Ls(6,0,50,84),Ls(50,84,94,0),Ls(94,0,94,140))],N:[Jn(Ls(12,140,12,0),Ls(12,0,88,140),Ls(88,140,88,0))],O:[As(50,70,44,70,-90,-450)],
 P:[Ls(14,0,14,140),Jn(Ls(14,0,54,0),As(54,37,37,37,-90,90),Ls(54,74,14,74))],Q:[As(50,70,44,70,-90,-450),Ls(60,104,96,142)],R:[Ls(14,0,14,140),Jn(Ls(14,0,54,0),As(54,37,37,37,-90,90),Ls(54,74,14,74)),Ls(46,74,90,140)],
 S:[Jn(As(50,35,40,35,-30,-270),As(50,105,40,35,-90,150))],T:[Ls(6,0,94,0),Ls(50,0,50,140)],U:[Jn(Ls(12,0,12,90),As(50,90,38,50,180,0),Ls(88,90,88,0))],V:[Jn(Ls(6,0,50,140),Ls(50,140,94,0))],
 W:[Jn(Ls(2,0,26,140),Ls(26,140,50,44),Ls(50,44,74,140),Ls(74,140,98,0))],X:[Ls(12,0,88,140),Ls(88,0,12,140)],Y:[Ls(10,0,50,70),Jn(Ls(90,0,50,70),Ls(50,70,50,140))],Z:[Jn(Ls(12,0,88,0),Ls(88,0,12,140),Ls(12,140,88,140))],
 o:[As(50,105,32,35,-60,-420)],e:[Jn(Ls(18,105,82,105),As(50,105,32,35,0,-300))],
 '0':[As(50,70,40,70,-90,-450)],'1':[Jn(Ls(28,26,54,0),Ls(54,0,54,140))],'2':[Jn(As(50,40,38,38,-170,30),Ls(83,59,12,140),Ls(12,140,90,140))],'3':[Jn(As(50,35,35,35,-160,90),As(50,105,35,35,-90,160))],
 '4':[Jn(Ls(70,140,70,0),Ls(70,0,6,96),Ls(6,96,94,96))],'5':[Jn(Ls(84,0,22,0),Ls(22,0,20,58),As(50,95,40,45,-125,150))],'6':[Jn(Ls(74,2,24,86),As(52,100,30,40,180,540))],
 '7':[Jn(Ls(10,0,90,0),Ls(90,0,36,140))],'8':[As(50,35,30,35,-90,-450),As(50,105,38,35,-90,270)],'9':[Jn(As(50,40,35,40,0,-360),Ls(85,40,80,140))]};
// tracer: traces glyphs one after another with dashed guides, start dots, arrows and a sparkle trail
function tracer(r,glyphs,box,o){o=o||{};const n=glyphs.length,gap=o.gap||30;const s=Math.min(box.h/140,(box.w-gap*(n-1))/(n*100));const tw=n*100*s+gap*(n-1);let gx=box.x+(box.w-tw)/2;const gy=box.y+(box.h-140*s)/2;
  const NS='http://www.w3.org/2000/svg';const svg=document.createElementNS(NS,'svg');svg.setAttribute('viewBox',`0 0 ${W} ${H}`);svg.style.cssText=`position:absolute;left:0;top:0;width:${W}px;height:${H}px;pointer-events:none;z-index:20;overflow:visible`;r.appendChild(svg);
  const mk=(t,a)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);svg.appendChild(e);return e};
  const G=glyphs.map((ch,i)=>{const ox=gx+i*(100*s+gap);const strokes=(GL[ch]||[]).map(pts=>pts.map(([x,y])=>[ox+x*s,gy+y*s]));return{ch,strokes}});
  const d=pts=>'M'+pts.map(p=>p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' L');
  const lw=Math.max(16,22*s),col=o.color||'#ff5fb4';
  G.forEach(g=>g.strokes.forEach(pts=>{mk('path',{d:d(pts),fill:'none',stroke:'rgba(255,255,255,.85)','stroke-width':lw*2.1,'stroke-linecap':'round','stroke-linejoin':'round'});mk('path',{d:d(pts),fill:'none',stroke:o.dash||'#c9a0d8','stroke-width':Math.max(4,5*s),'stroke-dasharray':`${10*s} ${10*s}`,'stroke-linecap':'round'})}));
  let gi=0,si=0,idx=0,prog=null,startDot=null,arrow=null,done=false,lastMove=Date.now();
  const star=el('div',r,`position:absolute;width:90px;height:90px;margin:-45px 0 0 -45px;font-size:70px;line-height:90px;text-align:center;z-index:25;pointer-events:none`,'⭐');star.className='pulse';
  function setup(){if(gi>=G.length){done=true;star.style.display='none';if(o.done)o.done();return}const pts=G[gi].strokes[si];idx=0;
    prog=mk('path',{d:'',fill:'none',stroke:col,'stroke-width':lw,'stroke-linecap':'round','stroke-linejoin':'round'});
    if(startDot)startDot.remove();if(arrow)arrow.remove();startDot=mk('circle',{cx:pts[0][0],cy:pts[0][1],r:lw*.75,fill:'#3ccf6e',stroke:'#fff','stroke-width':4});
    const a=pts[Math.min(3,pts.length-1)],b=pts[0],ang=Math.atan2(a[1]-b[1],a[0]-b[0])*180/Math.PI,ax=b[0]+Math.cos(ang*Math.PI/180)*lw*1.9,ay=b[1]+Math.sin(ang*Math.PI/180)*lw*1.9;
    arrow=mk('path',{d:`M${-lw*.5} ${-lw*.55} L${lw*.6} 0 L${-lw*.5} ${lw*.55}Z`,fill:'#3ccf6e',transform:`translate(${ax} ${ay}) rotate(${ang})`});placeStar()}
  function placeStar(){const pts=G[gi].strokes[si],p=pts[Math.min(idx,pts.length-1)];star.style.left=p[0]+'px';star.style.top=p[1]+'px'}
  const R0=Math.max(46,40*s);let dn=false,lt=0;
  function mv(x,y){if(done)return;const pts=G[gi].strokes[si];let best=-1;for(let j=idx;j<Math.min(pts.length,idx+9);j++){if(Math.hypot(pts[j][0]-x,pts[j][1]-y)<R0)best=j}
    if(best>=0){idx=best+1;lastMove=Date.now();prog.setAttribute('d',d(pts.slice(0,Math.max(2,idx))));if(startDot){startDot.remove();startDot=null;arrow.remove();arrow=null}
      if(idx>=pts.length-1){prog.setAttribute('d',d(pts));AUD.sfx('chime');si++;if(si>=G[gi].strokes.length){const ch=G[gi].ch;burst(r,x,y,['✨','💖','⭐'],8);si=0;gi++;if(o.glyph)o.glyph(gi-1,ch);if(gi<G.length){star.style.display='none';later(o.pause||900,()=>{star.style.display='';setup()})}else setup()}else setup()}else placeStar()}}
  const area=el('div',r,`position:absolute;left:0;top:0;width:${W}px;height:${H}px;z-index:19;touch-action:none`);
  area.addEventListener('pointerdown',e=>{e.preventDefault();dn=true;const p=stagePt(e);mv(p[0],p[1])});
  area.addEventListener('pointermove',e=>{if(!dn)return;const p=stagePt(e);mv(p[0],p[1]);const t=Date.now();if(t-lt>45){lt=t;const f=el('div',r,`left:${p[0]-20}px;top:${p[1]-24}px`,pick(['✨','⭐','💖','✨']));f.className='trail';setTimeout(()=>f.remove(),800)}});
  ['pointerup','pointercancel'].forEach(n=>area.addEventListener(n,()=>dn=false));
  timers.push(setInterval(()=>{if(!done&&Date.now()-lastMove>5000){lastMove=Date.now();anim(star,'hop');AUD.sfx('sparkle')}},1000));
  setup();return{svg,area,star,mv}}
const confetti=(r,n)=>{for(let i=0;i<(n||40);i++){const f=el('div',r,`position:absolute;left:${Math.random()*W}px;top:-60px;font-size:${34+Math.random()*30}px;z-index:90;pointer-events:none;transition:transform ${2+Math.random()*1.5}s ease-in`,pick(['🎊','🎉','✨','💖','⭐','👑','🌸']));requestAnimationFrame(()=>requestAnimationFrame(()=>{f.style.transform=`translate(${Math.random()*200-100}px,${H+120}px) rotate(${Math.random()*720}deg)`}));setTimeout(()=>f.remove(),4000)}};
const again=(r,k,y)=>later(1600,()=>{const a=btn(r,'🔁',`left:${W/2-230}px;top:${y||H-180}px;width:200px;height:150px;font-size:90px;z-index:60`,()=>go(k));a.classList.add('pulse');btn(r,'🏰',`left:${W/2+30}px;top:${y||H-180}px;width:200px;height:150px;font-size:90px;z-index:60`,()=>go('hub'))});
function nameSign(p,x,y,w){const h=w*.42;const d=el('div',p,`position:absolute;left:${x-w/2}px;top:${y-h/2}px;width:${w}px;height:${h}px;border-radius:${h/2}px;background:linear-gradient(#fff4fb,#ffd1ea);border:6px solid #ffd34d;box-shadow:0 6px 12px rgba(0,0,0,.2);text-align:center;line-height:${h-12}px;font-size:${h*.62}px;color:#e0408f;z-index:12;cursor:pointer`,SAVE.nameSign?(SAVE.nameStyle==='Zoe'?'Zoe':'ZOE'):'✍️');
  el('div',d,`position:absolute;left:${w/2-h*.3}px;top:${-h*.55}px;font-size:${h*.5}px;line-height:1`,'👑');tap(d,()=>{if(SAVE.nameSign){AUD.say('fl_zoe');anim(d,'hop')}else go('name')});return d}

// ---------- hub: 18 rooms ----------
SCR.hub.show=function(r){AUD.music('home');
  const z=chr(r,zoe(),W*.1,H-40,330,'bob');let zt=0;tap(z,()=>{anim(z,'spin');AUD.sfx('magic');if(++zt%5===0){AUD.say('hizoe');confetti(r,20)}});
  if(SAVE.nameSign)nameSign(r,W*.1,H-420,150);
  const items=[['🛏️','bed','bed'],['🔤','abc','abc'],['✍️','name','nm_go'],['🎂','bday','bd'],['🦄','ride','ride'],['🏇','race','race'],
    ['🚌','bus','bus'],['🏫','school','school'],['🛁','bath','bath'],['🐴','stable','stb'],['🐮','farm','farm'],['🌷','garden','gdn'],['🐱','kitty','kit'],
    ['💃','ball','ball'],['🫖','tea','tea'],['👗','dress','dress'],['💌','friends','friends'],['🙈','hide','hide'],['📒','album','album'],['🖼️','deco','deco'],['😻','pets','pets']];
  const cols=items.length>18?7:6,x0=Math.max(W*.2,W-40-cols*150-(cols-1)*16),tw=W-30-x0,gx=14,bw=Math.min(150,(tw-(cols-1)*gx)/cols),bh=Math.min(160,bw*1.07),gy=18,y0=Math.max(140,(H-(3*bh+2*gy))/2+40),x1=x0+(tw-(cols*bw+(cols-1)*gx))/2;
  items.forEach(([e,k,v],i)=>{const b=btn(r,e,`left:${x1+(i%cols)*(bw+gx)}px;top:${y0+(i/cols|0)*(bh+gy)}px`,()=>{AUD.say(v);go(k)});b.classList.add('hub');b.style.width=bw+'px';b.style.height=bh+'px';b.style.fontSize=(bw*.6|0)+'px';b.dataset.k=k;const lb=document.createElement('i');lb.className='lbl';lb.textContent={bed:'Bedroom',abc:'ABC & 123',name:'Write Name',bday:'Birthday',ride:'Unicorn Ride',race:'Race',bus:'Bus',school:'School',bath:'Bath',stable:'Stable',farm:'Animal Sounds',garden:'Garden',kitty:'Kitty Dress-Up',ball:'Ballroom',tea:'Tea Party',dress:'Dress Up',friends:'Friends',hide:'Hide & Seek',album:'Sticker Book',deco:'Decorate',pets:'Pet Kitties'}[k]||'';lb.style.fontSize=Math.max(15,bw*.13|0)+'px';b.style.paddingBottom=(bw*.14|0)+'px';b.appendChild(lb);
    if(k==='bday'&&!(SAVE.bd&&SAVE.bd.day===TODAY&&SAVE.bd.open.length===3))b.classList.add('pulse');if(k==='name'&&!SAVE.nameSign)b.classList.add('pulse')});
  // easter egg: a kitty peeks out from a random spot
  const spots=[[W*.25,H-60],[W-90,H-50],[x1+bw*3,y0-60]],sp=pick(spots);const pk=el('div',r,`position:absolute;left:${sp[0]-50}px;top:${sp[1]-60}px;width:100px;height:90px;z-index:15;cursor:pointer`,kitty(SAVE.kitSel||'doodle',{}).replace('viewBox="0 0 200 260"','viewBox="30 20 140 125"'));pk.firstChild.style.cssText='width:100%;height:100%';pk.className='bob';
  tap(pk,()=>{AUD.sfx('meow');anim(pk,'hop');burst(r,sp[0],sp[1]-40,['💖','🐾'],6);if(SAVE.peekSt!==TODAY){SAVE.peekSt=TODAY;save();later(800,()=>stickerUp(r))}});
  const m=btn(r,AUD.muted?'🔇':'🔊','left:24px;top:22px;width:110px;height:100px;font-size:56px',()=>{m.innerHTML=AUD.toggle()?'🔇':'🔊'})};

// ---------- Letters & Numbers room ----------
const LETW={A:'🍎',B:'⚽',C:'🐱',D:'🐶',E:'🥚',F:'🐟',G:'🐐',H:'🎩',I:'🐛',J:'🧃',K:'🔑',L:'🦁',M:'🌙',N:'👃',O:'🐙',P:'🐷',Q:'👸',R:'🌈',S:'☀️',T:'🐯',U:'☂️',V:'🎻',W:'🐳',X:'📦',Y:'🧶',Z:'🦓'};
const ABC='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');SAVE.lm=SAVE.lm||{};SAVE.nm=SAVE.nm||{};
SCR.abc={bg:'school',show(r){AUD.music('home');
  const z=chr(r,zoe(),W*.12,H-30,330,'bob');tap(z,()=>{AUD.say('fl_zoe');anim(z,'hop')});
  const acts=[['✍️','name','nm_go'],['🔤','ltr','trace'],['🔢','num','count'],['🔍','find','findl'],['🧁','cnt','count5'],['🎵','song','abcsong'],['📿','pattern','pattern'],['🔄','opp','opp']];
  const cols=4,bw=Math.min(190,(W-W*.26-60)/cols-20);acts.forEach(([e,k,v],i)=>{const b=btn(r,e,`left:${W*.26+(i%cols)*(bw+20)}px;top:${170+(i/cols|0)*(bw+36)}px;width:${bw}px;height:${bw}px;font-size:${bw*.55|0}px`,()=>{AUD.say(v);go(k)});b.classList.add('hub');if(k==='name')b.classList.add('pulse')});
  const nL=Object.keys(SAVE.lm).length,nN=Object.keys(SAVE.nm).length;el('div',r,`position:absolute;left:${W*.26}px;top:${170+2*(bw+36)}px;font-size:44px;padding:6px 24px;border-radius:30px;background:rgba(255,255,255,.85);color:#b03a8a`,`🔤 ${nL}/26 &nbsp; 🔢 ${nN}/10 &nbsp; ${SAVE.nameSign?'✍️ ✅':''}`)}};
SCR.ltr={bg:'school',show(r){const cols=9,cw=Math.min(110,(W-260)/cols-10);ABC.forEach((c,i)=>{const m=SAVE.lm[c];btn(r,`<span>${c}</span>${m?'<i style="position:absolute;right:-6px;top:-10px;font-size:34px;font-style:normal">⭐</i>':''}`,`left:${(W-cols*(cw+10))/2+(i%cols)*(cw+10)}px;top:${150+(i/cols|0)*(cw+24)}px;width:${cw}px;height:${cw}px;font-size:${cw*.66|0}px;${'ZOE'.indexOf(c)>=0?'background:linear-gradient(#fff6c9,#ffd9f0)':''}`,()=>{ARG.l=c;AUD.say('ln_'+c);go('tl')})});
  btn(r,'🔤',`left:${W-150}px;top:${H-150}px;width:120px;height:110px;font-size:60px`,()=>go('abc'))}};
SCR.tl={bg:'school',show(r){const c=ARG.l||'A';const i=ABC.indexOf(c);AUD.music('home');sayQ(['ln_'+c,'trace'],1100);
  el('div',r,`position:absolute;left:${W/2-260}px;top:110px;width:520px;height:${H-140}px;border-radius:40px;background:rgba(255,255,255,.75)`);
  const pic=el('div',r,`position:absolute;left:${W/2+290}px;top:${H/2-90}px;font-size:150px;opacity:.25;transition:opacity .5s,transform .5s;cursor:pointer;z-index:30`,LETW[c]);
  el('div',r,`position:absolute;left:${W/2-480}px;top:${H/2-110}px;width:200px;text-align:center;font-size:150px;color:#fff;-webkit-text-stroke:5px #b03a8a;paint-order:stroke fill`,c+'<span style="font-size:100px">'+c.toLowerCase()+'</span>');
  tracer(r,[c],{x:W/2-230,y:140,w:460,h:H-200},{glyph(){AUD.say('ln_'+c)},done(){SAVE.lm[c]=(SAVE.lm[c]||0)+1;save();later(900,()=>AUD.say('lf_'+c));pic.style.opacity=1;pic.style.transform='scale(1.4)';confetti(r,16);
    later(500,()=>daily(r,'ltrSt'));
    later(3500,()=>{const nx=ABC[(i+1)%26];btn(r,'▶️',`left:${W-200}px;top:${H-180}px;width:160px;height:140px;font-size:80px;z-index:60`,()=>{ARG.l=nx;AUD.say('ln_'+nx);go('tl')}).classList.add('pulse');btn(r,'🔁',`left:${W-380}px;top:${H-180}px;width:160px;height:140px;font-size:80px;z-index:60`,()=>go('tl'))})}});
  tap(pic,()=>AUD.say('lf_'+c));btn(r,'🔤',`left:24px;top:140px;width:120px;height:110px;font-size:60px;z-index:50`,()=>go('ltr'))}};
SCR.num={bg:'school',show(r){const cw=Math.min(150,(W-200)/5-20);for(let n=1;n<=10;n++){const i=n-1,m=SAVE.nm[n];btn(r,`${n}${m?'<i style="position:absolute;right:-6px;top:-10px;font-size:34px;font-style:normal">⭐</i>':''}`,`left:${(W-5*(cw+20))/2+(i%5)*(cw+20)}px;top:${170+(i/5|0)*(cw+40)}px;width:${cw}px;height:${cw}px;font-size:${cw*.6|0}px`,()=>{ARG.n=n;AUD.say('n'+n);go('tn')})}
  btn(r,'🔤',`left:${W-150}px;top:${H-150}px;width:120px;height:110px;font-size:60px`,()=>go('abc'))}};
SCR.tn={bg:'school',show(r){const n=ARG.n||1;sayQ(['n'+n,'trace'],1000);el('div',r,`position:absolute;left:${W/2-300}px;top:110px;width:600px;height:${H-140}px;border-radius:40px;background:rgba(255,255,255,.75)`);
  const tr=tracer(r,String(n).split(''),{x:W/2-260,y:140,w:520,h:H-200},{done(){SAVE.nm[n]=1;save();AUD.say('n'+n);burst(r,W/2,H/2,['⭐','✨'],12);later(1400,()=>{tr.svg.style.opacity=.15;countThings(r,n,()=>{daily(r,'numSt');
    later(2500,()=>{btn(r,'▶️',`left:${W-200}px;top:${H-180}px;width:160px;height:140px;font-size:80px;z-index:60`,()=>{ARG.n=n%10+1;AUD.say('n'+ARG.n);go('tn')}).classList.add('pulse')})})})}});
  btn(r,'🔢',`left:24px;top:140px;width:120px;height:110px;font-size:60px;z-index:50`,()=>go('num'))}};
function countThings(r,n,cb,thing){const t=thing||pick(['🧁','🐱','⭐','🦄','🌸','🎈']);let c=0;AUD.say('count');
  const per=Math.min(5,n),rows=Math.ceil(n/5),sz=Math.min(140,(W-200)/per);for(let i=0;i<n;i++){const x=W/2-per*sz/2+(i%5)*sz,y=H/2-rows*sz/2+(i/5|0)*sz+30;
    const it=el('div',r,`position:absolute;left:${x}px;top:${y}px;width:${sz}px;height:${sz}px;font-size:${sz*.75}px;text-align:center;line-height:${sz}px;z-index:40;opacity:.5;cursor:pointer`,t);it.className='pulse';
    tap(it,()=>{if(it.dataset.c)return;it.dataset.c=1;c++;it.style.opacity=1;it.classList.remove('pulse');anim(it,'hop');AUD.say('n'+c);AUD.sfx('chime');el('div',it,`position:absolute;left:0;right:0;bottom:-30px;font-size:44px;line-height:1;color:#fff;-webkit-text-stroke:3px #c2378f;paint-order:stroke fill`,c);if(c===n){later(900,()=>{cheer();confetti(r,16);cb&&cb()})}})}}
SCR.cnt={bg:'tea',show(r){const go1=()=>{r.querySelectorAll('.cn').forEach(e=>e.remove());const wrap=el('div',r,'position:absolute;left:0;top:0;width:100%;height:100%');wrap.className='cn';countThings(wrap,1+(Math.random()*10|0),()=>{daily(r,'cntSt');later(1800,go1)})};go1()}};
SCR.find={bg:'school',show(r){let round=0;const focus=['Z','O','E'];
  function next(){r.querySelectorAll('.fl').forEach(e=>e.remove());if(round>=6){cheer();confetti(r,30);daily(r,'findSt');again(r,'find');return}
    const tgt=round<3?focus[round]:pick(ABC);const opts=shuf([tgt].concat(shuf(ABC.filter(c=>c!==tgt)).slice(0,round<3?2:4)));AUD.say('findl');later(1500,()=>AUD.say('ln_'+tgt));
    const n=opts.length,bw=Math.min(190,(W-160)/n-30);opts.forEach((c,i)=>{const b=el('div',r,`position:absolute;left:${W/2-n*(bw+30)/2+i*(bw+30)+15}px;top:${H/2-bw/2+(i%2?50:-30)}px;width:${bw}px;height:${bw}px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff,${pick(['#ffc1e3','#c9f0ff','#fff3a8','#d9c9ff','#c8f7d0'])});box-shadow:0 8px 20px rgba(0,0,0,.18);font-size:${bw*.62}px;line-height:${bw}px;text-align:center;color:#b03a8a;cursor:pointer`,c);b.className='fl float';b.style.animationDelay=(i*.3)+'s';
      tap(b,()=>{if(b.dataset.ok)return;if(c===tgt){b.dataset.ok=1;AUD.sfx('pop');const p=ctr(b);burst(r,p[0],p[1],['✨','⭐','💖'],12);b.style.transition='transform .3s,opacity .3s';b.style.transform='scale(1.6)';b.style.opacity=0;round++;later(500,()=>AUD.say('lf_'+c));later(3400,next)}else{anim(b,'wob');AUD.say('ln_'+c)}})})}
  later(400,next)}};
// ABC song (Twinkle tune, public domain); each letter lights up on its note
SCR.song={bg:'school',show(r){AUD.music('');const kids=[];['zoe','amanda'].forEach((k,i)=>kids.push(k==='zoe'?chr(r,zoe(),W*.1,H-20,300,'bob'):chr(r,FR.amanda.o,W*.9,H-20,380,'bob')));
  const cw=Math.min(84,(W-360)/9);const cells=ABC.map((c,i)=>el('div',r,`position:absolute;left:${(W-9*(cw+8))/2+(i%9)*(cw+8)}px;top:${160+(i/9|0)*(cw+20)}px;width:${cw}px;height:${cw}px;border-radius:20px;background:rgba(255,255,255,.85);font-size:${cw*.7|0}px;line-height:${cw}px;text-align:center;color:#b03a8a;transition:transform .15s,background .15s`,c));
  const MEL=[60,60,67,67,69,69,67,65,65,64,64,62,62,62,62,60,67,67,65,64,64,62,67,67,65,64,64,62,60,60,67,67,69,69,67,65,65,64,64,62,62,60];
  // letter index per note (L-M-N-O-P squeezed on the quick notes)
  const MAP=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,-1,19,20,21,-1,22,-1,23,24,-1,25,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
  const DUR=[1,1,1,1,1,1,2,1,1,1,1,.5,.5,.5,.5,2,1,1,2,1,1,2,1,1,2,1,1,2,1,1,1,1,1,1,2,1,1,1,1,1,1,2];
  let playing=false;function sing(){if(playing)return;playing=true;AUD.say('abcsong');let t=900;MEL.forEach((m,i)=>{const d=DUR[i]*420;later(t,()=>{AUD.note(m,d/1000*.9,.22,'triangle');const li=MAP[i];cells.forEach(c=>{c.style.transform='';c.style.background='rgba(255,255,255,.85)'});if(li>=0){const c=cells[li];c.style.transform='scale(1.3)';c.style.background='#ffd34d';AUD.say('ln_'+ABC[li])}kids.forEach(k=>anim(k,'hop'))});t+=d});
    later(t+300,()=>{cells.forEach(c=>{c.style.transform='';c.style.background='rgba(255,255,255,.85)'});AUD.say('abcend');confetti(r,24);daily(r,'songSt');playing=false})}
  cells.forEach((c,i)=>tap(c,()=>{AUD.say('ln_'+ABC[i]);anim(c,'hop')}));
  const p=btn(r,'▶️',`left:${W/2-100}px;top:${H-200}px;width:200px;height:160px;font-size:100px`,sing);p.classList.add('pulse')},leave(){AUD.music('home')}};
// patterns: finish the bead necklace
SCR.pattern={bg:'castle',show(r){AUD.say('pattern');let round=0;
  function next(){r.querySelectorAll('.pt').forEach(e=>e.remove());if(round>=5){cheer();confetti(r,30);daily(r,'patSt');again(r,'pattern');return}
    const sets=[['💗','💜'],['⭐','🌙'],['🔴','🔵'],['🌸','🍀','🌸'],['🐱','🐶','🐶'],['🟡','🟣','🟢']];const s=sets[round<2?round:2+(Math.random()*4|0)];const seq=[];for(let i=0;i<7;i++)seq.push(s[i%s.length]);const ans=s[7%s.length];
    const bw=Math.min(120,(W-160)/8);seq.concat(['❓']).forEach((e,i)=>{const b=el('div',r,`position:absolute;left:${(W-8*bw)/2+i*bw}px;top:${H*.32}px;width:${bw-10}px;height:${bw-10}px;border-radius:50%;background:#fff;box-shadow:0 4px 10px rgba(0,0,0,.15);font-size:${bw*.6|0}px;line-height:${bw-10}px;text-align:center`,e);b.className='pt'+(i===7?' pulse':'');if(i===7)b.id='qq'});
    const opts=shuf(s.filter((v,i,a)=>a.indexOf(v)===i).concat(['🍎']).slice(0,3));opts.forEach((e,i)=>{const b=btn(r,e,`left:${W/2-opts.length*110+i*220+10}px;top:${H*.62}px;width:200px;height:180px;font-size:110px`,()=>{if(e===ans){const q=document.getElementById('qq');q.innerHTML=e;q.classList.remove('pulse');anim(q,'hop');AUD.sfx('chime');cheer();round++;later(1600,next)}else{anim(b,'wob');AUD.say('hint')}});b.classList.add('pt')})}
  next()}};
// opposites flip cards
SCR.opp={bg:'meadow',show(r){AUD.say('opp');const P=[['op_big','🐘','op_small','🐭'],['op_up','🎈','op_down','⚓'],['op_day','☀️','op_night','🌙'],['op_hot','🔥','op_cold','⛄'],['op_fast','🐇','op_slow','🐢']];let seen=0;
  P.forEach((p,i)=>{const x=(W-5*200)/2+i*200+10,y=H*.3;const c=el('div',r,`position:absolute;left:${x}px;top:${y}px;width:180px;height:260px;border-radius:30px;background:linear-gradient(#fff,#ffe3f4);box-shadow:0 8px 0 #e58cc4;font-size:110px;line-height:260px;text-align:center;cursor:pointer;transition:transform .3s`,p[1]);let f=0;c.className='float';c.style.animationDelay=(i*.4)+'s';
    tap(c,()=>{f=1-f;c.style.transform='scaleX(0)';later(150,()=>{c.innerHTML=f?p[3]:p[1];c.style.transform='';AUD.say(f?p[2]:p[0]);AUD.sfx(f?'pop':'chime')});if(f&&!c.dataset.s){c.dataset.s=1;if(++seen===5)later(1500,()=>{cheer();daily(r,'oppSt')})}})})}};

// ---------- trace my name ----------
SCR.name={bg:'bedroom2',show(r){AUD.music('home');const sty=ARG.nameStyle||SAVE.nameStyle||'ZOE';const g=sty==='Zoe'?['Z','o','e']:['Z','O','E'];sayQ(['nm_go'],0);
  el('div',r,`position:absolute;left:${W/2-380}px;top:120px;width:760px;height:${H-160}px;border-radius:40px;background:rgba(255,255,255,.82);box-shadow:0 10px 30px rgba(0,0,0,.15)`);
  // lined paper
  const lp=el('div',r,`position:absolute;left:${W/2-360}px;top:${H/2-130}px;width:720px;height:280px;pointer-events:none`);[0,140,280].forEach((y,i)=>el('div',lp,`position:absolute;left:0;right:0;top:${y}px;height:0;border-top:4px ${i===1?'dashed':'solid'} ${i===1?'#ffb3d6':'#9ec9ff'}`));
  const z=chr(r,zoe(),W*.1,H-20,300,'bob');
  const tg=btn(r,sty==='Zoe'?'ZOE':'Zoe',`left:${W-190}px;top:150px;width:160px;height:110px;font-size:54px`,()=>{ARG.nameStyle=sty==='Zoe'?'ZOE':'Zoe';go('name')});
  tracer(r,g,{x:W/2-340,y:H/2-130,w:680,h:280},{gap:40,pause:1300,glyph(i,ch){AUD.say('ln_'+ch.toUpperCase());anim(z,'hop')},done(){later(900,()=>{AUD.say('nm_yay');confetti(r,50);anim(z,'spin');
    const cr=el('div',r,`position:absolute;left:${W/2-80}px;top:-200px;font-size:160px;z-index:95;transition:top 1s cubic-bezier(.3,1.5,.6,1)`,'👑');requestAnimationFrame(()=>requestAnimationFrame(()=>cr.style.top='90px'));
    const first=!SAVE.nameSign;SAVE.nameSign=1;SAVE.nameStyle=sty;SAVE.nameN=(SAVE.nameN||0)+1;save();if(first||SAVE.nameSt!==TODAY){SAVE.nameSt=TODAY;save();later(2500,()=>stickerUp(r))}
    later(4200,()=>{if(first)AUD.say('nm_sign');btn(r,'🛏️',`left:${W/2-330}px;top:${H-180}px;width:200px;height:150px;font-size:90px;z-index:60`,()=>go('bed'));btn(r,'🔁',`left:${W/2-100}px;top:${H-180}px;width:200px;height:150px;font-size:90px;z-index:60`,()=>go('name'));btn(r,'🏰',`left:${W/2+130}px;top:${H-180}px;width:200px;height:150px;font-size:90px;z-index:60`,()=>go('hub'))})})}})}};

// ---------- School: sign-in sheet on every arrival ----------
const _school=SCR.school.show;
function signIn(r){AUD.music('home');const t=chr(r,FR.amanda.o,W*.12,H-20,420,'bob');tap(t,()=>{AUD.say('f_amanda');anim(t,'hop')});const z=chr(r,zoe(),W*.27,H-20,300,'bob');
  // clipboard on an easel
  const bx=W*.38,bw=Math.min(W*.58,700),bh=H-150,by=110;el('div',r,`position:absolute;left:${bx+bw*.2}px;top:${by+bh-30}px;width:16px;height:60px;background:#a0703c;transform:rotate(12deg)`);el('div',r,`position:absolute;left:${bx+bw*.8}px;top:${by+bh-30}px;width:16px;height:60px;background:#a0703c;transform:rotate(-12deg)`);
  el('div',r,`position:absolute;left:${bx}px;top:${by}px;width:${bw}px;height:${bh}px;border-radius:24px;background:#c98a4b;box-shadow:0 10px 24px rgba(0,0,0,.25)`);
  const sh=el('div',r,`position:absolute;left:${bx+22}px;top:${by+40}px;width:${bw-44}px;height:${bh-64}px;background:#fffdf6;border-radius:8px`);
  el('div',r,`position:absolute;left:${bx+bw/2-70}px;top:${by-14}px;width:140px;height:50px;border-radius:12px;background:linear-gradient(#e9e9ef,#b9b9c6)`);
  el('div',sh,`position:absolute;left:0;right:0;top:10px;text-align:center;font-size:44px`,'☀️ 📝 ☀️');
  const kids=[['Mia','🐰'],['Leo','🦁'],['Ava','🦋'],['ZOE',null],['Kai','🐳']],rh=(bh-150)/5;
  kids.forEach(([n,e],i)=>{const y=by+40+80+i*rh;el('div',r,`position:absolute;left:${bx+40}px;top:${y+rh-14}px;width:${bw-80}px;height:0;border-top:3px solid #9ec9ff`);
    if(e)el('div',r,`position:absolute;left:${bx+50}px;top:${y+6}px;font-size:${rh*.55}px;line-height:${rh*.8}px;color:#555`,`<span style="font-size:${rh*.4}px">${e}</span> <span class="hand">${n}</span>`)});
  const zy=by+40+80+3*rh;el('div',r,`position:absolute;left:${bx+40}px;top:${zy-4}px;width:${bw-80}px;height:${rh+4}px;background:rgba(255,211,77,.3);border-radius:14px`);
  el('div',r,`position:absolute;left:${bx+50}px;top:${zy+rh*.15}px;font-size:${rh*.45}px`,'👑');
  later(700,()=>AUD.say('sg_hi'));
  tracer(r,['Z','o','e'],{x:bx+110,y:zy+rh*.04,w:bw-170,h:rh*.92},{gap:16,pause:700,color:'#7a4cff',glyph(i,ch){AUD.say('ln_'+ch.toUpperCase());anim(z,'hop')},done(){SAVE.signDay=TODAY;SAVE.signN=(SAVE.signN||0)+1;save();
    later(800,()=>{AUD.say('gm_zoe');anim(t,'hop');confetti(r,30);later(2400,()=>{AUD.say('sg_list');[t,z].forEach(c=>c.classList.add('dance'))});
      if(SAVE.signSt!==TODAY){SAVE.signSt=TODAY;save();later(1500,()=>stickerUp(r))}
      later(4300,()=>{const b=btn(r,'▶️',`left:${W*.15}px;top:${H/2-120}px;width:200px;height:160px;font-size:100px;z-index:60`,()=>{ARG.skipSign=1;go('school')});b.classList.add('pulse')})})}});
  later(25000,()=>btn(r,'⏭️',`left:${W-150}px;top:${H-140}px;width:120px;height:110px;font-size:56px;z-index:60`,()=>{ARG.skipSign=1;go('school')}))}
SCR.school.show=function(r){if(ARG.forceSign||(!ARG.skipSign&&prevScr!=='school')){ARG.forceSign=0;signIn(r);return}if(0){signIn(r);return}ARG.skipSign=0;schoolMenu(r)};
function schoolMenu(r){AUD.music('home');sayQ(['s_hi']);const t=chr(r,FR.amanda.o,W*.12,H-20,420,'bob');tap(t,()=>{AUD.say('f_amanda');anim(t,'hop')});
  const z=chr(r,zoe(),W*.27,H-20,300,'bob');z.style.animationDelay='.3s';tap(z,()=>{AUD.say('fl_zoe');anim(z,'hop')});
  const acts=[['🔤','abc','abc'],['🎨','paint','s_paint'],['⭐','count','s_count'],['🎵','circle','s_circle'],['🍎','snack','s_snack'],['✏️','dots','dots'],['🧺','sort','sort'],['📝','sign','sg_hi']];
  const cols=4,x0=W*.38,bw=Math.min(190,(W-x0-40)/cols-18);acts.forEach(([e,k,v],i)=>{const b=btn(r,e,`left:${x0+(i%cols)*(bw+18)}px;top:${170+(i/cols|0)*(bw+30)}px;width:${bw}px;height:${bw}px;font-size:${bw*.55|0}px`,()=>{AUD.say(v);if(k==='abc')go('abc');else if(k==='sign'){ARG.forceSign=1;go('school')}else SCH[k](r)});b.classList.add('hub')})}
// connect-the-dots and color sorting at school
SCH.dots=function(r){panel(r);const SH={star:[[50,0],[62,36],[100,38],[70,60],[80,98],[50,76],[20,98],[30,60],[0,38],[38,36]],heart:[[50,26],[64,6],[88,6],[100,28],[92,56],[50,98],[8,56],[0,28],[12,6],[36,6]],house:[[10,45],[50,5],[90,45],[90,95],[10,95]]};
  const ks=Object.keys(SH),k=ks[(SAVE.dotI=(SAVE.dotI||0)+1)%ks.length];save();const pts=SH[k],s=Math.min(5.2,(H-260)/100),ox=W/2-50*s,oy=150;let nx=0;AUD.say('dots');
  const NS='http://www.w3.org/2000/svg',svg=document.createElementNS(NS,'svg');svg.setAttribute('viewBox',`0 0 ${W} ${H}`);svg.style.cssText=`position:absolute;left:0;top:0;width:${W}px;height:${H}px;pointer-events:none`;r.appendChild(svg);
  const P=pts.map(([x,y])=>[ox+x*s,oy+y*s]);const fill=document.createElementNS(NS,'polygon');fill.setAttribute('points',P.map(p=>p.join(',')).join(' '));fill.setAttribute('fill',k==='star'?'#ffd34d':k==='heart'?'#ff6fae':'#7fd6e8');fill.style.opacity=0;fill.style.transition='opacity 1s';svg.appendChild(fill);
  const line=document.createElementNS(NS,'polyline');line.setAttribute('fill','none');line.setAttribute('stroke','#b03a8a');line.setAttribute('stroke-width',12);line.setAttribute('stroke-linecap','round');svg.appendChild(line);
  P.forEach((p,i)=>{const d=el('div',r,`position:absolute;left:${p[0]-42}px;top:${p[1]-42}px;width:84px;height:84px;border-radius:50%;background:#fff;border:6px solid #ff8fc8;font-size:44px;line-height:72px;text-align:center;color:#b03a8a;z-index:5;cursor:pointer`,i+1);if(i===0)d.className='pulse';
    tap(d,()=>{if(i!==nx){anim(d,'wob');return}nx++;d.style.background='#ffd34d';d.classList.remove('pulse');AUD.say('n'+nx);const pl=P.slice(0,nx);if(nx===P.length)pl.push(P[0]);line.setAttribute('points',pl.map(p=>p.join(',')).join(' '));
      const n2=r.querySelectorAll('div')[0];if(nx<P.length){const all=[].slice.call(r.children).filter(e=>e.style&&e.style.borderRadius==='50%');all[nx]&&all[nx].classList.add('pulse')}
      else{fill.style.opacity=1;later(600,()=>{AUD.say('sh_'+k);AUD.say('dotsyay');confetti(r,24);if(SAVE.dotSt!==TODAY){SAVE.dotSt=TODAY;save();later(1200,()=>stickerUp(r))}later(2500,()=>btn(r,'🔁',`left:${W-240}px;top:${H-190}px;width:200px;height:150px;font-size:90px`,()=>SCH.dots(r)))})}})})};
SCH.sort=function(r0){r0.querySelectorAll('.sortp').forEach(x=>x.remove());const r=el('div',r0,'position:absolute;top:0;right:0;bottom:0;left:0;z-index:70');r.className='sortp';panel(r);AUD.say('sort');const C=[['c_pink','#ff8fc8'],['c_blue','#6cc6ff'],['c_yellow','#ffd34d']];let left=9;
  const bk=C.map(([k,c],i)=>{const x=W*.2+i*W*.3;const b=el('div',r,`position:absolute;left:${x-110}px;top:${H-250}px;width:220px;height:170px;border-radius:20px 20px 70px 70px;background:${c};border:8px solid #fff;box-shadow:0 8px 16px rgba(0,0,0,.2);font-size:80px;line-height:170px;text-align:center`,'🧺');b.dataset.k=k;return b});
  shuf([0,0,0,1,1,1,2,2,2]).forEach((ci,i)=>{const x=150+(i%5)*(W-300)/4,y=160+(i/5|0)*150;const it=el('div',r,`position:absolute;left:${x-55}px;top:${y-55}px;width:110px;height:110px;border-radius:50%;background:${C[ci][1]};border:6px solid #fff;font-size:64px;line-height:100px;text-align:center;z-index:10;cursor:pointer;touch-action:none`,pick(['🐱','⭐','🎀','🌸','🍬']));
    let dn=null;it.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();dn=stagePt(e);AUD.say(C[ci][0]);it.style.zIndex=30});
    r.addEventListener('pointermove',e=>{if(!dn||!it.parentNode)return;const p=stagePt(e);it.style.left=(p[0]-55)+'px';it.style.top=(p[1]-55)+'px'});
    r.addEventListener('pointerup',e=>{if(!dn||!it.parentNode)return;dn=null;const p=ctr(it);const b=bk[ci],bp=ctr(b);if(Math.hypot(p[0]-bp[0],p[1]-bp[1])<170){it.remove();anim(b,'hop');AUD.sfx('chime');burst(r,bp[0],bp[1]-60,['✨','💖'],6);if(--left===0){cheer();confetti(r,24);if(SAVE.sortSt!==TODAY){SAVE.sortSt=TODAY;save();later(1200,()=>stickerUp(r))}later(2500,()=>btn(r,'🔁',`left:${W/2-100}px;top:150px;width:200px;height:150px;font-size:90px`,()=>SCH.sort(r)))}}
      else{const wb=bk.filter(x=>{const q=ctr(x);return Math.hypot(p[0]-q[0],p[1]-q[1])<170})[0];if(wb){anim(wb,'wob');AUD.say('hint')}it.style.left=(x-55)+'px';it.style.top=(y-55)+'px';it.style.zIndex=10}})})};
// ---------- Bedroom v2 ----------
const CAN=['#ff8fc8','#b28dff','#7fd6e8','#ffd34d','#7ee08a','rainbow'],NL=[['#ffd34d','c_yellow'],['#ff8fc8','c_pink'],['#7fd6e8','c_blue'],['#b28dff','c_purple'],['#7ee08a','c_green']],STF=['🧸','🐰','🦄','🐻‍❄️','🐶','🦕'];
SCR.bed={bg:'bedroom2',show(r){AUD.music('home');SAVE.bc=SAVE.bc||0;SAVE.stf=SAVE.stf||0;SAVE.nl=SAVE.nl||0;let pj=false,inBed=false,dark=false,snoreT=null;
  const crewK=[['zoe',null]].concat(sceneParty().filter(k=>!FR[k].grp).slice(0,4).map(k=>[k,null]));
  const mkO=(k)=>{if(k==='zoe'){const o=zoe();if(pj){o.dress='#b9d7ff';o.dress2='#e8f1ff';o.pj=1;o.crown=null}if(dark)o.sleep=1;return o}const f=FR[k];if(!f||f.grp)return null;const o=Object.assign({},f.o);if(pj){o.dress='#ffd1ea';o.dress2='#fff3fb';o.pj=1;o.crown=null}if(dark)o.sleep=1;return o};
  // bed geometry
  const BX=W*.46,BW=Math.min(W*.5,620),BY=H-80,BH=330;
  const bedBack=el('div',r,`position:absolute;left:${BX}px;top:${BY-BH-120}px;width:${BW}px;height:${BH+120}px;z-index:3`);
  const canopy=el('div',r,`position:absolute;left:${BX-20}px;top:${BY-BH-250}px;width:${BW+40}px;height:150px;z-index:4;cursor:pointer`);
  const drawCan=()=>{const c=CAN[SAVE.bc%CAN.length],bg=c==='rainbow'?'linear-gradient(90deg,#ff6b6b,#ffb347,#ffe066,#57c785,#4aa8ff,#9b6bff)':c;canopy.innerHTML=`<div style="position:absolute;left:0;right:0;top:0;height:80px;border-radius:40px 40px 0 0;background:${bg};box-shadow:0 6px 0 rgba(0,0,0,.08)"></div>`+[0,1,2,3,4,5,6].map(i=>`<div style="position:absolute;left:${i*(BW+40)/7}px;top:60px;width:${(BW+40)/7}px;height:60px;border-radius:0 0 50% 50%;background:${bg};opacity:.92"></div>`).join('')+`<div style="position:absolute;left:-10px;top:80px;width:60px;height:${BH+120}px;background:${bg};opacity:.5;border-radius:0 0 30px 30px"></div><div style="position:absolute;right:-10px;top:80px;width:60px;height:${BH+120}px;background:${bg};opacity:.5;border-radius:0 0 30px 30px"></div>`};drawCan();
  bedBack.innerHTML=`<svg viewBox="0 0 600 450" preserveAspectRatio="none" style="width:100%;height:100%"><path d="M20 450V60Q20 10 70 10H530Q580 10 580 60V450Z" fill="#fff4fb" stroke="#e8a5cf" stroke-width="10"/><path d="M300 40l14 28 30 4-22 21 6 30-28-15-28 15 6-30-22-21 30-4z" fill="#ffd34d"/></svg>`;
  const pillows=el('div',r,`position:absolute;left:${BX+30}px;top:${BY-BH+10}px;width:${BW-60}px;height:90px;z-index:5`);let fluff=0;
  [0,1,2].forEach(i=>{const p=el('div',pillows,`position:absolute;left:${i*(BW-60)/3+6}px;top:0;width:${(BW-60)/3-12}px;height:86px;border-radius:44px;background:radial-gradient(circle at 40% 35%,#fff,#ffe0f1);box-shadow:0 4px 8px rgba(0,0,0,.15);cursor:pointer;transition:transform .2s`);
    tap(p,()=>{AUD.sfx('pop');p.style.transform='scale(1.15,1.25)';setTimeout(()=>p.style.transform='',250);burst(r,ctr(p)[0],ctr(p)[1],['🪶','✨'],5);if(++fluff===3){AUD.say('fluff');cheer()}})});
  const sleepers=el('div',r,`position:absolute;left:0;top:0;width:${W}px;height:${H}px;z-index:6;pointer-events:none`);
  const blanket=el('div',r,`position:absolute;left:${BX+10}px;top:${BY-BH+130}px;width:${BW-20}px;height:${BH-130}px;z-index:8;border-radius:30px 30px 10px 10px;transition:top .8s;cursor:pointer`);
  const drawBl=()=>{const c=CAN[SAVE.bc%CAN.length];blanket.innerHTML=`<svg viewBox="0 0 600 200" preserveAspectRatio="none" style="width:100%;height:100%;border-radius:30px 30px 10px 10px"><rect width="600" height="200" fill="${c==='rainbow'?'#ffc1e3':c}"/>${[0,1,2,3,4,5].map(i=>`<circle cx="${50+i*100}" cy="${60+(i%2)*60}" r="18" fill="#fff" opacity=".6"/>`).join('')}<rect width="600" height="34" fill="#fff" opacity=".7"/></svg>`};drawBl();
  el('div',r,`position:absolute;left:${BX-10}px;top:${BY-60}px;width:${BW+20}px;height:90px;z-index:9;border-radius:20px;background:linear-gradient(#e8a5cf,#c77fb0)`);
  const stuffy=el('div',r,`position:absolute;left:${BX+BW-120}px;top:${BY-BH+20}px;font-size:90px;z-index:7;cursor:pointer`,STF[SAVE.stf%STF.length]);tap(stuffy,()=>{anim(stuffy,'hop');AUD.say('stuffy');AUD.sfx('squeak')});
  // door with name sign
  const door=el('div',r,`position:absolute;left:${W*.3}px;top:${H-470}px;width:170px;height:400px;border-radius:85px 85px 0 0;background:linear-gradient(#e3b383,#c48a55);border:8px solid #fff;z-index:2`);el('div',door,'position:absolute;right:20px;top:220px;width:24px;height:24px;border-radius:50%;background:#ffd34d');
  if(SAVE.nameSign)nameSign(r,W*.3+93,H-370,150);else{const s=btn(r,'✍️',`left:${W*.3+33}px;top:${H-420}px;width:110px;height:100px;font-size:56px;z-index:12`,()=>go('name'));s.classList.add('pulse')}
  // nightlight
  const lamp=el('div',r,`position:absolute;left:${W*.25-50}px;top:${H-190}px;width:100px;height:130px;z-index:10;cursor:pointer`);const drawL=()=>{const c=NL[SAVE.nl%NL.length][0];lamp.innerHTML=`<div style="position:absolute;left:-60px;top:-70px;width:220px;height:220px;border-radius:50%;background:radial-gradient(${c}cc,transparent 65%)"></div><div style="position:absolute;left:20px;top:0;width:60px;height:70px;border-radius:30px 30px 10px 10px;background:${c};border:5px solid #fff"></div><div style="position:absolute;left:40px;top:70px;width:20px;height:40px;background:#fff"></div><div style="position:absolute;left:15px;top:105px;width:70px;height:22px;border-radius:12px;background:#fff"></div>`};drawL();
  tap(lamp,()=>{SAVE.nl++;save();drawL();AUD.sfx('chime');AUD.say(NL[SAVE.nl%NL.length][1]);if(SAVE.nl%5===0)AUD.say('nl')});
  // characters
  let floor=[];const drawFloor=()=>{floor.forEach(c=>c.remove());floor=[];sleepers.innerHTML='';
    if(!inBed){crewK.forEach(([k],i)=>{const o=mkO(k),x=W*.07+i*Math.min(W*.085,110),y=H-30-(i%2)*24;const c=o?chr(r,o,x,y,i?230:290,'bob'):grpChr(r,k,x,y,240,'bob');c.style.animationDelay=(i*.3)+'s';c.style.zIndex=11;tap(c,()=>{anim(c,'hop');AUD.say(k==='zoe'?'fl_zoe':'fl_'+k)});floor.push(c)});
      const kk=(typeof dressedKits==='function'&&dressedKits()[0])||SAVE.kitSel;const kc=kitChr(r,kk,W*.4,H-20,150,'bob');kc.style.zIndex=11;tap(kc,()=>{AUD.sfx('meow');anim(kc,'hop')});floor.push(kc)}
    else{crewK.forEach(([k],i)=>{const o=mkO(k);const nn=crewK.length,x=BX+BW*(nn<2?.5:.14+i*(.72/(nn-1))),y=BY-BH+250+(i%2)*14;const c=o?chr(sleepers,o,x,y,nn>3?205:240):grpChr(sleepers,k,x,y,220);c.style.pointerEvents='none';floor.push(c)});
      const kk=SAVE.kitSel;[0,1].forEach(i=>{const kc=kitChr(r,i?'doodle':kk,BX+BW*(.3+i*.4),BY-40,110);kc.style.zIndex=10;kc.dataset.kit=1;tap(kc,()=>{AUD.sfx('meow');anim(kc,'hop')});floor.push(kc)})}};drawFloor();
  // night overlay
  const night=el('div',r,`position:absolute;left:0;top:0;width:${W}px;height:${H}px;background:radial-gradient(circle at 25% 75%,rgba(255,230,150,.25),rgba(20,20,70,.72) 45%);opacity:0;transition:opacity 1.5s;z-index:13;pointer-events:none`);
  const fx=[];const clearFx=()=>fx.splice(0).forEach(e=>e.remove());
  const T=(e,v,x,f)=>{const b=btn(r,e,`left:${x}px;top:${18}px;width:${Math.min(108,(W-320)/9)}px;height:96px;font-size:54px;z-index:40`,()=>{if(v)AUD.say(v);f()});return b};
  const bx0=170,bs=Math.min(118,(W-320)/8);
  T('👚','pj',bx0,()=>{pj=!pj;AUD.sfx('magic');drawFloor();burst(r,W*.15,H-200,['✨','💫'],10)});
  T('🛏️','climb',bx0+bs,()=>{inBed=!inBed;if(inBed){blanket.style.top=(BY-BH+150)+'px';later(900,()=>AUD.say('tuck'))}drawFloor();AUD.sfx('pop')});
  T('📖','',bx0+bs*2,()=>story());T('🎵','lully',bx0+bs*3,()=>{AUD.music('lull')});
  T('🌙','',bx0+bs*4,()=>sleep());T('☀️','',bx0+bs*5,()=>wake());
  T('🎨','canopy',bx0+bs*6,()=>{SAVE.bc++;save();drawCan();drawBl();AUD.sfx('magic');const c=CAN[SAVE.bc%CAN.length];AUD.say(HEXC[c]||'c_pink')});
  T('🧸','',bx0+bs*7,()=>{SAVE.stf++;save();stuffy.innerHTML=STF[SAVE.stf%STF.length];anim(stuffy,'hop');AUD.sfx('squeak');AUD.say('stuffy')});
  tap(blanket,()=>{if(!inBed){inBed=true;drawFloor()}AUD.say('tuck');anim(blanket,'wob');burst(r,BX+BW/2,BY-BH+170,['💖','✨'],8)});
  function story(){const ov=el('div',r,`position:absolute;left:${W/2-360}px;top:130px;width:720px;height:${H-200}px;border-radius:30px;background:#fffaf0;box-shadow:0 10px 40px rgba(0,0,0,.3);z-index:60;overflow:hidden`);fx.push(ov);
    const pages=[['🏰','👸','🌙'],['🦄','✨','🌈'],['🐱','🧶','💤'],['🌟','💖','😴']];let p=0;
    const show=()=>{ov.innerHTML='';el('div',ov,`position:absolute;left:0;right:0;top:${(H-200)/2-120}px;text-align:center;font-size:150px`,pages[p].join(' '));el('div',ov,`position:absolute;left:0;right:0;bottom:30px;text-align:center;font-size:40px`,pages.map((x,i)=>i===p?'💗':'🤍').join(' '));AUD.say('story'+(p+1));
      const nx=btn(ov,p<3?'▶️':'✅',`left:${720-170}px;top:${H-200-160}px;width:140px;height:120px;font-size:70px`,()=>{if(p<3){p++;show()}else{ov.remove();if(SAVE.storySt!==TODAY){SAVE.storySt=TODAY;save();stickerUp(r)}}})};show()}
  function sleep(){if(dark)return;dark=true;night.style.opacity=1;AUD.music('lull');AUD.say('night');if(!inBed){inBed=true;blanket.style.top=(BY-BH+150)+'px'}drawFloor();
    for(let i=0;i<16;i++){const s=el('div',r,`position:absolute;left:${Math.random()*W}px;top:${Math.random()*H*.45}px;font-size:${24+Math.random()*28}px;z-index:14;pointer-events:none`,'⭐');s.className='pulse';s.style.animationDelay=Math.random()+'s';fx.push(s)}
    floor.forEach((c,i)=>{const z=el('div',r,`left:${parseFloat(c.style.left)+parseFloat(c.style.width)*.6}px;top:${parseFloat(c.style.top)+10}px;animation-delay:${i*.6}s`,'💤');z.className='zz';fx.push(z)});
    snoreT=setInterval(()=>{if(dark)AUD.sfx('snore')},3200);timers.push(snoreT);
    // dream bubble: count the sheep
    later(2500,()=>{const db=el('div',r,`position:absolute;left:${BX+BW*.1}px;top:150px;width:${BW*.8}px;height:240px;border-radius:120px;background:rgba(255,255,255,.92);z-index:30;box-shadow:0 0 40px rgba(255,255,255,.6)`);fx.push(db);[[30,250,40],[0,290,26]].forEach(([dx,dy,s])=>{const b=el('div',r,`position:absolute;left:${BX+BW*.25-dx}px;top:${dy+50}px;width:${s}px;height:${s}px;border-radius:50%;background:rgba(255,255,255,.9);z-index:30`);fx.push(b)});
      AUD.say('sheep');let n=0;const N=5;const fence=el('div',db,`position:absolute;left:${BW*.4-30}px;top:120px;font-size:90px`,'🚧');
      const jump=()=>{if(!dark||n>=N)return;const sh=el('div',db,`position:absolute;left:10px;top:110px;font-size:90px;cursor:pointer;transition:left 2.4s linear,top .6s`,'🐑');
        requestAnimationFrame(()=>requestAnimationFrame(()=>{sh.style.left=(BW*.8-110)+'px'}));later(900,()=>sh.style.top='20px');later(1500,()=>sh.style.top='110px');
        tap(sh,()=>{if(sh.dataset.c)return;sh.dataset.c=1;n++;AUD.say('n'+n);burst(r,ctr(sh)[0],ctr(sh)[1],['⭐'],5);if(n===N){later(1200,()=>{AUD.sfx('chime');if(SAVE.sheepSt!==TODAY){SAVE.sheepSt=TODAY;save();stickerUp(r)}})}});
        later(2600,()=>{sh.remove();jump()})};jump()})}
  function wake(){if(!dark){AUD.say('morning');return}dark=false;clearInterval(snoreT);clearFx();AUD.music('home');
    const sun=el('div',r,`position:absolute;left:${W*.08}px;top:${H}px;font-size:200px;z-index:14;transition:top 2.5s ease-out`,'☀️');fx.push(sun);night.style.background='linear-gradient(#ffd9a0,rgba(255,200,150,.2))';night.style.opacity=.7;
    requestAnimationFrame(()=>requestAnimationFrame(()=>sun.style.top='120px'));later(2600,()=>{night.style.opacity=0;later(1600,()=>night.style.background='radial-gradient(circle at 25% 75%,rgba(255,230,150,.25),rgba(20,20,70,.72) 45%)')});
    AUD.sfx('chirp');later(700,()=>AUD.sfx('chirp'));later(900,()=>AUD.say('morning'));inBed=false;blanket.style.top=(BY-BH+130)+'px';drawFloor();floor.forEach(c=>c.classList.add('stretch'));
    if(SAVE.bed!==TODAY){SAVE.bed=TODAY;save();later(3000,()=>stickerUp(r))}}
  },leave(){}};
// ---------- Bath ----------
SCR.bath={bg:'bath',show(r){AUD.music('home');AUD.say('bath');let foam=0,pops=0,clean=false;
  const tubX=W*.5,tubW=Math.min(W*.56,640);const z=chr(r,zoe(),tubX-tubW*.18,H-150,300,'bob');z.style.zIndex=4;const kc=kitChr(r,SAVE.kitSel,tubX+tubW*.2,H-160,150,'bob');kc.style.zIndex=4;
  tap(z,()=>{AUD.say('fl_zoe');anim(z,'hop');AUD.sfx('splash')});tap(kc,()=>{AUD.sfx('meow');anim(kc,'hop')});
  el('div',r,`position:absolute;left:${tubX-tubW/2}px;top:${H-260}px;width:${tubW}px;height:220px;z-index:6;pointer-events:none`,`<svg viewBox="0 0 600 220" preserveAspectRatio="none" style="width:100%;height:100%"><path d="M0 30H600Q590 200 470 210H130Q10 200 0 30Z" fill="#fff" stroke="#c9e6ff" stroke-width="8"/><rect x="0" y="16" width="600" height="28" rx="14" fill="#e6f3ff"/><path d="M110 210l-20 10M490 210l20 10" stroke="#ffd34d" stroke-width="16" stroke-linecap="round"/></svg>`);
  el('div',r,`position:absolute;left:${tubX-tubW/2+10}px;top:${H-238}px;width:${tubW-20}px;height:30px;z-index:7;border-radius:14px;background:linear-gradient(#bfe6ff,#8fd0ff);pointer-events:none`);
  const fl=el('div',r,`position:absolute;left:${tubX-tubW/2}px;top:${H-300}px;width:${tubW}px;height:80px;z-index:8;pointer-events:none`);
  const duck=el('div',r,`position:absolute;left:${tubX+tubW*.3}px;top:${H-300}px;font-size:80px;z-index:9;cursor:pointer`,'🐥');duck.className='float';tap(duck,()=>{AUD.sfx('squeak');AUD.say('duck');anim(duck,'hop')});
  const addFoam=()=>{foam++;el('div',fl,`position:absolute;left:${Math.random()*(tubW-90)}px;top:${Math.random()*40}px;width:${60+Math.random()*50}px;height:${50+Math.random()*30}px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff,#e6f3ff);box-shadow:0 0 6px rgba(150,200,255,.6)`)};
  const T=(e,v,i,f)=>btn(r,e,`left:${W-150}px;top:${130+i*118}px;width:120px;height:104px;font-size:60px;z-index:40`,()=>{if(v)AUD.say(v);f()});
  T('🫧','bub',0,()=>bubbles());T('🧴','sham',1,()=>{for(let i=0;i<8;i++)addFoam();burst(r,tubX-tubW*.18,H-420,['🫧','🫧','✨'],10);AUD.sfx('pop')});
  T('🚿','rinse',2,()=>{AUD.sfx('splash');for(let i=0;i<24;i++){const d=el('div',r,`position:absolute;left:${tubX-tubW*.3+Math.random()*tubW*.6}px;top:${100+Math.random()*60}px;font-size:34px;z-index:20;transition:top 1s ease-in,opacity 1s;pointer-events:none`,'💧');requestAnimationFrame(()=>requestAnimationFrame(()=>{d.style.top=(H-300)+'px';d.style.opacity=0}));setTimeout(()=>d.remove(),1200)}
    later(1100,()=>{fl.innerHTML='';if(foam>4&&!clean){clean=true;AUD.say('clean');burst(r,tubX,H-380,['✨','💖','⭐'],14);if(SAVE.bathSt!==TODAY){SAVE.bathSt=TODAY;save();later(1200,()=>stickerUp(r))}}foam=0})});
  T('🧽','',3,()=>{addFoam();addFoam();AUD.sfx('splash');anim(kc,'wob')});
  T('🐥','duck',4,()=>{const d=el('div',r,`position:absolute;left:${tubX-tubW/2+40+Math.random()*(tubW-120)}px;top:${H-310}px;font-size:60px;z-index:9`,'🐥');d.className='float';AUD.sfx('squeak')});
  function bubbles(){let made=0;const iv=setInterval(()=>{if(made++>=25){clearInterval(iv);return}const s=60+Math.random()*60,x=tubX-tubW/2+Math.random()*tubW;
      const b=el('div',r,`position:absolute;left:${x}px;top:${H-300}px;width:${s}px;height:${s}px;border-radius:50%;background:radial-gradient(circle at 30% 30%,rgba(255,255,255,.95),rgba(180,220,255,.35) 40%,rgba(255,180,230,.3));border:2px solid rgba(255,255,255,.8);z-index:30;cursor:pointer;transition:top 6s linear,left 6s ease-in-out`);
      requestAnimationFrame(()=>requestAnimationFrame(()=>{b.style.top='-150px';b.style.left=(x+Math.random()*200-100)+'px'}));setTimeout(()=>b.remove(),6200);
      tap(b,()=>{AUD.sfx('pop');const p=ctr(b);burst(r,p[0],p[1],['✨'],3);b.remove();pops++;if(pops%10===0){AUD.say('n10');cheer()}if(pops===20&&SAVE.bubSt!==TODAY){SAVE.bubSt=TODAY;save();stickerUp(r)}})},350);timers.push(iv)}}};
// ---------- Stable ----------
SCR.stable={bg:'stable',show(r){AUD.music('home');AUD.say('stb');let brushed=0,fed=0;const MANE=['rainbow','#ff8fc8','#b28dff','#7fd6e8','#ffd34d'];SAVE.mane=SAVE.mane||0;
  const z=chr(r,zoe(),W*.12,H-30,300,'bob');tap(z,()=>{AUD.say('fl_zoe');anim(z,'hop')});
  const ux=W*.5,uw=Math.min(560,W*.45);const u=el('div',r,`position:absolute;left:${ux-uw/2}px;top:${H-uw*.85-40}px;width:${uw}px;height:${uw*.85}px;z-index:5;touch-action:none;cursor:pointer`);
  const drawU=()=>{const m=MANE[SAVE.mane%MANE.length],mg=m==='rainbow'?'url(#mg)':m;u.innerHTML=`<svg viewBox="0 0 400 340" style="width:100%;height:100%;overflow:visible"><defs><linearGradient id="mg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff6b6b"/><stop offset=".25" stop-color="#ffd34d"/><stop offset=".5" stop-color="#57c785"/><stop offset=".75" stop-color="#4aa8ff"/><stop offset="1" stop-color="#9b6bff"/></linearGradient></defs><path d="M70 200Q40 260 70 300" stroke="${mg}" stroke-width="30" fill="none" stroke-linecap="round"/><ellipse cx="190" cy="200" rx="130" ry="80" fill="#fff" stroke="#e7d6f2" stroke-width="5"/>${[100,150,240,280].map(x=>`<rect x="${x}" y="250" width="30" height="80" rx="14" fill="#fff" stroke="#e7d6f2" stroke-width="5"/><rect x="${x}" y="315" width="30" height="18" rx="6" fill="#d9b8ff"/>`).join('')}<path d="M270 170L310 60Q330 30 360 50L380 90Q390 120 360 130L320 150Z" fill="#fff" stroke="#e7d6f2" stroke-width="5"/><path d="M335 45L350 -10L360 45Z" fill="#ffd34d" stroke="#f0b400" stroke-width="3"/><circle cx="345" cy="85" r="9" fill="#3a2a4a"/><circle cx="348" cy="81" r="3" fill="#fff"/><circle cx="365" cy="110" r="8" fill="#ffb3d6" opacity=".7"/><path d="M300 60Q260 90 270 160Q250 110 255 80Q270 40 310 45Z" fill="${mg}"/></svg>`};drawU();
  let last=null,acc=0;u.addEventListener('pointerdown',e=>{e.preventDefault();last=stagePt(e)});u.addEventListener('pointermove',e=>{if(!last)return;const p=stagePt(e);acc+=Math.hypot(p[0]-last[0],p[1]-last[1]);last=p;if(acc>60){acc=0;brushed++;burst(r,p[0],p[1],['✨','💖'],2);if(brushed===2)AUD.say('brush');if(brushed===25){AUD.say('unilove');AUD.sfx('neigh');anim(u,'hop');if(SAVE.brSt!==TODAY){SAVE.brSt=TODAY;save();later(800,()=>stickerUp(r))}}}});
  ['pointerup','pointerleave','pointercancel'].forEach(n=>u.addEventListener(n,()=>last=null));u.addEventListener('pointerup',()=>{if(brushed<2){AUD.sfx('neigh');anim(u,'hop')}});
  ['🍎','🥕','🍎','🥕','🍎'].forEach((f,i)=>{const it=btn(r,f,`left:${W-150}px;top:${130+i*110}px;width:110px;height:96px;font-size:60px`,()=>{if(it.dataset.u)return;it.dataset.u=1;it.style.opacity=.3;fed++;anim(u,'hop');AUD.say('n'+fed);AUD.sfx('chime');burst(r,ux+uw*.4,H-uw*.7,['💖'],5);if(fed===1)AUD.say('feed');if(fed===5){later(900,()=>{AUD.say('apple');AUD.sfx('neigh');if(SAVE.feedSt!==TODAY){SAVE.feedSt=TODAY;save();stickerUp(r)}})}})});
  btn(r,'🎀',`left:${W-290}px;top:130px;width:110px;height:96px;font-size:60px`,()=>{SAVE.mane++;save();drawU();AUD.sfx('magic');AUD.say(HEXC[MANE[SAVE.mane%MANE.length]]||'c_rainbow')});
  btn(r,'💧',`left:${W-290}px;top:240px;width:110px;height:96px;font-size:60px`,()=>{AUD.sfx('splash');AUD.sfx('neigh');burst(r,ux+uw*.35,H-uw*.6,['💧','💧'],6)})}};
// ---------- Garden ----------
const FLC=[['#ff6fae','c_pink'],['#ffd34d','c_yellow'],['#b28dff','c_purple'],['#ff6b6b','c_red'],['#6cc6ff','c_blue'],['#ffb347','c_orange'],['#ffffff','c_white']];
SCR.garden={bg:'garden',show(r){AUD.music('home');AUD.say('gdn');if(!SAVE.gd||SAVE.gd.day!==TODAY)SAVE.gd={day:TODAY,s:[0,0,0,0,0,0,0]};save();let tool='seed';
  const z=chr(r,zoe(),W*.1,H-20,300,'bob');tap(z,()=>{AUD.say('fl_zoe');anim(z,'hop')});
  const pw=Math.min(130,(W*.62)/7);
  function draw(i,p){const s=SAVE.gd.s[i],c=FLC[i%FLC.length][0];p.pl.innerHTML=s===0?'<span class="pulse" style="display:inline-block;font-size:46px;opacity:.85">✨</span>':s===1?'<span style="font-size:40px">🫘</span>':s===2?`<svg viewBox="0 0 60 80" width="${pw*.6}" height="${pw*.8}"><path d="M30 80V30" stroke="#3a9a4a" stroke-width="6"/><ellipse cx="18" cy="38" rx="14" ry="7" fill="#57c785"/><ellipse cx="42" cy="30" rx="14" ry="7" fill="#57c785"/></svg>`:`<svg viewBox="0 0 80 150" width="${pw*.85}" height="${pw*1.6}"><path d="M40 150V60" stroke="#3a9a4a" stroke-width="7"/><ellipse cx="24" cy="110" rx="16" ry="8" fill="#57c785"/><ellipse cx="56" cy="95" rx="16" ry="8" fill="#57c785"/>${[0,72,144,216,288].map(a=>`<ellipse cx="40" cy="22" rx="12" ry="22" fill="${c}" stroke="#e08ab8" stroke-width="2" transform="rotate(${a} 40 44)"/>`).join('')}<circle cx="40" cy="44" r="12" fill="#ffd34d"/></svg>`}
  const plots=SAVE.gd.s.map((s,i)=>{const x=W*.22+i*pw*1.05,p=el('div',r,`position:absolute;left:${x}px;top:${H-350}px;width:${pw}px;height:260px;z-index:5;cursor:pointer`);el('div',p,`position:absolute;left:0;bottom:0;width:${pw}px;height:76px;border-radius:50%;background:radial-gradient(#a8703f,#6b4426);border:5px dashed rgba(255,255,255,.9);box-shadow:0 6px 0 #4a2e18`);el('div',p,`position:absolute;left:${pw/2-6}px;bottom:62px;width:12px;height:70px;background:#c98a4b;border-radius:4px`);el('div',p,`position:absolute;left:${pw/2-34}px;bottom:118px;width:68px;height:44px;border-radius:10px;background:#fff6dc;border:4px solid #c98a4b;font-size:30px;line-height:40px;text-align:center`,['🌸','🌼','🌷','🌹','💙','🧡','🤍'][i]);p.pl=el('div',p,`position:absolute;left:0;right:0;bottom:30px;text-align:center`);draw(i,p);tap(p,()=>act(i,p));return p});
  function act(i,p){const s=SAVE.gd.s[i],c=ctr(p);if(tool==='seed'&&s===0){SAVE.gd.s[i]=1;AUD.say('plant');AUD.sfx('pop')}else if(tool==='water'&&s>0&&s<3){SAVE.gd.s[i]++;AUD.sfx('splash');burst(r,c[0],c[1],['💧'],5);if(SAVE.gd.s[i]===3){AUD.say(FLC[i%FLC.length][1]);burst(r,c[0],c[1]-60,['✨','🌸'],8)}else AUD.say('grow')}else{anim(p,'wob');AUD.say(s===0?'plant':s<3?'water':FLC[i%FLC.length][1])}
    save();draw(i,p);if(SAVE.gd.s.every(x=>x===3)&&!SAVE.gd.done){SAVE.gd.done=1;save();later(1000,()=>{AUD.say('count');let k=0;plots.forEach((pp,j)=>later(900*(j+1),()=>{anim(pp,'hop');AUD.say('n'+(++k))}));later(900*8+400,()=>{cheer();confetti(r,24);stickerUp(r)})})}}
  const tb=(e,k,i)=>{const b=btn(r,e,`left:${W-150}px;top:${130+i*120}px;width:120px;height:104px;font-size:60px;z-index:40`,()=>{tool=k;r.querySelectorAll('.tool').forEach(x=>x.style.outline='');b.style.outline='6px solid #57c785';AUD.say(k==='seed'?'plant':'water')});b.classList.add('tool');if(i===0)b.style.outline='6px solid #57c785'};tb('🌱','seed',0);tb('🚿','water',1);
  btn(r,'💐',`left:${W-150}px;top:370px;width:120px;height:104px;font-size:60px;z-index:40`,()=>{const g=SAVE.gd.s.filter(x=>x===3).length;if(!g){AUD.say('plant');return}AUD.say('bouq');const b=el('div',r,`position:absolute;left:${W*.1}px;top:${H-330}px;font-size:${60+g*10}px;z-index:30`,'💐');anim(b,'hop');anim(z,'spin')});
  for(let i=0;i<3;i++){const b=el('div',r,`position:absolute;left:${W*.2+Math.random()*W*.5}px;top:${120+Math.random()*180}px;font-size:60px;z-index:20;cursor:pointer`,'🦋');b.className='flut';b.style.animationDelay=(i*1.1)+'s';tap(b,()=>{AUD.say('bfly');AUD.sfx('chime');anim(b,'hop')})}}};
// family joins the party once (Daddy and big brother Alex)
if(!SAVE.famV2){SAVE.famV2=1;['dad','alex'].forEach(k=>{if(SAVE.party.indexOf(k)<0)SAVE.party.push(k)});while(SAVE.party.length>5)SAVE.party.shift();save()}
// ---------- Hide the kitty ----------
SCR.hide={bg:'castle',show(r){AUD.music('home');AUD.say('hide');let round=0;
  function next(){r.querySelectorAll('.hd').forEach(e=>e.remove());if(round>=5){cheer();confetti(r,30);daily(r,'hideSt');again(r,'hide');return}
    const n=3+Math.min(3,round),spots=shuf(['🎁','🪴','🧺','🛋️','📦','🎂']).slice(0,n),hit=(Math.random()*n)|0,bw=Math.min(200,(W-200)/n);
    spots.forEach((e,i)=>{const x=(W-n*bw)/2+i*bw,y=H*.45+(i%2)*60;const ks=kitChr(r,pick(KITK),x+bw/2,y+60,140);ks.classList.add('hd');ks.style.visibility='hidden';
      const s=el('div',r,`position:absolute;left:${x}px;top:${y-40}px;width:${bw-10}px;height:${bw}px;font-size:${bw*.7}px;text-align:center;z-index:5;cursor:pointer;transition:transform .4s`,e);s.className='hd';
      tap(s,()=>{if(s.dataset.d)return;s.dataset.d=1;if(i===hit){s.style.transform='translateY(-160px) rotate(-20deg)';ks.style.visibility='';anim(ks,'hop');AUD.sfx('meow');later(400,()=>AUD.say('found'));round++;later(2400,next)}else{anim(s,'wob');AUD.say('hint');s.style.opacity=.5}})})}
  next()}};
// ---------- Sticker album ----------
SCR.album={bg:'bedroom2',show(r){AUD.music('home');AUD.say('album');const a=SAVE.alb||[];
  const bk=el('div',r,`position:absolute;left:${W/2-420}px;top:120px;width:840px;height:${H-150}px;border-radius:30px;background:#fffaf0;box-shadow:0 10px 30px rgba(0,0,0,.25);overflow:hidden`);el('div',bk,'position:absolute;left:418px;top:0;bottom:0;width:4px;background:#f0d8e6');
  const cs=Math.min(70,(H-260)/6);a.slice(-48).forEach((e,i)=>{const pg=i<24?0:1,j=i%24;const s=el('div',bk,`position:absolute;left:${30+pg*420+(j%6)*62}px;top:${30+(j/6|0)*(cs+10)}px;font-size:${cs*.8}px;cursor:pointer`,e);tap(s,()=>{anim(s,'hop');AUD.sfx('sparkle');AUD.sfx('chime')})});
  if(!a.length)el('div',bk,`position:absolute;left:0;right:0;top:120px;text-align:center;font-size:120px;opacity:.3`,'🌟');
  const row=el('div',bk,`position:absolute;left:20px;right:20px;bottom:20px;height:${cs+20}px;font-size:${cs*.45}px;line-height:${cs*.5}px;color:#b03a8a`);row.innerHTML=ABC.map(c=>`<span style="opacity:${SAVE.lm[c]?1:.2}">${c}</span>`).join(' ')+'<br>'+[1,2,3,4,5,6,7,8,9,10].map(n=>`<span style="opacity:${SAVE.nm[n]?1:.2}">${n}</span>`).join(' ');
  if(SAVE.nameSign)nameSign(r,W/2+300,H-120,130);el('div',r,`position:absolute;left:${W/2-100}px;top:40px;width:200px;text-align:center;font-size:56px;color:#fff;-webkit-text-stroke:4px #c2378f;paint-order:stroke fill`,'🌟 '+SAVE.stk)}};
// ---------- quick mini-games launched from rooms ----------
SCR.catch={bg:'ballroom',show(r){AUD.music('ball');AUD.say('catch');const el2=chr(r,FR.elsa.o,W*.1,H-20,320,'bob');let got=0;
  const iv=setInterval(()=>{const f=el('div',r,`position:absolute;left:${150+Math.random()*(W-300)}px;top:-80px;font-size:80px;cursor:pointer;z-index:20;transition:top 5s linear`,'❄️');requestAnimationFrame(()=>requestAnimationFrame(()=>f.style.top=(H+40)+'px'));setTimeout(()=>f.remove(),5200);
    tap(f,()=>{f.remove();got++;AUD.sfx('chime');if(got<=10)AUD.say('n'+got);if(got===10){clearInterval(iv);cheer();anim(el2,'spin');confetti(r,30);daily(r,'catchSt');again(r,'catch')}})},700);timers.push(iv)}};
SCR.balloon={bg:'ballroom',show(r){AUD.music('bday');AUD.say('balloon');let got=0;const C=[['#ff6b6b','c_red'],['#ffd34d','c_yellow'],['#6cc6ff','c_blue'],['#7ee08a','c_green'],['#b28dff','c_purple'],['#ff8fc8','c_pink']];
  const iv=setInterval(()=>{const c=pick(C),x=120+Math.random()*(W-240);const b=el('div',r,`position:absolute;left:${x}px;top:${H+40}px;width:110px;height:140px;cursor:pointer;z-index:20;transition:top 6s linear`,`<svg viewBox="0 0 110 140" style="width:100%;height:100%"><ellipse cx="55" cy="55" rx="48" ry="55" fill="${c[0]}"/><ellipse cx="38" cy="34" rx="10" ry="16" fill="#fff" opacity=".5"/><path d="M55 110 Q50 125 58 140" stroke="#888" stroke-width="2" fill="none"/></svg>`);
    requestAnimationFrame(()=>requestAnimationFrame(()=>b.style.top='-180px'));setTimeout(()=>b.remove(),6200);
    tap(b,()=>{AUD.sfx('pop');AUD.say(c[1]);const p=ctr(b);burst(r,p[0],p[1],['🎊','✨'],6);b.remove();if(++got===12){clearInterval(iv);cheer();confetti(r,30);daily(r,'balSt');again(r,'balloon')}})},800);timers.push(iv)}};
SCR.mem={bg:'tea',show(r){AUD.music('home');AUD.say('mem');const th=ARG.mem==='pr'?['👑','🦄','💖','🌸','⭐','🐱']:['🫖','🧁','🍓','🍪','🍰','🍩'];const cards=shuf(th.concat(th));let open=[],done=0,lock=false;
  const cw=Math.min(150,(W-200)/6-14),ch=cw*1.25;cards.forEach((e,i)=>{const c=el('div',r,`position:absolute;left:${(W-6*(cw+14))/2+(i%6)*(cw+14)}px;top:${160+(i/6|0)*(ch+20)}px;width:${cw}px;height:${ch}px;border-radius:20px;background:linear-gradient(#ff8fc8,#b28dff);box-shadow:0 6px 0 #c77fb0;font-size:${cw*.6}px;line-height:${ch}px;text-align:center;cursor:pointer;transition:transform .25s`,'');
    tap(c,()=>{if(lock||c.dataset.o)return;c.dataset.o=1;c.style.transform='scaleX(0)';setTimeout(()=>{c.innerHTML=e;c.style.background='#fff';c.style.transform=''},130);AUD.sfx('pop');open.push([c,e]);
      if(open.length===2){lock=true;const [a,b]=open;open=[];if(a[1]===b[1]){later(500,()=>{AUD.say('match');burst(r,ctr(b[0])[0],ctr(b[0])[1],['✨','💖'],8);lock=false;if(++done===6){cheer();confetti(r,30);daily(r,'memSt');again(r,'mem')}})}
        else later(1100,()=>{[a[0],b[0]].forEach(x=>{x.innerHTML='';x.style.background='linear-gradient(#ff8fc8,#b28dff)';delete x.dataset.o});lock=false})}})})}};
function addLaunch(k,e,to,arg){const s=SCR[k].show;SCR[k].show=function(r){s.call(this,r);const b=btn(r,e,`left:${W-150}px;top:${H-140}px;width:120px;height:110px;font-size:60px;z-index:45`,()=>{if(arg)ARG.mem=arg;go(to)});b.classList.add('pulse')}}
addLaunch('ball','❄️','catch');addLaunch('bday','🎈','balloon');addLaunch('tea','🃏','mem','tea');addLaunch('friends','🃏','mem','pr');
// tea: shape cookies (shapes + counting)
(function(){const s=SCR.tea.show;SCR.tea.show=function(r){s.call(this,r);const SHP=[['sh_circle','●'],['sh_square','■'],['sh_triangle','▲'],['sh_heart','♥'],['sh_star','★']];
  SHP.forEach(([k,g],i)=>{const c=el('div',r,`position:absolute;left:${W/2-250+i*100}px;top:${H-120}px;width:84px;height:84px;font-size:64px;line-height:84px;text-align:center;color:#c98a4b;-webkit-text-stroke:3px #8a5a33;z-index:30;cursor:pointer`,g);tap(c,()=>{anim(c,'hop');AUD.say(k);AUD.sfx('chime')})})}})();
