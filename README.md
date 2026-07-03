# Tichi Login Automation Framework

A comprehensive Playwright automation framework for testing the login functionality of the Tichi web application, following the Page Object Model (POM) design pattern.

## Project Overview

This framework automates the login flow of the Tichi application using Playwright with JavaScript. It covers:

- Page load verification
- Valid and invalid login scenarios
- Input validation (empty fields, format checks)
- Security testing (SQL Injection, XSS)
- Password masking verification
- Keyboard navigation testing
- Error message validation

The application uses a two-step login flow:
1. **Email step** – Enter email and click Continue
2. **Password step** – Enter password and click Login

## Folder Structure

```
automation/
├── pages/
│   └── LoginPage.js          # Page Object Model - locators and reusable methods
├── tests/
│   └── login.spec.js         # Test specifications for all login scenarios
├── fixtures/
│   └── loginData.json        # Test data, credentials, and expected messages
├── screenshots/              # Screenshots captured on test failures
├── test-results/             # Test execution artifacts (traces, videos)
├── playwright-report/        # HTML test reports
├── package.json              # Project dependencies and scripts
├── playwright.config.js      # Playwright Test Runner configuration
├── README.md                 # Project documentation
└── .gitignore                # Git ignore rules
```

## Installation

```bash
# Navigate to the automation directory
cd automation

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium
```

## Configuration

### Test Data

Update `fixtures/loginData.json` with valid credentials for your test environment:

```json
{
  "validUser": {
    "email": "your-valid-email@example.com",
    "password": "YourValidPassword@123"
  }
}
```

You can also use environment variables to override credentials:

```bash
$env:TEST_EMAIL="your-email@example.com"
$env:TEST_PASSWORD="YourPassword@123"
```

### Playwright Configuration

The `playwright.config.js` file contains timeout settings, reporter configuration, and browser options. Adjust as needed for your environment.

## Running Tests

```bash
# Run all tests
npm test

# Run all tests in headed mode (visible browser)
npm run test:headed
```

## Running a Single Test

```bash
# Run a specific test by name
npx playwright test --grep "Verify Login page loads"

# Run tests from a specific file
npx playwright test tests/login.spec.js
```

## Generating HTML Report

```bash
# Run tests to generate report
npm test

# Open the HTML report
npm run report
```

The HTML report is automatically generated after each test run and stored in the `playwright-report/` directory.

## Test Scenarios

The framework covers the following test scenarios:

| # | Test Case | Description |
|---|-----------|-------------|
| 1 | Login page loads successfully | Verifies page elements and heading are present |
| 2 | Valid credentials | Attempts login with valid email and password |
| 3 | Invalid password | Verifies error with wrong password |
| 4 | Invalid email | Verifies error with unregistered email |
| 5 | Empty email | Verifies "Email is required" validation |
| 6 | Empty password | Verifies "Password is required" validation |
| 7 | Both fields empty | Verifies validation triggers on empty submit |
| 8 | Invalid email format | Tests email format validation |
| 9 | SQL Injection | Verifies SQL injection input is rejected |
| 10 | XSS input | Verifies XSS scripts are handled safely |
| 11 | Password masking | Verifies password field type is `password` |
| 12 | Enter key login | Tests keyboard-based form submission |
| 13 | Error messages | Validates all error messages are correct |

## Error Handling

- Screenshots are automatically captured on test failures
- Traces are retained on first retry for debugging
- Video recordings are kept on failure
- HTML reports provide detailed test execution summaries

## Technologies Used

- **Node.js** – JavaScript runtime (v18+)
- **Playwright** – Browser automation framework (v1.52+)
- **Page Object Model** – Design pattern for maintainable tests
- **JavaScript** – Test scripting language
