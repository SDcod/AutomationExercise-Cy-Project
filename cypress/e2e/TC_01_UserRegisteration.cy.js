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

    cy.url().should("eq", "https://www.automationexercise.com/signup");

    cy.get(".login-form > h2>b")
      .invoke("text")
      .should("match", /ENTER ACCOUNT INFORMATION/i);

    // cy.contains('ENTER ACCOUNT INFORMATION', ({ matchCase: false }));

    cy.getDataQa("name").should("have.value", `${userdata.validUser.name}`);

    cy.getDataQa("email")
      .should("have.value", `${userdata.validUser.email}`)
      .and("be.disabled");

    cy.get("#id_gender1").click({ force: true });

    cy.getDataQa("password").type(`${userdata.validUser.password}`);

    cy.get("#uniform-days > select").select("11").should("have.value", "11");

    cy.get("#uniform-months > select")
      .select("March")
      .should("have.value", "3");

    cy.get("#uniform-years > select")
      .select("2000")
      .should("have.value", "2000");

    cy.get("#newsletter").check().should("be.checked");
    cy.get("[name=optin]").check().should("be.checked");

    cy.getDataQa("first_name").type(`${userdata.validUser.firstname}`);
    cy.getDataQa("last_name").type(`${userdata.validUser.lastname}`);
    cy.getDataQa("company").type(`${userdata.validUser.company}`);
    cy.getDataQa("address").type(`${userdata.validUser.address}`);

    cy.get("#country").select("India").should("have.value", "India");
    cy.getDataQa("state").type(`${userdata.validUser.state}`);
    cy.getDataQa("city").type(`${userdata.validUser.city}`);
    cy.getDataQa("zipcode").type(`${userdata.validUser.zipcode}`);
    cy.getDataQa("mobile_number").type(`${userdata.validUser.mobile_number}`);
    cy.getDataQa("create-account").should("be.visible").click();

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
