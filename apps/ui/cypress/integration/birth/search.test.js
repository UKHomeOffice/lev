describe("birth search", () => {
  beforeEach(() => {
    cy.visit("/birth");
  })
  it("can access text in page with a search", () => {
    cy.get('h1').should('have.text', 'Births')
  });
  describe('search using system number', () => {
    it('valid record search pressing enter', () => {
      cy.get('[name="system-number"]')
        .type('123456789')
        .type('{enter}')
        .get('.govuk-heading-l')
        .contains('Joan Narcissus Ouroboros SMITH 08/08/2008')
    })
    it('valid record search using submit button', () => {
      cy.get('[name="system-number"]')
        .type('123456789')
        .get('[value="Lookup"]')
        .click()
        .get('.govuk-heading-l')
        .contains('Joan Narcissus Ouroboros SMITH 08/08/2008')
    })
  })
});