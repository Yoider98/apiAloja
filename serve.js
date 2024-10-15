require('dotenv').config();
const express = require('express');
const sgMail = require('@sendgrid/mail');

const app = express();
const PORT = process.env.PORT || 3000;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Middleware para manejar datos en formato JSON
app.use(express.json());

// Ruta para enviar correo
app.post('/send-email', async (req, res) => {
  const { nombre, email, mensaje } = req.body;

  const msg = {
    to: 'darnysdelahoz@gmail.com', // Cambia esto por el correo de destino
    from: 'yoideryancy@gmail.com', // Cambia esto por tu correo verificado en SendGrid
    subject: 'Formulario de contacto',
    text: `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`,
    html: `<p><strong>Nombre:</strong> ${nombre}</p><p><strong>Email:</strong> ${email}</p><p><strong>Mensaje:</strong> ${mensaje}</p>`,
  };

  try {
    await sgMail.send(msg);
    res.status(200).send('Correo enviado con éxito');
  } catch (error) {
    console.error('Error enviando el correo:', error);
    if (error.response) {
      console.error(error.response.body);
    }
    res.status(500).send('Hubo un error al enviar el correo');
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
