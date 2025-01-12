class UserRegister {
  elements = {
    pageUrl: "https://www.automationexercise.com/signup",
    pageFormTitle: () => cy.get(".login-form > h2>b"),
    genderMr: () => cy.get("#id_gender1"),
    genderMrs: () => cy.get("#id_gender2"),
    userName: () => cy.getDataQa("name"),
    userEmail: () => cy.getDataQa("email"),
    passwordInput: () => cy.getDataQa("password"),
    dobDay: () => cy.get("#uniform-days > select"),
    dobMonth: () => cy.get("#uniform-months > select"),
    dobYear: () => cy.get("#uniform-years > select"),
    newsletterCheckbox: () => cy.get("#newsletter"),
    optinCheckbox: () => cy.get("[name=optin]"),
    firstNameInput: () => cy.getDataQa("first_name"),
    lastNameInput: () => cy.getDataQa("last_name"),
    companyInput: () => cy.getDataQa("company"),
    addressInput: () => cy.getDataQa("address"),
    countryDropdown: () => cy.get("#country"),
    stateInput: () => cy.getDataQa("state"),
    cityInput: () => cy.getDataQa("city"),
    zipcodeInput: () => cy.getDataQa("zipcode"),
    mobileNumberInput: () => cy.getDataQa("mobile_number"),
    createAccountBtn: () => cy.getDataQa("create-account"),
  };

  validateURL() {
    cy.url().should("eq", this.elements.pageUrl);
    return this;
  }

  validateFormTitle() {
    this.elements
      .pageFormTitle()
      .invoke("text")
      .should("match", /ENTER ACCOUNT INFORMATION/i);

    // cy.contains('ENTER ACCOUNT INFORMATION', ({ matchCase: false }));

    return this;
  }

  chooseGenderMr() {
    this.elements.genderMr().click({ force: true });
    return this;
  }
  validateUserName(val) {
    this.elements.userName().should("have.value", val);
    return this;
  }
  validateUserEmail(val) {
    this.elements.userEmail().should("have.value", val).and("be.disabled");
    return this;
  }

  enterPassword(pass) {
    this.elements.passwordInput().type(pass);
    return this;
  }
  selectDay(day) {
    this.elements.dobDay().select(day).should("have.value", day);
    return this;
  }
  selectMonth(month) {
    const getMonthValue = (m) => {
      let monthsMap = {
        January: 1,
        February: 2,
        March: 3,
        April: 4,
        May: 5,
        June: 6,
        July: 7,
        August: 8,
        September: 9,
        October: 10,
        November: 11,
        December: 12,
      };

      if (monthsMap[m]) {
        return monthsMap[m];
      } else {
        return 0;
      }
    };

    this.elements
      .dobMonth()
      .select(month)
      .should("have.value", getMonthValue(month));
    return this;
  }
  selectYear(yr) {
    this.elements.dobYear().select(yr).should("have.value", yr);
    return this;
  }

  checkNewsletter() {
    this.elements.newsletterCheckbox().check().should("be.checked");
    return this;
  }

  checkOptin() {
    this.elements.optinCheckbox().check().should("be.checked");
    return this;
  }

  fillFirstName(firstName) {
    this.elements.firstNameInput().type(firstName);
    return this;
  }

  fillLastName(lastName) {
    this.elements.lastNameInput().type(lastName);
    return this;
  }

  fillCompany(company) {
    this.elements.companyInput().type(company);
    return this;
  }

  fillAddress(address) {
    this.elements.addressInput().type(address);
    return this;
  }

  selectCountry(country) {
    this.elements
      .countryDropdown()
      .select(country)
      .should("have.value", country);
    return this;
  }

  fillState(state) {
    this.elements.stateInput().type(state);
    return this;
  }

  fillCity(city) {
    this.elements.cityInput().type(city);
    return this;
  }

  fillZipcode(zipcode) {
    this.elements.zipcodeInput().type(zipcode);
    return this;
  }

  fillMobileNumber(mobileNumber) {
    this.elements.mobileNumberInput().type(mobileNumber);
    return this;
  }

  clickCreateAccount() {
    this.elements.createAccountBtn().should("be.visible").click();
  }
}

export default new UserRegister();
