import { chromium } from 'playwright';

const BASE = 'http://localhost:3000';

async function screenshotGold(page, name, url) {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `/home/z/my-project/upload/gold-${name}.png`, fullPage: false });
  console.log(`  Captured: gold-${name}.png`);
}

(async () => {
  const browser = await chromium.launch();
  
  // Mobile view
  const mobile = await browser.newPage({ viewport: { width: 394, height: 727 } });
  
  console.log('=== Mobile (394x727) ===');
  await screenshotGold(mobile, 'mobile-home', BASE);
  await screenshotGold(mobile, 'mobile-tour-detail', `${BASE}/tours/machu-picchu`);
  await screenshotGold(mobile, 'mobile-tour-pkg', `${BASE}/tour-packages/cusco`);
  await mobile.close();

  // Desktop view
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  console.log('=== Desktop (1440x900) ===');
  await screenshotGold(desktop, 'desktop-home', BASE);
  await screenshotGold(desktop, 'desktop-tour-detail', `${BASE}/tours/machu-picchu`);
  await screenshotGold(desktop, 'desktop-tour-pkg', `${BASE}/tour-packages/cusco`);
  await desktop.close();

  await browser.close();
  console.log('\nDone! All screenshots saved to /home/z/my-project/upload/');
})();