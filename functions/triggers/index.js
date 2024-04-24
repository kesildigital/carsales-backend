const reviewsTriggers = require('./reviews/on-created')
const publicationsTriggers = require('./publications/on-created')

module.exports = {
  ...reviewsTriggers,
  ...publicationsTriggers
}
