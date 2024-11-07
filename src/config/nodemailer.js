const config = require('./config.env');
const nodemailer = require('nodemailer');
const { oauth2Client } = require('./oauth.google');

const EMAIL_HOST = config.emailConfig.host;
const OAUTH_CLIENT_ID = config.emailConfig.oauthClientId;
const OAUTH_CLIENT_SECRET = config.emailConfig.oauthClientSecret;
const OAUTH_REFRESH_TOKEN = config.emailConfig.oauthRefreshToken;
const HOST = config.emailConfig.host;

const createTransporter = async () => {
  try {
    const accessToken = await oauth2Client.getAccessToken();
    if (!accessToken) {
      throw new Error('No se pudo obtener el access token');
    }

    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: EMAIL_HOST,
        clientId: OAUTH_CLIENT_ID,
        clientSecret: OAUTH_CLIENT_SECRET,
        refreshToken: OAUTH_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
  } catch (error) {
    console.error(`Error to cretae transporter: ${error}`);
    throw error;
  }
};

const sendMail = async (to, subject, htmlContent) => {
  try {
    const transporter = await createTransporter();
    const mailOptions = {
      from: HOST,
      to,
      subject,
      html: htmlContent,
    };
    const { response } = await transporter.sendMail(mailOptions);
    console.log(`Send email to: ${response}`);
  } catch (error) {
    console.error(`Error to send email: ${error}`);
  }
};

module.exports = { sendMail };
