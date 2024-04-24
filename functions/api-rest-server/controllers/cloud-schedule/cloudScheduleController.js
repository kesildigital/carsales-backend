const { logger } = require('firebase-functions')
const admin = require('firebase-admin');

async function sendEmail(correo,userInfo) {
    try {
      const postData = {
        Messages: [
          {
            From: {
              Email: 'no-responder@vroomit.io',
              Name: 'Vroomit'
            },
            To: [
              {
                Email: correo
              }
            ],
            TemplateID: 5906898,
            TemplateLanguage: true,
            Subject:'Esto es una prueba',
            Variables:{
                name:userInfo.display_name,
                identity:userInfo.identity_verification_status,
                phonenumber:userInfo.phone_number

            }
          }
        ]
      }
  
      const response = await httpService.post({
        url: `https://api.mailjet.com/v3.1/send`,
        postData: postData,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic YTNhZjNhYzVmY2YzNjQ3ODIwZTMxYzI1N2U5N2M2MjA6ZjZlNDZmY2JkZmI5OWFlNzdlN2NhOTZiZjFmZTNkODY=`
        }
      })
  
      return response.data;
    } catch (error) {
      logger.error(error);
      throw new Error('Error al enviar el correo');
    }
  }
  
  
  // Función principal que se ejecutará en el horario especificado
  const enviarEmails = async (req, res) => {
    logger.log(req.body);
    logger.log(req.headers);
    try {
      /*const publicationsSnapshot = await admin.firestore().collection('publications').where('status', '==', 'Activa').where('isPayment', '==', false).get();
      const userIds = publicationsSnapshot.docs.map(doc => doc.data().user_id);
  
      const usuariosSnapshot = await Promise.all(userIds.map(userId =>
        admin.firestore().collection('users').doc(userId).get()
      ));
  
      const correosElectronicos = usuariosSnapshot.map(snapshot => snapshot.data().email);
  
      const results = await Promise.all(correosElectronicos.map(correo => sendEmail(correo)));*/

      const correo = 'kesildigital@gmail.com'; // Correo a buscar

    // Buscar el usuario por su correo electrónico
    const userSnapshot = await admin.firestore().collection('users').where('email', '==', correo).limit(1).get();
    if (userSnapshot.empty) {
      throw new Error('Usuario no encontrado');
    }

    // Extraer los campos necesarios del usuario
    const userData = userSnapshot.docs[0].data();
    const { display_name, identity_verification_status, phone_number } = userData;
    const userInfo = { display_name, identity_verification_status, phone_number };

    // Enviar correo electrónico al usuario con la información
    const result = await sendEmail(correo, userInfo);
      logger.log('Correos electrónicos enviados correctamente');
      res.status(200).send(results);
    } catch (error) {
      logger.error(error);
      res.status(400).send('Error al enviar los correos electrónicos');
    }
  };

module.exports={
    enviarEmails
}