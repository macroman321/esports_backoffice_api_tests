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
