var path = require('path')
var pjson = require('../package.json')
var chalk = require('chalk')
var log = require('./log')

var checkPath = path.resolve(__dirname, '../node_modules/')

var checklist = pjson.dependencies
var checklist2 = pjson.devDependencies

function checkDependencies (arr) {
  var flag = true
  if (!arr) {
    log.warn('no dependencies')
    return flag
  } else {
    for (var key in arr) {
      var version = arr[key]
      try {
        var realVersion = require(path.resolve(checkPath, key + '/package.json')).version
        if (!checkLegal(realVersion) || !checkLegal(version)) {
          log.error('版本不正确 存在 X * alpha beta rc', key + ' version:' + realVersion + ' pjsonVersion:' + version)
          flag = false
          continue
        }
        var result = checkVersion(realVersion, version)
        if (result === 1) {
          log.error('需要更新package.json', key + '版本' + realVersion + '记录版本' + version)
          flag = false
        } else if(result === -1) {
          log.error('需要更新依赖库', key + '版本' + realVersion + '记录版本' + version)
          flag = false
        } else {
          log.info('okokok', key)
        }
      } catch (e) {
        log.error (e, key + ' miss')
        flag = false
      }      
    }
    return flag
  }
}

/**
 * X  * alpha beta rc 版本不给通过
 */
function checkLegal (str) {
  var key = ['alpha', 'x', 'beta', 'rc']
  var flag = false
  key.forEach(function(val){
    if(str.indexOf(val) === -1){
      flag = true
    }
  })
  return flag
}

/**
 * 比较实际版本跟记录版本大小
 * 
 * @param {String} real 
 * @param {String} record 
 * @returns 
 */
function checkVersion (real, record) {
  if(!/[0-9]/.test(real[0])){
    (real = real.substr(1))
  }
  if(!/[0-9]/.test(record[0])){
    (record = record.substr(1))
  }
  var result = parseInt(real, 10) - parseInt(record, 10)
  if (result > 0) {
    return 1
  } else if(result === 0){
    return 0
  } else {
    return -1
  }
}

module.exports = function (options) {
  log.info('检查dependencies')
  var a = checkDependencies(checklist)
  log.info('检查devDependencies')
  var b = checkDependencies(checklist2)
  if (a && b) {
    log.info('版本校验通过')
  }
}