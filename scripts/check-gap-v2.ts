import { chromium } from 'playwright';

async function checkGap() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)'
  });
  const page = await ctx.newPage();

  // Tour detail
  await page.goto('http://localhost:3000/tours/machu-picchu', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const info = await page.evaluate(() => {
    const hero = document.querySelector('section.relative') || document.querySelector('section');
    const header = document.querySelector('header');
    return {
      heroTop: hero ? Math.round(hero.getBoundingClientRect().top) : null,
      headerBottom: header ? Math.round(header.getBoundingClientRect().bottom) : null,
      headerHeight: header ? Math.round(header.getBoundingClientRect().height) : null,
    };
  });
  console.log('Tour detail:', JSON.stringify(info));
  await page.screenshot({ path: '/home/z/my-project/upload/gap-fixed-tour.png', fullPage: false });
  console.log('Screenshot: gap-fixed-tour.png');

  // Tour package detail
  await page.goto('http://localhost:3000/tour-packages/cusco/machu-picchu', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: '/home/z/my-project/upload/gap-fixed-tourpkg.png', fullPage: false });
  console.log('Screenshot: gap-fixed-tourpkg.png');

  // Tour packages listing
  await page.goto('http://localhost:3000/tour-packages', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: '/home/z/my-project/upload/gap-fixed-listing.png', fullPage: false });
  console.log('Screenshot: gap-fixed-listing.png');

  await browser.close();
}

checkGap().catch(console.error);
