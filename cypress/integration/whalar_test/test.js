/// <reference types="Cypress" />

describe('Whalar main page', () => {
    beforeEach(() => {
        cy.visit('https://whalar.com/');
    });

    it('will check the text in the tab', () => {
        cy.title().should('eq', 'Influencer marketing done right. Creators with influence. | Whalar');
    });
});