import { test, expect, Page } from '@playwright/test';

// ─── Helpers ───────────────────────────────────────────────────────────────────

/** Collect console errors during a test */
function collectConsoleErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  return errors;
}

/** Assert no horizontal overflow with 5px tolerance */
async function expectNoHorizontalOverflow(page: Page) {
  const hasOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth + 5;
  });
  expect(hasOverflow, 'Page should not have horizontal overflow').toBeFalsy();
}

/** Assert no broken images (all loaded images have naturalWidth > 0) */
async function expectNoBrokenImages(page: Page) {
  const brokenImages = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs
      .filter((img) => (img as HTMLImageElement).naturalWidth === 0)
      .map((img) => ({
        src: (img as HTMLImageElement).src,
        alt: (img as HTMLImageElement).alt || '(no alt)',
      }));
  });
  expect(brokenImages, 'No broken images expected').toHaveLength(0);
}

/** Assert no large empty gaps between consecutive sections (> 300px white space) */
async function expectNoLargeGaps(page: Page) {
  const largeGaps = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section, [class*="section"]'));
    const gaps: { from: string; to: string; gap: number }[] = [];
    for (let i = 1; i < sections.length; i++) {
      const prev = sections[i - 1].getBoundingClientRect();
      const curr = sections[i].getBoundingClientRect();
      const gap = curr.top - prev.bottom;
      if (gap > 300) {
        gaps.push({
          from: sections[i - 1].tagName + (sections[i - 1].className ? '.' + sections[i - 1].className.split(' ')[0] : ''),
          to: sections[i].tagName + (sections[i].className ? '.' + sections[i].className.split(' ')[0] : ''),
          gap: Math.round(gap),
        });
      }
    }
    return gaps;
  });
  expect(
    largeGaps,
    `No large gaps between sections expected. Found: ${JSON.stringify(largeGaps)}`
  ).toHaveLength(0);
}

/** Assert key structural elements are visible */
async function expectKeyElementsVisible(page: Page) {
  // Header or nav
  const header = page.locator('header, nav').first();
  await expect(header, 'Header/nav should be visible').toBeVisible();

  // Main content
  const main = page.locator('main').first();
  await expect(main, 'Main content should be visible').toBeVisible();
}

/** Assert footer is present and visible */
async function expectFooterVisible(page: Page) {
  const footer = page.locator('footer').first();
  await expect(footer, 'Footer should be visible').toBeVisible();
}

/** Full-page QA check for a given URL */
async function runFullQACheck(
  page: Page,
  url: string,
  screenshotPath: string,
  options?: { checkFooter?: boolean; checkImages?: boolean; checkGaps?: boolean }
) {
  const errors = collectConsoleErrors(page);

  await page.goto(url);
  await page.waitForLoadState('networkidle');

  // No horizontal overflow
  await expectNoHorizontalOverflow(page);

  // Key elements visible
  await expectKeyElementsVisible(page);

  // Footer
  if (options?.checkFooter !== false) {
    await expectFooterVisible(page);
  }

  // No broken images
  if (options?.checkImages !== false) {
    await expectNoBrokenImages(page);
  }

  // No large empty gaps
  if (options?.checkGaps !== false) {
    await expectNoLargeGaps(page);
  }

  // No console errors
  expect(errors, 'No console errors expected').toHaveLength(0);

  // Full-page screenshot
  await page.screenshot({ fullPage: true, path: screenshotPath });
}

// ─── Desktop Chrome Tests (1440×900) ──────────────────────────────────────────

