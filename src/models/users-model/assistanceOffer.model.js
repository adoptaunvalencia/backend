const { default: mongoose } = require('mongoose');

const assistanceOfferSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    publicationDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: Boolean,
      default: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    availableUntil: {
      type: Date,
      required: true,
    },
    img: {
      type: String,
    },
  },
  {
    collection: 'AssistanceOffer',
    timestamps: true,
  }
);

const AssistanceOffer = mongoose.model('AssistanceOffer', assistanceOfferSchema);
module.exports = AssistanceOffer;
