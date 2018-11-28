/*
cucumber.js

The cucumber.js defines profiles and project variables.
*/

module.exports = {
  'default': '--format summary',
  dry: '--dry-run',
  progress: '--format progress',
  dev: "--tags '@dev_env or @all_env'",
  stage: "--tags '@stage_env or @all_env'",
  prod: "--tags '@prod_env or @all_env'"
}
