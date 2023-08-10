import { type Locator, type Page } from '@playwright/test';
import { AbstractPage } from '../abstract.page';

export class ThankYouPage extends AbstractPage {
  readonly page: Page;
  readonly donationReference: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;

    this.donationReference = page.locator('h2+p strong');
  }

  async getDonationReferenceFromPage(): Promise<string> {
    const donationReference = await this.donationReference.innerText();

    return donationReference;
  }

  async getDonationReferenceFromResponse(page: Page): Promise<string> {
    const responsePromise = page.waitForResponse((response) =>
      response.url().includes('/transaction'),
    );

    const response = await responsePromise;
    const donationReference = (await response.json()).id;

    return donationReference;
  }
}
