// models/user.model.js

const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 20
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      maxlength: 50,
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^\d{10}$/, 'Phone number must be 10 digits']
    },
    roleName: {
      type: String,
      enum: ['USER', 'ADMIN'],  // Only 'USER' or 'ADMIN' allowed
      default: 'USER',          // Default role is USER
      required: true
    },
    profileImg: {
      type: String,
      default: ''
    },
    dob: {
      type: Date
    },
    identity: {
      type: String
    },
    married: {
      type: String,
      enum: ['yes', 'no'],
      default: 'no'
    },
    anniversaryDate: {
      type: Date
    },
    pincode: {
      type: String,
      match: [/^\d{6}$/, 'Pincode must be 6 digits']
    },
    addressLine1: {
      type: String
    },
    addressLine2: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt fields
  }
);

// Export the model
module.exports = mongoose.model('User', userSchema);
