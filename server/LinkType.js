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
  owner: {
    $type: ObjectId,
  },
  paid: {
    $type: 'boolean',
    $required: true,
    $default: false,
  },
}).compile('LinkType')