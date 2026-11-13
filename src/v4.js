// ================= v4 Round 2: Color Party, Shape Parade, Jewel Hunt (sneaky learning) =================
ROOM_E.colors='🎨';ROOM_E.shapes='🔷';ROOM_E.jewels='💎';
SAVE.cm=SAVE.cm||{};SAVE.sm=SAVE.sm||{};SAVE.jewels=SAVE.jewels||[];
(function(){const _hub=SCR.hub.show;SCR.hub.show=function(r){_hub.call(this,r);
  SAVE.cm=SAVE.cm||{};SAVE.sm=SAVE.sm||{};SAVE.jewels=SAVE.jewels||[];
  el('div',r,`position:absolute;left:${W*.1-40}px;top:40px;padding:6px 16px;border-radius:24px;background:rgba(255,255,255,.9);font-size:28px;color:#b03a8a;z-index:40`,`💎 ${(SAVE.jewels||[]).length}/3`);
}})();

// Color Party: tap the named color among floating jewels (1-10 rounds, saves color mastery)
SCR.colors={bg:'ballroom',show(r){AUD.music('ball');AUD.say('c_rainbow');SAVE.cm=SAVE.cm||{};
  const COLS=[['c_red','#ff6b6b','❤️'],['c_blue','#6cc6ff','💙'],['c_yellow','#ffd34d','💛'],['c_green','#7ee08a','💚'],['c_pink','#ff8fc8','💗'],['c_purple','#b28dff','💜'],['c_orange','#ffb347','🧡'],['c_white','#ffffff','🤍']];
  let round=0,got=0;const N=8;
  const hud=el('div',r,`position:absolute;left:${W/2-160}px;top:36px;width:320px;text-align:center;font-size:40px;color:#fff;-webkit-text-stroke:4px #c2378f;paint-order:stroke fill;z-index:50`,'');
  const board=el('div',r,'position:absolute;inset:0;z-index:5');
  function next(){board.innerHTML='';if(round>=N){cheer();confetti(r,28);daily(r,'colSt');if(got>=6){SAVE.jewels=SAVE.jewels||[];if(SAVE.jewels.indexOf('color')<0){SAVE.jewels.push('color');save()}later(600,()=>stickerUp(r))}later(1800,()=>again(r,'colors'));return}
    const target=COLS[round%COLS.length];const opts=shuf(COLS).slice(0,5);if(!opts.find(c=>c[0]===target[0]))opts[0]=target;
    hud.textContent='Find '+target[2]+'!';AUD.say(target[0]);
    opts.forEach((c,i)=>{const x=W*.18+(i%5)*(W*.14),y=H*.35+(i>4?0:Math.sin(i)*40);
      const b=el('div',board,`position:absolute;left:${x}px;top:${y}px;width:110px;height:110px;border-radius:50%;background:${c[1]};border:8px solid #fff;box-shadow:0 8px 0 rgba(0,0,0,.15);font-size:54px;line-height:94px;text-align:center;cursor:pointer;z-index:10`,c[2]);
      b.className='bob';b.style.animationDelay=(i*.15)+'s';
      tap(b,()=>{if(c[0]===target[0]){AUD.sfx('chime');AUD.say(c[0]);burst(r,x+55,y+55,['✨','💖'],8);anim(b,'hop');SAVE.cm[c[0]]=(SAVE.cm[c[0]]||0)+1;save();got++;round++;later(700,next)}
        else{AUD.sfx('pop');anim(b,'wob');AUD.say(c[0])}})})}
  next()}};

// Shape Parade: match spoken shape by tapping parade floats
SCR.shapes={bg:'castle',show(r){AUD.music('home');AUD.say('sh_star');SAVE.sm=SAVE.sm||{};
  const SHP=[['sh_circle','●','Circle'],['sh_square','■','Square'],['sh_triangle','▲','Triangle'],['sh_star','★','Star'],['sh_heart','♥','Heart']];
  let round=0,got=0;const N=8;
  const hud=el('div',r,`position:absolute;left:${W/2-180}px;top:40px;width:360px;text-align:center;font-size:44px;color:#fff;-webkit-text-stroke:4px #7a4cff;paint-order:stroke fill;z-index:50`,'');
  const board=el('div',r,'position:absolute;inset:0;z-index:5');
  function next(){board.innerHTML='';if(round>=N){cheer();confetti(r,28);daily(r,'shpSt');if(got>=6){SAVE.jewels=SAVE.jewels||[];if(SAVE.jewels.indexOf('shape')<0){SAVE.jewels.push('shape');save()}later(600,()=>stickerUp(r))}later(1800,()=>again(r,'shapes'));return}
    const target=SHP[round%SHP.length];const opts=shuf(SHP.slice());
    hud.textContent='Tap the '+target[2]+'!';AUD.say(target[0]);
    opts.forEach((s,i)=>{const x=W*.15+i*(W*.15),y=H*.42+Math.sin(i*1.2)*30;
      const b=el('div',board,`position:absolute;left:${x}px;top:${y}px;width:120px;height:120px;border-radius:28px;background:linear-gradient(#fff6c9,#ffd9f0);border:6px solid #ffd34d;font-size:72px;line-height:108px;text-align:center;color:#c98a4b;cursor:pointer;z-index:10`,s[1]);
      b.className='bob';tap(b,()=>{if(s[0]===target[0]){AUD.sfx('chime');AUD.say(s[0]);burst(r,x+60,y+60,['⭐','✨'],8);SAVE.sm[s[0]]=(SAVE.sm[s[0]]||0)+1;save();got++;round++;later(700,next)}
        else{AUD.sfx('pop');anim(b,'wob');AUD.say(s[0])}})})}
  next()}};

