import { test, expect } from '@playwright/test';
import { DonationPage } from '../components/donation/donation.page';
import { DetailsPage } from '../components/donation/details.page';
import { PaymentPage } from '../components/donation/payment.page';
import { ThankYouPage } from '../components/donation/thankYou.page';

test.describe('Making a card donation scenario', () => {
  test('Card donation', async ({ page }) => {
    const donationPage = new DonationPage(page);
    const detailsPage = new DetailsPage(page);
    const paymentPage = new PaymentPage(page);
    const thankYouPage = new ThankYouPage(page);

    // Fill Donation page
    await donationPage.openDonationPage();
    await donationPage.fillDonationData();
    await donationPage.continueToNextPage();

    // Fill Details page
    await detailsPage.fillDetailsData();
    await donationPage.continueToNextPage();

    // Fill Payment page
    await paymentPage.fillPaymentData();
    await paymentPage.continueToNextPage();

    // Verify donation reference
    const donationReferenceFromResponce =
      await thankYouPage.getDonationReferenceFromResponse(page);

    const donationReferenceFromPage =
      await thankYouPage.getDonationReferenceFromPage();

    expect(
      donationReferenceFromResponce,
      'Donation reference from the response is not equal to donation reference from the page',
    ).toEqual(donationReferenceFromPage);
  });
});
