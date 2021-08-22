class LoginPage {
    getUserName() {
        return cy.get('#user-name');
    }
    getPassword() {
        return cy.get('#password');
    }
    getLoginButton() {
        return cy.get('#login-button');
    }
    getErrorInfo() {
        return cy.get('.error-message-container');
    }
}
export default LoginPage;