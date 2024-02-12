const axios = require('axios')

module.exports = (function () {
  const axiosInstance = axios.create({})

  return {
    get: ({ url }) => {
      return axiosInstance.get(url).catch(err => Promise.reject(handleResponse(err)))
    },
    post: ({ url, postData }) => {
      return axiosInstance.post(url, postData).catch(err => Promise.reject(handleResponse(err)))
    },
    put: ({ url, postData }) => {
      return axiosInstance.put(url, postData).catch(err => Promise.reject(handleResponse(err)))
    }
  }

  function handleResponse(error) {
    if (error.response) {
      return error.response.data
    }

    return error
  }
})()
