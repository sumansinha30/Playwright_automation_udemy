Feature: Ecommerce Validations

    @Regression
    Scenario: Placing an order
        Given Login to Ecommerce application using "dip24@gmail.com" and "Sumanta234"
        When Product "zara coat 3" is added to cart
        Then Verify "zara coat 3" product is displayed in the cart
        And Enter the valid countryInitials "ind" country "Indonesia" and place the order
        And Validate order is present in the order history


    @Validation @foo
    Scenario Outline: Placing an order
        Given Login to Ecommerce2 application using "<username>" and "<password>"
        Then Verify error message is displayed

        Examples:
            | username        | password   |
            | dip24@gmail.com | Sumanta234 |