const validateEmail = async (req, res, next) => {
  const { subject, body } = req.body.formData;

  try {
    if (!subject || !body) {
      return res.status(400).json({ message: 'All fields required' });
    }
    if (subject && subject.length > 150) {
      return res
        .status(400)
        .json({ message: 'Subject must be 150 characters or less' });
    }
    if (body && body.length > 599) {
      return res
        .status(400)
        .json({ message: 'Body must be 599 characters or less' });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateEmail;
