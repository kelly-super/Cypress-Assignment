import LoginPage from '../../support/login';
import ProList from '../../support/proList';
import Cart from '../../support/cart';
/* Home work 1: API测试 到https://docket-test.herokuapp.com/ 注册一个账号,使用Cypress完成如下测试用例：
Before() 查询todos并删除（如果todos>0）
Test Case 提交一条ToDo
查询并确保系统里有一条ToDo，并且内容正确
再提交一条ToDo
查询并确保系统里有两条ToDo，并且内容正确
After() 删除Test Case中创建的ToDo */
describe('Practise 4 - Homework 1 - API Testing', () => {
    before('Get todos and delete', function () {
        const username = 'tester';
        const password = '123456';
        const email = 'tester@123.com';
        cy.visit('https://docket-test.herokuapp.com/');
        cy.get('a[href="/login"]').click();
        cy.url().should('contain', 'login').then(() => {
            cy.get('#username').clear().type(username);
            cy.get('#password').clear().type(password);
            cy.get('#submit').click();
        }).then(() => {

            cy.title().then((title) => {
                cy.log('current titkle', title);
                if (title.indexOf('Internal Server Error') > 0) {
                    //Register new user
                    cy.visit('https://docket-test.herokuapp.com/register');
                    cy.get('#username').click().type(username);
                    cy.get('#email').click().type(email);
                    cy.get('#password').click().type(password);
                    cy.get('#password2').click().type(password);
                    cy.get('#submit').click();
                } else {
                    cy.url().should('contain', 'todo');
                    cy.get('.list-group').then(($el) => {
                        if ($el.find('.close > span').length) {
                            cy.get('.close > span').each(($el, index, $list) => {
                                cy.wrap($el).click();
                            });
                            cy.wait(2000);
                        }
                    });
                }

            });

        });

    });
    it('Submit a todo', function () {
        cy.visit('https://docket-test.herokuapp.com/todo');
        var text = 'This is ' + Math.floor(Math.random() * 100) + ' thing';
        cy.log('text', text);
        cy.get('#todoInput').clear().type(text);
        cy.get('button[class~="updateButton"]').click().then(() => {
            cy.get('#todoList').find('#todoItem').last().then($el => {
                expect($el.text()).equal(text);
            });
        }).then(() => {
            var text2 = 'This is ' + Math.floor(Math.random() * 100) + ' thing';
            cy.get('#todoInput').clear().type(text2);
            cy.get('button[class~="updateButton"]').click().then(() => {
                cy.get('.list-group > li').should('have.length', 2).then(($el, index, $list) => {
                    //
                });
            });
        });

    });
    after('Delete todos', function () {

        cy.get('.list-group').then(($el) => {
            if ($el.find('.close > span').length) {
                cy.get('.close > span').each(($el, index, $list) => {
                    cy.wrap($el).click();
                });
                cy.wait(2000);
            }
        });
    });


});


/* Home work 2: 条件测试 访问该页面产生一个1-100之间的随机整数
编写代码完成如下工作：
读取网页上产生的随机值
如果值小于50，则调用cy.log(‘the value is less than 50’)
如果值大于等于50，则调用cy.log(‘the value is greater than 49’) */
describe('Practise 4 - homework2 - Conditional Testing', () => {
    it('Conditional Testing', () => {
        cy.visit('https://www.calculator.net/random-number-generator.html');
        cy.get('input[name="slower"]').clear().type(1);
        cy.get('input[name="supper"]').clear().type(200);
        cy.get(':nth-child(3) > td > [type="submit"]').click();
        cy.get('.verybigtext').then($el => {
            const val = $el.text();
            if (val < 50) {
                cy.log(`the value '${val}' is less than 50`);
            } else {
                cy.log(`the value '${val}' is greater than 49`);
            }

        });

    });

});