// Jewel Hunt: weave counting 1-10 + letters A-Z + colors as castle treasure hunt
SCR.jewels={bg:'castle',show(r){AUD.music('home');AUD.say('star');SAVE.jewels=SAVE.jewels||[];SAVE.jh=SAVE.jh||0;
  let round=0,score=0;const N=10;
  const hud=el('div',r,`position:absolute;left:${W/2-200}px;top:36px;width:400px;text-align:center;font-size:36px;color:#fff;-webkit-text-stroke:4px #c2378f;paint-order:stroke fill;z-index:50`,'💎 Jewel Hunt!');
  const board=el('div',r,'position:absolute;inset:0;z-index:5');
  const kinds=['count','letter','color'];
  function next(){board.innerHTML='';if(round>=N){hud.textContent='💎 Treasure found!';cheer();confetti(r,32);daily(r,'jwlSt');SAVE.jh=(SAVE.jh||0)+score;if(SAVE.jewels.indexOf('hunt')<0&&score>=7){SAVE.jewels.push('hunt');save()}
    if(score>=7)later(700,()=>stickerUp(r));later(2000,()=>again(r,'jewels'));
    el('div',r,`position:absolute;left:${W/2-120}px;top:${H/2-40}px;font-size:56px;z-index:60;color:#fff;-webkit-text-stroke:4px #c2378f`,`💎 ${score}/${N}`);return}
    const kind=kinds[round%3];
    if(kind==='count'){const n=1+(Math.random()*10|0);hud.textContent='Count the gems! Find '+n;AUD.say('n'+n);
      // always draw at least n gems (plus 2-4 rocks), on a jittered grid so nothing overlaps or hides a gem
      const total=n+2+(Math.random()*3|0);let placed=0;const COLS=8,ROWS=4,cw=(W-200)/COLS,ch=(H-300)/ROWS;
      const spots=shuf([...Array(COLS*ROWS).keys()]).slice(0,total);
      for(let i=0;i<total;i++){const is=i<n;const cx=spots[i]%COLS,cy=spots[i]/COLS|0;const x=80+cx*cw+Math.random()*Math.max(0,cw-80),y=150+cy*ch+Math.random()*Math.max(0,ch-80);
        const g=el('div',board,`position:absolute;left:${x}px;top:${y}px;font-size:64px;cursor:pointer;z-index:10`,is?'💎':'🪨');
        tap(g,()=>{if(g.dataset.u)return;g.dataset.u=1;if(is){placed++;AUD.say('n'+placed);AUD.sfx('chime');burst(r,x+20,y,['✨'],4);g.style.opacity=.35;
          if(placed===n){score++;SAVE.nm[n]=1;save();round++;later(600,next)}}else{AUD.sfx('pop');anim(g,'wob')}})}}
    else if(kind==='letter'){const LTR=ABC[Math.random()*26|0];hud.textContent='Find the letter '+LTR+'!';AUD.say('ln_'+LTR);
      const opts=shuf([LTR,...shuf(ABC.filter(c=>c!==LTR)).slice(0,4)]);
      opts.forEach((c,i)=>{const x=W*.15+i*(W*.15),y=H*.45;
        const b=btn(board,c,`left:${x}px;top:${y}px;width:110px;height:110px;font-size:64px`,()=>{if(c===LTR){AUD.sfx('chime');AUD.say('lf_'+c);SAVE.lm[c]=(SAVE.lm[c]||0)+1;save();score++;burst(r,x+55,y+55,['⭐'],6);round++;later(700,next)}else{AUD.sfx('pop');AUD.say('ln_'+c)}});b.classList.add('hub')})}
    else{const COLS=[['c_red','#ff6b6b'],['c_blue','#6cc6ff'],['c_yellow','#ffd34d'],['c_green','#7ee08a'],['c_pink','#ff8fc8'],['c_purple','#b28dff']];
      const target=COLS[Math.random()*COLS.length|0];hud.textContent='Tap the '+target[0].slice(2)+' jewel!';AUD.say(target[0]);
      const opts=shuf(COLS);
      opts.forEach((c,i)=>{const x=W*.12+i*(W*.14),y=H*.42;
        const b=el('div',board,`position:absolute;left:${x}px;top:${y}px;width:100px;height:100px;border-radius:50%;background:${c[1]};border:6px solid #fff;cursor:pointer;z-index:10;font-size:48px;line-height:88px;text-align:center`,'💎');
        tap(b,()=>{if(c[0]===target[0]){AUD.sfx('chime');AUD.say(c[0]);SAVE.cm[c[0]]=(SAVE.cm[c[0]]||0)+1;save();score++;burst(r,x+50,y+50,['💖'],6);round++;later(700,next)}else{AUD.sfx('pop');AUD.say(c[0]);anim(b,'wob')}})})}}
  next()}};