test.describe('Desktop Chrome – Visual QA', () => {
  test('homepage: no overflow, key elements visible, no console errors', async ({ page }) => {
    await runFullQACheck(page, '/', 'test-results/desktop/home.png');
  });

  test('homepage: header is visible and functional', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const header = page.locator('header, nav').first();
    await expect(header).toBeVisible();

    // Check for at least one navigation link
    const navLinks = page.locator('header a, nav a');
    const count = await navLinks.count();
    expect(count, 'Header should contain navigation links').toBeGreaterThan(0);
  });

  test('/tour-packages: loads correctly', async ({ page }) => {
    await runFullQACheck(page, '/tour-packages', 'test-results/desktop/tour-packages.png');
  });

  test('/about-us: loads correctly', async ({ page }) => {
    await runFullQACheck(page, '/about-us', 'test-results/desktop/about-us.png');
  });

  test('/contact: loads correctly', async ({ page }) => {
    await runFullQACheck(page, '/contact', 'test-results/desktop/contact.png');
  });

  test('/tours: loads correctly', async ({ page }) => {
    await runFullQACheck(page, '/tours', 'test-results/desktop/tours.png');
  });

  test('/testimonials: loads correctly', async ({ page }) => {
    await runFullQACheck(page, '/testimonials', 'test-results/desktop/testimonials.png');
  });

  test('/faq: loads correctly', async ({ page }) => {
    await runFullQACheck(page, '/faq', 'test-results/desktop/faq.png');
  });
});

// ─── Tablet Tests (1024×1366 – iPad Pro) ──────────────────────────────────────

test.describe('Tablet – Visual QA', () => {
  test('homepage: responsive, no overflow', async ({ page }) => {
    await runFullQACheck(page, '/', 'test-results/tablet/home.png');
  });

  test('homepage: tour cards grid adapts to tablet width', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verify cards don't overflow the viewport
    await expectNoHorizontalOverflow(page);

    // Take screenshot for manual review of grid layout
    await page.screenshot({ fullPage: true, path: 'test-results/tablet/home-grid.png' });
  });

  test('/tour-packages: responsive grid on tablet', async ({ page }) => {
    await runFullQACheck(page, '/tour-packages', 'test-results/tablet/tour-packages.png');
  });

  test('navigation works on tablet', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const errors = collectConsoleErrors(page);

    // Find a link to /about-us and click it
    const aboutLink = page.locator('a[href*="about"]').first();
    if ((await aboutLink.count()) > 0) {
      await aboutLink.click();
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(/about/);
    }

    expect(errors).toHaveLength(0);
  });

  test('/about-us: loads correctly on tablet', async ({ page }) => {
    await runFullQACheck(page, '/about-us', 'test-results/tablet/about-us.png');
  });

  test('/contact: loads correctly on tablet', async ({ page }) => {
    await runFullQACheck(page, '/contact', 'test-results/tablet/contact.png');
  });
});

// ─── Mobile Tests (390×844 – iPhone 14) ──────────────────────────────────────

test.describe('Mobile – Visual QA', () => {
  test('homepage: responsive, no horizontal scroll', async ({ page }) => {
    await runFullQACheck(page, '/', 'test-results/mobile/home.png');
  });

  test('homepage: bottom navigation visible', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // The project has a BottomNavigation component – look for it
    const bottomNav = page.locator('nav[class*="bottom"], nav[class*="fixed"], [class*="BottomNav"], [class*="bottom-nav"]').first();
    await expect(bottomNav, 'Bottom navigation should be visible on mobile').toBeVisible();
  });

  test('homepage: tour cards stack vertically', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check that cards don't appear side-by-side on mobile
    // (i.e., card containers are full-width or near-full-width)
    await expectNoHorizontalOverflow(page);

    // Verify card container widths are close to viewport
    const cardWidths = await page.evaluate(() => {
      const cards = document.querySelectorAll('[class*="tour-card"], [class*="TourCard"], a[href*="/tour"]');
      return Array.from(cards).map((c) => {
        const rect = c.getBoundingClientRect();
        return { width: Math.round(rect.width), viewportWidth: window.innerWidth };
      });
    });

    // On mobile, cards should not be wider than viewport
    for (const card of cardWidths) {
      expect(card.width, `Card width ${card.width}px should not exceed viewport ${card.viewportWidth}px`).toBeLessThanOrEqual(
        card.viewportWidth + 5
      );
    }

    await page.screenshot({ fullPage: true, path: 'test-results/mobile/home-stacked.png' });
  });

  test('no elements cut off on mobile', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check for elements that extend beyond the viewport
    const overflowingElements = await page.evaluate(() => {
      const allElements = document.querySelectorAll('body *');
      const viewportWidth = window.innerWidth;
      const offenders: { tag: string; class: string; width: number; left: number }[] = [];

      for (const el of Array.from(allElements)) {
        const rect = el.getBoundingClientRect();
        if (rect.width > viewportWidth + 5) {
          offenders.push({
            tag: el.tagName,
            class: el.className?.toString().split(' ')[0] || '',
            width: Math.round(rect.width),
            left: Math.round(rect.left),
          });
        }
      }
      return offenders;
    });

    expect(
      overflowingElements,
      `No elements should extend beyond the viewport. Offenders: ${JSON.stringify(overflowingElements)}`
    ).toHaveLength(0);
  });

  test('/tour-packages: responsive on mobile', async ({ page }) => {
    await runFullQACheck(page, '/tour-packages', 'test-results/mobile/tour-packages.png');
  });

  test('/about-us: responsive on mobile', async ({ page }) => {
    await runFullQACheck(page, '/about-us', 'test-results/mobile/about-us.png');
  });

  test('/contact: responsive on mobile', async ({ page }) => {
    await runFullQACheck(page, '/contact', 'test-results/mobile/contact.png');
  });

  test('/tours: responsive on mobile', async ({ page }) => {
    await runFullQACheck(page, '/tours', 'test-results/mobile/tours.png');
  });
});

