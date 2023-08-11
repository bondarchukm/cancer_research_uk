import { test, expect } from '@playwright/test';
import { DonationPage } from '../components/donation/donation.page';
import { DetailsPage } from '../components/donation/details.page';
import { PaymentPage } from '../components/donation/payment.page';
import { ThankYouPage } from '../components/donation/thankYou.page';
import { createHtmlReport } from 'axe-html-reporter';

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

  test('Donation pages accessibility check', async ({ page }) => {
    const donationPage = new DonationPage(page);
    const detailsPage = new DetailsPage(page);
    const paymentPage = new PaymentPage(page);

    // Fill Donation page
    await donationPage.openDonationPage();
    await donationPage.fillDonationData();

    // Accessibility check for Donation page
    const donationPageAccessibilityScanResults =
      await donationPage.analizeAccessibility(page);

    (() => {
      createHtmlReport({
        results: donationPageAccessibilityScanResults,
        options: {
          outputDir: 'test-results/accessibilityReports',
          reportFileName: 'donationPageAccessibilityReport.html',
        },
      });
    })();

    await donationPage.continueToNextPage();

    // Fill Details page
    await detailsPage.fillDetailsData();

    // Accessibility check for Details page
    const detailsPageAccessibilityScanResults =
      await detailsPage.analizeAccessibility(page);

    (() => {
      createHtmlReport({
        results: detailsPageAccessibilityScanResults,
        options: {
          outputDir: 'test-results/accessibilityReports',
          reportFileName: 'detailsPageAccessibilityReport.html',
        },
      });
    })();

    await donationPage.continueToNextPage();

    // Accessibility check for Payment page
    const paymentPageAccessibilityScanResults =
      await paymentPage.analizeAccessibility(page);

    (() => {
      createHtmlReport({
        results: paymentPageAccessibilityScanResults,
        options: {
          outputDir: 'test-results/accessibilityReports',
          reportFileName: 'paymentPageAccessibilityReport.html',
        },
      });
    })();

    // expect(donationPageAccessibilityScanResults.violations).toEqual([]);
    // expect(detailsPageAccessibilityScanResults.violations).toEqual([]);
    expect(paymentPageAccessibilityScanResults.violations).toEqual([]);
  });
});
