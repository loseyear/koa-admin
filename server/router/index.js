const fs = require('fs')
const router = require('koa-router')()

const addMapping = function(router, mapping) {
  for (let url in mapping) {
    let path
    switch(true) {
      case url.startsWith('GET'):
        path = url.substring(4)
        router.get(path, mapping[url])
        // console.log(`register URL mapping: GET ${path}`)
        break
      case url.startsWith('POST'):
        path = url.substring(5)
        router.post(path, mapping[url])
        // console.log(`register URL mapping: POST ${path}`)
        break
      case url.startsWith('PUT'):
        path = url.substring(4)
        router.put(path, mapping[url])
        // console.log(`register URL mapping: PUT ${path}`)
        break
      case url.startsWith('delete'):
        path = url.substring(7)
        router.post(path, mapping[url])
        // console.log(`register URL mapping: DELETE ${path}`)
        break
      default:
        path = url
        // console.log(`error URL mapping: undefined ${path}`)
        break
    }
  }
}

const addControllers = function (router, dir) {
  fs.readdirSync(__dirname + '/../' + dir).filter((f) => {
    return f.endsWith('.js')
  }).forEach((f) => {
    // console.log(`process controller: ${f}...`)
    let mapping = require(__dirname + '/../' + dir + '/' + f)
    addMapping(router, mapping);
  })
}

module.exports = function (dir) {
  var controllersDir = dir || 'controller'
  addControllers(router, controllersDir)
  return router.routes();
}

