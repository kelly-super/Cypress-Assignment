describe('Test Cypress-Image-Snapshot plugin', function () {

    it('entire page visual comparison', function () {
        cy.visit('http://localhost:8000');
        cy.matchImageSnapshot('Entire page');

    });
    it('partial page visual comparison', function () {
        cy.visit('http://localhost:8000');
        cy.get('.new-todo').matchImageSnapshot('Partial page');

    });
// command npx cypress run --env updateSnapshots=ture  --spec "cypress/integration/3-assignment/test6.js" in order to update the base image files for all of the tests
// command npx cypress run --reporter cypress-image-snapshot/reporter --spec "cypress/integration/3-assignment/test6.js" in order to report snapshot diffs in your test results.
});