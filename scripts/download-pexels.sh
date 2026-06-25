#!/bin/bash
# Download ultra-HD images from Pexels for PeruTravelExpertsB
# Usage: bash download-pexels.sh
set -e

DIR="/home/z/my-project/public/tours"
mkdir -p "$DIR"

# Helper: download from Pexels at 2400px wide
dl() {
  local out="$1" url="$2" desc="$3"
  echo -n "[$out] $desc ... "
  if curl -sL -o "$out" --max-time 30 "$url"; then
    local size=$(stat -c%s "$out" 2>/dev/null || echo 0)
    if [ "$size" -lt 5000 ]; then
      echo "FAIL (too small: ${size}B)"
      return 1
    fi
    echo "OK (${size}/1024 | bc)KB"
    return 0
  else
    echo "FAIL (download error)"
    return 1
  fi
}

echo "=== Downloading ultra-HD images from Pexels ==="

# HERO
dl "$DIR/../hero-bg.jpg" \
  "https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=2400&h=1600&fit=crop" \
  "Hero - Machu Picchu panoramic sunrise" || true

# MACHU PICCHU
dl "$DIR/machu-picchu.jpg" \
  "https://images.pexels.com/photos/2105472/pexels-photo-2105472.jpeg?auto=compress&cs=tinysrgb&w=2400&h=1600&fit=crop" \
  "Machu Picchu VIP sunrise golden hour" || true

dl "$DIR/machu-picchu-2.jpg" \
  "https://images.pexels.com/photos/1096951/pexels-photo-1096951.jpeg?auto=compress&cs=tinysrgb&w=2400&h=1600&fit=crop" \
  "Machu Picchu terraces golden hour" || true

# SACRED VALLEY
dl "$DIR/sacred-valley.jpg" \
  "https://images.pexels.com/photos/28774484/pexels-photo-28774484.jpeg?auto=compress&cs=tinysrgb&w=2400&h=1600&fit=crop" \
  "Sacred Valley wide drone landscape" || true

dl "$DIR/sacred-valley-2.jpg" \
  "https://images.pexels.com/photos/28774478/pexels-photo-28774478.jpeg?auto=compress&cs=tinysrgb&w=2400&h=1600&fit=crop" \
  "Sacred Valley terraces close-up" || true

# RAINBOW MOUNTAIN
dl "$DIR/rainbow-mountain.jpg" \
  "https://images.pexels.com/photos/1675453/pexels-photo-1675453.jpeg?auto=compress&cs=tinysrgb&w=2400&h=1600&fit=crop" \
  "Rainbow Mountain Vinicunca clear sky" || true

dl "$DIR/rainbow-mountain-2.jpg" \
  "https://images.pexels.com/photos/3263162/pexels-photo-3263162.jpeg?auto=compress&cs=tinysrgb&w=2400&h=1600&fit=crop" \
  "Rainbow Mountain colorful stripes panoramic" || true

# HUMANTAY LAGOON
dl "$DIR/humantay-lagoon.jpg" \
  "https://images.pexels.com/photos/3263162/pexels-photo-3263162.jpeg?auto=compress&cs=tinysrgb&w=2400&h=1600&fit=crop" \
  "Humantay Lagoon turquoise snow mountains" || true

dl "$DIR/humantay-lagoon-2.jpg" \
  "https://images.pexels.com/photos/7249230/pexels-photo-7249230.jpeg?auto=compress&cs=tinysrgb&w=2400&h=1600&fit=crop" \
  "Humantay Lake crystal clear Andean" || true

# INCA TRAIL
dl "$DIR/inca-trail.jpg" \
  "https://images.pexels.com/photos/1166608/pexels-photo-1166608.jpeg?auto=compress&cs=tinysrgb&w=2400&h=1600&fit=crop" \
  "Inca Trail trekking route stone path" || true

dl "$DIR/inca-trail-2.jpg" \
  "https://images.pexels.com/photos/1096951/pexels-photo-1096951.jpeg?auto=compress&cs=tinysrgb&w=2400&h=1600&fit=crop" \
  "Inca Trail hikers real travelers" || true

dl "$DIR/inka-trail-2d.jpg" \
  "https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=2400&h=1600&fit=crop" \
  "Inca Trail 2 day ancient ruins" || true

