import { chromium } from 'playwright';

async function checkTourScroll() {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15'
  });
  const page = await ctx.newPage();

  // Check tour detail page
  console.log('=== CHECKING /tours/machu-picchu ===');
  await page.goto('http://localhost:3000/tours/machu-picchu', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Get body background
  const bodyBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  console.log('Body bg:', bodyBg);

  // Check hero section bg
  const heroBg = await page.evaluate(() => {
    const hero = document.querySelector('section');
    return hero ? getComputedStyle(hero).backgroundColor : 'no section found';
  });
  console.log('First section bg:', heroBg);

  // Check for any cream/white gaps
  const allBgs = await page.evaluate(() => {
    const sections = document.querySelectorAll('section, div, main');
    const results: { tag: string; bg: string; rect: string }[] = [];
    for (const el of Array.from(sections).slice(0, 20)) {
      const style = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      if (rect.height > 50) {
        results.push({
          tag: el.tagName + (el.className ? '.' + String(el.className).split(' ')[0].substring(0, 30) : ''),
          bg: style.backgroundColor,
          rect: `${Math.round(rect.top)},${Math.round(rect.left)} ${Math.round(rect.width)}x${Math.round(rect.height)}`
        });
      }
    }
    return results;
  });
  console.log('\nTop sections backgrounds:');
  allBgs.forEach(s => console.log(`  ${s.tag}: bg=${s.bg} at=${s.rect}`));

  // Scroll down a bit and check
  console.log('\n--- After scrolling 200px ---');
  await page.evaluate(() => window.scrollTo(0, 200));
  await page.waitForTimeout(500);
  const bodyBgAfter = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  console.log('Body bg after scroll:', bodyBgAfter);

  // Take screenshot
  await page.screenshot({ path: '/home/z/my-project/upload/tour-scroll-check.png', fullPage: false });
  console.log('Screenshot saved: tour-scroll-check.png');

  // Check /tour-packages/cusco/machu-picchu
  console.log('\n=== CHECKING /tour-packages/cusco/machu-picchu ===');
  await page.goto('http://localhost:3000/tour-packages/cusco/machu-picchu', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  const bodyBg2 = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  console.log('Body bg:', bodyBg2);
  await page.screenshot({ path: '/home/z/my-project/upload/tourpkg-scroll-check.png', fullPage: false });
  console.log('Screenshot saved: tourpkg-scroll-check.png');

  await browser.close();
}

checkTourScroll().catch(console.error);
