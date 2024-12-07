const { default: mongoose } = require('mongoose');

const contactEmailSchema = new mongoose.Schema(
  {
    userSendId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    userReceiveId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    offerId:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'AssistanceOffer'
    },
    subject: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'ContactEmail',
    timestamps: true,
  },
);

const ContactEmail = mongoose.model(
  'ContactEmail',
  contactEmailSchema,
);
module.exports = ContactEmail;
