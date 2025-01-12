class DeleteAccount {
  elements = {
    pageUrl: "delete_account",
    successMessage: () => cy.contains("Account Deleted!"),
    continueBtn: () => cy.getDataQa("continue-button"),
  };

  validateURL() {
    cy.url().should((url) => {
      const baseUrl = Cypress.config("baseUrl");
      expect(url).to.equal(`${baseUrl}${this.elements.pageUrl}`);
    });
    return this;
  }
  validateSuccessMsg() {
    this.elements.successMessage();
    return this;
  }

  clickContinue() {
    this.elements.continueBtn().should("be.visible").click();
  }
}

export default new DeleteAccount();
