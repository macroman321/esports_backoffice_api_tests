#
# FILE NAME: ladder.feature
# DESCRIPTION: ladder FEATURE
# AUTHOR: Petar Manojlović (PM)
# CREATED: 12-Sep-2018
# NOTES:
#
  Feature: Ladder

  @manual
  Scenario: Verify that a list of all ladders for all gameservers is received using the appropriate API
    When I request a list of ladders for all gameservers
    Then I should see a list of ladders

  @bug_ESP-798
  Scenario: Verify that a list of all ladders for all gameservers is NOT received if wrong authorization token is provided
    When I request a list of ladders for all gameservers with invalid authorization token
    Then I should NOT see a list of ladders

  @manual
  Scenario: Verify that a new ladder is created using the appropriate API
    When I create new ladder for "gameserver1" gameserver
    And I request the latest page of the list of ladders for all gameservers
    Then I should see the ladder on the list of ladders

  @bug_ESP-798
  Scenario: Verify that a new ladder can't be created without choosing a gameserver
    When I try to create a new ladder for "gameserver1" gameserver without choosing a gameserver
    Then I should see the ladder is not created

  @bug_ESP-798
  Scenario: Verify that a new ladder can't be created without entering a ladder name
    When I try to create a new ladder for "gameserver1" gameserver without entering a name for the ladder
    Then I should see the ladder is not created

  @bug_ESP-798
  Scenario: Verify that a new ladder can't be created without entering a start date
    When I try to create a new ladder for "gameserver1" gameserver without entering a start date
    Then I should see the ladder is not created

  @manual
  Scenario: Verify that all info is returned on a single ladder using the appropriate API
    When I request information for "ladder1" ladder
    Then I should see information for that ladder

  @manual
  Scenario: Verify that a ladder is deleted using the appropriate API
    When I create new ladder for "gameserver1" gameserver
    And I request the latest page of the list of ladders for all gameservers
    Then I should get the ID from the created ladder
    When I delete a specific ladder on "gameserver1" gameserver
    And I request the latest page of the list of ladders for all gameservers
    Then I should see the ladder is no longer present in the list of ladders

  @stage_env
  Scenario: Let's see if this scenario deletes a ladder
    When I use this function to delete ladder with "380" id
