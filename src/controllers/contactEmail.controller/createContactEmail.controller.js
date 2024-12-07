const ContactEmail = require('../../models/contact-email-model/contactEmail.model');
const User = require('../../models/users-model/user.model');
const emailContact = require('./emails/emailContact');

const createContactEmail = async (req, res, next) => {
  try {
    const { subject, body } = req.body.formData;
    const userSend = req.user;
    const userReceive = await User.findById({ _id: req.body.offer.userId._id });

    const createContactEmail = new ContactEmail({
      userSendId: userSend._id,
      userReceiveId: userReceive._id,
      offerId: req.body.offer._id,
      subject,
      body,
    });
    await createContactEmail.save();
    await emailContact(userSend, userReceive, createContactEmail);

    return res.status(201).json({
      message: 'Contact Email successfully created',
      contactEmail: createContactEmail,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createContactEmail;
