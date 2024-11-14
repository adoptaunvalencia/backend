const { sendMail } = require('../../../config/nodemailer')

const emailContact = async (userReceiveEmail, email) => {
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
        <p>${email.body}</p>
      </div>
    </body>
    </html>
  `;
  await sendMail(userReceiveEmail, email.subject, htmlContent);
};

module.exports = emailContact;