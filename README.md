# QA Automation Portfolio

End-to-end test automation framework built from scratch with Playwright + TypeScript.

## Stats
- 11 automated tests (8 UI + 3 API)
- 26/26 CI/CD passes
- Page Object Model architecture
- 100% TypeScript

## Tech Stack
Playwright | TypeScript | GitHub Actions | JSONPlaceholder

## Project Structure
tests/
├── swag-labs-login.spec.ts    # 5 login tests
├── swag-labs-cart.spec.ts     # 3 cart/checkout tests
├── api/                        # API tests
│   └── reqres-api.spec.ts     # 3 CRUD tests
├── pages/                      # Page Objects
│   ├── LoginPage.ts
│   └── CartPage.ts
└── utils/
    └── fake-data.ts

## Run Tests
npm install
npx playwright test

## CI/CD
Every push triggers GitHub Actions. Results: github.com/fede3mmanuel/qa-automation-practice/actions