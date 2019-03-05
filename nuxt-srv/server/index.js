const express   = require('express')
const consola   = require('consola')
const   fs      = require('fs')
const   https   = require('https')
const   path    = require('path')
const   morgan  = require('morgan')


const { Nuxt, Builder } = require('nuxt')
const app = express()
app.use(morgan('combined'))

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  const httpsOptions = {
    cert: fs.readFileSync(path.join(__dirname,'ssl','server.crt')),
    key:  fs.readFileSync(path.join(__dirname,'ssl','server.key')),
  }

  
  https.createServer(httpsOptions,app)
    .listen(port,function() {
        console.log("Serving t https://localhost:" + port)
  })
}
start()
