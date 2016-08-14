'use strict'

const shelljs = require('shelljs')
const exec = require('cooking-exec')
const PLUGIN_PATH = require('cooking-path').PLUGIN_PATH
const path = require('path')

module.exports = function (program) {

  const testPackage = process.argv[3]
  const options = process.argv.splice(4)
  const pwd = shelljs.pwd()

  shelljs.cd(PLUGIN_PATH)
  const binPath = exec('npm', ['bin']).stdout.toString().trim()
  const testCommand = path.join(binPath, testPackage)

  shelljs.cd(pwd)
  exec(testCommand, options, {stdio: 'inherit'})
}
