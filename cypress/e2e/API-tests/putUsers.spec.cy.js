describe("Test put Users API", () => {
  //utility
  let generateEmail = () => {
    return Math.random().toString(36).substring(2, 10) + "@test-SD-api.com";
  };

  it("put e2e Users - variable", () => {
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
        method: "PUT",
        url: "/public/v2/users/" + userId,
        headers: {
          Authorization: `Bearer ${Cypress.env("API_KEY")}`,
        },
        body: { name: "john updated" },
      }).then((res) => {
        expect(res.status).to.equal(200);

        //validate the update using a get request
        cy.request({
          method: "GET",
          url: "/public/v2/users/" + userId,
          headers: {
            Authorization: `Bearer ${Cypress.env("API_KEY")}`,
          },
        }).then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body).has.property("name", "john updated");
          expect(res.body).has.property("email", newEmail);
          expect(res.body.id).not.to.be.null;
        });
      });
    });
  });
});