/* Home work 3: API测试  测试对象：https://reqres.in/#support-heading
使用Cypress完成如下测试用例：
Before()  使用Get Single User接口查询id为2的用户是否存在，如果存在的话调用Delete接口删除它
Test Case
使用POST接口创建一个新用户
使用Get Single User接口查询新创建的用户信息是正确的(*)
使用patch接口更新一下刚才新创建用户的name
再使用Get Single User接口确认用户信息是更新正确的(*)
注：部分API接口可能是Fake的，导致我们无法完全按照作业的要求测试通过。例如上面标红色的两个步骤。可以自己相应做一些调整让case看起来是合理的 */

describe('Practise4 - homework3 - API testing', () => {
    before('GET user id is 2 and delete it', function () {

        cy.request('GET', 'https://reqres.in/api/users/2')
            .then((response) => {
                expect(response.status).equal(200);
                expect(response.body.data.id).equal(2);
            }).then(() => {
                cy.request('DELETE', 'https://reqres.in/api/users/2')
                    .then((response) => {
                        expect(response.status).equal(204);
                    });
            });
    });
    it('POST - Create a user', () => {
        const user = {
            "name": "kelly",
            "job": "tester"
        };
        var id;
        cy.request('POST', 'https://reqres.in/api/users', user)
            .then((response) => {
                expect(response.status).equal(201);
                expect(response.body.name).equal('kelly');
                expect(response.body.job).equal('tester');
                id = response.body.id;
                cy.log('Successfully create user ', id);
            }).then(() => {
                cy.request('PUT', 'https://reqres.in/api/users/' + id, { "name": "Nanxi", "job": "trouble maker" })
                    .then((response) => {
                        expect(response.status).equal(200);
                        expect(response.body.name).equal('Nanxi');
                        expect(response.body.job).equal('trouble maker');
                        cy.log('Successfully update user ', id);
                    });
            }).then(() => {
                cy.request('GET', 'https://reqres.in/api/users/2')
                    .then((response) => {
                        expect(response.status).equal(200);
                        expect(response.body.data.id).equal(2);
                        // expect(response.body.job).equal('trouble maker');
                    });
            });


    });

});

/* Home work 4: 练习Page Object，会封装函数和使用
目标：改写之前的购物车测试用例，将其改造成Page Object Module，然后供测试用例使用。注意：不允许在Test Case源文件中出现locator的相关代码
Page Object一共为三个（需要创造三个.js源文件）
登陆页面 cypress/support/pageObjects/login.js
商品列表页面 cypress/support/pageObjects/prodList.js
购物车页面 cypress/support/pageObjects/cart.js
Test Case和大体一致，但有部分变化
一开始加2件商品到购物车 cart.addProduct(2)
点击购物车图标 cart.view()
删除一件 cart.removeItem(1)
点击continue shopping
再添加一件商品到购物车
再次回到购物车
点击checkout */

describe.only('Practise4 - homework4 - Page Object', () => {
    before(function () {
        cy.fixture('loginInfo.json').then((data) => {
            this.data = data;
            this.items = [];
            this.proList = new ProList();
            this.cart = new Cart();
            this.loginPage = new LoginPage();
            // cy.wrap(data).as('data');
            // cy.wrap(items).as('tttt');
            //or can use this way        
            cy.log('Get the data from loginInfo file', JSON.stringify(this.data), this.items);

        });
    });
    it('Login in', function () {
        //   const loginPage = new LoginPage();
        cy.visit('https://www.saucedemo.com');
        cy.log('Get the data from loginInfo file in It', JSON.stringify(this.data)); this.loginPage.getUserName().clear().type(this.data[0].userName);
        this.loginPage.getPassword().clear().type(this.data[0].password);
        this.loginPage.getLoginButton().click();
        cy.url().then((url) => {
            expect(url).contain('inventory');
            cy.log('Successfully login', this.data[0].userName, ' happy shopping!');
        });
        cy.setCookie('session-username', this.data[0].userName);
    });

    it('Add 2 items to cart', function () {
        //  cy.addToCartByPageObject(2, []); //how to pass this.items;
        //   new ProList().goToCart().click();
        //   cy.clearCartByPageObject();
        cy.clearCartByPageObject(this.data[0].userName, [], 1);
    });
});