# Bundle into one self-contained index.html: backgrounds (jpg), voice clips (Piper mp3), font, game.
import base64,json,os
D=os.path.dirname(os.path.abspath(__file__));b64=lambda p:base64.b64encode(open(p,'rb').read()).decode()
keys=[l.split('|')[0] for l in open(f'{D}/lines.txt').read().split('\n') if l.strip()]
import shutil,glob
A=f'{D}/../assets';os.makedirs(f'{A}/c',exist_ok=True)
for f in glob.glob(f'{A}/c/*.mp3')+glob.glob(f'{A}/bg_*.jpg'):os.remove(f)
for k in keys:shutil.copy(f'{D}/clips/{k}.mp3',f'{A}/c/{k}.mp3')
BG=['castle','meadow','ballroom','tea','bedroom','bedroom2','school','town','bath','stable','garden']
for n in BG:shutil.copy(f'{D}/bg_{n}.jpg',f'{A}/bg_{n}.jpg')
data={'ck':keys,'silent':'data:audio/mpeg;base64,'+b64(f'{D}/clips/silent.mp3'),'bg':{n:f'assets/bg_{n}.jpg' for n in BG}}
# service worker: precache every file, tolerant per-file install
import re
sw=open(f'{D}/../sw.js').read()
lst=["./","index.html","manifest.json","apple-touch-icon-120.png","apple-touch-icon-152.png","apple-touch-icon-167.png","apple-touch-icon.png","favicon-32.png","icon-192.png","icon-512.png","og.jpg"]+[f'assets/bg_{n}.jpg' for n in BG]+[f'assets/c/{k}.mp3' for k in keys]
sw=re.sub(r"A=\[.*?\];","A="+json.dumps(lst)+";",sw,flags=re.S)
open(f'{D}/../sw.js','w').write(sw)
t=open(f'{D}/template.html').read().replace('/*__FONT__*/',b64(f'{D}/baloo.woff')).replace('/*__DATA__*/','const DATA='+json.dumps(data,separators=(',',':'))+';').replace('/*__GAME__*/',open(f'{D}/game.js').read().replace('addEventListener(\'resize\',fit);',open(f'{D}/extra.js').read()+'\n'+open(f'{D}/v2.js').read()+'\n'+open(f'{D}/v3.js').read()+'\naddEventListener(\'resize\',fit);'))
open(f'{D}/../index.html','w').write(t);print(len(t),'bytes')
