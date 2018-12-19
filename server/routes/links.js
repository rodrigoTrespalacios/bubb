'use strict'
const LinkType = require('../LinkType')
const urlRegex = /^(?:http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i

function isValidLink(link) {
  if(!link) return false
  return urlRegex.test(link)
}
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
    if (req.user) {
      const links = await db.collection('link').find({owner: req.user.id}).sort({ createdAt: -1 }).toArray()
      return res.status(200).json({ links })
    } else {
      return res.status(403).json({error: 'Must be signed in to get profile'})
    }
  })

  expressApp.get('/api/user/link', async(req, res) => {
    if (req.user) {
      const link = await db.collection('link').findOne({owner: req.user.id})//.toArray()
      return res.status(200).json({ ...link })
    } else {
      return res.status(403).json({error: 'Must be signed in to get profile'})
    }
  })

  expressApp.post('/api/reserve', async(req, res) => {
    if (req.user && req.body.slug) {

      const link = new LinkType({
        slug: req.body.slug,
        owner: req.user.id,
        paid: false,
      })
      await db.collection('link').findOneAndUpdate({
        slug: req.body.slug.replace(/\s/g, '.').replace(/[.]+/gi, '.').replace(/[^0-9a-z.]/gi, '').slice(0, 4),
        owner: req.user.id}, {$set: link}, {upsert: true})

      return res.status(200).json({ link: link })
    } else {
      return res.status(403).json({error: 'Must be signed in to get profile'})
    }
  })

  expressApp.post('/api/link/edit', async(req, res) => {
    if (req.user) {
      let addOrRemoveLink = {}
      const isValid = isValidLink(req.body.link)
      if(isValid) {
        addOrRemoveLink = {$push: {links: req.body.link}}
        if(req.body.link && req.body.removeLink) addOrRemoveLink = {$pull: {links: req.body.link}}
      }
      const updates = {
        profileName: req.body.name || null,
        profileDescription: req.body.description || null
      }
      Object.keys(updates).forEach((key) => (updates[key] == null) && delete updates[key]);
      const updatesIsEmpty = Object.keys(updates).length === 0 && updates.constructor === Object
      const updateOperation = Object.assign({}, addOrRemoveLink, updatesIsEmpty ? {} : {$set: updates })
      console.log(updateOperation)
      const link = await db.collection('link').findOneAndUpdate(
        {
          slug: req.body.slug,
          owner: req.user.id,
        },
        updateOperation,
        { upsert: false }
      )
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