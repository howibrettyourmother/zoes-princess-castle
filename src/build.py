# Bundle into one self-contained index.html: backgrounds (jpg), voice clips (Piper mp3), font, game.
import base64,json,os
D=os.path.dirname(os.path.abspath(__file__));b64=lambda p:base64.b64encode(open(p,'rb').read()).decode()
keys=[l.split('|')[0] for l in open(f'{D}/lines.txt').read().split('\n') if l.strip()]
data={'clips':{k:b64(f'{D}/clips/{k}.mp3') for k in keys},'silent':'data:audio/mpeg;base64,'+b64(f'{D}/clips/silent.mp3'),
 'bg':{n:'data:image/jpeg;base64,'+b64(f'{D}/bg_{n}.jpg') for n in ['castle','meadow','ballroom','tea','bedroom']}}
t=open(f'{D}/template.html').read().replace('/*__FONT__*/',b64(f'{D}/baloo.woff')).replace('/*__DATA__*/','const DATA='+json.dumps(data,separators=(',',':'))+';').replace('/*__GAME__*/',open(f'{D}/game.js').read())
open(f'{D}/../index.html','w').write(t);print(len(t),'bytes')
