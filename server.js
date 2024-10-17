require("dotenv").config();
const express = require("express");
const cors = require("cors");
//const { AuthorizationCode } = require('simple-oauth2'); // Importar simple-oauth2
const emailBeachController = require("./controller/emailBeachController");
const emailKayController = require("./controller/emailKayController");

const app = express();
const PORT = process.env.PORT || 3000;

// // Configurar OAuth2
// const oauth2Client = new AuthorizationCode({
//   client: {
//     id: process.env.CLIENT_ID, // Client ID de Azure
//     secret: process.env.CLIENT_SECRET, // Client secret de Azure
//   },
//   auth: {
//     tokenHost: 'https://login.microsoftonline.com',
//     tokenPath: `/${process.env.TENANT_ID}/oauth2/v2.0/token`,

//   },
// });
// // Variable para almacenar el token y su expiración
// let accessToken = null;
// let tokenExpiration = null;

// const tokenConfig = {
//   grant_type: 'client_credentials', // Flujo de credenciales del cliente
//   scope: 'https://graph.microsoft.com/.default', // o 'Mail.Send' si es necesario
// };

// async function obtenerTokenAcceso() {
//   try {
//     const result = await oauth2Client.getToken(tokenConfig);
//     console.log("Token obtenido: ", result);
//     accessToken = result.token.access_token;
//     tokenExpiration = new Date().getTime() + (result.token.expires_in * 1000); // ajustar el tiempo en milisegundos
//   } catch (error) {
//     console.error("Error obteniendo el token: ", error.response ? error.response.data : error.message);
//   }
// }
// async function refrescarTokenAcceso() {
//   try {
//     const result = await oauth2Client.createToken({
//       refresh_token: refreshToken,
//       grant_type: 'refresh_token',
//       scope: 'https://graph.microsoft.com/.default',
//     });

//     accessToken = result.token.access_token; // Actualizar el access token
//     tokenExpiration = new Date().getTime() + (result.token.expires_in * 1000); // actualizar la expiración
//     console.log("Token renovado: ", result);
//   } catch (error) {
//     console.error("Error al refrescar el token: ", error.response ? error.response.data : error.message);
//   }
// }
// async function verificarToken(req, res, next) {
//   const ahora = new Date().getTime();
//   if (!accessToken || ahora > tokenExpiration) {
//     try {
//       console.log('Obteniendo el token de acceso...');

//       await refrescarTokenAcceso();
//     } catch (error) {
//       return res.status(500).send('Error al obtener el token de acceso');
//     }
//   }
//   req.accessToken = accessToken; // Almacenar el token en el request para usarlo en los controladores
//   next();
// }


// Middleware para manejar datos en formato JSON y CORS
app.use(cors());
app.use(express.json());

// Rutas para enviar correos con 
app.post("/sendEmailBeach", emailBeachController.enviarCorreo);
app.post("/sendEmailKay",  emailKayController.enviarCorreo);

// Rutas para enviar correos con verificación de token
// app.post("/sendEmailBeach", verificarToken, emailBeachController.enviarCorreo);
// app.post("/sendEmailKay", verificarToken, emailKayController.enviarCorreo);

// Iniciar el servidor
app.listen(PORT, async () => {
  try {
    //await obtenerTokenAcceso(); // Obtener el token al iniciar la aplicación
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  } catch (error) {
    console.error("Error al iniciar el servidor:", error.message);
  }
});
