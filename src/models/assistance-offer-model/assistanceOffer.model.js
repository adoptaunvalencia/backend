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
    status: {
      type: Boolean,
      default: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    expires: {
      type: Date,
      required: true,
    },
    img: {
      type: String,
      default:
        'https://www.gisinfo.net/images/news_main/first_news_images/1940_image_400.jpg',
    },
    city: {
      type: String,
      trim: true,
      required: true,
    },
    address: {
      type: String,
      trim: true,
      required: true,
    },
    postalcode: {
      type: String,
      trim: true,
      required: true,
    },
    lat: {
      type: String,
      required: true,
    },
    lon: {
      type: String,
      required: true,
    },
    typeOffer: {
      typy: String,
      enum: ['accommodation', 'hygiene', 'food', 'pet_fostering'],
      required: true,
    },
  },
  {
    collection: 'AssistanceOffer',
    timestamps: true,
  },
);

const AssistanceOffer = mongoose.model(
  'AssistanceOffer',
  assistanceOfferSchema,
);
module.exports = AssistanceOffer;
