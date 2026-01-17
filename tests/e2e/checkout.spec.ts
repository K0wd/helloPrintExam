import { test, Page, expect } from '@playwright/test';
import * as helpers from '../helpers/index.js';

test.describe('Checkout Flow', () => {
  test('Complete checkout flow - en', async ({ page }: { page: Page }) => {
    await helpers.navigateToHomePage(page, 'en');
    await helpers.acceptAllCookiesIfPresent(page);

    await helpers.searchForProduct(page, helpers.TEST_DATA.PRODUCTS.BOOKS);

    await helpers.clickFirstProductFromList(page);

    const totalPrice = await helpers.selectItemVariation(page, 'a5landscape', 'Woodfree Offset', '90h', '300scml10', '1000', 'days3');

    await helpers.clickAddToCartButton(page);

    await helpers.verifyProductDetailsInCheckout(page);
    await helpers.verifyTotalArticlesMatchesPrice(page, totalPrice);
    await helpers.verifyPremiumArtworkAndTotal(page, totalPrice);
  });

  test('Complete checkout flow - fr', async ({ page }: { page: Page }) => {
    await helpers.navigateToHomePage(page, 'fr');
    await helpers.acceptAllCookiesIfPresent(page);

    await helpers.searchForProduct(page, helpers.TEST_DATA.PRODUCTS.BOOKS);

    await helpers.clickFirstProductFromList(page);

    const totalPrice = await helpers.selectItemVariation(page, 'a5landscape', 'Woodfree Offset', '90h', '300scml10', '1000', 'days3');

    await helpers.clickAddToCartButton(page);

    await helpers.verifyProductDetailsInCheckout(page);
    await helpers.verifyTotalArticlesMatchesPrice(page, totalPrice);
    await helpers.verifyPremiumArtworkAndTotal(page, totalPrice);
  });
});
