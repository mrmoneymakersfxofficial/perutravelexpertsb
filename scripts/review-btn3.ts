import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  // Scroll to the bottom of #tours section where buttons are
  await page.evaluate(() => {
    const el = document.querySelector('#tours');
    if (el) {
      const rect = el.getBoundingClientRect();
      window.scrollTo(0, rect.bottom - 400);
    }
  });
  await page.waitForTimeout(1500);
  
  await page.screenshot({ path: '/home/z/my-project/upload/review-tours-buttons-final.png' });
  console.log('✅ Tours buttons captured');

  await browser.close();
})();
