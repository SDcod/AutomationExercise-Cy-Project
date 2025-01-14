class HomePage {
  elements = {
    FeatureItemsTitle: () => cy.get(".features_items > h2"),
    SignupLoginBtn: () => cy.get("a[href='/login']"),
    deleteAccountBtn: () => cy.xpath("//a[text()=' Delete Account']"),
    LogoutBtn: () => cy.get("a[href='/logout']"),
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

  clickLogoutBtn() {
    this.elements.LogoutBtn().should("be.visible").click();
  }
}

export default new HomePage();
