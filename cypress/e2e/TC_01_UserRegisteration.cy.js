// Test Case 1: Register User
// 1. Launch browser
// 2. Navigate to url 'http://automationexercise.com'
// 3. Verify that home page is visible successfully
// 4. Click on 'Signup / Login' button
// 5. Verify 'New User Signup!' is visible
// 6. Enter name and email address
// 7. Click 'Signup' button
// 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
// 9. Fill details: Title, Name, Email, Password, Date of birth
// 10. Select checkbox 'Sign up for our newsletter!'
// 11. Select checkbox 'Receive special offers from our partners!'
// 12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
// 13. Click 'Create Account button'
// 14. Verify that 'ACCOUNT CREATED!' is visible
// 15. Click 'Continue' button
// 16. Verify that 'Logged in as username' is visible
// 17. Click 'Delete Account' button
// 18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button

import AccountCreated from "../pages/AccountCreated";
import DeleteAccount from "../pages/DeleteAccount";
import HomePage from "../pages/HomePage";
import SignUpAndLogin from "../pages/SignUpAndLogin";
import UserRegister from "../pages/UserRegister";

describe("register user", () => {
  let userdata = {};

  beforeEach(() => {
    cy.fixture("RegisterData.json").then((data) => {
      userdata = data;
    });
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit("/");
  });

  it("register user : Positive", () => {
    // 3. Verify that home page is visible successfully
    // 4. Click on 'Signup / Login' button
    HomePage.validateFeatureItemTitle().clickSignupLoginBtn();

    // 5. Verify 'New User Signup!' is visible
    // 6. Enter name and email address
    // 7. Click 'Signup' button
    SignUpAndLogin.validateSignupTitle()
      .enterSignupName(userdata.validUser.name)
      .enterSignupEmail(userdata.validUser.email)
      .submitSignUpform();

    // 8. Verify that 'ENTER ACCOUNT INFORMATION' is visible
    // 9. Fill details: Title, Name, Email, Password, Date of birth
    // 10. Select checkbox 'Sign up for our newsletter!'
    // 11. Select checkbox 'Receive special offers from our partners!'
    // 12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
    // 13. Click 'Create Account button'
    UserRegister.validateURL()
      .validateFormTitle()
      .chooseGenderMr()
      .validateUserName(`${userdata.validUser.name}`)
      .validateUserEmail(`${userdata.validUser.email}`)
      .enterPassword(`${userdata.validUser.password}`)
      .selectDay("11")
      .selectMonth("March")
      .selectYear("2000")
      .checkNewsletter()
      .checkOptin()
      .fillFirstName(`${userdata.validUser.firstname}`)
      .fillLastName(`${userdata.validUser.lastname}`)
      .fillCompany(`${userdata.validUser.company}`)
      .fillAddress(`${userdata.validUser.address}`)
      .selectCountry("India")
      .fillState(`${userdata.validUser.state}`)
      .fillCity(`${userdata.validUser.city}`)
      .fillZipcode(`${userdata.validUser.zipcode}`)
      .fillMobileNumber(`${userdata.validUser.mobile_number}`)
      .clickCreateAccount(); // 13. Click 'Create Account button'

    // 14. Verify that 'ACCOUNT CREATED!' is visible
    // 15. Click 'Continue' button

    AccountCreated.validateURL().validateSuccessMsg().clickContinue();

    cy.url().should((url) => {
      const baseUrl = Cypress.config("baseUrl");
      expect(url).to.equal(`${baseUrl}`);
    });

    // 16. Verify that 'Logged in as username' is visible
    // 17. Click 'Delete Account' button
    // 18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
    HomePage.validateLoggedInUser(`Logged in as ${userdata.validUser.name}`);

    // .clickDeleteAccount();

    // DeleteAccount.validateURL().validateSuccessMsg().clickContinue();

    // HomePage.validateSignUpLogin();
  });
});
