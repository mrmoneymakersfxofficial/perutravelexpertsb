import { chromium } from 'playwright';

const BASE = 'http://localhost:3000';

async function screenshot(page, name, url) {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `/home/z/my-project/upload/fix-${name}.png`, fullPage: false });
  console.log(`  OK: fix-${name}.png`);
}

(async () => {
  const browser = await chromium.launch();
  
  // Mobile
  const mobile = await browser.newPage({ viewport: { width: 394, height: 727 } });
  console.log('=== Mobile ===');
  await screenshot(mobile, 'mobile-home', BASE);
  await screenshot(mobile, 'mobile-tour', `${BASE}/tours/machu-picchu`);
  await screenshot(mobile, 'mobile-tourpkg', `${BASE}/tour-packages/cusco/machu-picchu`);
  await mobile.close();

  // Desktop
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  console.log('=== Desktop ===');
  await screenshot(desktop, 'desktop-home', BASE);
  await screenshot(desktop, 'desktop-tour', `${BASE}/tours/machu-picchu`);
  await screenshot(desktop, 'desktop-tourpkg', `${BASE}/tour-packages/cusco/machu-picchu`);
  await desktop.close();

  await browser.close();
  console.log('\nDone!');
})();