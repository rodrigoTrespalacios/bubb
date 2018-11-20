const Archetype = require('archetype-js')

module.exports = new Archetype({
  createdAt: {
    $type: Date,
    $default: new Date()
  },
  name: {
    $type: 'string',
    $required: true
  },
}).compile('LinkType')