const config = require('./config.env');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const OAUTH_CLIENTID = config.emailConfig.oauthClientId;
const OAUTH_CLIENT_SECRET = config.emailConfig.oauthClientSecret;
const OAUTH_REFRESH_TOKEN = config.emailConfig.oauthRefreshToken;

const oauth2Client = new OAuth2(
  OAUTH_CLIENTID,
  OAUTH_CLIENT_SECRET,
  'https://developers.google.com/oauthplayground',
);

oauth2Client.setCredentials({
  refresh_token: OAUTH_REFRESH_TOKEN,
});

module.exports = { oauth2Client };
