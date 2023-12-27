const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  user_number: {type: String},
  email: {type: String, required: true},
  email_verified: {type: Boolean, required: true},
  password: {type: String, select: false},
  kagwaveId: {type: String, required: true},
  username: {type: String},
  display_name: {type: String, required: true},
  name: {type: Object, required: true},
  birthday: {type: String},
  gender: {type: String},
  address: {type: Object},
  profile_photo: {type: String},
  date_joined: {type: String},
  home_base: {type: Object},
  level: {type: Number, required: true},
  xp: {type: Object, required: true},
  player_color: {type: String, required: true},
  main_skill: {type: String, required: true},
  unlocked_characters: {type: Array},
  attributes: {type: Object},
  skills: {type: Object},
  is_verified: {type: Boolean}, 
  friends: {type: Array},
  friend_requests: {type: Object},
  notifications: {type: Object},
  messages: {type: Object},
  status: {type: String},
  externalProviderInfo: {type: Object},
  settings: {type: Object},
});

// generating a hash
userSchema.pre("save", function(next) {
  var user = this;

  user.date_joined = new Date();
  user.email_verified = false;

  if (!user.isModified("password")) {
    return next();
  }
  // use bcrypt to generate a salt
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }
    // using the generated salt, use bcrypt to generate a hash of the password
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }
      // store the password hash as the password
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.isPasswordValid = function(rawPassword, callback) {
  bcrypt.compare(rawPassword, this.password, function(err, isMatch) {
    if (err) {
      callback(err);
    } else { 
      callback(null, isMatch);
    }
  });
};

module.exports = mongoose.model("User", userSchema);
