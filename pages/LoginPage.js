class LoginPage {
  constructor(page) {
    this.page = page;

    // Step 1: Email entry locators
    this.emailInput = page.getByLabel('Email Address *');
    this.continueButton = page.getByRole('button', { name: 'Continue', exact: true });
    this.googleSignInButton = page.getByLabel('Continue with Google');

    // Step 2: Password entry locators
    this.passwordInput = page.locator('#password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.forgotPasswordButton = page.getByRole('button', { name: 'Forgot Password?' });
    this.editEmailButton = page.getByRole('button', { name: 'Edit' });

    // Error message locators
    this.emailError = page.getByText('Email is required');
    this.passwordError = page.getByText('Password is required');
    this.invalidCredentialsError = page.getByText('Invalid login details');
  }

  async navigate() {
    await this.page.goto('/login');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async enterEmail(email) {
    await this.emailInput.fill(email);
  }

  async enterPassword(password) {
    await this.passwordInput.fill(password);
  }

  async clearEmailField() {
    await this.emailInput.clear();
  }

  async clearPasswordField() {
    await this.passwordInput.clear();
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async clickContinueForce() {
    await this.continueButton.click({ force: true });
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async clickForgotPassword() {
    await this.forgotPasswordButton.click();
  }

  async clickEditEmail() {
    await this.editEmailButton.click();
  }

  async submitEmailStep(email) {
    await this.enterEmail(email);
    await this.clickContinue();
  }

  async login(email, password) {
    await this.submitEmailStep(email);
    await this.page.waitForTimeout(1000);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async loginWithEnterKey(email, password) {
    await this.enterEmail(email);
    await this.continueButton.press('Enter');
    await this.page.waitForTimeout(1000);
    await this.enterPassword(password);
    await this.loginButton.press('Enter');
  }

  async getEmailErrorMessage() {
    if (await this.emailError.isVisible()) {
      return await this.emailError.textContent();
    }
    return null;
  }

  async getPasswordErrorMessage() {
    if (await this.passwordError.isVisible()) {
      return await this.passwordError.textContent();
    }
    return null;
  }

  async getInvalidCredentialsMessage() {
    if (await this.invalidCredentialsError.isVisible()) {
      return await this.invalidCredentialsError.textContent();
    }
    return null;
  }

  async isPasswordMasked() {
    const type = await this.passwordInput.getAttribute('type');
    return type === 'password';
  }

  async getPageHeading() {
    return await this.page.locator('h1, h2').first().textContent();
  }

  async isOnPasswordStep() {
    return await this.passwordInput.isVisible();
  }

  async isOnEmailStep() {
    return await this.emailInput.isVisible() && !(await this.isOnPasswordStep());
  }

  async waitForErrorToAppear() {
    await this.page.waitForTimeout(500);
  }

  async clearEmailViaApi() {
    await this.emailInput.clear();
  }

  async clearPasswordViaApi() {
    await this.passwordInput.clear();
  }

  async getEmailValue() {
    return await this.emailInput.inputValue();
  }

  async getPasswordValue() {
    return await this.passwordInput.inputValue();
  }

  async isEmailInputVisible() {
    return await this.emailInput.isVisible();
  }

  async isPasswordInputVisible() {
    return await this.passwordInput.isVisible();
  }

  async isContinueButtonVisible() {
    return await this.continueButton.isVisible();
  }

  async isLoginButtonVisible() {
    return await this.loginButton.isVisible();
  }

  async getCurrentUrl() {
    return this.page.url();
  }

  async checkEmailBrowserValidation() {
    return await this.emailInput.evaluate(el => el.validationMessage);
  }
}

module.exports = LoginPage;
