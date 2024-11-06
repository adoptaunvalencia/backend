const UserTerms = require('../../models/users-terms-model/usersTerms.model');
const Terms = require('../../models/terms-model/terms.model.js');

const acceptTerms = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'Missing user ID' });
    }

    const activeTerms = await Terms.findOne({ isActive: true });
    if (!activeTerms) {
      return res.status(404).json({ message: 'No active terms found' });
    }

    const userTerms = await UserTerms.findOneAndUpdate(
      { userId },
      { acceptedVersionId: activeTerms.versionId, acceptedAt: new Date() },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: 'Terms accepted', userTerms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error accepting terms' });
  }
};

module.exports = acceptTerms;
