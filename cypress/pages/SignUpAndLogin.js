import HomePage from "./HomePage";

class SignUpAndLogin {
  elements = {
    SignupName: () => cy.getDataQa("signup-name"),
    SignupEmail: () => cy.getDataQa("signup-email"),
    SignupSubmit: () => cy.get('form[action="/signup"]'),
    LoginEmailInput: () => cy.getDataQa("login-email"),
    LoginPasswordInput: () => cy.getDataQa("login-password"),
    LoginSubmit: () => cy.getDataQa("login-button"),
  };

  validateSignupTitle() {
    cy.contains("New User Signup!");
    return this;
  }
  enterSignupName(val) {
    this.elements.SignupName().type(val);
    return this;
  }

  enterSignupEmail(val) {
    this.elements.SignupEmail().type(val);
    return this;
  }

  submitSignUpform() {
    this.elements.SignupSubmit().should("be.visible").submit();
    return HomePage;
  }
  validateLoginTitle() {
    cy.contains("Login to your account");
    return this;
  }
  enterLoginEmail(val) {
    this.elements.LoginEmailInput().type(val);
    return this;
  }
  enterLoginPassword(val) {
    this.elements.LoginPasswordInput().type(val);
    return this;
  }
  submitLoginform() {
    this.elements.LoginSubmit().should("be.visible").click();
    return HomePage;
  }
}

export default new SignUpAndLogin();
