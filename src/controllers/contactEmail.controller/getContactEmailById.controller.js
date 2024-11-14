const ContactEmail = require('../../models/contact-email-model/contactEmail.model');

const getContactEmailById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const ContactEmailById = await ContactEmail.findById(id);

    if (!ContactEmailById) {
      return res
        .status(404)
        .json({ message: 'Contact Email not found' });
    }

    return res
      .status(200)
      .json(ContactEmailById)
  } catch (error) {
    next(error);
    console.log(error)
  }
}

module.exports = getContactEmailById;
