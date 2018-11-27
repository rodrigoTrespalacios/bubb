const routes = require('next-routes')

module.exports = routes()
.add({ pattern: '/0', page: '0'})
.add({ pattern: '/:slug', page: 'profile'})