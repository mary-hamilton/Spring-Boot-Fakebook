// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const apiTestBaseUrl = 'http://localhost:8080/api/test';

Cypress.Commands.add('deletePosts', () => {
    cy.request({
        url: `${apiTestBaseUrl}/posts`,
        method: 'delete'
    }).then(({ body }) => {
        expect(body.result).to.eq('Done');
    });
});

Cypress.Commands.add('deleteUsers', () => {
    cy.request({
        url: `${apiTestBaseUrl}/users`,
        method: 'delete'
    }).then(({ body }) => {
        expect(body.result).to.eq('Done');
    });
});
Cypress.Commands.add('createUser', (username = 'newUser', password = 'password') => {
    cy.intercept('POST', new RegExp('/api/auth/signup')).as('signup')
    cy.visit('/');
    cy.get('[data-cy="signup-button"]').click();
    cy.get('[data-cy="input-username"]').type(username);
    cy.get('[data-cy="input-password"]').type(password);
    cy.get('[data-cy="submit-button"]').click();
    cy.wait('@signup');
    cy.contains(`Welcome ${username}!`);
    cy.get('[data-cy="logout-button"]').click();
});