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
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    typeOffer: [
      {
        type: {
          type: String,
          enum: ['accommodation', 'hygiene', 'food', 'pet_fostering'],
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1, // Cantidad mínima de 1
        },
      },
    ],
  },
  {
    collection: 'AssistanceOffer',
    timestamps: true,
  },
);

assistanceOfferSchema.index({ location: '2dsphere' });

const AssistanceOffer = mongoose.model(
  'AssistanceOffer',
  assistanceOfferSchema,
);
module.exports = AssistanceOffer;
