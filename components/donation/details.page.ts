import { type Locator, type Page } from '@playwright/test';
import { AbstractPage } from '../abstract.page';
import { DETAILS } from '../../test-data/donation-data';

export class DetailsPage extends AbstractPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly enterAddressManuallyButton: Locator;
  readonly addressLine1Input: Locator;
  readonly townCityInput: Locator;
  readonly postcodeInput: Locator;
  readonly coutrySelectionDropdown: Locator;
  readonly emailOptInNoButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;

    // Inputs' locators
    this.firstNameInput = page.locator('[id="forename"]');
    this.lastNameInput = page.locator('[id="surname"]');
    this.emailInput = page.locator('[id="emailAddress"]');
    this.phoneInput = page.locator('[id="phoneNumber"]');
    this.enterAddressManuallyButton = page.locator(
      'text="Enter address manually"',
    );
    this.addressLine1Input = page.locator('[name="addressLine1"]');
    this.townCityInput = page.locator('[name="city"]');
    this.postcodeInput = page.locator('[name="postalCode"]');
    this.coutrySelectionDropdown = page.locator('[id="country"]');
    this.emailOptInNoButton = page.locator('[name="emailOptIn"]+div').last();
  }

  async fillDetailsData(): Promise<void> {
    await this.firstNameInput.fill(DETAILS.firstname);
    await this.lastNameInput.fill(DETAILS.lastname);
    await this.emailInput.fill(DETAILS.email);
    await this.phoneInput.fill(DETAILS.phone);

    await this.enterAddressManuallyButton.click();
    await this.addressLine1Input.fill(DETAILS.homeAddress.address1);
    await this.townCityInput.fill(DETAILS.homeAddress.town);
    await this.postcodeInput.fill(DETAILS.homeAddress.postcode);
    await this.coutrySelectionDropdown.selectOption(
      DETAILS.homeAddress.country,
    );

    await this.emailOptInNoButton.click();
  }
}
