# cancer_research_uk_task

## Task from Cancer Research UK

### Note:
I was trying to run tests in parallel/in sequence with multiple browsers to achive cross-browser/device testing
but faced with issue that it is not accepted by payment provider to make payments with the same credit card in the
such small time interval. "Sorry but we can't process your payment with this card." error message is displayed.

As I don't have set of other test credit card numbers, I propose to run test with needed device manually.
Below you can find the list of commands to run tests on different browsers/devices.

### To run tests:
Run next command first:

- **npm i**

And then run one of the next commands:

// to run tests on Chrome browser

- **npm run test-chrome**

// to run tests on Firefox browser

- **npm run test-firefox**

// to run tests on Safari browser

- **npm run test-safari**

// to run tests on iPhone emulation

- **npm run test-iphone**

// to run tests on iPad emulation

- **npm run test-ipad**

### Accessibility testing:
You can find accessibility test reports in html format for Donation, Details and Payment pages at **test-resuls/accessibilityReports/** folder.
ThankYou page is not included to accessibility testing scope due to payment restrictions issue mentioned above.
