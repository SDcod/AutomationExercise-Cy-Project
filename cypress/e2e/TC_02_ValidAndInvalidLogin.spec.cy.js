// Test Case 2: Login User with correct email and password
// 1. Launch browser
// 2. Navigate to url 'http://automationexercise.com'
// 3. Verify that home page is visible successfully
// 4. Click on 'Signup / Login' button
// 5. Verify 'Login to your account' is visible
// 6. Enter correct email address and password
// 7. Click 'login' button
// 8. Verify that 'Logged in as username' is visible
// 9. Click 'Delete Account' button
// 10. Verify that 'ACCOUNT DELETED!' is visible
///<reference types='cypress'/>

import AccountCreated from "../pages/AccountCreated";
import HomePage from "../pages/HomePage";
import SignUpAndLogin from "../pages/SignUpAndLogin";
import UserRegister from "../pages/UserRegister";
import DeleteAccount from "../pages/DeleteAccount";

describe("Register and validate user logins", () => {
  let userdata = {};

  before(() => {
    cy.fixture("RegisterData.json").then((data) => {
      userdata = data;
    });
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    cy.visit("/");
  });

  it("Register Valid User", () => {
    HomePage.validateFeatureItemTitle().clickSignupLoginBtn();

    SignUpAndLogin.validateSignupTitle()
      .enterSignupName(userdata.validUser1.name)
      .enterSignupEmail(userdata.validUser1.email)
      .submitSignUpform();

    UserRegister.validateURL()
      .validateFormTitle()
      .chooseGenderMr()
      .validateUserName(`${userdata.validUser1.name}`)
      .validateUserEmail(`${userdata.validUser1.email}`)
      .enterPassword(`${userdata.validUser1.password}`)
      .selectDay("11")
      .selectMonth("March")
      .selectYear("2000")
      .checkNewsletter()
      .checkOptin()
      .fillFirstName(`${userdata.validUser1.firstname}`)
      .fillLastName(`${userdata.validUser1.lastname}`)
      .fillCompany(`${userdata.validUser1.company}`)
      .fillAddress(`${userdata.validUser1.address}`)
      .selectCountry("India")
      .fillState(`${userdata.validUser1.state}`)
      .fillCity(`${userdata.validUser1.city}`)
      .fillZipcode(`${userdata.validUser1.zipcode}`)
      .fillMobileNumber(`${userdata.validUser1.mobile_number}`)
      .clickCreateAccount();

    AccountCreated.validateURL().validateSuccessMsg().clickContinue();

    cy.url().should((url) => {
      const baseUrl = Cypress.config("baseUrl");
      expect(url).to.equal(`${baseUrl}`);
    });

    HomePage.validateLoggedInUser(`Logged in as ${userdata.validUser1.name}`);
  });

  //Login scenarios**************************************************************************

  let LoginUserdata = [];
  before(() => {
    cy.fixture("LoginData.json").then((data) => {
      LoginUserdata = data;
    });
  });
  it("Login Users : Valid and Invalid", () => {
    LoginUserdata.forEach((user) => {
      cy.visit("/");
      // 3. Verify that home page is visible successfully
      // 4. Click on 'Signup / Login' button
      HomePage.validateFeatureItemTitle().clickSignupLoginBtn();

      // 5. Verify 'Login to your account' is visible
      // 6. Enter correct email address and password
      // 7. Click 'login' button

      SignUpAndLogin.validateLoginTitle()
        .enterLoginEmail(`${user.email}`)
        .enterLoginPassword(`${user.password}`)
        .submitLoginform();

      if (
        user.email == "kevin.valid@test.com" &&
        user.password == "kevin@1234"
      ) {
        HomePage.validateLoggedInUser(`${user.expected}`).clickDeleteAccount();
        // 8. Verify that 'Logged in as username' is visible
        // 9. Click 'Delete Account' button
        // 10. Verify that 'ACCOUNT DELETED!' is visible

        DeleteAccount.validateURL().validateSuccessMsg().clickContinue();
        HomePage.validateSignUpLogin();
      } else {
        cy.contains(`${user.expected}`);
      }
    });
  });
});
