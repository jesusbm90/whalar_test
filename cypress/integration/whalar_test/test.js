/// <reference types="Cypress" />

describe("Whalar main page", () => {
  beforeEach(() => {
    cy.server();

    cy.route("GET", "/v1/users/me").as("userAuthorization");

    cy.visit("https://whalar.com/");
  });

  it("will create an account as non-business", () => {
    // Selects the account creation as influencer
    cy.get("a[id='dropdownMenuLink']")
      .click()
      .get("li > a[href='/contentcreators']")
      .click();

    // user should be unauthorized
    cy.wait("@userAuthorization")
      .its("status")
      .should("eq", 401);

    // checks the url
    cy.url().should("eq", "https://whalar.com/contentcreators");

    // Starts the creation process.
    cy.get("li > .nav-btn--secondary").click();

    // user should be unauthorized
    cy.wait("@userAuthorization")
      .its("status")
      .should("eq", 401);

    // checks the url
    cy.url().should("eq", "https://whalar.com/contentcreators/sign-up");

    // Fills the form.

    // email field
    cy.get("[data-test-id='field-email'] input")
      .type("jesus.whalar.test+1@gmail.com");

    // password field
    cy.get("[data-test-id='field-password'] input")
      .type("Whalar1234");

    // accept terms
    cy.get("input[name='termsAccepted']")
      .check({ force: true });

    // confirms the form
    cy.get("button[data-test-id='btn-submit']")
      .click();

    // user should be authorized
    cy.wait("@userAuthorization")
      .its("status")
      .should("eq", 200);

    // checks the url
    cy.url().should("eq", "https://whalar.com/contentcreators/sign-up");

    // selects the non-business route
    cy.get("input[data-test-id='inner-radio'][value='instagram']")
      .check({ force: true });

    cy.get('a.btn-primary')
      .click()
  });
});
