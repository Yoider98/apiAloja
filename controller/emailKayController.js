const nodemailer = require("nodemailer");

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

// Controlador para enviar el correo
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
    to: "Reservastaybokai@sthoteles.com",
    subject: "SOLICITUD DE RESERVACIÓN PARA GRUPOS TAYBO KAI",
    html: `
 <h2 style="text-align: center; font-family: Arial, sans-serif; color: #333">
      SOLICITUD DE RESERVACIÓN PARA GRUPOS TAYBO KAI
    </h2>
    <table
      style="
        width: 100%;
        max-width: 600px;
        margin: auto;
        font-family: Arial, sans-serif;
        border-collapse: collapse;
      "
    >
      <!-- Fila de agencia, Titular -->
      <tr>
        <td
          colspan="1"
          style="
            font-weight: bold;
            padding: 10px;
            border: 1px solid #ddd;
            background-color: #f0f0f0;
          "
        >
          AGENCIA:
        </td>
        <td colspan="2" style="padding: 10px; border: 1px solid #ddd">
          ${ agenciaN || "No especificado" }
        </td>

        <td
          colspan="1"
          style="
            font-weight: bold;
            padding: 10px;
            border: 1px solid #ddd;
            background-color: #f0f0f0;
          "
        >
          TITULAR:
        </td>
        <td colspan="1" style="padding: 10px; border: 1px solid #ddd">
          ${ titular || "No especificado" }
        </td>
      </tr>

      <!-- Fila de correo, teléfono -->
      <tr>
        <td
          style="
            font-weight: bold;
            padding: 10px;
            border: 1px solid #ddd;
            background-color: #f0f0f0;
          "
        >
          CORREO:
        </td>
        <td colspan="2" style="padding: 10px; border: 1px solid #ddd">
          <a href="mailto:${email}" style="color: #333">${email}</a>
        </td>
        <td
          style="
            font-weight: bold;
            padding: 10px;
            border: 1px solid #ddd;
            background-color: #f0f0f0;
          "
        >
          TELÉFONO:
        </td>
        <td colspan="1" style="padding: 10px; border: 1px solid #ddd">
          ${ telefono || "No especificado" }
        </td>
      </tr>
      <tr>
        <td
          style="
            font-weight: bold;
            padding: 10px;
            border: 1px solid #ddd;
            background-color: #f0f0f0;
          "
        >
          CHECK-IN:
        </td>
        <td style="padding: 10px; border: 1px solid #ddd">
          ${ checkin || "No especificado" }
        </td>
        <td></td>
        <td
          style="
            font-weight: bold;
            padding: 10px;
            border: 1px solid #ddd;
            background-color: #f0f0f0;
          "
        >
          CHECK-OUT:
        </td>
        <td style="padding: 10px; border: 1px solid #ddd">
          ${ checkout || "No especificado" }
        </td>
      </tr>

      <tr>
        <td
          style="
            font-weight: bold;
            padding: 10px;
            border: 1px solid #ddd;
            background-color: #f0f0f0;
          "
        >
          CANTIDAD DE NOCHES:
        </td>
        <td style="padding: 10px; border: 1px solid #ddd">
          ${ cantNoche || "No especificado" }
        </td>
        <td></td>
        <th
          style="
            font-weight: bold;
            padding: 10px;
            border: 1px solid #ddd;
            background-color: #f0f0f0;
          "
        >
          PLAN ALIMENTACIÓN
        </th>
        <td style="padding: 10px; border: 1px solid #ddd">
           ${
            planAli === "desayuno"
              ? "Desayuno"
              : planAli === "desayunoCena"
              ? "Desayuno y cena"
              : planAli === "desayunoAlmuerzoCena"
              ? "Desayuno, almuerzo y cena"
              : "Desconocido"
          } 
        </td>
      </tr>

      <tr>
        <td
          style="
            font-weight: bold;
            padding: 10px;
            border: 1px solid #ddd;
            background-color: #f0f0f0;
          "
        >
          CANT. PAX:
        </td>
        <td style="padding: 10px; border: 1px solid #ddd">
          ${ cantidadPax || "No especificado" }
        </td>
        <td></td>
        <td
          style="
            font-weight: bold;
            padding: 10px;
            border: 1px solid #ddd;
            background-color: #f0f0f0;
          "
        >
          CANTIDAD DE HABITACIONES:
        </td>
        <td style="padding: 10px; border: 1px solid #ddd">
          ${ cantHab || "No especificado" }
        </td>
      </tr>

      <tr style="background-color: #f0f0f0">
        <th style="font-weight: bold; padding: 10px; border: 1px solid #ddd">
          TIPO DE ACOMODACIÓN
        </th>
        <th style="font-weight: bold; padding: 10px; border: 1px solid #ddd">
          ADULTO
        </th>
        <th style="font-weight: bold; padding: 10px; border: 1px solid #ddd">
          NIÑO (9+ años)
        </th>
        <th style="font-weight: bold; padding: 10px; border: 1px solid #ddd">
          NIÑO (4-8 años)
        </th>
        <th style="font-weight: bold; padding: 10px; border: 1px solid #ddd">
          INFANTE (0-3 años)
        </th>
      </tr>

      <!-- Fila de habitaciones -->
       ${habitaciones
              .map((hab) => {
                let descripcionAcomodacion;

                switch (hab.acomodacion) {
                  case "habDob":
                    descripcionAcomodacion = "Habitación Doble";
                    break;
                  case "habTri":
                    descripcionAcomodacion = "Habitación Triple";
                    break;
                  case "habCua1":
                    descripcionAcomodacion = "Habitación Cuádruple 1";
                    break;
                  case "habCua2":
                    descripcionAcomodacion = "Habitación Cuádruple 2";
                    break;
                  case "habQuin1":
                    descripcionAcomodacion = "Habitación Quintuble 1";
                    break;
                  case "habQuin2":
                    descripcionAcomodacion = "Habitación Quintuble 2";
                    break;
                  default:
                    descripcionAcomodacion = "Desconocido"; // Manejo por defecto
                }

                return ` 
      <tr>
        <td style="padding: 10px; border: 1px solid #ddd">
          ${descripcionAcomodacion}
        </td>
        <td style="padding: 10px; border: 1px solid #ddd">${hab.adultos}</td>
        <td style="padding: 10px; border: 1px solid #ddd">${hab.ninos9}</td>
        <td style="padding: 10px; border: 1px solid #ddd">${hab.ninos48}</td>
        <td style="padding: 10px; border: 1px solid #ddd">${hab.infantes}</td>
      </tr>
      `;
              })
              .join("")}

      <tr>
        <td
          style="
            font-weight: bold;
            padding: 10px;
            border: 1px solid #ddd;
            background-color: #f0f0f0;
          "
        >
          SOLICITUDES ESPECIALES:
        </td>
        <td colspan="4" style="padding: 10px; border: 1px solid #ddd">
          ${ soliEspecial || "Ninguna" }
        </td>
      </tr>
    </table>
      `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Correo enviado con éxito" });
  } catch (error) {
    console.error("Error enviando el correo:", error);
    res.status(500).json({ error: "Hubo un error al enviar el correo" });
  }
};

// Exportar la función para que se use en el servidor
module.exports = { enviarCorreo };
