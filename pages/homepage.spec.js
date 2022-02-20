describe("The Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("succesfully loads title", () => {
    cy.get("h1").should("contain", "personalized handmade");
  });
  it("opens products after clicking video", () => {
    cy.get("video").click();
    cy.url().should("contain", "/products");
  });
  it("opens custom page after clicking 'order custom' button", () => {
    cy.contains("Order Custom").click();
    cy.url().should("contain", "/custom");
  });
});
