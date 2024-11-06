const mongoose = require('mongoose');

const userTermsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    acceptedVersionId: {
      type: String,
      required: true,
    },
    acceptedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: 'UserTerms',
  }
);

const UserTerms = mongoose.model('UserTerms', userTermsSchema);
module.exports = UserTerms;