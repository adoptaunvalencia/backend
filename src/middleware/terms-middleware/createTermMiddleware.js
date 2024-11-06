const Terms = require('../../models/terms-model/terms.model.js');

const createTerms = async (req, res) => {
  try {
    const { versionId, content } = req.body;

    if (!versionId || !content) {
      return res.status(400).json({ message: 'Missing required data' });
    }

    await Terms.updateMany({}, { isActive: false });

    const newTerms = new Terms({
      versionId,
      content,
      isActive: true,
    });

    await newTerms.save();
    res.status(201).json({ message: 'Terms created successfully', terms: newTerms });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating terms' });
    next(error);
  }
};

module.exports = createTerms;
