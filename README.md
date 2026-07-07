# Katomaran QA Intern Technical Assignment

This repository contains my submission for the **QA Intern Technical Assignment** conducted by **Katomaran Technologies**.

The assignment focuses on three core areas of Quality Assurance:

- Manual Test Case Design
- Defect Reporting
- UI Automation Testing using Playwright

---

## Application Under Test

**Application:** Tichi Stage Web Application

**URL:** https://tichi-app-webapp-stage.web.app

---

# Assignment Overview

## Task 1 – Test Case Creation

Created comprehensive manual test cases for the following modules:

- Login
- Signup

The test cases cover:

- Positive Scenarios
- Negative Scenarios
- Input Validation
- Boundary Conditions
- Functional Testing
- UI Validation
- Basic Security Validation

---

## Task 2 – Defect Reporting

Prepared a professional defect report for the following issue:

**Bug**

Application allows users to attempt login using an invalid email format.

The report contains:

- Defect Summary
- Environment Details
- Steps to Reproduce
- Test Data
- Expected Result
- Actual Result
- Severity & Priority
- Impact Analysis
- Suggested Fix

---

## Task 3 – Automation Testing

Implemented automation for the Login functionality using **Playwright with JavaScript**.

The automation framework follows the **Page Object Model (POM)** design pattern to improve code readability, reusability, and maintainability.

### Automated Test Scenarios

- Verify Login page loads successfully
- Verify login with valid credentials
- Verify login with invalid credentials
- Verify empty email validation
- Verify empty password validation
- Verify invalid email format validation
- Verify error message validation

---

# Project Structure

```
katomaran-qa-intern-assignment
│
├── fixtures
│   └── loginData.json
│
├── pages
│   └── LoginPage.js
│
├── tests
│   └── login.spec.js
│
├── TestCases.xlsx
├── package.json
├── package-lock.json
├── playwright.config.js
├── .gitignore
└── README.md
```

---

# Tech Stack

### Manual Testing

- Test Case Design
- Defect Reporting

### Automation Testing

- Playwright
- JavaScript
- Page Object Model (POM)

---

# Installation

Clone the repository:

```bash
git clone https://github.com/dharshanworks/katomaran-qa-intern-assignment.git
```

Navigate to the project directory:

```bash
cd katomaran-qa-intern-assignment
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

# Running the Tests

Execute all test cases:

```bash
npx playwright test
```

Run the tests in headed mode:

```bash
npx playwright test --headed
```

---

# View Test Report

Generate and open the Playwright HTML report:

```bash
npx playwright show-report
```

---

# Repository Highlights

- Well-structured Playwright framework
- Page Object Model (POM) architecture
- Reusable page methods
- Externalized test data
- Manual testing documentation
- Defect reporting
- HTML execution reports
- Clean and maintainable project structure

---

# Learning Outcomes

This assignment helped me strengthen my understanding of:

- Software Testing Fundamentals
- Test Case Design
- Bug Reporting
- UI Automation using Playwright
- Page Object Model (POM)
- Test Execution and Reporting

---

# Author

**Dharshan R**

B.Tech – Information Technology

GitHub: https://github.com/dharshanworks

---

# Acknowledgement

I sincerely thank **Katomaran Technologies** for providing this technical assignment. It was a valuable opportunity to apply my testing knowledge in a practical scenario and gain hands-on experience in manual testing, defect reporting, and Playwright automation.
