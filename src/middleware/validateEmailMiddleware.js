const validateEmail = async (req, res, next) => {
  const { userSendId, userReceiveId, subject, body } = req.body;
  try {
    if (!userSendId || !userReceiveId || !subject || !body) {
      return res.status(400).json({ message: 'All fields required' });
    }
    if (subject && subject.length > 150) {
      return res.status(400).json({ message: 'Subject must be 50 characters or less' });
    }
    if (body && body.length > 599) {
      return res.status(400).json({ message: 'Body must be 256 characters or less' });
    }
    next();
  } catch (error) {
    next(error);
    console.log(error)
  }
};

module.exports = validateEmail;
