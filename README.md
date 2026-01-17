# Helloprint E2E Test Automation

This repository contains end-to-end (E2E) test automation for [helloprint.ie](https://www.helloprint.ie) using Playwright with TypeScript.

## 📋 Overview

This test suite includes:
- **Part 1**: Complete checkout flow tests in multiple languages (English and French)
- **Part 2**: Additional ecommerce tests covering cart management and product search

## 🚀 Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone this repository or extract the zip file
2. Install dependencies:

```bash
npm install
```

3. Install Playwright browsers:

```bash
npx playwright install
```

## 🧪 Running Tests

### Run all tests

```bash
npm test
```

### Run specific test suites

```bash
# Run only checkout flow tests
npm run test:checkout

# Run only additional tests
npm run test:additional
```

### Run tests in different modes

```bash
# Run in headed mode (see browser)
npm run test:headed

# Run with Playwright UI mode
npm run test:ui

# Run in debug mode
npm run test:debug
```

### Run tests in specific browser

```bash
# Run in Chromium only
npx playwright test --project=chromium

# Run in Firefox only
npx playwright test --project=firefox

# Run in WebKit (Safari) only
npx playwright test --project=webkit
```

## 📊 Viewing Test Reports

After running tests, view the HTML report:

```bash
npm run test:report
```

This will open the Playwright HTML report in your browser, showing:
- Test results and status
- Screenshots for failed tests
- Video recordings (if enabled)
- Test execution timeline

The report is also available in the `playwright-report/` directory.

## 📁 Project Structure

```
.
├── tests/
│   └── e2e/
│       ├── checkout.spec.ts      # Part 1: Checkout flow tests
│       └── additional-tests.spec.ts  # Part 2: Additional ecommerce tests
├── playwright.config.ts           # Playwright configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Dependencies and scripts
├── README.md                      # This file
└── TEST-NOTES.md                  # Test strategy and CI/CD notes
```

## 🔧 Configuration

The Playwright configuration (`playwright.config.ts`) includes:
- HTML reporter enabled (outputs to `playwright-report/`)
- Screenshots on failure
- Video recording on failure
- Tests run in Chromium, Firefox, and WebKit
- Base URL set to `https://www.helloprint.ie`
- Retry logic for CI environments

## 📝 Test Details

### Part 1: Checkout Flow Tests

The checkout flow tests (`checkout.spec.ts`) verify:
1. Navigation to product page
2. Product configuration (size, quantity, etc.)
3. Adding product to cart
4. Proceeding to checkout
5. Assertions:
   - Correct product and quantity in cart
   - Prices and totals displayed correctly
   - Checkout page loads successfully with order summary

Tests run in **English** and **French** languages.

### Part 2: Additional Tests

The additional tests (`additional-tests.spec.ts`) cover:
1. **Cart persistence and item removal**: Tests adding items, viewing cart, and removing items
2. **Product search and filtering**: Tests search functionality and filter application

See `TEST-NOTES.md` for detailed reasoning behind these test choices.

## 🐛 Troubleshooting

### Tests are flaky or timing out

- Increase timeouts in `playwright.config.ts` if needed
- Run tests in headed mode to see what's happening: `npm run test:headed`
- Check network connectivity to helloprint.ie

### Browser installation issues

If browsers fail to install:
```bash
npx playwright install --force
```

### TypeScript errors

Ensure TypeScript is properly installed:
```bash
npm install --save-dev typescript @types/node
```

## 📄 License

ISC

## 👤 Author

Created as part of Helloprint QA Engineer technical assignment.

