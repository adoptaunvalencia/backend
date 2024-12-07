const { sendMail } = require('../../../config/nodemailer');

const emailContact = async (userSend, userReceive, email) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }

        .container {
          background-color: #ffffff;
          max-width: 600px;
          margin: 40px auto;
          padding: 20px;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          color: #333333;
        }

        .header {
          overflow: hidden;
          margin-bottom: 20px;
        }

        .header h1 {
          font-size: 24px;
          color: #d32f2f;
          font-weight: bold;
          margin: 25px 0 0 0;
          float: left;
        }

        .header img {
          max-width: 100px;
          height: auto;
          float: right;
        }

        p {
          font-size: 16px;
          line-height: 1.5;
        }

        .footer {
          margin-top: 20px;
          font-size: 12px;
          color: black;
          text-align: center;
          border-top: 1px solid #e0e0e0;
          padding-top: 10px;
        }

        .footer-content {
          text-align: center;
          margin: 20px;
        }

        .footer img {
          max-width: 100px;
          margin-bottom: 10px;
        }

        .box {
          background-color: #f9f9f9;
          border: 1px solid #d0d0d0;
          padding: 10px;
          margin: 20px 0;
          border-radius: 5px;
        }
        .text-red-bold{
          color: #d32f2f;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Solicitud de contacto</h1>
          <img src="${process.env.LOGO_URL}" alt="Logo de Adopta Un Valenciano">
        </div>

        <p>Hola ${userReceive.name},</p>
        <p>Gracias por ofrecer tu ayuda en nuestra plataforma. Un usuario que necesita asistencia ha contactado contigo a través de nuestra página. A continuación, te compartimos el mensaje que ha enviado:</p>

        <div class="box">
          <p><strong>${email.subject}</strong></p>
          <p>${email.body}</p>
        </div>

        <p>Para que podáis contactar, aquí te facilitamos la información de contacto del usuario que te ha escrito:</p>
        <div class="box">
          <p>Email: ${userSend.email}</p>
          <p>Teléfono: ${userSend.phone}</p>
        </div>
        <p class='text-red-bold'>Te informamos que, debido a que tu oferta de asistencia ha sido contactada, procederemos a desactivarla.</p>
        <p><strong>Si no llegas a un acuerdo con la persona que solicitó tu asistencia, puedes reactivar la oferta. De lo contrario, te recomendamos no activarla nuevamente para evitar un exceso de ofertas innecesarias.</strong></p>
        <p>Atentamente,</p>
        <p>El equipo de <strong>Adopta Un Valenciano</strong></p>

        <div class="footer">
          <div class="footer-content">
            <h2><strong>Adopta Un<br>Valenciano</strong></h2>
            <img src="${process.env.LOGO_URL}" alt="Logo de Adopta Un Valenciano">
          </div>
          <p>Unidos por una misma causa</p>
        </div>
      </div>
    </body>
    </html>
  `;
  await sendMail(
    userReceive.email,
    `Solicitud de contacto: ${email.subject}`,
    htmlContent,
  );
};
module.exports = emailContact;
