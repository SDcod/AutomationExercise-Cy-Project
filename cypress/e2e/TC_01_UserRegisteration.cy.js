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

import HomePage from "../pages/HomePage";
import SignUpAndLogin from "../pages/SignUpAndLogin";
import UserRegister from "../pages/UserRegister";

describe("register user", () => {
  let userdata = {};

  beforeEach(() => {
    cy.fixture("LoginData.json").then((data) => {
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
      .clickCreateAccount();

    cy.contains("Account Created!");
    // cy.getDataQa("account-created")
    //   .find("b")
    //   .should("have.text", "Account Created!");

    cy.getDataQa("continue-button").should("be.visible").click();

    // cy.xpath("//a[text()=' Logged in as ']/b").should(
    //   "have.text",
    //   `${userdata.validUser.name}`
    // );

    cy.contains(`Logged in as ${userdata.validUser.name}`);

    cy.xpath("//a[text()=' Delete Account']").should("be.visible").click();

    cy.getDataQa("account-deleted")
      .find("b")
      .invoke("text")
      .should("match", /Account Deleted!/i);

    cy.get('[data-qa="continue-button"]').should("be.visible").click();

    cy.get("a[href='/login']").should("be.visible");
  });
});
