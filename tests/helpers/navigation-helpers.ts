import { Page } from '@playwright/test';
import { SELECTORS, TIMEOUTS, URLS } from './constants.js';

export async function navigateToHomePage(page: Page, language: 'en' | 'fr' = 'en'): Promise<void> {
  const baseUrl = language === 'fr' ? URLS.FRENCH_BASE : URLS.BASE;
  await page.goto(baseUrl);
}

export async function navigateToProductCategory(page: Page, category: string, language: 'en' | 'fr' = 'en'): Promise<void> {
  const categoryUrl = language === 'fr' ? `/fr/${category}` : `/${category}`;
  await page.goto(categoryUrl);
  await page.waitForLoadState('networkidle');
}

export async function navigateToCartPage(page: Page): Promise<void> {
  await page.goto(URLS.CART);
  await page.waitForLoadState('networkidle');
}

export async function waitForPageToLoad(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle');
}

