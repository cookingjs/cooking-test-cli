'use strict'

const shelljs = require('shelljs')
const exec = require('cooking-exec')
const PLUGIN_PATH = require('cooking-path').PLUGIN_PATH
const path = require('path')

module.exports = function (program) {
  process.env.NODE_ENV = 'testing'

  const testPackage = process.argv[3]
  const options = process.argv.splice(4)
  const pwd = shelljs.pwd()

  shelljs.cd(PLUGIN_PATH)

  const pkg = require(testPackage + '/package.json').bin
  const command = Object.keys(pkg)[0]
  const testCommand = path.resolve(PLUGIN_PATH, 'node_modules', testPackage, pkg[command])

  shelljs.cd(pwd)
  exec(testCommand, options, {stdio: 'inherit'})
}
