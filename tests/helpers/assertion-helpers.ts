import { Page, expect } from '@playwright/test';
import { SELECTORS, TIMEOUTS, URL_PATTERNS } from './constants.js';

export async function assertCheckoutPageLoaded(page: Page, language: 'en' | 'fr' = 'en'): Promise<void> {
  const urlPattern = language === 'fr' ? URL_PATTERNS.CHECKOUT_FRENCH : URL_PATTERNS.CHECKOUT_ENGLISH;
  await expect(page).toHaveURL(urlPattern, { timeout: TIMEOUTS.VERY_LONG });
}

export async function assertProductInCart(page: Page, productTitle: string): Promise<void> {
  const productNameInCart = page.locator(`text=${productTitle.substring(0, 20)}`).first();
  await expect(productNameInCart).toBeVisible({ timeout: TIMEOUTS.LONG });
}

export async function assertQuantityInCart(page: Page, quantity: string): Promise<void> {
  const quantityDisplayInCart = page.locator(`text=${quantity}, input[value="${quantity}"]`).first();
  await expect(quantityDisplayInCart).toBeVisible({ timeout: TIMEOUTS.LONG });
}

export async function assertPriceAndTotalDisplayed(page: Page, language: 'en' | 'fr' = 'en'): Promise<void> {
  const priceSelector = language === 'fr' ? SELECTORS.PRICE_AND_TOTAL_FRENCH : SELECTORS.PRICE_AND_TOTAL;
  const priceAndTotalElements = page.locator(priceSelector);
  await expect(priceAndTotalElements.first()).toBeVisible({ timeout: TIMEOUTS.LONG });
}

export async function assertOrderSummaryVisible(page: Page, language: 'en' | 'fr' = 'en'): Promise<void> {
  const summarySelector = language === 'fr' ? SELECTORS.ORDER_SUMMARY_FRENCH : SELECTORS.ORDER_SUMMARY;
  const orderSummarySection = page.locator(summarySelector).first();
  await expect(orderSummarySection).toBeVisible({ timeout: TIMEOUTS.LONG });
}

export async function assertCartItemVisible(page: Page): Promise<void> {
  const cartItemElement = page.locator(SELECTORS.CART_ITEM).first();
  await expect(cartItemElement).toBeVisible({ timeout: TIMEOUTS.LONG });
}

export async function assertCartItemRemoved(page: Page): Promise<void> {
  const cartItemElement = page.locator(SELECTORS.CART_ITEM).first();
  await expect(cartItemElement).not.toBeVisible({ timeout: TIMEOUTS.LONG });
}

