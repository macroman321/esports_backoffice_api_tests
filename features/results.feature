#
# FILE NAME: results.feature
# DESCRIPTION: results FEATURE
# AUTHOR: Petar Manojlović (PM)
# CREATED: 12-Sep-2018
# NOTES:
#

  Feature: Results

    @stage_env
    Scenario: Verify that a list of all ladders for selected gameserver is received using the appropriate API
      When I request a list of results for "match1" match on "gameserver1" gameserver
      Then I should see appropriate results for the query

#    @stage_env
#    Scenario: Verify that a list of all ladder for selected gameserver is not displayed without entering the gameslug
#      When I request a list of results for "match1" match on "gameserver1" gameserver without the appropriate gameslug
#    The only response code is 200, need to think over implementation
