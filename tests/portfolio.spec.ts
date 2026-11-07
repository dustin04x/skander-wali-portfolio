import { test, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const viewports = [1440, 1280, 1024, 768, 390, 360];

test('portfolio is composed and fits the requested viewport widths', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Building systems.');
  await expect(page.locator('.project-row')).toHaveCount(6);
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    document.querySelectorAll<HTMLImageElement>('.screenshot-visual img').forEach(image => { image.loading = 'eager'; });
  });
  await page.waitForFunction(() => [...document.querySelectorAll<HTMLImageElement>('.screenshot-visual img')].every(image => image.complete && image.naturalWidth > 0));
  await expect.poll(async () => page.locator('.screenshot-visual img').evaluateAll(images => images.filter(image => (image as HTMLImageElement).naturalWidth > 0).length)).toBe(2);
  for (const width of viewports) {
    await page.setViewportSize({ width, height: 900 });
    await page.waitForTimeout(180);
    const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, content: document.documentElement.scrollWidth }));
    expect(dimensions.content, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(dimensions.viewport);
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += Math.max(300, window.innerHeight - 120)) {
        window.scrollTo({ top: y, behavior: 'instant' });
        await new Promise(resolve => setTimeout(resolve, 80));
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
    await page.waitForTimeout(650);
    await mkdir('test-results/screenshots', { recursive: true });
    await page.addStyleTag({ content: '.reveal{opacity:1!important;transform:none!important}' });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.screenshot({ path: `test-results/screenshots/portfolio-${width}.png`, fullPage: true });
    if (width === 1440 || width === 390) await page.screenshot({ path: `test-results/screenshots/portfolio-top-${width}.png` });
  }
});

test('mobile navigation opens and its work link scrolls to the project list', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const menu = page.locator('.menu-toggle');
  await expect(menu).toBeVisible();
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Work' }).click();
  await expect(page).toHaveURL(/#work$/);
});

test('skip link reaches the main content by keyboard', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Skip to content' });
  await expect(skip).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main-content')).toBeInViewport();
});

test('project case studies show verified summaries and repositories', async ({ page }) => {
  for (const slug of ['rootlab', 'threatcanvas', 'metascan', 'crypto-toolbox', 'algovision', 'pulseradio']) {
    await page.goto(`/work/${slug}`);
    await expect(page.locator('.case-title h1')).toBeVisible();
    await expect(page.getByRole('link', { name: /open on github/i })).toHaveAttribute('href', /github\.com\/dustin04x\//i);
    await expect(page.locator('.case-sections section')).toHaveCount(8);
  }
});

test('CV details and contact destinations are present', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#contact a[href="mailto:skanderwali@protonmail.com"]')).toBeVisible();
  await expect(page.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', 'https://www.linkedin.com/in/skander-wali-901040391/');
  await expect(page.locator('#about')).toContainText('Final-year Computer Science student');
  await expect(page.locator('#about')).toContainText('Securinets ISITCom');
  await expect(page.locator('#about')).toContainText('DataCamp');
  await expect(page.locator('#contact .contact-label svg')).toHaveCount(3);
});

test('page JavaScript does not throw on load', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('/');
  await page.getByRole('link', { name: /case study/i }).first().click();
  await expect(page.locator('.case-title h1')).toBeVisible();
  expect(errors).toEqual([]);
});
