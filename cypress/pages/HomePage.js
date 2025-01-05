class HomePage {
  elements = {
    FeatureItemsTitle: () => cy.get(".features_items > h2"),
  };

  validateFeatureItemTitle() {
    this.elements
      .FeatureItemsTitle()
      .should("exist")
      .should("have.text", "Features Items");
  }
}

export default new HomePage();
