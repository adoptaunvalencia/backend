module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  dbUri: process.env.CONNECT_DDBB,
  jwtSecret: process.env.JWT_SECRET,
  
  emailConfig: {
    host: process.env.EMAIL_HOST,
    oauthClientId: process.env.OAUTH_CLIENTID,
    oauthClientSecret: process.env.OAUTH_CLIENT_SECRET,
    oauthRefreshToken: process.env.OAUTH_REFRESH_TOKEN
  },
  
  geoApiKey: process.env.GEO_API_KEY,
  
  cloudinary: {
    name: process.env.CLOUDINARY_NAME,
    secret: process.env.CLOUDINARY_SECRET,
    key: process.env.CLOUDINARY_KEY
  }
};