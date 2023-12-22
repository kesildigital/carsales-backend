const axios = require('axios')

module.exports = (function () {
  const axiosInstance = axios.create({})

  // Agregar un interceptor para todos los request
  axiosInstance.interceptors.request.use(
    config => {
      // Aquí puedes agregar lógica para obtener tu API key
      const apiKey = process.env.OPEN_AI_API_KEY

      // Añadir el API key al encabezado de la solicitud
      config.headers['Authorization'] = `Bearer ${apiKey}`
      config.headers['Content-Type'] = 'application/json'

      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

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