dl "$DIR/inka-trail-5d.jpg" \
  "https://images.pexels.com/photos/7264041/pexels-photo-7264041.jpeg?auto=compress&cs=tinysrgb&w=2400&h=1600&fit=crop" \
  "Inca Trail 5 day Salkantay mountain" || true

# CUSCO
dl "$DIR/cusco-city.jpg" \
  "https://images.pexels.com/photos/2263450/pexels-photo-2263450.jpeg?auto=compress&cs=tinysrgb&w=2400&h=1600&fit=crop" \
  "Cusco Plaza de Armas colonial twilight" || true

dl "$DIR/cusco-city-2.jpg" \
  "https://images.pexels.com/photos/1660809/pexels-photo-1660809.jpeg?auto=compress&cs=tinysrgb&w=2400&h=1600&fit=crop" \
  "Cusco Sacsayhuaman ruins panoramic" || true

# TITICACA
dl "$DIR/titikaka-lake.jpg" \
  "https://images.pexels.com/photos/3504409/pexels-photo-3504409.jpeg?auto=compress&cs=tinysrgb&w=2400&h=1600&fit=crop" \
  "Lake Titicaca floating islands Uros boats" || true

# AMAZON
dl "$DIR/amazon-jungle.jpg" \
  "https://images.pexels.com/photos/2090247/pexels-photo-2090247.jpeg?auto=compress&cs=tinysrgb&w=2400&h=1600&fit=crop" \
  "Amazon rainforest river jungle canopy" || true

dl "$DIR/amazon-homestay.jpg" \
  "https://images.pexels.com/photos/9942814/pexels-photo-9942814.jpeg?auto=compress&cs=tinysrgb&w=2400&h=1600&fit=crop" \
  "Amazon river lodge eco experience" || true

# AREQUIPA
dl "$DIR/arequipa-city.jpg" \
  "https://images.pexels.com/photos/28774484/pexels-photo-28774484.jpeg?auto=compress&cs=tinysrgb&w=2400&h=1600&fit=crop" \
  "Arequipa White City Misti volcano" || true

dl "$DIR/colca-canyon.jpg" \
  "https://images.pexels.com/photos/6756589/pexels-photo-6756589.jpeg?auto=compress&cs=tinysrgb&w=2400&h=1600&fit=crop" \
  "Colca Canyon condor flight deep Peru" || true

# LIMA & ICA
dl "$DIR/lima-city.jpg" \
  "https://images.pexels.com/photos/1666268/pexels-photo-1666268.jpeg?auto=compress&cs=tinysrgb&w=2400&h=1600&fit=crop" \
  "Lima Peru coast city skyline Pacific" || true

dl "$DIR/ica-desert.jpg" \
  "https://images.pexels.com/photos/15252712/pexels-photo-15252712.jpeg?auto=compress&cs=tinysrgb&w=2400&h=1600&fit=crop" \
  "Huacachina oasis desert dunes Ica" || true

# PACKAGES & COMMUNITY
dl "$DIR/cusco-lima-package.jpg" \
  "https://images.pexels.com/photos/2263450/pexels-photo-2263450.jpeg?auto=compress&cs=tinysrgb&w=2400&h=1600&fit=crop" \
  "Cusco Lima package panoramic Peru" || true

dl "$DIR/andean-community.jpg" \
  "https://images.pexels.com/photos/4614836/pexels-photo-4614836.jpeg?auto=compress&cs=tinysrgb&w=2400&h=1600&fit=crop" \
  "Andean community traditional weaving Peru" || true

echo ""
echo "=== Verifying dimensions ==="
python3 -c "
import os
from PIL import Image
d = '/home/z/my-project/public/tours'
for f in sorted(os.listdir(d)):
    if f.endswith(('.jpg','.jpeg','.png','.webp')):
        path = os.path.join(d, f)
        try:
            img = Image.open(path)
            size = os.path.getsize(path)
            w, h = img.size
            print(f'{f}: {w}x{h} ({size/1024:.0f}KB)')
        except Exception as e:
            print(f'{f}: ERROR {e}')
" 2>&1

echo ""
echo "=== Hero ==="
python3 -c "
import os
from PIL import Image
p = '/home/z/my-project/public/hero-bg.jpg'
img = Image.open(p)
print(f'hero-bg.jpg: {img.size[0]}x{img.size[1]} ({os.path.getsize(p)/1024:.0f}KB)')
" 2>&1

echo ""
echo "DONE"