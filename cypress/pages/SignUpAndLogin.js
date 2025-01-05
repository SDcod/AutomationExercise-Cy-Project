class SignUpAndLogin {
  elements = {
    SignupName: () => cy.getDataQa("signup-name"),
    SignupEmail: () => cy.getDataQa("signup-email"),
    SignupSubmit: () => cy.get('form[action="/signup"]'),
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
  }
}

export default new SignUpAndLogin();
