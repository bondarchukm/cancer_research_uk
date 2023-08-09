import { type Locator, type FrameLocator, type Page } from '@playwright/test';
import { AbstractPage } from '../abstract.page';
import { DETAILS, PAYMENT_CARD } from '../../test-data/donation-data';

export class PaymentPage extends AbstractPage {
  readonly page: Page;
  readonly creditDebitCardButton: Locator;
  readonly giftAidCheckbox: Locator;
  readonly cardholderNameInput: Locator;
  readonly cardNumberIframe: FrameLocator;
  readonly cardNumberInput: Locator;
  readonly expiryDateIframe: FrameLocator;
  readonly expiryDateInput: Locator;
  readonly securityCodeIframe: FrameLocator;
  readonly securityCodeInput: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;

    // iframes
    this.cardNumberIframe = page.frameLocator(
      '[id="braintree-hosted-field-number"]',
    );
    this.expiryDateIframe = page.frameLocator(
      '[id="braintree-hosted-field-expirationDate"]',
    );
    this.securityCodeIframe = page.frameLocator(
      '[id="braintree-hosted-field-cvv"]',
    );

    // Payment data input locators
    this.creditDebitCardButton = page.locator('[id="bt0"]+div');
    this.cardholderNameInput = page.locator('[id="cardholderName"]');
    this.cardNumberInput = this.cardNumberIframe.locator(
      '[id="credit-card-number"]',
    );
    this.expiryDateInput = this.expiryDateIframe.locator('[id="expiration"]');
    this.securityCodeInput = this.securityCodeIframe.locator('[id="cvv"]');

    this.giftAidCheckbox = page.locator('[id="giftAid1"]');
  }

  async fillPaymentData(): Promise<void> {
    await this.creditDebitCardButton.click();

    await this.cardholderNameInput.fill(
      `${DETAILS.firstname} ${DETAILS.lastname}`,
    );
    await this.cardNumberInput.fill(PAYMENT_CARD.cardNumber);
    await this.expiryDateInput.fill(PAYMENT_CARD.cardExpiry);
    await this.securityCodeInput.fill(PAYMENT_CARD.cvv);

    await this.giftAidCheckbox.check();
  }
}
