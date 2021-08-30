Feature: Cucumber documentation
    As a user of cucumber.js
    I want to have documentation on cucumber
    So I can write better applications

    @sections
    Scenario Outline: Usage documentation
        Given I am on the cucumber.js GitHub repository
        When I go to the README file
        Then I should see a '<sectionname>' section
        Examples:
            | sectionname   | errorMessage                    |
            | Contributing  |                                 |
            # | Install       |                                 |
            # | Documentation |                                 |
            # | hahah         | the hahah section was not found |

    @badges
    Scenario Outline: Status badges
        Given I am on the cucumber.js GitHub repository
        When I go to the README file
        Then I should see a '<badge1>' badge
        And I should see a '<badge2>' badge
        Examples:
            | badge1         | badge2       | errorMessage |
            | GitHub Actions | Dependencies |              |
            # | wa             | wa2          | ewrewr       |
