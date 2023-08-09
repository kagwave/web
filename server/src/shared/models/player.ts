import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const attributesSchema = new mongoose.Schema({
  body: {type: Object},
  stats: {type: Object},
  rank: {type: String},
  degree: {type: Number}
},{ _id : false });

const skillsSchema = new mongoose.Schema({
  level: {type: Number},
  xp: {type: Number},
  matches: {type: Array},
  unlocked_challenges: {type: Array}
},{ _id : false });

const playerSchema = new mongoose.Schema({
  active: {type: Boolean, required: true},
  kagwaveId: {type: String, required: true},
  user_number: {type: Number},
  phone_number: {type: Number},
  email: {type: String, required: true},
  email_verified: {type: Boolean, required: true},
  password: {type: String, select: false},
  codename: {type: String},
  display_name: {type: String, required: true},
  name: {type: Object, required: true},
  date_of_birth: {type: String},
  gender: {type: String},
  complexion: {type: String},
  address: {type: Object},
  profile_photo: {type: String},
  date_joined: {type: Date},
  zodiac: {type: Object},
  sexuality: {type: Object},
  lifestyle: {type: Object},
  home_base: {type: Object},
  level: {type: Number, required: true},
  xp: {type: Object, required: true},
  player_color: {type: String, required: true},
  main_skill: {type: String, required: true},
  unlocked_characters: {type: Array},
  attributes: {
    body: {type: Object},
    stats: {type: Object},
    rank: {type: String},
    degree: {type: Number}
  },
  'skills': Object,
  is_verified: {type: Boolean}, 
  network: {type: Array},
  network_requests: {type: Object},
  check_ins: {type: Object},
  notifications: {type: Object},
  messages: {type: Object},
  status: {type: String},
  externalProviderInfo: {type: Object},
  is_public: {type: Boolean},
  settings: {type: Object},
  bank: {type: Number},
  inventory: {type: Array},
  missions: {type: Array},
}, { minimize: false, collection: 'users' } );


playerSchema.pre("save", function(next) {
  let user = this;

  user.date_joined = new Date();
  user.email_verified = false;

  if (!user.isModified("password")) {
    return next();
  }

  if (user.password) {
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
  }

});

playerSchema.methods.isPasswordValid = function(rawPassword, callback) {
  bcrypt.compare(rawPassword, this.password, function(err, isMatch) {
    if (err) {
      callback(err);
    } else { 
      callback(null, isMatch);
    }
  });
};

const Player = mongoose.model("Player", playerSchema);
export default Player;
