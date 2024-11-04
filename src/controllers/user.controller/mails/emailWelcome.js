const { sendMail } = require('../../../config/nodemailer')

const emailWelcome = async (user) => {
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

        h1 {
          font-size: 24px;
          color: #d32f2f;
          font-weight: bold;
          text-align: center;
        }

        .footer {
          margin-top: 20px;
          font-size: 12px;
          color: #888888;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Bienvenido</h1>
        <p>Hola ${user.name},</p>
        <p>Gracias por unirte a nuestra comunidad.</p>
        <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>
        <p class="footer">Saludos,<br/>El equipo de Adopta Un Valenciano</p>
      </div>
    </body>
    </html>
  `;
  await sendMail(user.email, `Bienvenido ${user.name}`, htmlContent);
};

module.exports = emailWelcome;