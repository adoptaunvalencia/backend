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

        .header {
          overflow: hidden; /* Clear floats */
          margin-bottom: 20px;
        }

        .header h1 {
          font-size: 24px;
          color: #d32f2f;
          font-weight: bold;
          margin: 20px 0 0 0; /* Añade margen superior */
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
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Bienvenido, ${user.name}</h1>
          <img src="${process.env.LOGO_URL}" alt="Logo de Adopta Un Valenciano">
        </div>

        <p>Gracias por unirte a nuestra comunidad.</p>
        <p>Nos complace tenerte con nosotros en estos momentos difíciles. A través de esta red, esperamos que encuentres el apoyo y la ayuda que necesitas, y que, a su vez, puedas compartir tu solidaridad con aquellos que más lo requieren.</p>
        <p>Si tienes alguna pregunta o necesitas asistencia, no dudes en ponerte en contacto con nosotros respondiendo a este correo o escribiendo a <strong>adoptaunvalencia@gmail.com</strong>. Si prefieres obtener un número de contacto, también puedes solicitarlo enviando un correo a la misma dirección, y estaremos encantados de ayudarte.</p>
        <p>Si deseas eliminar tus datos de nuestra base, por favor, envíanos un correo solicitando la baja.</p>
        <p>Gracias por confiar en nosotros.</p>
        <p>Atentamente,<br>El equipo de Adopta un Valenciano</p>

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
  await sendMail(user.email, `Bienvenido ${user.name}`, htmlContent);
};

module.exports = emailWelcome;