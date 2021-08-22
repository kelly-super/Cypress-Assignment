
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

// Home work 1: cypress.json 配置和使用
// 配置cypress.json文件，设置defaultCommandTimeout为4秒
// 打开https://demoqa.com/dynamic-properties
// 设计一个测试用例，等待Color Change按钮出现
// 通过修改cypress.json让该case通过
describe('Homework1 - Set defaultyCommandtimeout is 4s and then wait for the changecolor button show', () => {
    it('Changebutton color', () => {
        cy.visit('https://demoqa.com/dynamic-properties');
        cy.get('#colorChange').should('be.visible').should('not.have.class', 'text-danger');
        // cy.get('#visibleAfter').should('not.be.visible');
        cy.wait(4000);
        cy.get('#colorChange').should('be.visible').should('have.class', 'text-danger');
        cy.get('#visibleAfter').should('be.visible');
    });
});

// Home work 2:提交表格
// 保存如下信息在cypress/fixture/profile.json中 [firstName,lastName,Email,Gender, Mobile,State,City]
// 打开https://demoqa.com/automation-practice-form
// 读取profile.json，然后将所有信息输入表格
// 点击提交按钮
// 确认preview的信息全部正确
// 点击close
describe("Homework2 - Submit the registion form", () => {
    it('Read profile.json file, and auto filled the fields, then submit', () => {
        //open the url,input the correct info and click, then verify 
        cy.visit('https://demoqa.com/automation-practice-form');
        const testInfos = require('../../fixtures/profile.json');
        cy.log('tetsinfos', testInfos);
        Object.keys(testInfos).forEach((key) => {
            const item = testInfos[key];
            cy.log('info.firstName', item.firstName);
            cy.log('info.firstName', item.firstName);
            cy.get('#firstName').clear().type(item.firstName);
            cy.get('#lastName').clear().type(item.lastName);
            cy.get('#userEmail').clear().type(item.email);
            cy.get(`input[value='${item.Gender}']`).parent().click();
            cy.get('#userNumber').clear().type(item.Mobile);
            cy.get('.css-yk16xz-control:first').click();
            cy.get('.css-yk16xz-control > .css-1wy0on6 > .css-tlfecz-indicatorContainer').click()
                .then(() => {
                    cy.get('.css-26l3qy-menu > div > div').contains(item.State).click();
                }).then(() => {
                    cy.get('#city > .css-yk16xz-control').click()
                        .then(() => {
                            cy.get('#city > div > div >div').contains(item.City).click();
                        });
                });
            cy.get('#submit').click();
            cy.get('.modal-content').should('be.visible');
            cy.get('tbody > :nth-child(1) > :nth-child(2)').should('contain', item.firstName + ' ' + item.lastName);
            cy.get('tbody > :nth-child(2) > :nth-child(2)').should('contain', item.email);
            cy.get('tbody > :nth-child(3) > :nth-child(2)').should('contain', item.Gender);
            cy.get('tbody > :nth-child(4) > :nth-child(2)').should('contain', item.Mobile);
            cy.get('tbody > :nth-child(10) > :nth-child(2)').should('contain', item.State + ' ' + item.City);
            cy.get('#closeLargeModal').scrollIntoView().click({ force: true });
        });

    });
});
// Home work 3: custom command
// 需求：基于购物车的case做进一步修改，以达到
// 增加一个cy.addToCart(number) 命令，该命令接受一个整数（<6），根据该参数随机的添加相应数量的商品到购物车
// 增加一个cy.clearCart()命令，该命令负责清空购物车（通过删除掉所有商品的方式）
// 将case做一定的修改，在case的过程中调用cy.addToCart()命令，在case的末尾调用cy.clearCart()
describe.only('Homework 3 - custom command', () => {
    before(function () {

        cy.visit('https://www.saucedemo.com/');
        cy.get('#user-name').clear().type('standard_user');
        cy.get('#password').clear().type('secret_sauce');
        cy.get('#login-button').click();
        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html');
        cy.log('Login successfully, happy shopping!');

    });
    it('Call the custom command- addToCart', () => {
        var qty = Math.floor((Math.random() * 7));
        cy.addToCart(qty);
    });
    it('Call the custom command - clearCart()', () => {
        cy.clearCart('standard_user');
    });
});

