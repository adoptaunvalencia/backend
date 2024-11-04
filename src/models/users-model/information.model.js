const { default: mongoose } = require('mongoose');

const informationSchema = new mongoose.Schema(
  {
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    city: { type: String, trim: true, required: true },
    address: { type: String, trim: true, required: true },
  },
  {
    timestamps: true,
    collection: 'InformationUser',
  },
);

const InformationUser = mongoose.model('InformationUser', informationSchema);
module.exports = InformationUser;
