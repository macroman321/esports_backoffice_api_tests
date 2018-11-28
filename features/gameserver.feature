#
# FILE NAME: gameserver.feature
# DESCRIPTION: gameserver FEATURE
# AUTHOR: Ivan Babić (IB)
# CREATED: 26-Sep-2018
# NOTES:
#

Feature: Gameserver

  # question: How do we automate this test cases given that total number of 
  # gameservers constantly changes. 
  # We can do this in 'dev' environment where we can have full control under the
  # system (ie. create database, test data etc). But how do we do that in stage
  # or prod. Could we, for example, get the list via UI and via API and compare
  # them? Does that makes sense?
  @dev_env
  Scenario: List of all gameservers
    When I request a list of all gameservers
    Then I should get the list of gameservers

  @stage_env
  Scenario: Create gameserver
    When I create a new gameserver
    Then I should see that the previously created gameserver exists

  @stage_env
  Scenario: Name is required when creating gameserver
    When I create a new gameserver without providing name
    Then I should see that gameserver creation fails with reason 'game server name can not be null'

  @stage_env
  Scenario: Provider is required when creating gameserver
    When I create a new gameserver without providing provider
    Then I should see that gameserver creation fails with reason 'must not be null'

  @stage_env
  Scenario: Keywords are required when creating gameserver
    When I create a new gameserver without providing keywords
    Then I should see that gameserver creation fails with reason 'game server keywords can not be null'

  @all_env
  Scenario: Update gameserver status
    When I update a gameserver status
    Then I should see that the status of the gameserver has changed

  @all_env
  Scenario: Update gameserver name
    When I update a gameserver name
    Then I should see that the name of the gameserver has changed

  @wip @all_env
  Scenario: Update gameserver keywords
    When I update the gameserver keyword
    Then I should see that the gameserver keyword has changed

  @wip @all_env
  Scenario: Update gameserver package name
    When I update the gameserver package name
    Then I should see that the gameserver package name has changed

  @wip @manual @all_env
  Scenario: Update gameserver cover image
    When I update the gameserver cover image
    Then I should see that the gameserver cover image has changed

  @manual @all_env
  Scenario: Update gameserver card image
    When I update the gameserver card image
    Then I should see that the gameserver card image has changed

  @wip @all_env
  Scenario: It's not possible to update inactive gameserver
    When I attempt to update an inactive gameserver
    Then I should see that the update fails with the resaon ""

  @wip @all_env #moze prodje update :/
  Scenario: Gameserver update name cannot be empty
    When I attempt to update the gameserver name with no parameters
    Then I should see that the gameserver name update fails with the reason "gameserver name must not be null"

  @wip @all_env
  Scenario: Name is required when updating gameserver
    When I attempt to update a gameserver without providing a name
    Then I should see that the gameserver update fails with the reason "game server name can not be null"

  @wip @all_env
  Scenario: Status is required when updating gameserver
    When I attempt to update the gameserver without providing the status
    Then I should see that gameserver update fails with reason "Internal Server Error"

  @wip @all_env
  Scenario: Provider is required when updating gameserver
    When I attempt to update the gameserver without providing the provider
    Then I should see that gameserver update fails with reason "Bad Request"

  @wip @all_env
  Scenario: Keywords are required when updating gameserver
    When I attempt to update the gameserver without providing the keyword
    Then I should see that gameserver update fails with reason "game server keywords can not be null"