// Home work 4:before/after hook
// 打开http://a.testaddressbook.com/addresses  准备工作（手工，非自动化）：注册一个账号
// before() 打开该网页并登陆
// afterEach() 删除新创建的地址信息
// after() 签退
// case 添加一条新地址（在表格里填写最基本信息即可）
describe('Homework 4, practise before and after hook', () => {
    //Open the url and login
    before(function () {
        cy.visit('http://a.testaddressbook.com/sign_in');
        cy.get('#session_email').clear().type(Cypress.env('testEmail'));
        cy.get('#session_password').clear().type(Cypress.env('testPassword'));
        cy.get('input[value="Sign in"]').click();
        cy.url().should('contain', 'http://a.testaddressbook.com');
        cy.log('Login successfully', Cypress.env('testEmail'));
        //  Cypress.Cookies.preserveOnce('_address_book_session', 'remember_token');
    });
    //   delete the address created justnow
    afterEach(function () {
        cy.visit('http://a.testaddressbook.com/addresses');
        cy.log('Will delete the address, address no', this.addressNo);
        // cy.get('table').get('a[data-test^="destroy"]').each(($el) => {
        //     cy.wrap($el).trigger('click');
        // });
        cy.get('table').get(`a[data-test="destroy-${this.addressNo}"]`).should('be.visible').click();
        cy.log('Successfully delete the address, address no', this.addressNo);
    });
    // Sign out
    after(function () {
        cy.url().then(url => {
            cy.log('current url', url);
        });
        cy.wait(2000);
        if (cy.url().should('contain', 'http://a.testaddressbook.com')) {
            cy.get('a[href="/sign_out"]').click();
        } else {
            cy.visit('http://a.testaddressbook.com/addresses');
        }
    });

    //Create a new address 
    it('Create a new address', () => {
        cy.url().then(url => {
            cy.log('current url', url);
        });
        cy.get('a[href="/addresses"]').should('be.visible').click();
        cy.url().should('eq', 'http://a.testaddressbook.com/addresses');
        cy.url().then(url => {
            cy.log('current url', url);
        });

        cy.get('a[href="/addresses/new"]').should('be.visible').click();
        cy.url().should('eq', 'http://a.testaddressbook.com/addresses/new');
        const addressInfo = require('../../fixtures/address.json');
        cy.log('tetsinfos', addressInfo);
        addressInfo.forEach((address) => {
            let firstName = address.firstName + Math.floor(Math.random() * 100);
            cy.get('#address_first_name').clear().type(firstName);
            cy.get('#address_last_name').clear().type(address.lastName);
            cy.get('#address_street_address').clear().type(address.address1);
            cy.get('#address_secondary_address').clear().type(address.address2);
            cy.get('#address_city').clear().type(address.city);
            cy.get('#address_state').select(address.state);
            cy.get('#address_zip_code').clear().type(address.zipCode);
            cy.get('#address_phone').clear().type(address.phone);
            cy.get('#address_age').clear().type(address.age);
            cy.get('#address_note').clear().type(address.note);

            cy.get('[data-test="submit"]').click();

            //   cy.get('.alert alert-notice').should('contains', 'Successfully created');
            cy.url().then(url => {
                cy.wrap(url.split('/').pop()).as('addressNo').then(no => cy.log(`Successfully created address info ${firstName}`));
            });
        });
    });

    it.skip('delet all', () => {
        cy.visit('http://a.testaddressbook.com/addresses');
        cy.get('table').get('a[data-test^="destroy"]').each(($el, index, $list) => {
            const text = $el.text();
            if (text.includes('Destroy')) {
                cy.log('text', index);
                cy.get('td:nth-child(7)').first().click();
            }
        });
    });
});


// Home work 5: cypress插件的使用
// 安装cypress-xpath插件
// 改写第二课的任一login case，使用xpath定位方式
// 调试通过
describe('Homework5 - use of cypress plugin', () => {
    it('Install cypress-xpath plugin', () => {
        cy.fixture("loginInfo").then(infos => {
            infos.forEach(info => {
                cy.visit('https://www.saucedemo.com/');
                cy.log('342342', info.userName, info);
                cy.xpath(`//input[@id="user-name"]`).should('be.visible').clear().type(info.userName);
                cy.xpath(`//input[@id="password"]`).should('be.visible').clear().type(info.password);
                cy.xpath(`//input[@id="login-button"]`).click();
                cy.url().should('contain', 'https://www.saucedemo.com/inventory.html').then(url => {
                    cy.log('Happy shopping', info.userName);
                });
            });
        });
    });
});

//https://docs.cypress.io/guides/guides/command-line.html#cypress-info
// Homework 6: 使用命令行执行任意一个spec.js文件。要求：- headless方式
// 使用chrome浏览器
// 设置浏览器的分辨率为 1200*1200
describe('Homework 6 - practise cypress command ', () => {
    it('Exec command line', () => {
        console.log('npx cypress run --config viewportWidth=1200,viewportHeight=1200 --browser chrome --spec cypress/integration/3-assignment/test3.js');
    });
});



