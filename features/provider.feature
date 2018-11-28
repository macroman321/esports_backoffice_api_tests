#
# FILE NAME: provider.feature
# DESCRIPTION: provider FEATURE
# AUTHOR: Ivan Babić (IB)
# CREATED: 20-Aug-2018
# NOTES:
#

Feature: Provider 

  # same comment as for scenario 'List of all gameservers' applies here
  @dev_env
  Scenario: List of all providers
    When I request a list of all providers
    Then I should get the list of providers

  @all_env
  Scenario: Verify that GET /provider API returns correct status
    When I request a list of all providers

  @stage_env
  Scenario: Create provider
    When I create a new provider
    Then I should see that the previously created provider exists

  @stage_env
  Scenario: Name is required when creating provider
    When I create a new provider without providing name
    Then I should see that provider creation fails with reason 'provider name can not be null'

  @all_env
  Scenario: Update provider status
    When I update a provider status
    Then I should see that the status of the provider has changed

  @all_env
  Scenario: Update provider name
    When I update a provider name
    Then I should see that the name of the provider has changed

  @wip @all_env #moze prodje update :/
  Scenario: Provider update name cannot be empty
    When I attempt to update the provider name with no parameters
    Then I should see that the provider name update fails with the reason "provider name must not be null"

  @wip @all_env
  Scenario: Name is required when updating provider
    When I attempt to update a provider without providing a name
    Then I should see that the provider update fails with the reason "provider name can not be null"