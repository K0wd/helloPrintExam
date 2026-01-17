import { Page } from '@playwright/test';
import { SELECTORS, TIMEOUTS, URLS } from './constants.js';

export async function clickAddToCartButton(page: Page): Promise<void> {
  const addToCartButton = page.locator(SELECTORS.ADD_TO_CART_BUTTON);
  await addToCartButton.click();
  await page.waitForLoadState('networkidle');
}

export async function navigateToCheckoutPage(page: Page): Promise<void> {
  await page.waitForTimeout(TIMEOUTS.CART_ANIMATION);
  
  for (const checkoutSelector of SELECTORS.CHECKOUT_BUTTON) {
    try {
      const checkoutButton = page.locator(checkoutSelector).first();
      if (await checkoutButton.isVisible({ timeout: TIMEOUTS.MEDIUM })) {
        await checkoutButton.scrollIntoViewIfNeeded();
        await checkoutButton.click();
        return;
      }
    } catch (e) {
      continue;
    }
  }
  
  for (const cartSelector of SELECTORS.CART_LINK) {
    try {
      const cartLink = page.locator(cartSelector).first();
      if (await cartLink.isVisible({ timeout: TIMEOUTS.SHORT })) {
        await cartLink.click();
        await page.waitForLoadState('networkidle');
        await navigateToCheckoutPage(page);
        return;
      }
    } catch (e) {
      continue;
    }
  }
  
  throw new Error('Could not find Checkout button or Cart link');
}

export async function navigateToCartViaLink(page: Page): Promise<void> {
  const cartNavigationLink = page.locator(SELECTORS.CART_LINK.join(', ')).first();
  if (await cartNavigationLink.isVisible({ timeout: TIMEOUTS.LONG })) {
    await cartNavigationLink.click();
  } else {
    await page.goto(URLS.CART);
  }
  await page.waitForLoadState('networkidle');
}

export async function removeItemFromCart(page: Page): Promise<void> {
  const removeItemButton = page.locator(SELECTORS.REMOVE_ITEM_BUTTON).first();
  if (await removeItemButton.isVisible({ timeout: TIMEOUTS.LONG })) {
    await removeItemButton.click();
    await page.waitForTimeout(TIMEOUTS.SHORT);
  }
}

