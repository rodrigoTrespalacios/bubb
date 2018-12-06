const Archetype = require('archetype-js')
const { ObjectId } = require('mongodb');

module.exports = new Archetype({
  createdAt: {
    $type: Date,
    $default: new Date()
  },
  slug: {
    $type: 'string',
    $required: true
  },
  destination: {
    $type: 'string',
  },
  links: {
    $type: Array
  },
  owner: {
    $type: ObjectId,
  },
  profileName: {
    $type: 'string',
  },
  paid: {
    $type: 'boolean',
    $required: true,
    $default: false,
  },
}).compile('LinkType')