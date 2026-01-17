import { Page, expect } from '@playwright/test';
import { XPATH, TIMEOUTS } from './constants.js';
import { calculateTotal } from './calculation-helpers.js';

export async function verifyProductDetailsInCheckout(page: Page): Promise<void> {
  const printRunElement = page.locator(XPATH.CHECKOUT_TABLE_CELL('Print run'));
  await expect(printRunElement).toHaveText('1.000');

  const sizeElement = page.locator(XPATH.CHECKOUT_TABLE_CELL('Size'));
  await expect(sizeElement).toHaveText('A5 Landscape (210 x 148 mm)');

  const pagesElement = page.locator(XPATH.CHECKOUT_TABLE_CELL('Pages (incl. covers)'));
  await expect(pagesElement).toHaveText('32');

  const materialAppearanceElement = page.locator(XPATH.CHECKOUT_TABLE_CELL('Material Appearance'));
  await expect(materialAppearanceElement).toHaveText('Woodfree Offset');

  const paperTypeElement = page.locator(XPATH.CHECKOUT_TABLE_CELL('Paper type'));
  await expect(paperTypeElement).toHaveText('90 gsm offset paper');

  const coverElement = page.locator(XPATH.CHECKOUT_TABLE_CELL('Cover'));
  await expect(coverElement).toHaveText('Deluxe matt cover: 300');

  const deliveryElement = page.locator(XPATH.CHECKOUT_TABLE_CELL('Delivery'));
  await expect(deliveryElement).toHaveText('Three working days');
}

export async function verifyTotalArticlesMatchesPrice(page: Page, totalPrice: string): Promise<void> {
  const totalArticlesElement = page.locator(XPATH.CHECKOUT_TABLE_CELL_SIMPLE('Total articles'));
  await expect(totalArticlesElement).toHaveText(totalPrice);
}

export async function verifyPremiumArtworkAndTotal(page: Page, totalPrice: string): Promise<void> {
  const premiumArtworkElement = page.locator(XPATH.CHECKOUT_PREMIUM_ARTWORK);
  const cartUpsellPriceElement = page.locator(XPATH.CART_UPSELL_PRICE);
  const cartUpsellPriceText = await cartUpsellPriceElement.textContent() || '';
  const addOns = cartUpsellPriceText.replace('+ ', '');

  const totalElement = page.locator(XPATH.CHECKOUT_TABLE_CELL_SIMPLE('Total'));
  const totalText = await totalElement.textContent() || '';
  const expectedTotal = calculateTotal(totalPrice, addOns);
  await expect(totalText).toEqual(expectedTotal);
}
