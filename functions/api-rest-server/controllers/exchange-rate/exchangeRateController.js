const { logger } = require('firebase-functions')
const httpService = require('../../services/http.service')

const getBCVDollarUnit = async (req, res) => {
    logger.log(req.body)
    logger.log(req.headers)
    try {
        const response = await httpService.get({
            url: `https://pydolarvenezuela-api.vercel.app/api/v1/dollar/unit/bcv`
        })

        // Enviar la respuesta real devuelta por la API externa
        res.status(200).send(response.data)
    } catch (error) {
        logger.error(error)
        res.status(400).send('Error al obtener la unidad del dólar del Banco Central de Venezuela')
    }
}

module.exports = {
    getBCVDollarUnit
}