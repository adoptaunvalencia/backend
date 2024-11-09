const validateOffer = async (req, res, next) => {
  const { title, description } = req.body;
  try {
    if (title && title.length > 50) {
      return res.status(400).json({ message: 'Title must be 50 characters or less' });
    }
    if (description && description.length > 256) {
      return res.status(400).json({ message: 'Description must be 256 characters or less' });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateOffer;
