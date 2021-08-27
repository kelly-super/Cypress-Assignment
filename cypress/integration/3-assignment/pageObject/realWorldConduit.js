class Conduit {
    selectHome() {
        return cy.get('a[href="#"]');
    }
    selectNewArticle() {
        return cy.get('[show-authed="true"] > :nth-child(2) > .nav-link');
    }
    selectSettings() {
        return cy.get('a[href="#/settings"]');
    }
    selectUserInfo() {
        return cy.get(':nth-child(4) > .nav-link');
    }

}
export default Conduit;
