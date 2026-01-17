import { Page, expect } from '@playwright/test';
import { SELECTORS, TIMEOUTS, TEST_DATA, XPATH } from './constants.js';
import { navigateToProductCategory } from './navigation-helpers.js';

export async function searchForProduct(page: Page, searchTerm: string): Promise<void> {
  const searchInput = page.locator(XPATH.SEARCH_INPUT);
  await searchInput.click();
  await searchInput.fill(searchTerm);
  
  const resultSpan = page.locator(XPATH.SEARCH_RESULT_SPAN(searchTerm));
  await resultSpan.click();
  
  await page.waitForLoadState('networkidle');
}

export async function verifySearchResultsAreDisplayed(page: Page): Promise<void> {
  const searchResultsContainer = page.locator(SELECTORS.SEARCH_RESULTS).first();
  await expect(searchResultsContainer).toBeVisible({ timeout: TIMEOUTS.VERY_LONG });
}

export async function clickFirstSearchResult(page: Page): Promise<void> {
  const firstSearchResultLink = page.locator(SELECTORS.PRODUCT_LINK_SIMPLE).first();
  await expect(firstSearchResultLink).toBeVisible({ timeout: TIMEOUTS.LONG });
  await firstSearchResultLink.click();
  await page.waitForLoadState('networkidle');
}

export async function applyFilterIfAvailable(page: Page): Promise<void> {
  const filterControlButtons = page.locator(SELECTORS.FILTER_CONTROLS).first();
  if (await filterControlButtons.isVisible({ timeout: TIMEOUTS.LONG })) {
    await filterControlButtons.click();
    await page.waitForTimeout(TIMEOUTS.FILTER_DELAY);
    
    const availableFilterOption = page.locator(SELECTORS.FILTER_OPTION).first();
    if (await availableFilterOption.isVisible({ timeout: TIMEOUTS.MEDIUM })) {
      await availableFilterOption.click();
      await page.waitForLoadState('networkidle');
    }
  }
}

