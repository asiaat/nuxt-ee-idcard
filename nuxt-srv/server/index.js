const express   = require('express')
const consola   = require('consola')
const   fs      = require('fs')
const   https   = require('https')
const   path    = require('path')
const   morgan  = require('morgan')
const   bodyParser = require('body-parser')


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

  // TODO now 
  app.use(bodyParser.json());

  // Login API for testing now
  app.post('/api/login', function(req, res){

    console.log("/api/login #100")
    
    if(!req.body.username) {

      console.log("/api/login #200")
      res.send("done")
      //res.json({
      //  message: "Login OK! " + req.body.username
      //});

    } else {
      res.json({
        message: "ERROR: Can't login "
      });
      console.log("/api/login #300")
    }
    
  });

  // Give nuxt middleware to express
  app.use(nuxt.render)
  
  /*
  const httpsOptions = {
    cert: fs.readFileSync(path.join(__dirname,'ssl','server.crt')),
    key:  fs.readFileSync(path.join(__dirname,'ssl','server.key')),
  }*/

  var httpsOptions = {
    key  : fs.readFileSync(path.join(__dirname,'ssl','key.pem')),
    ca   : fs.readFileSync(path.join(__dirname,'ssl','csr.pem')),
    cert : fs.readFileSync(path.join(__dirname,'ssl','cert.pem'))
  }  
  
  https.createServer(httpsOptions,app)
    .listen(port,function() {
        console.log("Serving t https://localhost:" + port)
  })
}
start()
