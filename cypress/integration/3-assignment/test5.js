//Home work 1: API测试（Req Interception和Stub Resp综合练习）
//测试对象：https://demo.realworld.io/
import HomePage from '../../integration/3-assignment/pageObject/realWorldHome';
import LoginPage from '../../integration/3-assignment/pageObject/realWorldLogin';
import RegisterPage from '../../integration/3-assignment/pageObject/realWorldRegister';
import Conduit from '../../integration/3-assignment/pageObject/realWorldConduit';
import NewArticle from '../../integration/3-assignment/pageObject/realWorldNewArticle';
describe('', function () {
    const url = 'https://demo.realworld.io/';
    const userName = 'TesterA';
    const email = '12345678001@123.com';
    const password = '12345678';
    const home = new HomePage();
    const login = new LoginPage();
    const conduit = new Conduit();


    // before('Sign up /Sign in', function () {
    //    //cy.visit(url);

    //     //the first time, sign up
    //     /*  const home = new HomePage();
    //        home.redirectToSignUp().click();
    //        const register = new RegisterPage();
    //        register.setUserName(userName);
    //        register.setEmial(email);
    //        register.setPassword(password);
    //        register.getSignUpButton().click();
    //       */
    // });
    beforeEach('', function () {
        cy.visit(url);
        home.redirectToSignIn().click();
        login.setEmial(email);
        login.setPassword(password);
        login.getSignInButton().click();
        cy.url().then((url) => {
            cy.log('current url', url);
            cy.wait(2000);
        });
    });
    it('validate HTTP request for adding a new article', function () {
        cy.visit('https://demo.realworld.io/#/editor/');
        const article = new NewArticle();
        conduit.selectNewArticle().click();
        var time = new Date().getTime().toString();
        var title = 'Test' + time;
        var abouts = 'Abouts' + time;
        var content = 'Content' + time;
        cy.log('title', title, abouts, content);


        article.setArticleTitle(title);
        article.setArticleAbout(abouts);
        article.setArticleContent(content);
        article.setTags(time);

        cy.intercept('POST', 'https://conduit.productionready.io/api/articles').as('articles');
        article.getPublishArticleButton().click();

        cy.wait('@articles', { timeout: 150000 }).should(({ request, response }) => {
            console.log(JSON.stringify(request));
            expect(request.method).to.equal('POST');
            expect(request.headers.['content-type']).contains('application/json');
            expect(request.url).to.match(/\/articles$/);

            expect(request.body.article).to.deep.equal({
                title: `${title}`,
                description: `${abouts}`,
                body: `${content}`,
                tagList: []
            });

        });

    });
    it(': Stub network response', function () {

        // cy.fixture("result").then(result =>
        cy.intercept({
            method: 'GET',
            url: 'https://conduit.productionready.io/api/articles?author=TesterA&limit=5&offset=0'
        },
            {
                statusCode: 200,
                fixture: 'result'
            }
        ).as('articles')
        // );
        conduit.selectUserInfo().click();
        cy.wait('@articles').should(({ request, response }) => {
            var count = response.body.articlesCount;
            cy.get('.article-preview').then((data) => {
                expect(data.length - 2).eq(response.body.articlesCount);
            });
            cy.get('.article-preview').each(($el, index, $list) => {
                cy.wrap($el.find('article-meta.ng-isolate-scope > .article-meta > :nth-child(1) > img')).invoke('attr', 'src').should('eq', 'https://static.productionready.io/images/smiley-cyrus.jpg');
            });
        });
    });
});