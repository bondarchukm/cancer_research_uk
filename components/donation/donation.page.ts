import { type Locator, type Page } from '@playwright/test';
import { AbstractPage } from '../abstract.page';
import { DONATION } from '../../test-data/donation-data';

exports.DonationPage = class DonationPage extends AbstractPage {
  readonly page: Page;
  readonly donationPageUrl: String;
  readonly otherAmountInput: Locator;
  readonly myOwnMoneyButton: Locator;
  readonly motivationSelectionDropdown: Locator;
  readonly chooseCancerTypeButton: Locator;
  readonly cancerTypeSelectionDropdown: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.donationPageUrl = '/your-donation';

    // Inputs' locators
    this.otherAmountInput = page.locator('[id="otherAmount"]');
    this.myOwnMoneyButton = page.locator('[id="typeRadioGroup0"]');
    this.motivationSelectionDropdown = page.locator(
      '[data-testid="selectMotivation"]',
    );
    this.chooseCancerTypeButton = page.locator('[id="destinationRadioGroup1"]');
    this.cancerTypeSelectionDropdown = page.locator(
      '[data-testid="restrictionSelect"]',
    );
  }

  async fillDonationPageInfo() {
    await this.otherAmountInput.fill(DONATION.amount);
    await this.myOwnMoneyButton.click();
    await this.motivationSelectionDropdown.selectOption(
      DONATION.donationMotivation,
    );
    await this.chooseCancerTypeButton.click();
    await this.cancerTypeSelectionDropdown.selectOption(DONATION.canserType);
  }
};
