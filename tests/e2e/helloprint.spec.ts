import { test, Page, expect } from '@playwright/test';

test.describe('HelloPrint E2E Tests', () => {
  test('e2e checkout flow - en', async ({ page: initialPage }: { page: Page }) => {
    let page = initialPage;
    
    await test.step('Visit homepage', async () => {
      await page.goto('https://www.helloprint.ie/');
      
      await expect(page).toHaveTitle("Online Printing Services in Ireland, Free Delivery | Printing Near Me");
      await expect(page.url()).toContain('/en-ie/');
    });

    await test.step('Accept cookie', async () => {
      await page.locator('//button[@id="cookie-accept"]').click();
    });

    await test.step('Switch language to EN - United States', async () => {
      await page.locator('//*[@class="header__language-bar"]').click();
      const originalPage = page;
      const [newPage] = await Promise.all([
        page.context().waitForEvent('page'),
        page.locator('//a/span[normalize-space(text())="United States"]').first().click()
      ]);
      
      await newPage.waitForLoadState('networkidle');
      await originalPage.close();
      page = newPage;
      
      await expect(page).toHaveTitle("Online Printing Services US, Free Delivery | Printing Near Me");
      await expect(page.url()).toContain('/en-us/');
    });

    await test.step('Look for a product', async () => {
      await page.locator('//input[@placeholder="Find a product..."]').click();
      await page.locator('//input[@placeholder="Find a product..."]').fill('Booklets');
      await page.locator('//input[@placeholder="Find a product..."]').press('Enter');
      await page.waitForTimeout(5000);
      await page.locator('(//span[normalize-space(text())="Booklets"])[1]').first().click();
      
      await expect(page.url()).toContain('/en-us/');
      await expect(page.url()).toContain('booklet-printing');
      await expect(page.locator('//h1[normalize-space(text())="Custom Booklet Printing"]')).toBeVisible();
    });

    await test.step('Select a product', async () => {
      const originalPrice = String(await page.locator('(//h3[normalize-space(text())="Wire Bound Booklets"]/../../..//strike)[1]').textContent()).replace(/\s+/g, '');
      const discountedPrice = String(await page.locator('(//h3[normalize-space(text())="Wire Bound Booklets"]/../../..//strike/../span)[1]').textContent()).replace(/\s+/g, '');
      const itemsReach = String(await page.locator('(//h3[normalize-space(text())="Wire Bound Booklets"]/../../..//strike/../../span)[1]').textContent()).replace(/\s+/g, '').replace('piecesfor', '');

      await page.locator('//h3[normalize-space(text())="Wire Bound Booklets"]').click();
      
      await expect(page.url()).toContain('/en-us/');
      await expect(page.url()).toContain('wireobookletsus');

      const originalPriceValidation = String(await page.locator('//a[@data-value="100"]/div//span[1]/s').textContent()).replace(/\s+/g, '');
      const discountedPriceValidation = String(await page.locator('//a[@data-value="100"]/div//span[2]').textContent()).replace(/\s+/g, '');
      const itemsReachValidation = String(await page.locator('//a[@data-value="100"]/span').textContent()).replace(/\s+/g, '');

      expect(originalPrice).toBe(originalPriceValidation);
      expect(discountedPrice).toBe(discountedPriceValidation);
      expect(itemsReach).toBe(itemsReachValidation);
    });

    await test.step('Select product variation', async () => {
      await page.waitForTimeout(5000);
      await page.locator('//a[@data-value="landscape"]').click();
      await page.locator('//a[@data-value="9x6inch"]').click();
      await page.locator('//a[@data-value="gloss"]').click();
      await page.locator('//a[@data-value="100lbglossbook"]').click();
      await page.locator('//a[@data-value="selfcover"]').click();
      await page.locator('//a[@data-value="10"]').click();
      await page.locator('//a[@data-value="days2"]').click();

      await page.waitForTimeout(5000);

      const originalPrice = String(await page.locator('//div[text()="Total price:"]/../span/s').textContent()).replace(/\s+/g, '');
      const discountedPrice = String(await page.locator('//div[text()="Total price:"]/../span[2]').textContent()).replace(/\s+/g, '');

      expect(originalPrice).toBe('$95.99');
      expect(discountedPrice).toBe('$81.59');

      await page.locator('//button[@data-event-category="cta"]//span').click();

      await expect(page.locator('//td[normalize-space(text())="Total"]/../td[2]')).toHaveText(discountedPrice);
      await expect(page.locator('//td/strong[text()="Quantity (per design)"]/../following-sibling::td')).toHaveText('10');
      await expect(page.locator('//td/strong[text()="Orientation"]/../following-sibling::td')).toHaveText('Landscape');
      await expect(page.locator('//td/strong[text()="Size"]/../following-sibling::td')).toHaveText('9 x 6 inch');
      await expect(page.locator('//td/strong[text()="Material Appearance"]/../following-sibling::td')).toHaveText('Gloss');
      await expect(page.locator('//td/strong[text()="Material"]/../following-sibling::td')).toHaveText('100lb Gloss Book');
      await expect(page.locator('//td/strong[text()="Printing options"]/../following-sibling::td')).toHaveText('4/4 Double sided full color');
      await expect(page.locator('//td/strong[text()="Cover"]/../following-sibling::td')).toHaveText('Selfcover');
      await expect(page.locator('//td/strong[text()="Cover Finishing"]/../following-sibling::td')).toHaveText('No Finishing');
      await expect(page.locator('//td/strong[text()="Total pages (incl. Cover)"]/../following-sibling::td')).toHaveText('8');
      await expect(page.locator('//td/strong[text()="Estimated delivery date"]/../following-sibling::td')).toHaveText('2 working days');
    });
  });
});
