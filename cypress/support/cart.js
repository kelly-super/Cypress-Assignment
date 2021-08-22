class Cart {
    getCartList() {
        return cy.get('.cart_item');
    }
    getContinueShopping() {
        return cy.get('#continue-shopping');
    }
    getCheckout() {
        return cy.get('#checkout');
    }
    getRemoveButton() {
        return cy.get('button[id^="remove"]');
    }
    getCartNumber() {
        return cy.get('.shopping_cart_badge').invoke('text').then(parseInt);
    }

}
export default Cart;