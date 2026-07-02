"""Batch URL replacement script for the tour-packages/customized-tours restructure."""
import os

BASE = '/home/z/my-project/src'

FILES_CUSTOMIZED_TO_TOUR = [
    f'{BASE}/components/layout/Header.tsx',
    f'{BASE}/components/layout/Footer.tsx',
    f'{BASE}/components/sections/HeroSection.tsx',
    f'{BASE}/components/sections/CTASection.tsx',
    f'{BASE}/components/sections/FeaturedToursSection.tsx',
    f'{BASE}/components/BottomNavigation.tsx',
    f'{BASE}/components/ShareTour.tsx',
    f'{BASE}/app/not-found.tsx',
    f'{BASE}/app/tour-packages/page.tsx',
    f'{BASE}/app/tour-packages/CustomizedToursClient.tsx',
    f'{BASE}/app/tour-packages/[slug]/page.tsx',
    f'{BASE}/app/tour-packages/[slug]/CustomizedTourDetailClient.tsx',
    f'{BASE}/app/tours/ToursClient.tsx',
    f'{BASE}/app/tours/[slug]/TourSlugClient.tsx',
    f'{BASE}/app/projects-we-support/[slug]/ProjectDetailClient.tsx',
    f'{BASE}/app/sitemap.ts',
]

OUR_TOURS_FILES = [
    f'{BASE}/app/our-tours/page.tsx',
    f'{BASE}/app/our-tours/TourPackagesClient.tsx',
    f'{BASE}/app/our-tours/[destination]/page.tsx',
    f'{BASE}/app/our-tours/[destination]/DestinationClient.tsx',
    f'{BASE}/app/our-tours/[destination]/[slug]/page.tsx',
    f'{BASE}/app/our-tours/[destination]/[slug]/TourDetailClient.tsx',
]

def replace_in_file(filepath, old, new):
    with open(filepath, 'r') as f:
        content = f.read()
    count = content.count(old)
    if count > 0:
        content = content.replace(old, new)
        with open(filepath, 'w') as f:
            f.write(content)
        print(f'  ✅ {os.path.relpath(filepath, BASE)}: {count}x {old} → {new}')
    else:
        print(f'  ⏭️  {os.path.relpath(filepath, BASE)}: no {old}')

print('=== Phase 1: /customized-tours → /tour-packages ===')
for f in FILES_CUSTOMIZED_TO_TOUR:
    if os.path.exists(f):
        replace_in_file(f, '/customized-tours', '/tour-packages')

print('\n=== Phase 2: /tour-packages → /our-tours (in our-tours files) ===')
for f in OUR_TOURS_FILES:
    if os.path.exists(f):
        replace_in_file(f, '/tour-packages', '/our-tours')

print('\nDone!')