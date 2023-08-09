import { type Locator, type Page } from '@playwright/test';

export class AbstractPage {
  readonly page: Page;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Navigation locators
    this.continueButton = page.locator('button[type="submit"]');
  }

  async goto(url: string) {
    await this.page.goto(url);
    await this.page.waitForLoadState('load');
  }
}
