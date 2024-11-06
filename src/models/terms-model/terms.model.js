const mongoose = require('mongoose');

const termsSchema = new mongoose.Schema(
  {
    versionId: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: 'Terms',
  }
);

const Terms = mongoose.model('Terms', termsSchema);
module.exports = Terms;