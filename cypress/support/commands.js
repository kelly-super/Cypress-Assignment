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

import ProList from 'C:/Users/hao/Desktop/Testing Training/Assignment/Cypress-Assignment/cypress/support/proList.js';
import Cart from 'C:/Users/hao/Desktop/Testing Training/Assignment/Cypress-Assignment/cypress/support/cart.js';
// Cypress.on('uncaught:exception', (err, runnable) => {
//     // returning false here prevents Cypress from
//     // failing the test
//     return false;
// });
//This is for practise 3 - homework3 - practise custom command
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand();



Cypress.Commands.add('addToCart', (quantity) => {
    cy.log('add items to cart', quantity);
    cy.url().should('eq', 'https://www.saucedemo.com/inventory.html');
    var count = 0;
    var item = JSON.parse(localStorage.getItem('cart-contents')) || [];
    cy.get('.inventory_list').find('.inventory_item').each(($el, index) => {
        if (index >= item.length && count < quantity) {
            cy.wrap($el).find("button").click();
            count++;
            cy.log(`you have added '${count}' items to cart`);
            cy.wrap($el).get('.inventory_item_img > a').then($el1 => {
                item.push($el1.attr("id").split("_")[1] * 1);
            })
        }
    }).then(() => localStorage.setItem('cart-contents', JSON.stringify(item)));
});
//This is for practise 3 - homework3 - practise custom command
Cypress.Commands.add('clearCart', (customer) => {
    cy.get('.shopping_cart_badge').invoke('text').then(parseInt).should('be.gt', 0);
    cy.setCookie('session-username', customer);
    cy.log('cookies', customer);
    localStorage.setItem("cart-contents", "[0,5,1,4]");
    cy.get('.shopping_cart_link').should('be.visible').parent().click();
    cy.wait(2000);
    cy.url().then(url => {
        cy.log('current url is ', url);
    });
    cy.get('.cart_list').find('button[id^="remove"]').each(($el, index, $list) => {
        const text = $el.text();
        cy.log('delete', JSON.stringify(text));
        if (text.includes('Remove')) {
            cy.wrap($el).click();
        }
    });
});


Cypress.Commands.add('addToCartByPageObject', (quantity, items) => {
    cy.log('add items to cart', quantity, items);
    cy.url().should('eq', 'https://www.saucedemo.com/inventory.html');
    var qty = 1;
    const prolist = new ProList();
    prolist.getAddtoCartButton().each(($el, index, $list) => {
        if (qty <= quantity) {
            // cy.log('add item', $el.text(), index);
            cy.wrap($el).click();
            items.push(index);
            cy.log('items', items);
            localStorage.setItem("cart-contents", JSON.stringify(items));
            ++qty;
        }
    });
});
Cypress.Commands.add('clearCartByPageObject', (customer, items, quantity) => {
    cy.get('.shopping_cart_badge').invoke('text').then(parseInt).should('be.gt', 0);
    cy.setCookie('session-username', customer);
    const cartList = new Cart();
    cartList.getCartNumber().should('be.gt', 0);
    cy.setCookie('session-username', customer);
    cy.log('cookies', customer);
    localStorage.setItem("cart-contents", items);

    var i = 1;
    while (i <= quantity) {
        cartList.getCartList().first().click();
        cy.log('delete item quantity', i);
        i++;
    }


});