const ContactEmail = require('../../models/contact-email-model/contactEmail.model');
const emailContact = require('./emails/emailContact');

const createContactEmail = async (req, res, next) => {
  try {
    const { userSendId, userReceiveId, subject, body, userReceiveEmail } = req.body; 

    const createContactEmail = new ContactEmail({
      userSendId,
      userReceiveId,
      subject,
      body
    });
    await createContactEmail.save();

    await emailContact(userReceiveEmail, createContactEmail)
    return res.status(201).json({
      message: 'Contact Email successfully created',
      contactEmail: createContactEmail,
    });
  } catch (error) {
    next(error);
    console.log(error)
  }
}

module.exports = createContactEmail;
