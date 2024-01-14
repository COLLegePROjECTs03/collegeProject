// /models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  phone: {type: Number},
  description: {type:String , required:true},
  techStack: {
    frontEnd:{type: String},
    backend : {type:String},
    database:{type:String}
  },
  emailId: { type: String, required: true },
});

module.exports = mongoose.model('Projects', userSchema);
