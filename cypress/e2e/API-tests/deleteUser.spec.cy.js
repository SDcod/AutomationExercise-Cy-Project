describe("Test delete Users API", () => {
  //utility
  let generateEmail = () => {
    return Math.random().toString(36).substring(2, 10) + "@test-SD-api.com";
  };

  it("creates and deletes a user", () => {
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

      let userId = res.body.id;
      cy.request({
        method: "DELETE",
        url: "/public/v2/users/" + userId,
        headers: {
          Authorization: `Bearer ${Cypress.env("API_KEY")}`,
        },
      }).then((res) => {
        expect(res.status).to.equal(204);

        //validate using get request that user does not exist
        cy.request({
          method: "GET",
          url: "/public/v2/users/" + userId,
          headers: {
            Authorization: `Bearer ${Cypress.env("API_KEY")}`,
          },
          failOnStatusCode: false,
        }).then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.has.property("message", "Resource not found");
        });
      });
    });
  });
});
