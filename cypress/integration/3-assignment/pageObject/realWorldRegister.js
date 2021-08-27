class RegisterPage {
    setUserName(name) {
        return cy.get('input[placeholder="Username"]').clear().type(name);
    }

    setEmial(email) {
        return cy.get('input[type="email"]').clear().type(email);
    }
    setPassword(password) {
        return cy.get(':nth-child(3) > .form-control').clear().type(password);
    }
    getSignUpButton() {
        return cy.get('button[type="submit"]');
    }

}

export default RegisterPage;
