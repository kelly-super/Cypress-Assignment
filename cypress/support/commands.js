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
Cypress.Commands.add('addToCCart', (number) => {
    cy.visit('https://www.saucedemo.com/inventory.html');
    cy.log('add items to cart', number);
    //  cy.get('.inventory_list').find('.inventory_item');


});
Cypress.Commands.add('clearCart', () => {
    cy.get('.shopping_cart_link').should('be.visible').click();
    cy.get('.cart_list').find('button[id^="remove"]').each(($el, index, $list) => {
        const text = $el.text();
        if (text.includes('remove')) {
            cy.log('text', index);

        }
    });
});