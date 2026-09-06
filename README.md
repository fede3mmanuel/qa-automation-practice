# QA Automation Portfolio

End-to-end test automation framework built from scratch with Playwright + TypeScript.

## Stats
- 14 automated tests (8 UI + 3 API + 3 accessibility) × 3 browsers (Chromium, Firefox, WebKit) = 42 executions per run
- Page Object Model architecture
- 100% TypeScript
- CI/CD on every push (GitHub Actions)
- JS/CSS code coverage reporting with Monocart Reporter

## Tech Stack
Playwright | TypeScript | GitHub Actions | axe-core | monocart-reporter | JSONPlaceholder

## Project Structure
```
tests/
├── swag-labs-login.spec.ts      # 5 login tests
├── swag-labs-cart.spec.ts       # 3 cart/checkout tests
├── api/
│   └── reqres-api.spec.ts       # 3 CRUD tests
├── accessibility/
│   ├── a11y.spec.ts             # 3 WCAG accessibility scans
│   └── fixtures.ts              # coverage collection fixture (CDP)
├── pages/                       # Page Objects
│   ├── LoginPage.ts
│   └── CartPage.ts
└── utils/
    └── fake-data.ts
monocart-report/                 # latest HTML report + coverage (committed intentionally — see Design decisions)
```

## Test Reporting & Coverage

The suite reports through **Monocart Reporter**: a single-file HTML report
with per-test results, attachments, and **JS/CSS code coverage** collected
via Chrome DevTools Protocol (custom Playwright fixture in
`tests/accessibility/fixtures.ts` — coverage starts before each test and is
stopped and reported after it).

Latest local run (2026-09-06): **42 executions — 39 passed, 3 failed**.
The 3 failures are the *same* accessibility test (Inventory page) running on
the 3 browsers — see "Why is the CI red?" below.

- Full report: [`monocart-report/index.html`](monocart-report/index.html)
- Coverage (lcov): [`monocart-report/coverage/lcov.info`](monocart-report/coverage/lcov.info)

## Accessibility Testing

Automated WCAG 2.0/2.1 A & AA scans with axe-core, reusing the existing
Page Objects across key application states — axe-core only analyzes the
rendered DOM, so each state of the flow is scanned separately:
home (login) → inventory → cart.
Scope: `.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])`

### Results (verified 2026-09-02)

| State     | WCAG A/AA violations |
|-----------|----------------------|
| Home      | 0                    |
| Inventory | 1 — CRITICAL: select-name (product sort dropdown has no accessible name) |
| Cart      | 0                    |

### Design decisions

- **Why is the CI red?** Intentionally. The pipeline fails because the suite
  detects a real, critical WCAG violation in SauceDemo's inventory page
  (the failing test is the Inventory scan, on all 3 browsers).
  A green badge achieved by hiding real findings would defeat the purpose
  of a QA portfolio — the red pipeline IS the finding, documented here.
- **Why is `monocart-report/` committed to the repo?** Also intentionally.
  Keeping the latest report versioned makes the evidence visible to anyone
  reviewing the repo — no need to clone, install, or run anything to see
  results and coverage.
- **Soft assertions in inventory/cart**: the suite keeps running and reports
  every violation found instead of stopping at the first one. The goal is
  a complete report, not a quick pass/fail.
- **Strict assert on home**: the landing page has zero A/AA violations,
  so it is held to the strictest standard (any new violation fails loudly).
- **Earlier exploratory scan (2026-08-30, axe 4.13)**: 3 best-practice
  findings on the login page (landmark-one-main, page-has-heading-one,
  region) — outside the A/AA scope, kept here as evidence of scope reasoning.

## Run Tests
```
npm install
npx playwright test
```

## CI/CD
Every push triggers GitHub Actions.
Results: github.com/fede3mmanuel/qa-automation-practice/actions

The latest Monocart report (with JS/CSS coverage) is uploaded as a
downloadable artifact on every CI run:
Actions → latest run → Artifacts → `playwright-report` (retained 30 days).
The most recent report is also committed to the repo under `monocart-report/`.