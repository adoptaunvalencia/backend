const { sendMail } = require('../../../config/nodemailer')

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
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .header h1 {
          font-size: 24px;
          color: #d32f2f;
          font-weight: bold;
          margin: 0;
        }

        .header img {
          max-width: 100px;
          height: auto;
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
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
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

      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
           <h1>Solicitud de contacto</h1>
          <img src="https://raw.githubusercontent.com/adoptaunvalencia/acoge-ayuda/main/src/assets/images/logo.webp" alt="Logo de Adopta Un Valenciano">
        </div>

        <p>Hola ${userReceive.name},</p>
        <p>Gracias por ofrecer tu ayuda en nuestra plataforma. Un usuario que necesita asistencia ha contactado contigo a través de nuestra página. A continuación, te compartimos el mensaje que ha enviado:</p>

        <div class="box">
          <p><strong>${email.subject}</strong></p>
          <p>${email.body}</p>
        </div>

        <p>Para que podais contactar, aquí te facilitamos la información de contacto del usuario que te ha escrito:</p>
        <div class="box">
          <p><strong>Email:</strong> ${userSend.email}</p>
          <p><strong>Teléfono:</strong> ${userSend.phone}</p>
        </div>

        <p>Atentamente,<br>El equipo de Adopta Un Valenciano</p>

        <div class="footer">
          <div class="footer-content">
            <h2><strong>Adopta Un<br>Valenciano</strong></h2>
            <img src="https://raw.githubusercontent.com/adoptaunvalencia/acoge-ayuda/main/src/assets/images/logo.webp" alt="Logo de Adopta Un Valenciano">
          </div>
          <p>Unidos por una misma causa</p>
        </div>
      </div>
    </body>
    </html>
  `;
  await sendMail(userReceive.mail, 'Solicitud de contacto', htmlContent);
};

module.exports = emailContact;