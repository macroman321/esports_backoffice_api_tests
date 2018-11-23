/*
cucumber.js

The cucumber.js defines profiles and project variables.
*/

const common = "-r ./steps -r ./support --tags 'not @wip' --tags 'not @manual' --tags 'not @semi_auto' --tags 'not @bug_ESP-798'"
module.exports = {
  'default': common + ' --format summary',
  dry: common + ' --dry-run',
  progress: common + ' --format progress',
  dev: common + " --tags '@dev_env or @all_env'",
  stage: common + " --tags '@stage_env or @all_env'",
  prod: common + " --tags '@prod_env or @all_env'"
}
