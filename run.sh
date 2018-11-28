# Convenience script for running GPlay API tests.
#
# Parameters:
# $1 environment (dev, stage or prod)
# $2 and after are standard Cucumberjs parameters
#
# Usage examples:
# $ ./run.sh stage
# $ ./run.sh prod
# $ ./run.sh stage features/<name>.feature
./node_modules/.bin/cucumber-js \
    -r ./steps -r ./support \
    --tags 'not @wip and not @manual and not @bug' \
    --world-parameters "{\"environment\": \"$1\"}" \
    -p $1 \
    ${@:2}
