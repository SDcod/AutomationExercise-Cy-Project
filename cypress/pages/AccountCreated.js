class AccountCreated {
  elements = {
    pageUrl: () =>
      cy
        .url()
        .should("eq", "https://www.automationexercise.com/account_created"),
    successMessage: () => cy.contains("Account Created!"),
    continueBtn: () => cy.getDataQa("continue-button"),
  };

  validateURL() {
    this.elements.pageUrl();
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

export default new AccountCreated();