// ─── Cross-Breakpoint Consistency ─────────────────────────────────────────────

test.describe('Cross-Breakpoint Consistency', () => {
  const pages = ['/', '/tour-packages', '/about-us', '/contact'];

  for (const url of pages) {
    test(`${url}: footer is visible and complete across all viewports`, async ({ page }) => {
      await page.goto(url);
      await page.waitForLoadState('networkidle');

      const footer = page.locator('footer').first();
      await expect(footer, `Footer should be visible on ${url}`).toBeVisible();

      // Footer should contain at least some text content
      const footerText = await footer.innerText();
      expect(footerText.length, `Footer on ${url} should have content`).toBeGreaterThan(0);
    });
  }

  for (const url of pages) {
    test(`${url}: images are not broken across all viewports`, async ({ page }) => {
      await page.goto(url);
      await page.waitForLoadState('networkidle');
      await expectNoBrokenImages(page);
    });
  }

  for (const url of pages) {
    test(`${url}: no horizontal overflow across all viewports`, async ({ page }) => {
      await page.goto(url);
      await page.waitForLoadState('networkidle');
      await expectNoHorizontalOverflow(page);
    });
  }
});

// ─── Additional QA Checks ────────────────────────────────────────────────────

test.describe('Layout Integrity', () => {
  test('homepage: no unexpected layout shift – header stays at top', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const header = page.locator('header, nav').first();
    const initialBox = await header.boundingBox();
    expect(initialBox, 'Header should have bounding box').not.toBeNull();

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(500);

    // Scroll back up
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);

    const finalBox = await header.boundingBox();
    expect(finalBox, 'Header should still have bounding box after scroll').not.toBeNull();

    // Header should be at the top after scrolling back
    expect(Math.round(finalBox!.y), 'Header Y should be near top after scroll back').toBeLessThan(50);
  });

  test('all pages: title element is present and non-empty', async ({ page }) => {
    const pages = ['/', '/tour-packages', '/about-us', '/contact', '/tours', '/testimonials', '/faq'];
    for (const url of pages) {
      await page.goto(url);
      await page.waitForLoadState('networkidle');
      const title = await page.title();
      expect(title.length, `Page ${url} should have a non-empty title`).toBeGreaterThan(0);
    }
  });

  test('all pages: no horizontal scroll on any breakpoint', async ({ page }) => {
    const pages = ['/', '/tour-packages', '/about-us', '/contact', '/tours', '/testimonials', '/faq'];
    for (const url of pages) {
      await page.goto(url);
      await page.waitForLoadState('networkidle');
      await expectNoHorizontalOverflow(page);
    }
  });
});