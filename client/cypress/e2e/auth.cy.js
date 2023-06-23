describe('Authentication', () => {
    beforeEach(() => {
        cy.deleteUsers()
    });
    // it('can sign up for a new account', () => {
    //     cy.intercept('POST', new RegExp('/api/auth/signup')).as('signup')
    //     cy.visit('/');
    //     cy.get('[data-cy="signup-button"]').click();
    //     cy.get('[data-cy="input-username"]').type('newuser');
    //     cy.get('[data-cy="input-password"]').type('password');
    //     cy.get('[data-cy="submit-button"]').click();
    //     cy.wait('@signup');
    //     cy.contains('Welcome newuser!')
    // });
    // it('cannot signup with a username that already exists', () => {
    //     cy.createUser('newuser');
    //     cy.intercept('POST', new RegExp('/api/auth/signup')).as('signup');
    //     cy.visit('/');
    //     cy.get('[data-cy="signup-button"]').click();
    //     cy.get('[data-cy="input-username"]').type('newuser');
    //     cy.get('[data-cy="input-password"]').type('password');
    //     cy.get('[data-cy="submit-button"]').click();
    //     cy.wait('@signup');
    //     cy.get('[data-cy="signup-error"]').contains('Username not available')
    // });
    // it('cannot signup with a username that already exists (integration test)', () => {
    //     cy.intercept('POST', new RegExp('/api/auth/signup'), {
    //         statusCode: 400,
    //         body: {
    //             message: 'That username is no good',
    //         }
    //     }).as('signup');
    //     cy.visit('/');
    //     cy.get('[data-cy="signup-button"]').click();
    //     cy.get('[data-cy="input-username"]').type('newuser');
    //     cy.get('[data-cy="input-password"]').type('password');
    //     cy.get('[data-cy="submit-button"]').click();
    //     cy.wait('@signup');
    //     cy.get('[data-cy="signup-error"]').contains('That username is no good')
    // });
    it('create user (integration test)', () => {
        cy.intercept('POST', new RegExp('/api/auth/signup'), {
            statusCode: 200,
            response: {
                user: 'newuser',
                token: '1234'
            }
        }).as('signup');
        cy.visit('/');
        cy.get('[data-cy="signup-button"]').click();
        cy.get('[data-cy="input-username"]').type('newuser');
        cy.get('[data-cy="input-password"]').type('password');
        cy.get('[data-cy="submit-button"]').click();
        cy.wait('@signup');
        // cy.get('[data-cy="signup-error"]').contains('That username is no good')
    });
});