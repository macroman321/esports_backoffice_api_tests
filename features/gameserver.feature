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

  @wip @all_env
  Scenario: Update gameserver package name

  @wip @manual @all_env
  Scenario: Update gameserver cover image

  @manual @all_env
  Scenario: Update gameserver card image

  @wip @all_env
  Scenario: It's not possible to update inactive gameserver

  @wip @all_env
  Scenario: Gameserver update name cannot be empty

  @wip @all_env
  Scenario: Name is required when updating gameserver

  @wip @all_env
  Scenario: Status is required when updating gameserver

  @wip @all_env
  Scenario: Provider is required when updating gameserver

  @wip @all_env
  Scenario: Keywords are required when updating gameserver
