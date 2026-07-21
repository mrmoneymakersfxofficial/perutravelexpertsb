import { chromium } from 'playwright';

const BASE = 'http://localhost:3000';

async function screenshot(page: any, path: string, fullPage = false) {
  await page.screenshot({ path, fullPage });
  console.log(`✅ ${path}`);
}

(async () => {
  const browser = await chromium.launch();
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });

  // 1. Homepage — full page to see transitions
  console.log('\n📸 Homepage desktop (full page)...');
  await desktop.goto(BASE, { waitUntil: 'networkidle' });
  await desktop.waitForTimeout(2000);
  await screenshot(desktop, '/home/z/my-project/upload/review-home-desktop-full.png', true);

  // 2. Homepage mobile
  console.log('📸 Homepage mobile (full page)...');
  await mobile.goto(BASE, { waitUntil: 'networkidle' });
  await mobile.waitForTimeout(2000);
  await screenshot(mobile, '/home/z/my-project/upload/review-home-mobile-full.png', true);

  // 3. Scroll to #tours section to see the white button
  console.log('📸 Homepage desktop — #tours section...');
  await desktop.goto(BASE, { waitUntil: 'networkidle' });
  await desktop.evaluate(() => {
    const el = document.querySelector('#tours');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await desktop.waitForTimeout(1000);
  await screenshot(desktop, '/home/z/my-project/upload/review-tours-section.png');

  // 4. Tour detail page (dark hero → cream content with bottomColor)
  console.log('📸 Tour detail — machu-picchu...');
  await desktop.goto(`${BASE}/tour-packages/cusco/machu-picchu`, { waitUntil: 'networkidle' });
  await desktop.waitForTimeout(2000);
  await screenshot(desktop, '/home/z/my-project/upload/review-tour-detail-machu.png');

  // 5. Tour packages listing
  console.log('📸 Tour packages listing...');
  await desktop.goto(`${BASE}/tour-packages`, { waitUntil: 'networkidle' });
  await desktop.waitForTimeout(2000);
  await screenshot(desktop, '/home/z/my-project/upload/review-tour-packages.png');

  // 6. Tours listing
  console.log('📸 Tours listing...');
  await desktop.goto(`${BASE}/tours`, { waitUntil: 'networkidle' });
  await desktop.waitForTimeout(2000);
  await screenshot(desktop, '/home/z/my-project/upload/review-tours-listing.png');

  // 7. Tour detail (/tours/slug) — TourSubpageHeroUltimate
  console.log('📸 Tour detail /tours/machu-picchu...');
  await desktop.goto(`${BASE}/tours/machu-picchu`, { waitUntil: 'networkidle' });
  await desktop.waitForTimeout(2000);
  await screenshot(desktop, '/home/z/my-project/upload/review-tours-slug-detail.png');

  // 8. Customized tours
  console.log('📸 Customized tours...');
  await desktop.goto(`${BASE}/customized-tours`, { waitUntil: 'networkidle' });
  await desktop.waitForTimeout(2000);
  await screenshot(desktop, '/home/z/my-project/upload/review-customized-tours.png');

  // 9. Projects we support
  console.log('📸 Projects we support...');
  await desktop.goto(`${BASE}/projects-we-support`, { waitUntil: 'networkidle' });
  await desktop.waitForTimeout(2000);
  await screenshot(desktop, '/home/z/my-project/upload/review-projects.png');

  // 10. Mobile tour detail
  console.log('📸 Mobile tour detail...');
  await mobile.goto(`${BASE}/tours/machu-picchu`, { waitUntil: 'networkidle' });
  await mobile.waitForTimeout(2000);
  await screenshot(mobile, '/home/z/my-project/upload/review-mobile-tour-detail.png');

  await browser.close();
  console.log('\n✨ All screenshots captured!');
})();