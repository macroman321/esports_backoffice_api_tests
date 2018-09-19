#
# FILE NAME: results.feature
# DESCRIPTION: results FEATURE
# AUTHOR: Petar Manojlović (PM)
# CREATED: 12-Sep-2018
# NOTES:
#

  Feature: Results

    Scenario: Verify that a list of all ladders for selected gameserver is received using the appropriate API
      When I request results for a
