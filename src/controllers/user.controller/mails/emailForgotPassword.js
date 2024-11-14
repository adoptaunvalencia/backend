const { sendMail } = require('../../../config/nodemailer');

const emailForgotPassword = async (user) => {
  const resetLink = '';

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

        .change-password-code {
          font-size: 24px;
          text-align: center;
          margin: 20px 0;
          font-weight: bold;
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
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Restablecimiento de contraseña</h1>
          <img src="https://raw.githubusercontent.com/adoptaunvalencia/acoge-ayuda/main/src/assets/images/logo.webp" alt="Logo de Adopta Un Valenciano">
        </div>
        
        <p>Hola ${user.name},</p>
        <p>Recibimos una solicitud para restablecer tu contraseña.</p>
        <p>Tu codigo de un solo uso es:</p>
        <p class="change-password-code"><strong>${user.token}</strong></p>
        <p>Si no solicitaste este cambio, puedes ignorar este correo.</p>
        <p>Atentamente,<br>El equipo de Adopta un Valenciano</p>
        
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
  await sendMail(user.email, `¿Has olvidado tu contraseña?`, htmlContent);
};

module.exports = emailForgotPassword;
