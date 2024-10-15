require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors"); // Importar cors

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para permitir CORS
app.use(cors()); // Esto permite CORS para todas las rutas

// Middleware para manejar datos en formato JSON
app.use(express.json());

// Configura el transporte SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const enviarCorreo = async (req, res) => {
  const {
    agenciaN,
    email,
    telefono,
    titular,
    cantidadPax,
    cantNoche,
    cantHab,
    checkin,
    checkout,
    habitaciones,
    soliEspecial,
    planAli,
  } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Formulario de contacto - Reserva",
    html: `
            <h2 style="text-align:center; font-family: Arial, sans-serif; color: #333;">SOLICITUD DE RESERVACIÓN PARA GRUPOS</h2>
    <table style="width: 100%; max-width: 600px; margin: auto; font-family: Arial, sans-serif; border-collapse: collapse;">

      <!-- Fila de agencia, teléfono, correo -->
      <tr>
        <td style="font-weight: bold; padding: 10px; border: 1px solid #ddd; background-color: #f0f0f0;">AGENCIA:</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${
          agenciaN || "No especificado"
        }</td>
        <td style="font-weight: bold; padding: 10px; border: 1px solid #ddd; background-color: #f0f0f0;">TELÉFONO:</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${
          telefono || "No especificado"
        }</td>
      </tr>

      <!-- Fila de correo -->
      <tr>
        <td style="font-weight: bold; padding: 10px; border: 1px solid #ddd; background-color: #f0f0f0;">CORREO:</td>
        <td colspan="3" style="padding: 10px; border: 1px solid #ddd;"><a href="mailto:${email}" style="color: #333;">${email}</a></td>
      </tr>

      <!-- Fila de cantidad de pax y fechas -->
      <tr>
        <td style="font-weight: bold; padding: 10px; border: 1px solid #ddd; background-color: #f0f0f0;">CANT. PAX:</td>
        <td colspan="3" style="padding: 10px; border: 1px solid #ddd;">${
          cantidadPax || "No especificado"
        }</td>
       
      </tr>

      <!-- Fila de solicitudes especiales -->
      <tr>
        <td style="font-weight: bold; padding: 10px; border: 1px solid #ddd; background-color: #f0f0f0;">SOLICITUDES ESPECIALES:</td>
        <td colspan="3" style="padding: 10px; border: 1px solid #ddd;">${
          soliEspecial || "Ninguna"
        }</td>
      </tr>

      <tr>
        <td style="font-weight: bold; padding: 10px; border: 1px solid #ddd; background-color: #f0f0f0;">FECHA CHECK-IN:</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${
          checkin || "No especificado"
        }</td>
        <td style="font-weight: bold; padding: 10px; border: 1px solid #ddd; background-color: #f0f0f0;">FECHA CHECK-OUT:</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${
          checkout || "No especificado"
        }</td>



      </tr>
       <tr>
       <td style="font-weight: bold; padding: 10px; border: 1px solid #ddd; background-color: #f0f0f0;">TITULAR:</td>
        <td style="padding: 10px; border: 1px solid #ddd;">${
          titular || "No especificado"
        }</td>
      </tr>

      
      <tr>
        <td style="font-weight: bold; padding: 10px; border: 1px solid #ddd; background-color: #f0f0f0;">CANTIDAD DE NOCHES:</td>
        <td  style="padding: 10px; border: 1px solid #ddd;">${
          cantNoche || "No especificado"
        }</td>
        <td style="font-weight: bold; padding: 10px; border: 1px solid #ddd; background-color: #f0f0f0;">CANTIDAD DE HABITACIONES:</td>
        <td  style="padding: 10px; border: 1px solid #ddd;">${ cantHab || "No especificado"
        }</td>
      </tr>

      <!-- Fila de titular -->
      <tr style="background-color: #f0f0f0;">
      <th style="font-weight: bold; padding: 10px; border: 1px solid #ddd;">TIPO DE ACOMODACIÓN</th>
      <th style="font-weight: bold; padding: 10px; border: 1px solid #ddd;">ADULTO</th>
      <th style="font-weight: bold; padding: 10px; border: 1px solid #ddd;">NIÑO (9+ años)</th>
      <th style="font-weight: bold; padding: 10px; border: 1px solid #ddd;">NIÑO (4-8 años)</th>
      <th style="font-weight: bold; padding: 10px; border: 1px solid #ddd;">INFANTE (0-3 años)</th>
    </tr>

    <!-- Fila de habitaciones -->
            ${habitaciones
              .map((hab) => {
                let descripcionAcomodacion;

                switch (hab.acomodacion) {
                  case "habDobSen":
                    descripcionAcomodacion = "Doble Sencilla";
                    break;
                  case "habDobMat":
                    descripcionAcomodacion = "Doble Matrimonial";
                    break;
                  case "habTri":
                    descripcionAcomodacion = "Habitación Triple";
                    break;
                  case "habCua":
                    descripcionAcomodacion = "Habitación Cuádruple";
                    break;
                  default:
                    descripcionAcomodacion = "Desconocido"; // Manejo por defecto
                }

                return `
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd;">${descripcionAcomodacion}</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${hab.adultos}</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${hab.ninos9}</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${hab.ninos48}</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">${hab.infantes}</td>
                    </tr>
                `;
              })
              .join("")}
     

            
<tr style="background-color: #f0f0f0;">
    <th style="font-weight: bold; padding: 10px; border: 1px solid #ddd;">Noche</th>
    <th style="font-weight: bold; padding: 10px; border: 1px solid #ddd;">PLAN ALIMENTACIÓN</th>
</tr>

<!-- Fila de habitaciones -->
${planAli
  .map((plan, index) => {
    let descripcionPlan;

    switch (plan) {
      case "alojamientoDesayuno":
        descripcionPlan = "Desayuno";
        break;
      case "desayunoCena":
        descripcionPlan = "Desayuno y cena";
        break;
      case "desayunoAlmuerzoCena":
        descripcionPlan = "Desayuno, almuerzo y cena";
        break;
      default:
        descripcionPlan = "Desconocido"; // Manejo por defecto
    }

    return `
        <tr>
            <td style="padding: 10px; border: 1px solid #ddd;">Noche ${
              index + 1
            }</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${descripcionPlan}</td>
        </tr>
    `;
  })
  .join("")}


      
    </table>
      `,
  };

  try {
    await transporter.sendMail(mailOptions);
    // Cambia la respuesta para que devuelva JSON
    res.status(200).json({ message: "Correo enviado con éxito" });
  } catch (error) {
    console.error("Error enviando el correo:", error);
    // Cambia la respuesta para que devuelva JSON
    res.status(500).json({ error: "Hubo un error al enviar el correo" });
  }
};

// Ruta para enviar el correo
app.post("/send-email", enviarCorreo);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
