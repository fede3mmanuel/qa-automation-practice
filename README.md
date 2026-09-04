# QA Automation Portfolio

End-to-end test automation framework built from scratch with Playwright + TypeScript.

## Stats
- 14 automated tests (8 UI + 3 API + 3 accessibility)
- Page Object Model architecture
- 100% TypeScript
- CI/CD on every push (GitHub Actions)

## Tech Stack
Playwright | TypeScript | GitHub Actions | axe-core | JSONPlaceholder

## Project Structure
```
tests/
├── swag-labs-login.spec.ts      # 5 login tests
├── swag-labs-cart.spec.ts       # 3 cart/checkout tests
├── api/
│   └── reqres-api.spec.ts       # 3 CRUD tests
├── accessibility/
│   └── a11y.spec.ts             # 3 WCAG accessibility scans
├── pages/                       # Page Objects
│   ├── LoginPage.ts
│   └── CartPage.ts
└── utils/
    └── fake-data.ts
```

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
  detects a real, critical WCAG violation in SauceDemo's inventory page.
  A green badge achieved by hiding real findings would defeat the purpose
  of a QA portfolio — the red pipeline IS the finding, documented here.
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