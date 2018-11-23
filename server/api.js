require('dotenv').config()
const express = require('express')
const LinkType = require('./LinkType')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

module.exports = db => {
  const router = express.Router()

  // Wrap an async function so we catch any errors that might occur
  const wrapAsync = handler => (req, res) => handler(req)
    .then(result => res.json(result))
    .catch(error => res.status(500).json({ error: error.message }))

  const postStripeCharge = res => (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  }

  // Get all books
  router.get('/', wrapAsync(async function(req) {
    console.log('user')
    console.log(req.user)
    const links = db.collection('link').find().sort({ createdAt: -1 }).toArray()
    return links
  }))

  // router.post('/create'), wrapAsync(async function(req) {
  //   const links = db.collection('link').find().sort({ createdAt: -1 }).toArray()
  //   return links
  // }))

 // Add a new book
  router.post('/', wrapAsync(async function(req) {
    const link = new LinkType(req.body)
    await db.collection('link').insertOne(link)
    return { link }
  }))

  router.post('/pay', wrapAsync(async function(req) {
    // console.log(req.body)
    stripe.charges.create(req.body);
  }))


  // // Delete an existing Book
  // router.delete('/:id', wrapAsync(async function(req) {
  //   const { result } = await db.collection('Book').deleteOne({
  //     _id: Archetype.to(req.params.id, ObjectId)
  //   })
  //   return { result }
  // }))

  return router
}