// Tea party: upgrade shape cookies into a quick match-3 shape snack game
(function(){const s=SCR.tea.show;SCR.tea.show=function(r){s.call(this,r);
  const play=btn(r,'🍪',`left:24px;top:${H-140}px;width:120px;height:110px;font-size:60px;z-index:45`,()=>{
    const ov=el('div',r,'position:absolute;inset:0;background:rgba(255,240,250,.92);z-index:80');
    const SHP=[['sh_circle','●'],['sh_square','■'],['sh_triangle','▲'],['sh_heart','♥'],['sh_star','★']];
    let need=shuf(SHP)[0],got=0;const title=el('div',ov,`position:absolute;left:0;right:0;top:40px;text-align:center;font-size:40px;color:#b03a8a`,'Feed me '+need[1]+' cookies!');AUD.say(need[0]);
    for(let i=0;i<10;i++){const s2=SHP[i%5];const c=el('div',ov,`position:absolute;left:${80+(i%5)*140}px;top:${160+((i/5)|0)*140}px;width:100px;height:100px;font-size:70px;line-height:100px;text-align:center;color:#c98a4b;cursor:pointer`,s2[1]);
      tap(c,()=>{if(s2[0]===need[0]){c.remove();AUD.say(s2[0]);AUD.sfx('chime');got++;AUD.say('n'+got);if(got>=3){cheer();confetti(ov,16);SAVE.sm[need[0]]=(SAVE.sm[need[0]]||0)+1;save();daily(ov,'teaSh');later(1200,()=>ov.remove())}}else{anim(c,'wob');AUD.say(s2[0])}})}
    btn(ov,'🏰',`left:${W/2-60}px;top:${H-140}px;width:120px;height:100px;font-size:60px`,()=>ov.remove())});
  play.classList.add('pulse')}})();

// Garden: after bloom count, offer letter flower pick
(function(){const s=SCR.garden.show;SCR.garden.show=function(r){s.call(this,r);
  btn(r,'🔤',`left:${W-150}px;top:250px;width:120px;height:104px;font-size:56px;z-index:40`,()=>{
    const LTR=ABC[Math.random()*26|0];AUD.say('ln_'+LTR);
    const ov=el('div',r,'position:absolute;inset:0;background:rgba(200,255,220,.9);z-index:80');
    el('div',ov,`position:absolute;left:0;right:0;top:50px;text-align:center;font-size:44px;color:#2a7a3a`,'Pick flower '+LTR+'!');
    const opts=shuf([LTR,...shuf(ABC.filter(c=>c!==LTR)).slice(0,4)]);
    opts.forEach((c,i)=>{btn(ov,c+'🌸',`left:${W*.12+i*(W*.15)}px;top:${H*.4}px;width:120px;height:120px;font-size:48px`,()=>{if(c===LTR){AUD.sfx('chime');SAVE.lm[c]=(SAVE.lm[c]||0)+1;save();cheer();confetti(ov,12);later(1000,()=>ov.remove())}else AUD.say('ln_'+c)})});
    btn(ov,'🏰',`left:${W/2-60}px;top:${H-140}px;width:120px;height:100px;font-size:60px`,()=>ov.remove())})}})();

// Album shows jewel + color/shape mastery
(function(){const s=SCR.album.show;SCR.album.show=function(r){s.call(this,r);
  const j=(SAVE.jewels||[]).map(k=>({color:'💎',shape:'🔷',hunt:'👑'}[k]||'⭐')).join(' ')||'—';
  el('div',r,`position:absolute;left:40px;top:40px;padding:8px 18px;border-radius:24px;background:rgba(255,255,255,.9);font-size:28px;color:#b03a8a;z-index:50`,'Jewels '+j);
  const nC=Object.keys(SAVE.cm||{}).length,nS=Object.keys(SAVE.sm||{}).length;
  el('div',r,`position:absolute;right:40px;top:40px;padding:8px 18px;border-radius:24px;background:rgba(255,255,255,.9);font-size:26px;color:#7a4cff;z-index:50`,`🎨 ${nC}/8  🔷 ${nS}/5`);
}})();
