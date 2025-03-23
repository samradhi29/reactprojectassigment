const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    companyName: {
      type: String,
      trim: true,
    },
    isAgency: {
      type: Boolean,
      required: true,
    },
   profilePicture: {
      type: String,
      default: 'https://tse3.mm.bing.net/th?id=OIP.LOccDWvuRpXX8p718NAxuwHaHa&pid=Api&P=0&h=180',
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
