class HomePage {
  elements = {
    FeatureItemsTitle: () => cy.get(".features_items > h2"),
    SignupLoginBtn: () => cy.get("a[href='/login']"),
    deleteAccountBtn: () => cy.xpath("//a[text()=' Delete Account']"),
  };

  validateFeatureItemTitle() {
    this.elements
      .FeatureItemsTitle()
      .should("exist")
      .should("have.text", "Features Items");

    return this;
  }

  clickSignupLoginBtn() {
    this.elements.SignupLoginBtn().should("be.visible").click();
    return this;
  }
  validateLoggedInUser(userName) {
    cy.contains(userName);
    return this;
  }

  clickDeleteAccount() {
    this.elements.deleteAccountBtn().should("be.visible").click();
  }

  validateSignUpLogin() {
    this.elements.SignupLoginBtn().should("be.visible");
  }
}

export default new HomePage();
