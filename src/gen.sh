# Piper TTS -> pitched 24k mono mp3 clips (same pipeline as doodle-and-zoe)
set -e; D=$(cd $(dirname $0);pwd); mkdir -p /tmp/zpc && cd /tmp/zpc
[ -f silent.mp3 ] || ffmpeg -y -loglevel error -f lavfi -i anullsrc=r=24000:cl=mono -t 1 -b:a 32k silent.mp3
while IFS='|' read -r k t v pr; do [ -z "$k" ] && continue; [ "$v" = rec ] && continue; [ -f $k.mp3 ] && [ "$FORCE" != 1 ] && continue
  echo "$t" | /workspace/.tts/venv/bin/piper -m /workspace/.tts/en_US-$v-medium.onnx -f raw_$k.wav --length-scale 0.95 >/dev/null 2>&1
  ffmpeg -y -loglevel error -i raw_$k.wav -af "silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,asetrate=22050*$pr,aresample=24000,atempo=0.95,highpass=f=120,acompressor=threshold=-18dB:ratio=3,volume=1.7,alimiter=limit=0.95" -ac 1 -ar 24000 -b:a 32k $k.mp3
done < $D/lines.txt; cp /tmp/zpc/*.mp3 $D/clips/
