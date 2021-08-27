class HomePage {
    redirectToSignIn() {
        return cy.get('a[href="#/login"]');
    }
    redirectToSignUp() {
        return cy.get('a[href="#/register"]');
    }
    getHome() {
        return cy.get('a[href="#/"]');
    }

}
export default HomePage;
