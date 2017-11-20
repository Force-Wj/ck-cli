var chalk = require('chalk')
var log = console.log
module.exports = {
  info: function (msg, key) {
    var content = key ? (chalk.white(key) + ' ' + chalk.green.bold(msg)): chalk.green.bold(msg)
    return log(chalk.blue.bgBlack('log'), content)
  },
  warn: function (msg, key) {
    var content = key ? (chalk.white(key) + ' ' + chalk.yellowBright.bold(msg)): chalk.yellowBright.bold(msg)
    return log(chalk.yellow.bgBlack('warn'), content)
  },
  error: function (msg, key) {
    var content = key ? (chalk.white(key) + ' ' + chalk.redBright.bold(msg)): chalk.redBright.bold(msg)
    return log(chalk.red.bgBlack('error'), content)
  }
}