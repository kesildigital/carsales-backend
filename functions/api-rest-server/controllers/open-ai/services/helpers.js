const MAX_RETRIES = 3

async function makeRequestWithRetries(request) {
  let retries = 0
  let response
  let errorResponse

  while (retries < MAX_RETRIES) {
    try {
      response = await request()
      const { status } = response
      if (status === 200) {
        return response
      }

      retries++
      errorResponse = null
    } catch (error) {
      errorResponse = error
      retries++
    }
  }

  if (errorResponse) {
    throw errorResponse
  }

  return response
}

module.exports = {
  makeRequestWithRetries
}
