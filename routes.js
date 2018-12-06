const routes = require('next-routes')

module.exports = routes()
.add({ pattern: '/', page: 'index'})
// .add({ pattern: '/dashboard', page: 'dashboard'})
.add({ pattern: '/auth', page: 'auth'})
.add({ pattern: '/:slug', page: 'profile'})
.add({ pattern: '/:slug/u/:user_id', page: 'privateProfile'})
// .add({ pattern: '/:slug/u/:user_id/edit', page: 'privateProfileEdit'})