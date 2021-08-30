Feature: Login

    Scenario: Ecommerce Login
        Given I open the ecommerce homepage
        When I input the username and password
        And click the login button
        Then Im logged


    Scenario: Add 2 items to Cart
        Given open the product page
        When add the item Onesie into cart
        Then validate the item's quantity in cart is 1
        Then add the item Bike Light into cart
        Then validate the item's quantity in cart is 2
        Then go to cartlist

    Scenario: Checkout
        Given Open the cartlist page
        When click checkout button, go to your information page
        Then input the First Name, Last Namem Zip Code
        And click the continue button
        Then valiadate the item total
        Then click the finish button, finish shopping

