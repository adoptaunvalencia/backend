const { default: mongoose } = require('mongoose');

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
    email: {
      type: String,
      trim: true,
      required: true
    },
    password: {},
    age: {},
    token: {},
    idInformation: {},
    roles: {},
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
