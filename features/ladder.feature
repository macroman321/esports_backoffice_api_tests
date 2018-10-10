#
# FILE NAME: ladder.feature
# DESCRIPTION: ladder FEATURE
# AUTHOR: Petar Manojlović (PM)
# CREATED: 12-Sep-2018
# NOTES:
#
  Feature: Ladder

  @stage
  Scenario: Verify that a list of all ladders for all gameservers is received using the appropriate API
    When I request a list of ladders for all gameservers
    Then I should see a list of ladders


  @stage
  Scenario: Verify that a new ladder is created using the appropriate API
    When I send POST request for new ladder for "gameserver1" gameserver
    And I request the latest page of the list of ladders for all gameservers
    Then I should see the ladder on the list of ladders


  @stage
  Scenario: Verify that all info is returned on a single ladder using the appropriate API
    When I request information for "ladder1" ladder
    Then I should see information for that ladder


  @stage
  Scenario: Verify that a ladder is deleted using the appropriate API
    When I send POST request for new ladder for "gameserver1" gameserver
    And I request the latest page of the list of ladders for all gameservers
    Then I should get the ID from the created ladder
    When I send a DEL request to delete specific ladder on "gameserver1" gameserver
    And I request the latest page of the list of ladders for all gameservers
    Then I should see the ladder is no longer present in the list of ladders


