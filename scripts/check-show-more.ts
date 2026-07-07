import { chromium } from 'playwright';

async function checkShowMore() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)'
  });
  const page = await ctx.newPage();

  // 1. Tour detail page
  console.log('=== /tours/machu-picchu ===');
  await page.goto('http://localhost:3000/tours/machu-picchu', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500); // Wait for 2s delay + animation

  const indicator1 = await page.evaluate(() => {
    const btn = document.querySelector('[aria-label="Show more"]');
    return btn ? {
      visible: true,
      text: btn.textContent?.trim(),
      rect: btn.getBoundingClientRect(),
      display: getComputedStyle(btn).display,
      opacity: getComputedStyle(btn).opacity,
    } : { visible: false };
  });
  console.log('Show More indicator:', JSON.stringify(indicator1, null, 2));
  await page.screenshot({ path: '/home/z/my-project/upload/showmore-tour.png', fullPage: false });
  console.log('Screenshot: showmore-tour.png');

  // 2. Tour package detail
  console.log('\n=== /tour-packages/cusco/machu-picchu ===');
  await page.goto('http://localhost:3000/tour-packages/cusco/machu-picchu', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);

  const indicator2 = await page.evaluate(() => {
    const btn = document.querySelector('[aria-label="Show more"]');
    return btn ? { visible: true, text: btn.textContent?.trim() } : { visible: false };
  });
  console.log('Show More indicator:', JSON.stringify(indicator2, null, 2));
  await page.screenshot({ path: '/home/z/my-project/upload/showmore-tourpkg.png', fullPage: false });
  console.log('Screenshot: showmore-tourpkg.png');

  // 3. Tour packages listing
  console.log('\n=== /tour-packages ===');
  await page.goto('http://localhost:3000/tour-packages', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500);

  const indicator3 = await page.evaluate(() => {
    const btn = document.querySelector('[aria-label="Show more"]');
    return btn ? { visible: true, text: btn.textContent?.trim() } : { visible: false };
  });
  console.log('Show More indicator:', JSON.stringify(indicator3, null, 2));
  await page.screenshot({ path: '/home/z/my-project/upload/showmore-tourpackages.png', fullPage: false });
  console.log('Screenshot: showmore-tourpackages.png');

  await browser.close();
}

checkShowMore().catch(console.error);
