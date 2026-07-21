import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  // Scroll to #tours
  await page.evaluate(() => {
    const el = document.querySelector('#tours');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(1000);
  
  // Take screenshot of the button area specifically
  const section = await page.$('#tours');
  if (section) {
    const box = await section.boundingBox();
    if (box) {
      // Focus on bottom portion where buttons are
      await page.screenshot({ 
        path: '/home/z/my-project/upload/review-button-close.png',
        clip: { x: box.x + 200, y: box.y + box.height - 200, width: box.width - 400, height: 150 }
      });
      console.log('✅ Button close-up captured');
    }
  }
  
  // Full page for transitions
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '/home/z/my-project/upload/review-home-final.png', fullPage: true });
  console.log('✅ Full homepage captured');
  
  // Mobile
  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await mobile.waitForTimeout(2000);
  await mobile.screenshot({ path: '/home/z/my-project/upload/review-mobile-final.png', fullPage: true });
  console.log('✅ Mobile homepage captured');

  await browser.close();
})();
