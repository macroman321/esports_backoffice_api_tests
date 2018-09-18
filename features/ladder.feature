#
# FILE NAME: ladder.feature
# DESCRIPTION: ladder FEATURE
# AUTHOR: Petar Manojlović (PM)
# CREATED: 12-Sep-2018
# NOTES:
#
  Feature: Ladder

  @stage
  Scenario: Verify that a list of all ladders for selected gameserver is received using the appropriate API
    When I request a list of ladders for "gameserver1" gameserver
    Then I should see a list of ladders

  Scenario: Verify that a new ladder is created using the appropriate API
    When I send POST request for new ladder for "gameserver1" gameserver
    Then I should see the new ladder created

  Scenario: Verify that all info is returned on a single ladder using the appropriate API
    When I request information for specific ladder on "gameserver1" gameserver
    Then I should see all information about that ladder
