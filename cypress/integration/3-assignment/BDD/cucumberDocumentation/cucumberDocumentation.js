import { Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";

Given('I am on the cucumber.js GitHub repository', () => {
    cy.visit('https://github.com/cucumber/cucumber-js');
});
When('I go to the README file', () => {
    cy.visit('https://github.com/cucumber/cucumber-js/blob/master/README.md');
});
Then('I should see a {string} section', (sectionname) => {
    cy.log('sectionname ', sectionname)
    cy.get('a[href="#' + sectionname.toLowerCase() + '"]').should('be.visible').then($el => {
        cy.log('text name ', $el.text());
        expect(sectionname).to.exist;
        expect(sectionname).to.equal($el.text());
    });
});
Then('I should see a {string} badge', (badge) => {
    cy.log('badge name ', badge)
    cy.get('img[alt="' + badge + '"]').should('be.visible')
});
And('I should see a {string} badge', (badge) => {
    cy.log('badge name ', badge)
    cy.get('img[alt="' + badge + '"]').should('be.visible');
});



