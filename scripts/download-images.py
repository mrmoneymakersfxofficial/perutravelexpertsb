#!/usr/bin/env python3
"""
Download ultra-HD images from Unsplash for PeruTravelExpertsB.
Each image downloaded at 2400px wide, quality 85, auto-format (WebP preferred).
"""
import os
import urllib.request
import ssl
import time

ssl_ctx = ssl.create_default_context()
ssl_ctx.check_hostname = False
ssl_ctx.verify_mode = ssl.CERT_NONE

OUTPUT_DIR = "/home/z/my-project/public/tours"
HERO_OUTPUT = "/home/z/my-project/public/hero-bg.jpg"

# (local_filename, unsplash_photo_id, description)
IMAGES = [
    ("hero-bg.jpg", "1526398530483-8e4df3b2fd0f", "Machu Picchu panoramic sunrise"),
    ("machu-picchu.jpg", "1587595431970-160e0d6848b6", "Machu Picchu citadel sunrise VIP"),
    ("machu-picchu-2.jpg", "1526392060635-9d6019882c72", "Machu Picchu terraces golden hour"),
    ("sacred-valley.jpg", "1570077188670-e1a8d718d1af", "Sacred Valley wide landscape terraces"),
    ("sacred-valley-2.jpg", "1580619305658-8af3b8b3e5d0", "Sacred Valley terraces drone view"),
    ("rainbow-mountain.jpg", "1588347425838-4b1c0e5b9f84", "Rainbow Mountain Vinicunca clear sky"),
    ("rainbow-mountain-2.jpg", "1621292234814-35d0b065e714", "Rainbow Mountain hikers panoramic"),
    ("humantay-lagoon.jpg", "1626789065342-4bd4ec5f18d8", "Humantay Lagoon turquoise snow mountains"),
    ("humantay-lagoon-2.jpg", "1605296828728-e0b4e5e0d69a", "Humantay Lake turquoise Andean peaks"),
    ("inca-trail.jpg", "1599703090004-7e6e0e46c5f5", "Inca Trail trekking stone path mountains"),
    ("inca-trail-2.jpg", "1580306007839-4e64c69a8e20", "Inca Trail hikers Andean landscape"),
    ("inka-trail-2d.jpg", "1564536776987-447347eb865c", "Inca Trail stone steps fog mist"),
    ("inka-trail-5d.jpg", "1559827280-2655b9665758", "Inca Trail Salkantay mountain extended"),
    ("cusco-city.jpg", "1580619308742-8e071a6b2c6b", "Cusco Plaza de Armas twilight"),
    ("cusco-city-2.jpg", "1580306007839-4e64c69a8e20", "Cusco Sacsayhuaman panoramic golden hour"),
    ("titikaka-lake.jpg", "1598850896800-8f2e39e7fd22", "Lake Titicaca floating islands Uros"),
    ("amazon-jungle.jpg", "1516026678027-9e4677423c65", "Amazon rainforest river Peru canopy"),
    ("amazon-homestay.jpg", "1545204102-e8c8e92e2e18", "Amazon river lodge eco experience"),
    ("arequipa-city.jpg", "1569234783969-0c9a5e13cfb0", "Arequipa White City Misti volcano"),
    ("colca-canyon.jpg", "1559827239-0b5f6c7b8bbf", "Colca Canyon condor flight Peru"),
    ("lima-city.jpg", "1568322445389-f64c1f4ab896", "Lima Peru coast skyline Pacific"),
    ("ica-desert.jpg", "1596402586016-2b13797e7f84", "Huacachina oasis desert dunes Ica"),
    ("cusco-lima-package.jpg", "1580619308742-8e071a6b2c6b", "Cusco Lima travel package panoramic"),
    ("andean-community.jpg", "1573865808962-3d0e8e8b78e4", "Andean community traditional weaving Peru"),
]

def download(photo_id, width=2400, quality=85):
    url = f"https://images.unsplash.com/photo-{photo_id}?w={width}&q={quality}&fit=crop&auto=format"
    req = urllib.request.Request(url, headers={
        'User-Agent': 'Mozilla/5.0 (compatible; PeruTravelExpertsB/1.0)'
    })
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=30, context=ssl_ctx) as resp:
                data = resp.read()
                if len(data) < 10000:
                    time.sleep(2)
                    continue
                return data
        except Exception as e:
            print(f"  Attempt {attempt+1} failed: {e}")
            time.sleep(2)
    raise RuntimeError(f"Failed after 3 attempts")

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    success = failed = 0
    for filename, photo_id, desc in IMAGES:
        out = os.path.join(OUTPUT_DIR, filename) if filename != "hero-bg.jpg" else HERO_OUTPUT
        print(f"\n[{filename}] {desc}")
        try:
            data = download(photo_id)
            with open(out, 'wb') as f:
                f.write(data)
            print(f"  OK {len(data)//1024}KB")
            success += 1
        except Exception as e:
            print(f"  FAIL: {e}")
            failed += 1
        time.sleep(0.5)
    print(f"\nDone: {success} ok, {failed} failed")

if __name__ == "__main__":
    main()