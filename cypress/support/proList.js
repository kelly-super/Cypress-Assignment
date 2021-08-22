class ProList {
    getProductName() {
        return cy.get('.inventory_item_name');
    }
    getProductDesc() {
        return cy.get('.inventory_item_desc');
    }
    getProductPrice() {
        return cy.get('.inventory_item_price');
    }
    getAddtoCartButton() {
        return cy.get('button[id^="add-to-cart"]');
    }
    getRemoveButton() {
        return cy.get('button[id^="remove"]');
    }
    getProductList() {
        return cy.get('.inventory_item');
    }
    goToCart() {
        return cy.get('.shopping_cart_link');
    }

}
export default ProList;