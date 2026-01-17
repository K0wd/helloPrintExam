export const TIMEOUTS = {
  SHORT: 2000,
  MEDIUM: 3000,
  LONG: 5000,
  VERY_LONG: 10000,
  CART_ANIMATION: 1000,
  COOKIE_BANNER: 500,
  FILTER_DELAY: 1000,
} as const;

export const SELECTORS = {
  COOKIE_CONSENT: 'button:has-text("Accept"), button:has-text("Accept All"), [id*="cookie"], [class*="cookie"]',
  
  SEARCH_INPUT: 'input[type="search"], input[name*="search"]',
  SEARCH_INPUT_ENGLISH: 'input[type="search"], input[name*="search"], input[placeholder*="Search"]',
  SEARCH_INPUT_FRENCH: 'input[type="search"], input[name*="search"], input[placeholder*="Rechercher"]',
  
  PRODUCT_LINK: 'a[href*="/product"], a[href*="/p/"], [class*="product-card"] a, [data-testid*="product"] a',
  PRODUCT_LINK_SIMPLE: 'a[href*="/product"], a[href*="/p/"], [class*="product-card"] a',
  PRODUCT_TITLE: 'h1, [class*="product-title"], [data-testid*="product-title"]',
  PRODUCT_TITLE_SIMPLE: 'h1, [class*="product-title"]',
  
  QUANTITY_INPUT: 'input[type="number"][name*="quantity"], input[type="number"][id*="quantity"], input[type="number"][class*="quantity"]',
  SIZE_SELECTOR: 'select[name*="size"], select[id*="size"], select[class*="size"]',
  PRODUCT_OPTIONS: 'button[class*="option"], button[class*="variant"], [role="button"][class*="select"]',
  
  ADD_TO_CART_BUTTON: 'xpath=//span[normalize-space(text())="Add to cart"]',
  
  CHECKOUT_BUTTON: [
    'a:has-text("Checkout")',
    'a:has-text("Proceed to checkout")',
    'button:has-text("Checkout")',
    'button:has-text("Proceed to checkout")',
    'a[href*="checkout"]',
    'button[class*="checkout"]',
    '[data-testid*="checkout"]',
  ],
  
  CART_LINK: [
    'a[href*="cart"]',
    'a:has-text("Cart")',
    'a:has-text("Basket")',
    '[data-testid*="cart"]',
  ],
  
  CART_ITEM: '[class*="cart-item"], [class*="product-row"], [data-testid*="cart-item"]',
  REMOVE_ITEM_BUTTON: 'button:has-text("Remove"), button:has-text("Delete"), [class*="remove"], [aria-label*="Remove"]',
  
  PRICE_ELEMENT: [
    '[class*="price"]',
    '[data-testid*="price"]',
    '[id*="price"]',
  ],
  
  PRICE_AND_TOTAL: '[class*="price"], [class*="total"], [data-testid*="price"], [data-testid*="total"]',
  PRICE_AND_TOTAL_FRENCH: '[class*="price"], [class*="total"], [class*="prix"], [data-testid*="price"], [data-testid*="total"]',
  
  ORDER_SUMMARY: '[class*="summary"], [class*="order-summary"], [data-testid*="summary"], h2:has-text("Summary"), h2:has-text("Order")',
  ORDER_SUMMARY_FRENCH: '[class*="summary"], [class*="order-summary"], [class*="resume"], h2:has-text("Résumé"), h2:has-text("Commande")',
  
  SEARCH_RESULTS: '[class*="product"], [class*="result"], [data-testid*="product"]',
  FILTER_CONTROLS: 'button[class*="filter"], [class*="filter"] button, select[class*="filter"]',
  FILTER_OPTION: '[class*="filter-option"], input[type="checkbox"][class*="filter"]',
} as const;

export const URLS = {
  BASE: 'https://www.helloprint.com/en-ie',
  FRENCH_BASE: 'https://www.helloprint.com/fr-fr/',
  BUSINESS_CARDS: '/business-cards',
  BUSINESS_CARDS_FRENCH: '/fr/cartes-de-visite',
  CART: '/cart',
} as const;

export const TEST_DATA = {
  PRODUCTS: {
    BUSINESS_CARDS: 'business cards',
    BOOKS: 'Books',
    POSTERS: 'posters',
  },
  QUANTITIES: {
    ONE: '1',
    TWO: '2',
  },
  DEFAULT_PRODUCT_NAME: {
    ENGLISH: 'Product',
    FRENCH: 'Produit',
  },
} as const;

export const URL_PATTERNS = {
  CHECKOUT_ENGLISH: /checkout|cart|basket/i,
  CHECKOUT_FRENCH: /checkout|panier|commande/i,
} as const;

export const XPATH = {
  COOKIE_ACCEPT: 'xpath=//*[@id="cookie-accept"]',
  SEARCH_INPUT: 'xpath=//*[@id="vue-search"]//input',
  FIRST_PRODUCT: 'xpath=(//*[@id="dh-5I8T2HEHWVSdgPAqcGviCr"]//ul)[1]/li[1]',
  PLUS_FIVE_BUTTON: 'xpath=//*[text()="+5"]',
  TOTAL_PRICE: 'xpath=//*[text()="Total price:"]/../span',
  CART_UPSELL_PRICE: 'xpath=//*[@id="cart-upsell-price"]',
  CHECKOUT_TABLE_CELL: (label: string) => `xpath=//td//*[normalize-space(text())="${label}"]/../../td[2]`,
  CHECKOUT_TABLE_CELL_SIMPLE: (label: string) => `xpath=(//td[normalize-space(text())="${label}"]/../td[2])[1]`,
  CHECKOUT_PREMIUM_ARTWORK: 'xpath=(//td[normalize-space(text())="Your premium artwork check"]/../td[2])[1]',
  VARIATION_SIZE: (size: string) => `xpath=//*[@data-value="${size}"]`,
  VARIATION_APPEARANCE: (appearance: string) => `xpath=//*[@data-value-name="${appearance}"]`,
  VARIATION_DATA_VALUE: (value: string) => `xpath=//*[@data-value="${value}"]`,
  SEARCH_RESULT_SPAN: (searchTerm: string) => `xpath=//span[normalize-space(text())="${searchTerm}"]`,
} as const;
