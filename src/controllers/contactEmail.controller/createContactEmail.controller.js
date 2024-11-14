const ContactEmail = require('../../models/contact-email-model/contactEmail.model');
const emailContact = require('./emails/emailContact');

const createContactEmail = async (req, res, next) => {
  try {
    const { userSend, userReceive, subject, body } = req.body; 

    const createContactEmail = new ContactEmail({
      userSendId: userSend._id,
      userReceiveId: userReceive._id,
      subject,
      body
    });
    await createContactEmail.save();
    await emailContact(userSend, userReceive, createContactEmail);

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
