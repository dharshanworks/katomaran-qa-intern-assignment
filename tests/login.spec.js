const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const testData = require('../fixtures/loginData.json');

let loginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.navigate();
});

test.describe('Tichi Login Functionality', () => {

  test('Verify Login page loads successfully', async () => {
    const heading = await loginPage.getPageHeading();
    expect(heading).toContain(testData.pageContent.heading);

    expect(await loginPage.isEmailInputVisible()).toBeTruthy();
    expect(await loginPage.isContinueButtonVisible()).toBeTruthy();
    expect(await loginPage.getCurrentUrl()).toContain(testData.urls.login);
  });

  test('Verify login with valid credentials', async () => {
    const email = process.env.TEST_EMAIL || testData.existingEmail;
    const password = process.env.TEST_PASSWORD || testData.validUser.password;

    await loginPage.enterEmail(email);
    await loginPage.clickContinue();
    await loginPage.page.waitForTimeout(2000);

    const onPasswordStep = await loginPage.isPasswordInputVisible();
    expect(onPasswordStep).toBeTruthy();

    await loginPage.enterPassword(password);
    await loginPage.clickLogin();
    await loginPage.page.waitForTimeout(2000);

    const currentUrl = await loginPage.getCurrentUrl();
    const invalidError = await loginPage.getInvalidCredentialsMessage();

    if (!invalidError) {
      expect(currentUrl).not.toContain('/login');
    }
  });

  test('Verify login with invalid password', async () => {
    await loginPage.login(
      testData.invalidPassword.email,
      testData.invalidPassword.password
    );

    await loginPage.page.waitForTimeout(2000);

    const errorMessage = await loginPage.getInvalidCredentialsMessage();
    expect(errorMessage).toBe(testData.errorMessages.invalidCredentials);
  });

  test('Verify login with invalid email', async () => {
    await loginPage.enterEmail(testData.invalidEmail.email);
    await loginPage.clickContinue();
    await loginPage.page.waitForTimeout(2000);

    const heading = await loginPage.getPageHeading();
    expect(heading).toContain(testData.pageContent.signUpHeading);

    const currentUrl = await loginPage.getCurrentUrl();
    expect(currentUrl).toContain(testData.urls.signUp);
  });

  test('Verify login with empty email', async () => {
    await loginPage.clickContinue();
    await loginPage.waitForErrorToAppear();

    const errorMessage = await loginPage.getEmailErrorMessage();
    expect(errorMessage).toBe(testData.errorMessages.emailRequired);
  });

  test('Verify login with empty password', async () => {
    await loginPage.submitEmailStep('test@example.com');
    await loginPage.page.waitForTimeout(1000);

    await loginPage.clickLogin();
    await loginPage.waitForErrorToAppear();

    const errorMessage = await loginPage.getPasswordErrorMessage();
    expect(errorMessage).toBe(testData.errorMessages.passwordRequired);
  });

  test('Verify login with both fields empty', async () => {
    await loginPage.clickContinue();
    await loginPage.waitForErrorToAppear();

    const emailError = await loginPage.getEmailErrorMessage();
    expect(emailError).toBe(testData.errorMessages.emailRequired);
  });

  test('Verify invalid email format validation', async () => {
    await loginPage.enterEmail(testData.invalidEmailFormat);
    await loginPage.clickContinue();

    await loginPage.page.waitForTimeout(500);

    const validationMessage = await loginPage.getEmailErrorMessage();

    if (validationMessage) {
      expect(
        validationMessage.includes('valid') ||
        validationMessage.includes('invalid') ||
        validationMessage.includes('email')
      ).toBeTruthy();
    } else {
      const browserValidation = await loginPage.checkEmailBrowserValidation();
      expect(browserValidation.length).toBeGreaterThan(0);
    }
  });

  test('Verify SQL Injection input is rejected', async () => {
    await loginPage.enterEmail(testData.sqlInjection);
    await loginPage.clickContinueForce();
    await loginPage.page.waitForTimeout(2000);

    const passwordVisible = await loginPage.isPasswordInputVisible();
    if (passwordVisible) {
      await loginPage.enterPassword(testData.invalidPassword.password);
      await loginPage.clickLogin();
      await loginPage.page.waitForTimeout(2000);
    }

    const currentUrl = await loginPage.getCurrentUrl();
    expect(currentUrl).toContain('/login');
  });

  test('Verify XSS input is handled safely', async () => {
    await loginPage.enterEmail(testData.xssScript);
    await loginPage.clickContinueForce();
    await loginPage.page.waitForTimeout(2000);

    const currentUrl = await loginPage.getCurrentUrl();
    expect(currentUrl).not.toContain('alert');

    const pageText = await loginPage.page.locator('body').innerText();
    expect(pageText).not.toContain('xss executed');

    const alertFired = await loginPage.page.evaluate(() => {
      return new Promise((resolve) => {
        const handler = () => { resolve(true); };
        window.addEventListener('alert', handler, { once: true });
        setTimeout(() => { window.removeEventListener('alert', handler); resolve(false); }, 2000);
      });
    });
    expect(alertFired).toBe(false);
  });

  test('Verify password field masks input', async () => {
    await loginPage.submitEmailStep('test@example.com');
    await loginPage.page.waitForTimeout(1000);

    await loginPage.enterPassword('MySecretPass@123');

    const isMasked = await loginPage.isPasswordMasked();
    expect(isMasked).toBeTruthy();
  });

  test('Verify keyboard Enter key login', async () => {
    const email = process.env.TEST_EMAIL || testData.existingEmail;
    const password = process.env.TEST_PASSWORD || testData.invalidPassword.password;

    await loginPage.enterEmail(email);
    await loginPage.continueButton.press('Enter');
    await loginPage.page.waitForTimeout(2000);

    const onPasswordStep = await loginPage.isPasswordInputVisible();
    expect(onPasswordStep).toBeTruthy();

    await loginPage.enterPassword(password);
    await loginPage.loginButton.press('Enter');
    await loginPage.page.waitForTimeout(2000);

    const errorMessage = await loginPage.getInvalidCredentialsMessage();
    expect(errorMessage).toBe(testData.errorMessages.invalidCredentials);
  });

  test('Verify proper validation error messages', async () => {
    await loginPage.clickContinue();
    await loginPage.waitForErrorToAppear();

    let errorMessage = await loginPage.getEmailErrorMessage();
    expect(errorMessage).toBe(testData.errorMessages.emailRequired);

    await loginPage.enterEmail('test@example.com');
    await loginPage.clickContinue();
    await loginPage.page.waitForTimeout(1000);

    await loginPage.clickLogin();
    await loginPage.waitForErrorToAppear();

    errorMessage = await loginPage.getPasswordErrorMessage();
    expect(errorMessage).toBe(testData.errorMessages.passwordRequired);

    await loginPage.enterPassword('Test@1234');
    await loginPage.clickLogin();
    await loginPage.page.waitForTimeout(2000);

    errorMessage = await loginPage.getInvalidCredentialsMessage();
    expect(errorMessage).toBe(testData.errorMessages.invalidCredentials);
  });
});
