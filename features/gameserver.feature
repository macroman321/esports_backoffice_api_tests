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

  @all_env
  Scenario: Update gameserver
    When I update a gameserver
    Then I should see that the status of the gameserver has changed
