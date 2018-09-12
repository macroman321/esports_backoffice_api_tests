# Convenience script for running GPlay API tests.
#
# Parameters:
# $1 environment (stage or prod)
# $2 and after are standard Cucumberjs parameters
#
# Usage examples:
# $ ./run.sh stage
# $ ./run.sh prod
./node_modules/.bin/cucumber-js \
    --world-parameters "{\"environment\": \"$1\"}" \
    ${@:2}
