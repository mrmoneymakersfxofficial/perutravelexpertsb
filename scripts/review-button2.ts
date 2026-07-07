import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  
  // Scroll to #tours section
  await page.evaluate(() => {
    const el = document.querySelector('#tours');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(1500);
  
  // Full section screenshot
  await page.screenshot({ path: '/home/z/my-project/upload/review-tours-btn.png' });
  console.log('✅ Tours section captured');

  // Full page for transitions
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/home/z/my-project/upload/review-home-final.png', fullPage: true });
  console.log('✅ Full homepage captured');
  
  // Mobile full page
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await mobile.waitForTimeout(3000);
  await mobile.screenshot({ path: '/home/z/my-project/upload/review-mobile-final.png', fullPage: true });
  console.log('✅ Mobile homepage captured');

  await browser.close();
})();
