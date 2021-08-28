import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

Given('I open the ecommerce homepage', () => {
    cy.visit('https://www.saucedemo.com');
});

When('I input the username and password', () => {
    cy.get('#user-name').clear().type(Cypress.env('ecUserName'));
    cy.get('#password').clear().type(Cypress.env('ecPassword'));

});

And('click the login button', () => {
    cy.get('#login-button').click();
});
// Then('validate the  username and password', () => {
//     cy.get('.error-message-container').then($el => {
//         if ($el.find('h3').length) {
//             cy.log('Correct information');
//         } else {
//             cy.log('Wrong information');
//         }
//     });
// });
Then('Im logged', () => {
    cy.url().then((url) => {
        cy.log('current url', url);
    });
});



Given('open the product page', () => {
    cy.setCookie('session-username', 'standard_user');
    //  cy.visit('https://www.saucedemo.com/inventory.html');

});
When('add the item Onesie into cart', () => {
    cy.addToCart(1);
});
Then('validate the item\'s quantity in cart is 1', () => {
    cy.get('.shopping_cart_link').then($el => {
        cy.log('number', JSON.stringify($el.text()));
        expect($el.text()).to.equal('1');
    });
});
Then('add the item Bike Light into cart', () => {
    cy.addToCart(1);
});
Then('validate the item\'s quantity in cart is 2', () => {
    cy.get('.shopping_cart_link').then($el => {
        expect($el.text()).to.equal('2');
    });
});
Then('go to cartlist', () => {
    cy.get('.shopping_cart_link').click();
});



// Given('Open the cartlist page', () => {
//     cy.visit('https://www.saucedemo.com/cart.html');
// });
// When('click checkout button, go to your information page', () => {
//     cy.get('[data-test=checkout]').click();
//     cy.url().then(url, () => {
//         expect(url).include('checkout-step-one');
//     });
// });

// Then('input the First Name, Last Namem Zip Code', () => {
//     cy.get('#first-name').clear().type('test1');
//     cy.get('#last-name').clear().type('test1');
//     cy.get('#postal-code').clear().type('test1');
// });
// And('click the continue button', () => {
//     cy.get('#continue').click();
// });
// Then('valiadate the item total', () => {
//     var total = 0;
//     cy.get('.cart_list').find('cart_item').each(($el, index, $list), () => {
//         var qty = $el.find('.cart_quantity').text();
//         var price = $el.find('.inventory_item_price').text();
//         cy.log(' items ', qty, price);
//         total += qty * price;
//     });

//     cy.get('.summary_subtotal_label').should('contains', total);

// });
// Then('click the finish button, finish shopping', () => {
//     cy.get('#finish').click();
//     cy.url().should('include', 'checkout-complete');
// });