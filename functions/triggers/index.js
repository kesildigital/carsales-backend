const reviewsTriggers = require('./reviews/on-created')
const usersTriggers = require('./users/on-created')

module.exports = {
  ...reviewsTriggers,
  ...usersTriggers
}
