'use strict'
const LinkType = require('../LinkType')

module.exports = (expressApp, db, functions) => {

  if (expressApp === null) {
    throw new Error('expressApp option must be an express server instance')
  }
  // Expose a route to return user profile if logged in with a session
  expressApp.get('/api/search/:q', async(req, res) => {
    const slug = req.params.q
    if (slug) {
      const links = await db.collection('link').find({slug: slug}).sort({ createdAt: -1 }).toArray()
      return res.status(200).json({ links })
    } else {
      res.status(200).json({links: 'et'})
    }

  })
  expressApp.get('/api/user/links', async(req, res) => {
    console.log(req.user)
    if (req.user) {
      const links = await db.collection('link').find({owner: req.user.id}).sort({ createdAt: -1 }).toArray()
      return res.status(200).json({ links })
    } else {
      return res.status(403).json({error: 'Must be signed in to get profile'})
    }
  })

  expressApp.post('/api/reserve', async(req, res) => {
    if (req.user) {

      const link = new LinkType({
        slug: req.body.slug,
        owner: req.user.id,
        paid: false,
      })
      await db.collection('link').insertOne(link)

      return res.status(200).json({ link: link })
    } else {
      return res.status(403).json({error: 'Must be signed in to get profile'})
    }
  })

}


    // if (req.user) {
    //   // functions.find({id: req.user.id})
    //   // .then(user => {
    //   //   if (!user) return res.status(500).json({error: 'Unable to fetch profile'})
    //   //   res.json({
    //   //     name: user.name,
    //   //     email: user.email,
    //   //     emailVerified: (user.emailVerified && user.emailVerified === true) ? true : false
    //   //   })
    //   // })
    //   // .catch(err => {
    //   //   return res.status(500).json({error: 'Unable to fetch profile'})        
    //   // })
    //   return res.status(200).json({message: 'hello'})
    // } else {
    //   return res.status(403).json({error: 'Must be signed in to get profile'})
    // }