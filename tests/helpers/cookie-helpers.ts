import { Page } from '@playwright/test';
import { XPATH } from './constants.js';

export async function acceptAllCookiesIfPresent(page: Page): Promise<void> {
  page.locator(XPATH.COOKIE_ACCEPT).click();
}

