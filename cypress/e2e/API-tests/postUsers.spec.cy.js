describe("Test post Users API", () => {
  //utility
  let generateEmail = () => {
    return Math.random().toString(36).substring(2, 10) + "@test-SD-api.com";
  };

  it("post Users - variable", () => {
    let newEmail = generateEmail();
    let payload = {
      name: "Jonny Test",
      email: newEmail,
      gender: "male",
      status: "active",
    };

    cy.log(`***** test email for current run ${newEmail} *****`);

    cy.request({
      method: "POST",
      url: "/public/v2/users",
      headers: {
        // Authorization: Cypress.env("API_KEY"),
        Authorization: `Bearer ${Cypress.env("API_KEY")}`,
      },
      body: payload,
    }).then((res) => {
      // let jsonData = JSON.stringify(res.body);
      expect(res.status).to.equal(201);
      expect(res.body).has.property("name", "Jonny Test");
      expect(res.body).has.property("email", newEmail);
      expect(res.body.id).not.to.be.null;
    });
  });

  it("post Users - fixture data", () => {
    cy.fixture("PostAPI-User").then((data) => {
      data.email = generateEmail();

      cy.log(`***** test email for current run ${data.email} *****`);

      cy.request({
        method: "POST",
        url: "/public/v2/users",
        headers: {
          // Authorization: Cypress.env("API_KEY"),
          Authorization: `Bearer ${Cypress.env("API_KEY")}`,
        },
        body: data,
      }).then((res) => {
        // let jsonData = JSON.stringify(res.body);
        expect(res.status).to.equal(201);
        expect(res.body).has.property("name", "Jonny Test");
        expect(res.body).has.property("email", data.email);
        expect(res.body.id).not.to.be.null;

        let userId = res.body.id;
        //validating the user created using request chaining
        cy.request({
          method: "GET",
          url: `/public/v2/users/${userId}`,
          headers: {
            // Authorization: Cypress.env("API_KEY"),
            Authorization: `Bearer ${Cypress.env("API_KEY")}`,
          },
        }).then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body).has.property("name", "Jonny Test");
          expect(res.body).has.property("email", data.email);
          expect(res.body.id).to.equal(userId);
        });
      });
    });
  });

  it.only("[-VE] post Users - invalid token", () => {
    let newEmail = generateEmail();
    let payload = {
      name: "Jonny Test",
      email: newEmail,
      gender: "male",
      status: "active",
    };

    cy.log(`***** test email for current run ${newEmail} *****`);

    cy.request({
      method: "POST",
      url: "/public/v2/users",
      headers: {
        // Authorization: Cypress.env("API_KEY"),
        Authorization: `Bearer 12312312invalidtoken`,
      },
      body: payload,
      failOnStatusCode: false,
    }).then((res) => {
      // let jsonData = JSON.stringify(res.body);
      expect(res.status).to.equal(401);
    });
  });
});
