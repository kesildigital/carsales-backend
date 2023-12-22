const { logger } = require('firebase-functions')
const { onDocumentCreated } = require('firebase-functions/v2/firestore')
const { getDocumentRef } = require('../../../libs/firebase-api-helpers')
const { recalculateAvg } = require('../../../libs/math')

const onReviewCreated = onDocumentCreated('/users/{userId}/reviews/{reviewId}', async event => {
  const { reviewId, userId } = event.params
  const { rating, service_provided } = event.data.data()
  logger.log(`Review creado: ${reviewId} para el user: ${userId}`, event.data.data())

  const userRef = await getDocumentRef({ collection: 'users', docId: userId })
  const userSnapshot = await userRef.get()
  const { reviewMetrics = [] } = userSnapshot.data()

  const reviewByService = reviewMetrics.find(f => f.service === service_provided)

  if (!reviewByService) {
    const newMetrics = { ratingAvg: rating, totalReviews: 1, service: service_provided }
    return userRef.set({ reviewMetrics: [...reviewMetrics, newMetrics] }, { merge: true })
  }

  const reviewMetricsUpdated = reviewMetrics.map(metric => {
    if (metric.service !== service_provided) {
      return metric
    }

    const { ratingAvg, totalReviews, service } = metric
    const metricUpdated = {
      ratingAvg: recalculateAvg(ratingAvg, totalReviews, rating),
      totalReviews: totalReviews + 1,
      service
    }

    return metricUpdated
  })

  return userRef.set({ reviewMetrics: reviewMetricsUpdated }, { merge: true })
})

module.exports = {
  onReviewCreated
}
