class NewArticle {
    setArticleTitle(title) {
        return cy.get('input[placeholder="Article Title"]').clear().type(title);
    }
    setArticleAbout(about) {
        return cy.get(':nth-child(2) > .form-control').clear().type(about);
    }
    setArticleContent(content) {
        return cy.get(':nth-child(3) > .form-control').clear().type(content);
    }
    setTags(tags) {
        return cy.get(':nth-child(4) > .form-control').clear().type(tags);
    }
    getPublishArticleButton() {
        return cy.get('.btn');
    }

}
export default NewArticle;
