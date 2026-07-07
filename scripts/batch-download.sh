#!/bin/bash
# Final batch download with correct JSON parsing
DIR="/home/z/my-project/public/tours"

dl_from_search() {
  local file="$1" query="$2"
  echo -n "[$file] "
  
  z-ai image-search -q "$query" --count 3 --gl us --no-rank 2>/dev/null > /tmp/zai-out.json || true
  
  local url=$(python3 -c "
import json
with open('/tmp/zai-out.json') as f:
    text = f.read()
idx = text.index('{\n  \"success\"')
d = json.loads(text[idx:])
results = d.get('results', [])
if not results: exit(1)
best = max(results, key=lambda r: int(r.get('original_width','0').replace('px','')))
print(best.get('original_url',''))
" 2>/dev/null)
  
  if [ -z "$url" ]; then echo "NO URL"; return 1; fi
  
  curl -sL -o "$DIR/$file" --max-time 30 "$url"
  local size=$(stat -c%s "$DIR/$file" 2>/dev/null || echo 0)
  if [ "$size" -lt 5000 ]; then echo "SMALL (${size}B)"; rm -f "$DIR/$file"; return 1; fi
  
  local dims=$(python3 -c "
from PIL import Image
img = Image.open('$DIR/$file')
print(f'{img.size[0]}x{img.size[1]}')
" 2>/dev/null || echo "?")
  echo "OK $dims ${size}/1024 | bc KB"
}

dl_from_search "machu-picchu.jpg" "Machu Picchu Peru citadel sunrise golden hour luxury"
dl_from_search "machu-picchu-2.jpg" "Machu Picchu Peru terraces ancient ruins panoramic view"
dl_from_search "sacred-valley.jpg" "Sacred Valley Peru wide landscape green terraces Andes mountains"
dl_from_search "sacred-valley-2.jpg" "Sacred Valley Peru Ollantaytambo Inca fortress ruins terraces"
dl_from_search "rainbow-mountain.jpg" "Rainbow Mountain Vinicunca Peru colorful stripes clear sky hiking"
dl_from_search "rainbow-mountain-2.jpg" "Rainbow Mountain Peru Vinicunca panoramic colorful stripes travelers"
dl_from_search "humantay-lagoon.jpg" "Humantay Lagoon Peru turquoise water snow capped mountains Andes trekking"
dl_from_search "inca-trail-2.jpg" "Inca Trail Peru hikers trekking stone path Andes real travelers"
dl_from_search "cusco-city.jpg" "Cusco Peru Plaza de Armas colonial architecture cathedral city twilight"
dl_from_search "arequipa-city.jpg" "Arequipa Peru White City Misti volcano sillar colonial architecture"
dl_from_search "colca-canyon.jpg" "Colca Canyon Peru Andes mountains condor flight deep canyon viewpoint"
dl_from_search "lima-city.jpg" "Lima Peru coast city skyline Pacific Ocean Miraflores modern"
dl_from_search "cusco-lima-package.jpg" "Peru travel panoramic Cusco Andes mountains Machu Picchu luxury"

echo ""
echo "=== FINAL VERIFICATION ==="
python3 -c "
import os
from PIL import Image
d = '$DIR'
ok = fail = low = 0
for f in sorted(os.listdir(d)):
    if f.endswith(('.jpg','.jpeg','.png','.webp')):
        path = os.path.join(d, f)
        try:
            img = Image.open(path)
            size = os.path.getsize(path)
            w, h = img.size
            if w >= 2000: s = '✓ HD'
            elif w >= 1200: s = '~ OK'; low += 1
            else: s = '⚠ LOW'; low += 1
            print(f'{s} {f}: {w}x{h} ({size/1024:.0f}KB)')
            ok += 1
        except:
            print(f'✗ {f}: ERROR')
            fail += 1
# Hero
path = '/home/z/my-project/public/hero-bg.jpg'
img = Image.open(path)
print(f'✓ HD hero-bg.jpg: {img.size[0]}x{img.size[1]} ({os.path.getsize(path)/1024:.0f}KB)')
print(f'\nValid: {ok+1}, Low-res: {low}, Failed: {fail}')
"