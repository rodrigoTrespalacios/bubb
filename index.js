/**
 * Simple example of how to use the NextAuth module.
 *
 * To invoke next-auth you will need to define a configuration block for your
 * site. You can create a next-auth.config.js file and put all your options
 * in it and pass it to next-auth when calling init().
 * 
 * A number of sample configuration files for various databases and
 * authentication options are provided.
 **/

// Include Next.js, Next Auth and a Next Auth config
const next = require('next')
const nextAuth = require('next-auth')
const nextAuthConfig = require('./next-auth.config')
const express = require('express')
const { MongoClient } = require('mongodb')
// const body = require('body-parser')
const api = require('./server/api')

// Load environment variables from .env
require('dotenv').load()

// Initialize Next.js
const nextApp = next({
  dir: '.',
  dev: (process.env.NODE_ENV === 'development')
})

const expressApp = express()
let db = null
// Add next-auth to next app
nextApp
.prepare()
.then(() => {
  return MongoClient.connect(process.env.MONGO_URI)
})
.then((mongodb) => {
  db = mongodb.db("bubb")
  // Load configuration and return config object
  return nextAuthConfig()
})
.then(nextAuthOptions => {
  if (nextAuthOptions.port) delete nextAuthOptions.port
  nextAuthOptions.expressApp = expressApp
  
  nextAuth(nextApp, nextAuthOptions)  
  expressApp.use((req, res, next) => {
    // Also expose the MongoDB database handle so Next.js can access it.
    req.db = db
    next()
  })
  expressApp.use('/api', api(db))

  expressApp.all('*', (req, res) => {
    let nextRequestHandler = nextApp.getRequestHandler()
    return nextRequestHandler(req, res)
  })
  // Pass Next.js App instance and NextAuth options to NextAuth
  expressApp.listen(process.env.PORT || 3000, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:' + (process.env.PORT || 3000))
  }) 
})
// .then((response) => {
//   const express = response.express

//   express.use('/api', api())
//   express.get('*', (req, res) => {
//     return handle(req, res)
//   })
//   express.listen(process.env.PORT, err => {
//     if (err) throw err
//     console.log('> Ready on http://localhost:' + process.env.PORT)
//   })
//   // console.log(`Ready on http://localhost:${process.env.PORT || 3000}`)
// })
.catch(err => {
  console.log('An error occurred, unable to start the server')
  console.log(err)
})