

describe('Homework2', () => {

    beforeEach(function () {
        cy.visit('https://www.saucedemo.com/');
        cy.get('#user-name').as('userName');
        cy.get('#password').as('pwd');
    });

    it('Login Failed, please put your name and password again!', () => {
        cy.get('@userName').clear().type('hhhhh');
        cy.get('@pwd').clear().type('jfas');
        cy.get('#login-button').click();
        cy.get('.error-message-container').get('h3').should('be.visible')
            .and('contain', 'Username and password do not match any user in this service');
        cy.log('Login failed because wrong username or pwd');

    });

    it('Login Failed, your username is incorrect!', () => {
        // cy.url().reload();
        cy.get('@userName').clear().type('incorrect');
        cy.get('@pwd').clear().type('secret_sauce');
        cy.get('#login-button').click();
        cy.get('.error-message-container').get('h3').should('be.visible').and('contain', 'Username and password do not match any user in this service');
        cy.log('your username is incorrect!');
    });

    it('Login Failed, your possword is incorrect!', () => {
        // cy.url().reload();
        cy.get('@userName').clear().type('standard_user');
        cy.get('@pwd').clear().type('11212');
        cy.get('#login-button').click();
        cy.get('.error-message-container').get('h3').should('be.visible').and('contain', 'Username and password do not match any user in this service');
        cy.log('your possword is incorrect!');
    });

    it.only('Login successfully, should rediect to the correct url', () => {
        cy.get('@userName').clear().type('standard_user');
        cy.get('@pwd').clear().type('secret_sauce');
        cy.get('#login-button').click();
        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html');
        cy.log('Login successfully, happy shopping!');
        cy.wait(2000);
        cy.get('.inventory_item').should('have.length', 6);

        //parent child chaining
        cy.get('.inventory_list').find('.inventory_item').should('have.length', 6);

        // Click the index is 2 item add to cart
        cy.get('.inventory_list').find('.inventory_item').eq(2).contains('Add to cart').click();
        cy.get('.inventory_list').find('.inventory_item').eq(2).find('.inventory_item_name').then(item => {
            cy.log('Add the first item to cart', item.text());
        });



        //add the item 'Onesie' to cart
        cy.get('.inventory_list').find('.inventory_item')
            .each(($el, index, $list) => {
                const itemName = $el.find('.inventory_item_name').text();
                cy.log(itemName, 'Test');
                const onesie_index = itemName.indexOf('Onesie');
                if (onesie_index >= 0) {
                    cy.log('add Onesie to cart', index);
                    $el.find('button').trigger('click');

                } else {
                    cy.log("no Onesie in the list");
                }
            });
        //click 'cart' and verify its url 
        cy.get('.shopping_cart_link').click();
        cy.url().should('eq', 'https://www.saucedemo.com/cart.html');

        // verify the cartlist 's item quantity and items
        cy.get('.cart_list').find('.cart_item').should('have.length', 2);
        cy.get('.cart_list').find('.cart_item').eq(1).find('.inventory_item_name').should('contain', 'Onesie');

        //Click the 'Contine shopping' and verify it is go back to the correct url
        cy.get('[data-test=continue-shopping]').click();
        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html');

        //Remove the item from cart in the page inventory.html
        cy.get('.inventory_list').find('.inventory_item')
            .filter((index, $el) => $el.innerText.indexOf('Sauce Labs Bolt T-Shirt') >= 0)
            .each($el => {
                $el.find("button").trigger('click');
            });

        //Click 'cart' and verify its url
        cy.get('.shopping_cart_link').click();
        cy.url().should('eq', 'https://www.saucedemo.com/cart.html');
        cy.get('.cart_list').find('.cart_item').should('have.length', 1);

        cy.get('[data-test=checkout]').click();
        cy.url().should('eq', 'https://www.saucedemo.com/checkout-step-one.html');

        cy.get('#first-name').type('test1');
        cy.get('#last-name').type('test1');
        cy.get('#postal-code').type('test1');
        cy.get('#continue').click();
        cy.url().should('eq', 'https://www.saucedemo.com/checkout-step-two.html');


        cy.get('.cart_list').find('.inventory_item_price').should('have.length', 1);
        cy.get('[data-test=finish]').click();
        cy.url().should('eq', 'https://www.saucedemo.com/checkout-complete.html');
        cy.get('.complete-header').should('have.text', 'THANK YOU FOR YOUR ORDER');
        cy.get('.complete-text').should('have.text', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!');
        cy.get('[data-test=back-to-products]').click();

        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html');
        cy.get('.shopping_cart_link').should('not.contain.html', 'shopping_cart_badge');

        //to do testlist
        //varify the inventory.html page,  once click the [add to cart] button, the button change to [remove]
        //varify the checkout page, the sum of items' price should equal the [Item total:]
        //varify the checkout page, the remove function 
        //validate the field [first name][Last name][Pastcode] in the checkout-step-one page

        //Question: how can I use const to define a sting , then use .text(); it said the issue be solved by using ES6.
        //how should I make the long code snippet to several short ones, any priciple?





    });

});