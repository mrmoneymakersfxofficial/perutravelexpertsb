#!/usr/bin/env python3
"""Download remaining images via z-ai image-search CDN (guaranteed reachable)."""
import subprocess, json, os, urllib.request, ssl, time

ctx = ssl.create_default_context()
ctx.check_hostname = False  
ctx.verify_mode = ssl.CERT_NONE

DIR = "/home/z/my-project/public/tours"

SEARCHES = [
    ("machu-picchu.jpg", "Machu Picchu Peru citadel golden hour cinematic luxury"),
    ("machu-picchu-2.jpg", "Machu Picchu terraces close-up Peru ancient ruins"),
    ("sacred-valley.jpg", "Sacred Valley Peru wide landscape drone terraces"),
    ("sacred-valley-2.jpg", "Sacred Valley Peru agricultural terraces green mountains"),
    ("rainbow-mountain.jpg", "Rainbow Mountain Vinicunca Peru colorful clear sky hikers"),
    ("rainbow-mountain-2.jpg", "Rainbow Mountain Peru colorful stripes panoramic landscape"),
    ("humantay-lagoon.jpg", "Humantay Lagoon Peru turquoise water snow mountains Andes"),
    ("inca-trail-2.jpg", "Inca Trail Peru hikers stone path real travelers trekking"),
    ("cusco-city.jpg", "Cusco Peru Plaza de Armas colonial architecture city view"),
    ("arequipa-city.jpg", "Arequipa Peru White City Misti volcano colonial sillar architecture"),
    ("colca-canyon.jpg", "Colca Canyon Peru condor flight deep Andes mountains"),
    ("lima-city.jpg", "Lima Peru coast city skyline Pacific Ocean modern"),
    ("cusco-lima-package.jpg", "Peru travel Cusco Machu Picchu panoramic landscape"),
]

def search_images(query):
    """Use z-ai CLI to search images, return results list."""
    try:
        result = subprocess.run(
            ["z-ai", "image-search", "-q", query, "--count", "3", "--gl", "us", "--no-rank", "-o", "/tmp/zai-img.json"],
            capture_output=True, text=True, timeout=120
        )
        with open("/tmp/zai-img.json") as f:
            data = json.load(f)
        return data.get("results", [])
    except Exception as e:
        print(f"  Search error: {e}")
        return []

def download_url(url, output_path):
    """Download image from URL to file."""
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=30, context=ctx) as resp:
        data = resp.read()
    with open(output_path, 'wb') as f:
        f.write(data)
    return len(data)

def main():
    from PIL import Image
    
    success = 0
    failed = 0
    skipped = 0
    
    for filename, query in SEARCHES:
        filepath = os.path.join(DIR, filename)
        
        # Check if already downloaded and high-res
        if os.path.exists(filepath):
            try:
                img = Image.open(filepath)
                w, h = img.size
                if w >= 2000:
                    print(f"[{filename}] SKIP (already {w}x{h})")
                    skipped += 1
                    continue
            except:
                pass
        
        print(f"\n[{filename}] Searching: {query[:60]}...")
        results = search_images(query)
        
        if not results:
            print(f"  No results found")
            failed += 1
            continue
        
        # Try each result, pick best (highest resolution)
        best_url = None
        best_width = 0
        
        for r in results:
            url = r.get("original_url", "")
            w = int(r.get("original_width", "0").replace("px", ""))
            if url and w > best_width:
                best_width = w
                best_url = url
        
        if not best_url:
            print(f"  No valid URLs")
            failed += 1
            continue
        
        print(f"  Best: {best_width}px from {results[0].get('source', '?')}")
        print(f"  Downloading: {best_url[:70]}...")
        
        try:
            size = download_url(best_url, filepath)
            img = Image.open(filepath)
            w, h = img.size
            print(f"  OK: {w}x{h} ({size//1024}KB)")
            
            # If too small, try next result
            if w < 1200:
                print(f"  WARNING: Low resolution, keeping anyway")
            success += 1
        except Exception as e:
            print(f"  Download FAILED: {e}")
            failed += 1
        
        time.sleep(2)
    
    print(f"\n{'='*50}")
    print(f"Results: {success} downloaded, {skipped} skipped, {failed} failed")

if __name__ == "__main__":
    main()