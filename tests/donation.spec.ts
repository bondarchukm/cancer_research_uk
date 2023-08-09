import { test, expect } from '@playwright/test';
import { DonationPage } from '../components/donation/donation.page';

test.describe('Making a card donation scenario', () => {
  test('Card donation', async ({ page }) => {
    const donationPage = new DonationPage(page);

    await donationPage.openDonationPage();
    await donationPage.fillDonationPageInfo();
    await donationPage.continueToNextPage();
    await page.pause();
  });
});
