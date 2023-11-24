Feature: Ecommerce2 Validations

    @Validation @foo
    Scenario Outline: Placing an order
        Given Login to Ecommerce2 application using "<username>" and "<password>"
        Then Verify error message is displayed

        Examples:
            | username        | password   |
            | dip24@gmail.com | Sumanta234 |