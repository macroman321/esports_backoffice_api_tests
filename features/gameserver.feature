#
# FILE NAME: gameserver.feature
# DESCRIPTION: gameserver FEATURE
# AUTHOR: Ivan Babić (IB)
# CREATED: 26-Sep-2018
# NOTES:
#

Feature: Gameserver


#  Scenario: List of all gameservers
#    When I request a list of all gameservers
#    Then I should get the list of gameservers

#  Scenario: Create gameserver
#    When I create a new gameserver
#    Then I should see that the previously created gameserver exists

  Scenario: Update gameserver
    When I update a gameserver
    Then I should see that the status of the gameserver has changed