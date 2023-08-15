const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { 
    type: String,
    required: true,
    unique: true
  },
  email: { 
    type: String,
    required: true,
    unique: true
  },
  password: { 
    type: String,
    required: true
  },
  playlists: { 
    type: Array,
    required: false
  },
  //profilePicture: { type: String },
  //bio: { type: String },
  //isAdmin: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("user", userSchema);
