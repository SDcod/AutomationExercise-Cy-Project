describe("Test get Users API", () => {
  it("get Users", () => {
    cy.request({
      method: "GET",
      url: "https://gorest.co.in/public/v2/users",
      headers: {
        Authorization:
          "50fb23a6f040f28b560c0dc576a0f01478b547acc391fc9efff8c9f4b1ec7f20",
      },
    }).then((res) => {
      let jsonData = JSON.stringify(res.body);
      expect(res.status).to.equal(200);
      cy.log(jsonData);
    });
  });

  it("get only one user", () => {
    cy.request({
      method: "GET",
      url: "https://gorest.co.in/public/v2/users/7804995",
      headers: {
        Authorization:
          "50fb23a6f040f28b560c0dc576a0f01478b547acc391fc9efff8c9f4b1ec7f20",
      },
    }).then((res) => {
      let jsonData = JSON.stringify(res.body);
      expect(res.status).to.equal(200);
      cy.log(jsonData);
    });
  });

  it("[-ve] get user invalid endpoint", () => {
    cy.request({
      method: "GET",
      url: "https://gorest.co.in/public/v2/user/7804995",
      headers: {
        Authorization:
          "50fb23a6f040f28b560c0dc576a0f01478b547acc391fc9efff8c9f4b1ec7f20",
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.equal(404);
    });
  });

  it("[-ve] get user invalid endpoint", () => {
    cy.request({
      method: "GET",
      url: "https://gorest.co.in/public/v2/users/0000000",
      headers: {
        Authorization:
          "50fb23a6f040f28b560c0dc576a0f01478b547acc391fc9efff8c9f4b1ec7f20",
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.equal(404);
      expect(res.body.message).to.equal("Resource not found");
    });
  });
});
