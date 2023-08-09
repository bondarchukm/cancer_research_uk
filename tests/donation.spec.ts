import { test, expect } from '@playwright/test';
import { DonationPage } from '../components/donation/donation.page';
import { DetailsPage } from '../components/donation/details.page';

test.describe('Making a card donation scenario', () => {
  test('Card donation', async ({ page }) => {
    const donationPage = new DonationPage(page);
    const detailsPage = new DetailsPage(page);

    // Fill Donation page
    await donationPage.openDonationPage();
    await donationPage.fillDonationData();
    await donationPage.continueToNextPage();

    // Fill Details page
    await detailsPage.fillDetailsData();
    await donationPage.continueToNextPage();
    await page.pause();
  });
});
