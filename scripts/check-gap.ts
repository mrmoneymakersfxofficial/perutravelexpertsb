import { chromium } from 'playwright';

async function checkGap() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)'
  });
  const page = await ctx.newPage();

  await page.goto('http://localhost:3000/tours/machu-picchu', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Check where the hero section starts relative to viewport
  const heroInfo = await page.evaluate(() => {
    const hero = document.querySelector('section.relative');
    if (!hero) return 'NO HERO FOUND';
    const rect = hero.getBoundingClientRect();
    const main = document.querySelector('main');
    const mainRect = main?.getBoundingClientRect();
    const header = document.querySelector('header');
    const headerRect = header?.getBoundingClientRect();
    return {
      heroTop: Math.round(rect.top),
      heroHeight: Math.round(rect.height),
      mainTop: mainRect ? Math.round(mainRect.top) : null,
      mainPaddingTop: main ? getComputedStyle(main).paddingTop : null,
      headerHeight: headerRect ? Math.round(headerRect.height) : null,
      headerBottom: headerRect ? Math.round(headerRect.bottom) : null,
    };
  });
  console.log('Layout info:', JSON.stringify(heroInfo, null, 2));

  // Take screenshot
  await page.screenshot({ path: '/home/z/my-project/upload/gap-check.png', fullPage: false });
  console.log('Screenshot saved: gap-check.png');

  await browser.close();
}

checkGap().catch(console.error);
