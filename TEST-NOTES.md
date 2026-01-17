# Test Strategy and CI/CD Notes

## Part 2: Additional Test Choices

### Test 1: Cart Persistence and Item Removal

**Why this test is important:**

1. **User Experience**: Users frequently add items to their cart, review them, and decide to remove items before checkout. This is a common user journey that must work correctly.

2. **Data Integrity**: Ensures that cart state is properly managed - items can be added, persisted (potentially across sessions), and removed without errors.

3. **Business Impact**: A broken cart removal feature could lead to:
   - Users abandoning checkout if they can't remove unwanted items
   - Incorrect orders being placed
   - Poor user experience and lost sales

4. **Technical Coverage**: Tests the cart state management, UI interactions, and potential API calls for cart modifications.

### Test 2: Product Search and Filtering

**Why this test is important:**

1. **Primary Discovery Method**: Search is one of the main ways users find products on an ecommerce site. If search is broken, users cannot find what they're looking for, directly impacting conversion rates.

2. **User Efficiency**: Filtering helps users narrow down large product catalogs. Broken filters lead to frustration and cart abandonment.

3. **SEO and Navigation**: Search functionality often integrates with site navigation and SEO. Ensuring it works correctly is critical for both user experience and business metrics.

4. **Conversion Funnel**: Search → Filter → Product View → Add to Cart is a critical conversion path. Testing this ensures the funnel works end-to-end.

5. **Technical Coverage**: Tests search API/functionality, filter application, result rendering, and navigation to product pages.

## CI/CD Pipeline Prioritization

### Priority 1: Critical Path Tests (Run on every commit/PR)

**Tests:**
- `checkout.spec.ts` - Complete checkout flow (English)
- `checkout.spec.ts` - Complete checkout flow (French)

**Reasoning:**
- These tests cover the **core business function** - completing a purchase
- Any regression in checkout flow directly impacts revenue
- Should run on every commit to main branch and all pull requests
- Fast feedback loop prevents broken code from reaching production

**Execution Strategy:**
- Run in parallel across multiple browsers (Chromium, Firefox, WebKit)
- Run in headless mode for speed
- Set retry count to 2 for flakiness handling
- Fail the build if any test fails

### Priority 2: Extended E2E Tests (Run on PRs and nightly)

**Tests:**
- `additional-tests.spec.ts` - Cart persistence and item removal
- `additional-tests.spec.ts` - Product search and filtering

**Reasoning:**
- These tests cover important user journeys but are not as critical as checkout
- Cart management and search are important but failures are less immediately revenue-impacting
- Running on PRs ensures quality, but nightly runs reduce CI/CD pipeline time

**Execution Strategy:**
- Run on pull requests (but don't block merge if only these fail - manual review)
- Run nightly in full regression suite
- Can run in parallel with Priority 1 tests
- Set retry count to 1

### Priority 3: Full Regression Suite (Run nightly/weekly)

**All Tests:**
- Complete test suite across all browsers
- Extended test scenarios
- Cross-browser compatibility checks

**Reasoning:**
- Comprehensive coverage without slowing down development velocity
- Catches issues that might not appear in Priority 1/2 tests
- Provides full regression coverage

**Execution Strategy:**
- Scheduled nightly runs (e.g., 2 AM)
- Full browser matrix (Chromium, Firefox, WebKit)
- Generate comprehensive reports
- Alert team on failures

## Recommended CI/CD Pipeline Structure

```
┌─────────────────────────────────────────────────────────┐
│  On Commit/PR:                                          │
│  ├─ Priority 1: Checkout Flow Tests (EN + FR)          │
│  │  └─ Run in parallel: Chromium, Firefox, WebKit      │
│  └─ Priority 2: Additional Tests (if time permits)     │
│     └─ Run in Chromium only (fastest)                  │
└─────────────────────────────────────────────────────────┘
         │
         ├─ ✅ Pass → Merge/Deploy
         └─ ❌ Fail → Block merge, notify team
         
┌─────────────────────────────────────────────────────────┐
│  Nightly (2 AM):                                        │
│  ├─ Priority 2: Additional Tests (full suite)          │
│  ├─ Priority 3: Full Regression Suite                 │
│  └─ Generate and email test reports                    │
└─────────────────────────────────────────────────────────┘
```

## Test Maintenance Considerations

1. **Selectors**: The tests use flexible selector strategies to handle UI changes. However, if the site structure changes significantly, selectors may need updates.

2. **Flakiness**: E2E tests can be flaky due to network conditions, timing, or third-party dependencies. The retry mechanism helps, but tests should be monitored and updated if consistently flaky.

3. **Data Dependencies**: Tests assume products are available on the site. If product availability changes, tests may need updates.

4. **Language Support**: The multi-language tests assume English and French are available. If language availability changes, tests should be updated accordingly.

5. **Cookie/Consent Handling**: Tests include cookie consent handling, but this may need updates if the consent mechanism changes.

## Metrics to Track

- **Test Execution Time**: Monitor and optimize to keep CI/CD pipeline fast
- **Flakiness Rate**: Track which tests fail intermittently and fix root causes
- **Coverage**: Ensure critical user journeys remain covered as the site evolves
- **Failure Analysis**: Categorize failures (infrastructure, application bugs, test issues) to improve test quality

