# HelloPrint E2E Tests

End-to-end test automation for helloprint.ie using Playwright and TypeScript.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

Run all tests:
```bash
npm test
```

Run tests in headed mode (visible browser):
```bash
npm run test:headed
```

Run tests with UI mode:
```bash
npm run test:ui
```

Run tests in debug mode:
```bash
npm run test:debug
```

View test report:
```bash
npm run test:report
```

## Project Structure

```
.
├── tests/
│   └── e2e/
│       └── helloprint.spec.ts
├── playwright.config.ts
├── tsconfig.json
└── package.json
```
