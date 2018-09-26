#
# FILE NAME: provider.feature
# DESCRIPTION: provider FEATURE
# AUTHOR: Ivan Babić (IB)
# CREATED: 20-Aug-2018
# NOTES:
#

Feature: Provider


  Scenario: List of all providers
    When I request a list of all providers
    Then I should get the list of providers

  Scenario: Create provider
    When I create a new provider
    Then I should see that the previously created provider exists

  Scenario: Update provider
    When I update a provider
    Then I should see that the status of the provider has changed