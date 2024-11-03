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
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    //FORGOT PASSWORD CREATE A TOKEN
    token: {
      type: String,
      trim: true,
    },
    idInformation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'InformationUser',
      required: false,
    },
    roles: {
      type: [String],
      enum: ['user', 'admin'],
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
