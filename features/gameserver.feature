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
  @semi_auto
  Scenario: List of all gameservers
    When I request a list of all gameservers
    Then I should get the list of gameservers

  @stage_env
  Scenario: Create gameserver
    When I create a new gameserver
    Then I should see that the previously created gameserver exists

  @stage_env
  Scenario: Name is required when creating gameserver

  @stage_env
  Scenario: Package name is required when creating gameserver

  @stage_env
  Scenario: Provider is required when creating gameserver

  @all_env
  Scenario: Update gameserver status
    When I update a gameserver
    Then I should see that the status of the gameserver has changed

  @all_env
  Scenario Outline: Update gameserver
    When I update a gameserver <property>
    Then I should see that the gameserver <property> has changed
    
    Examples:
    |property|
    |status  |
    |name    |
    |keywords|

  @all_env
  Scenario: Update gameserver name
    When I update a gameserver
    Then I should see that the status of the gameserver has changed

  @all_env
  Scenario: Update gameserver keywords
    When I update a gameserver
    Then I should see that the status of the gameserver has changed

  @all_env
  Scenario: Update gameserver package name
    When I update a gameserver
    Then I should see that the status of the gameserver has changed

  @manual @all_env
  Scenario: Update gameserver cover image
    When I update a gameserver
    Then I should see that the status of the gameserver has changed

  @manual @all_env
  Scenario: Update gameserver card image
    When I update a gameserver
    Then I should see that the status of the gameserver has changed

  @all_env
  Scenario: Verify it's not possible to update inactive gameserver
    When I update a gameserver
    Then I should see that the status of the gameserver has changed

  @all_env
  Scenario: Verify that gameserver name cannot be empty
    When I update a gameserver
    Then I should see that the status of the gameserver has changed
