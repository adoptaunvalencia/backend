const { sendMail } = require('../../../config/nodemailer')

const emailContact = async (userSend, userReceive, email) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      
    </head>
    <body style="font-family: Arial, sans-serif;background-color: #f4f4f4;margin: 0;padding: 0;">
      <div class="container" style="background-color: #ffffff;max-width: 600px;margin: 40px auto;padding: 20px;border: 2px solid #e0e0e0;border-radius: 10px;box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);color: #333333;">
        <div class="header" style="display: flex;justify-content: space-between;align-items: center;margin-bottom: 20px;">
           <h1 style="font-size: 24px;color: #d32f2f;font-weight: bold;margin: 0;">Solicitud de contacto</h1>
          <img src="https://raw.githubusercontent.com/adoptaunvalencia/acoge-ayuda/main/src/assets/images/logo.webp" alt="Logo de Adopta Un Valenciano" style="max-width: 100px;height: auto;">
        </div>

        <p style="font-size: 16px;line-height: 1.5;">Hola ${userReceive.name},</p>
        <p style="font-size: 16px;line-height: 1.5;">Gracias por ofrecer tu ayuda en nuestra plataforma. Un usuario que necesita asistencia ha contactado contigo a través de nuestra página. A continuación, te compartimos el mensaje que ha enviado:</p>

        <div class="box" style="background-color: #f9f9f9;border: 1px solid #d0d0d0;padding: 10px;margin: 20px 0;border-radius: 5px;">
          <p style="font-size: 16px;line-height: 1.5;"><strong>${email.subject}</strong></p>
          <p style="font-size: 16px;line-height: 1.5;">${email.body}</p>
        </div>

        <p style="font-size: 16px;line-height: 1.5;">Para que podais contactar, aquí te facilitamos la información de contacto del usuario que te ha escrito:</p>
        <div class="box" style="background-color: #f9f9f9;border: 1px solid #d0d0d0;padding: 10px;margin: 20px 0;border-radius: 5px;">
          <p style="font-size: 16px;line-height: 1.5;"><strong>Email:</strong> ${userSend.email}</p>
          <p style="font-size: 16px;line-height: 1.5;"><strong>Teléfono:</strong> ${userSend.phone}</p>
        </div>

        <p style="font-size: 16px;line-height: 1.5;">Atentamente,<br>El equipo de Adopta Un Valenciano</p>

        <div class="footer" style="margin-top: 20px;font-size: 12px;color: black;text-align: center;border-top: 1px solid #e0e0e0;padding-top: 10px;">
          <div class="footer-content" style="display: flex;justify-content: center;align-items: center;gap: 20px;flex-wrap: wrap;margin: 20px;">
            <h2><strong>Adopta Un<br>Valenciano</strong></h2>
            <img src="https://raw.githubusercontent.com/adoptaunvalencia/acoge-ayuda/main/src/assets/images/logo.webp" alt="Logo de Adopta Un Valenciano" style="max-width: 100px;margin-bottom: 10px;">
          </div>
          <p style="font-size: 16px;line-height: 1.5;">Unidos por una misma causa</p>
        </div>
      </div>
    </body>
    </html>
  `;
  await sendMail(userReceive.email, 'Solicitud de contacto', htmlContent);
};

module.exports = emailContact;