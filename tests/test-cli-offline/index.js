/* globals describe, before, after */

'use strict'

const fs = require('fs')
const ncp = require('ncp').ncp
const rimraf = require('rimraf')
const expect = require('chai').expect

describe('cli-offline', () => {
  const repoExample = process.cwd() + '/tests/repo-example'
  const repoTests = process.cwd() + '/tests/repo-tests' + Date.now()

  before(done => {
    ncp(repoExample, repoTests, err => {
      process.env.IPFS_PATH = repoTests
      expect(err).to.equal(null)
      done()
    })
  })

  after(done => {
    rimraf(repoTests, err => {
      expect(err).to.equal(null)
      done()
    })
  })

  const tests = fs.readdirSync(__dirname)
  tests.filter(file => {
    if (file === 'index.js') {
      return false
    } else {
      return true
    }
  }).forEach(file => {
    require('./' + file)
  })
})
