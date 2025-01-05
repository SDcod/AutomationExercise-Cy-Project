class HomePage {
  elements = {
    FeatureItemsTitle: () => cy.get(".features_items > h2"),
    SignupLoginBtn: () => cy.get("a[href='/login']"),
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
}

export default new HomePage();
