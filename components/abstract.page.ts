import { type Locator, type Page } from '@playwright/test';
import { waitForCondition } from 'sat-utils';

export class AbstractPage {
  readonly page: Page;
  readonly continueButton: Locator;
  readonly acceptCookiesButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Cookies modal locators
    this.acceptCookiesButton = page.locator(
      '[id="onetrust-accept-btn-handler"]',
    );

    // Navigation locators
    this.continueButton = page.locator('button[type="submit"]');
  }

  async continueToNextPage(): Promise<void> {
    await this.continueButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async acceptCookiesIfModalDisplayed(): Promise<void> {
    if (await this.waitForElemIsVisible(this.acceptCookiesButton)) {
      await this.acceptCookiesButton.click();
    }
  }

  async waitForElemIsVisible(elem: Locator, timeout = 2000, interval = 500) {
    return await waitForCondition(
      async () => {
        return await elem.isVisible();
      },
      {
        timeout: timeout,
        interval: interval,
        dontThrow: true,
      },
    );
  }
}
