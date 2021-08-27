class LoginPage {
    setEmial(email) {
        return cy.get('input[type="email"]').clear().type(email);
    }
    setPassword(password) {
        return cy.get(':nth-child(3) > .form-control').clear().type(password);
    }
    getSignInButton() {
        return cy.get('button[type="submit"]');
    }

}
export default LoginPage;