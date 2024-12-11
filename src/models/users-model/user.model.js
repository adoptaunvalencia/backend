const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    lastname: {
      type: String,
      trim: true,
      required: true,
    },
    avatar: {
      type: String,
      default: 'https://cdn-icons-png.flaticon.com/512/3541/3541871.png',
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      required: false,
    },
    token: {
      type: String,
      trim: true,
    },
   /*  city: {
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
    }, */
    roles: {
      type: [String],
      enum: ['user', 'admin', 'volunteer'],
      default: ['user'],
    },
  },
  {
    timestamps: true,
    collection: 'User',
  },
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
