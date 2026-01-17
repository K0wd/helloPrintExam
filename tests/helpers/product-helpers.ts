import { Page, expect } from '@playwright/test';
import { SELECTORS, TIMEOUTS, TEST_DATA, XPATH } from './constants.js';

export async function clickFirstProductFromList(page: Page): Promise<void> {
  const firstProduct = page.locator(XPATH.FIRST_PRODUCT);
  await firstProduct.click();
  await page.waitForLoadState('networkidle');
}

export async function getProductTitle(page: Page, fallbackName: string = TEST_DATA.DEFAULT_PRODUCT_NAME.ENGLISH): Promise<string> {
  const productTitleElement = page.locator(SELECTORS.PRODUCT_TITLE).first();
  const titleText = await productTitleElement.textContent();
  return titleText || fallbackName;
}

export async function configureProductOptions(page: Page, desiredQuantity: string = TEST_DATA.QUANTITIES.ONE): Promise<void> {
  await page.waitForLoadState('networkidle');
  
  const quantityInputField = page.locator(SELECTORS.QUANTITY_INPUT).first();
  if (await quantityInputField.isVisible({ timeout: TIMEOUTS.MEDIUM })) {
    await quantityInputField.fill(desiredQuantity);
    await page.waitForTimeout(TIMEOUTS.COOKIE_BANNER);
  }

  const productSizeSelector = page.locator(SELECTORS.SIZE_SELECTOR).first();
  if (await productSizeSelector.isVisible({ timeout: TIMEOUTS.MEDIUM })) {
    const availableSizeOptions = await productSizeSelector.locator('option').all();
    if (availableSizeOptions.length > 1) {
      await productSizeSelector.selectOption({ index: 1 });
      await page.waitForTimeout(TIMEOUTS.COOKIE_BANNER);
    }
  }

  const additionalProductOptionButtons = page.locator(SELECTORS.PRODUCT_OPTIONS).first();
  if (await additionalProductOptionButtons.isVisible({ timeout: TIMEOUTS.SHORT })) {
    await additionalProductOptionButtons.click();
    await page.waitForTimeout(TIMEOUTS.COOKIE_BANNER);
  }
}

export async function extractProductPrice(page: Page): Promise<string> {
  let extractedProductPrice = '';
  
  for (const priceSelector of SELECTORS.PRICE_ELEMENT) {
    try {
      const priceElement = page.locator(priceSelector).first();
      if (await priceElement.isVisible({ timeout: TIMEOUTS.SHORT })) {
        extractedProductPrice = await priceElement.textContent() || '';
        break;
      }
    } catch (e) {
      continue;
    }
  }
  
  return extractedProductPrice;
}

export async function verifyProductPageLoaded(page: Page): Promise<void> {
  const productPageTitle = page.locator(SELECTORS.PRODUCT_TITLE_SIMPLE).first();
  await expect(productPageTitle).toBeVisible({ timeout: TIMEOUTS.LONG });
}

export async function selectItemVariation(page: Page, size: string, appearance: string, paperType: string, cover: string, printRun: string, deliveryDate: string): Promise<string> {
  const plusFiveButton = page.locator(XPATH.PLUS_FIVE_BUTTON);
  await plusFiveButton.click();
  
  const sizeOption = page.locator(XPATH.VARIATION_SIZE(size));
  await sizeOption.click();
  
  const appearanceOption = page.locator(XPATH.VARIATION_APPEARANCE(appearance));
  await appearanceOption.click();
  
  const paperTypeOption = page.locator(XPATH.VARIATION_DATA_VALUE(paperType));
  await paperTypeOption.click();
  
  const coverOption = page.locator(XPATH.VARIATION_DATA_VALUE(cover));
  await coverOption.click();
  
  const printRunOption = page.locator(XPATH.VARIATION_DATA_VALUE(printRun));
  await printRunOption.click();
  
  const deliveryDateOption = page.locator(XPATH.VARIATION_DATA_VALUE(deliveryDate));
  await deliveryDateOption.click();
  
  await page.waitForLoadState('networkidle');
  
  const totalPriceElement = page.locator(XPATH.TOTAL_PRICE).first();
  await expect(totalPriceElement).toHaveText('€1,603.99');
  
  return await totalPriceElement.textContent() || '';
}
