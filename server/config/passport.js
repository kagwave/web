const axios = require('axios');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const SpotifyStrategy = require('passport-spotify').Strategy;
const InstagramStrategy = require('passport-instagram-graph-api').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');


//*AUTHENTICATION

const serverUrl = (process.env.NODE_ENV === 'production') 
  ? 'https://www.kagwave.com'
  : 'http://localhost:8080';

const secureServerUrl = (process.env.NODE_ENV === 'production') 
  ? 'https://www.kagwave.com'
  : 'https://localhost:9090';

//Kagwave (Local)
passport.use('local', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
  }, 
  function(email, password, done) {
    //Look for user email and make sure it has a password associate
    User.findOne({$or: [ { email: email }, { "externalProviderInfo.google.email": email },  { "externalProviderInfo.facebook.email": email }]}, function(err, user){
      if (!user) {
        return done(null, false, { message: "Unknown user."});
      } else {
      //If it does, proceed to verify
        User.findOne({email: email}).select("+password").exec(function(err, user) {  
          if (!user) {
            return done(null, false, {message :"You don't have a password yet. Try a method below and create one in your settings."});
          // verify if the password is valid
          } else { 
            user.isPasswordValid(password, function(err, isValid) {
            if (err) {
              console.log(err);
              return done(null, false, {message:"You don't have a password yet. Try a method below and create one in your settings."});
            // only return the user if the password is valid
            } else if (isValid) {
              return done(null, user, { message: "Login successful." } );
            } else {
              return done(null, false, {
                message: "Invalid password."
              });
            }});
          }
        });
      }
    })
  })
);



//Facebook 
passport.use('facebook-auth', new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${serverUrl}/auth/facebook/redirect`,
    profileFields: ["id", "birthday", "email", "first_name", "gender", "last_name"]
  },
  function( accessToken, refreshToken, profile, done) {
    const { email, gender, birthday, first_name, last_name } = profile._json;
    if (email === undefined){
      return done(null);
    }
    if (profile.display_name === undefined){
      var display_name = first_name + " " + last_name;
    } else {
      var display_name = profile.display_name;
    };

    let profile_photo = null;

    axios({
      method: "GET", 
      url: `https://graph.facebook.com/v12.0/${profile.id}/picture?width=1000&height=1000&access_token=${accessToken}&redirect=false`, 
    }).then((response)=>{
      profile_photo = response.data.data.url;
    }).catch(err => { console.log(err); });

    const fbAccount = {
      id: profile.id,
      email: email,
      display_name: display_name,
      name: {first_name: first_name, last_name: last_name},
      gender: gender,
      birthday: birthday,
      profile_photo: profile_photo,
      access_token: accessToken,
      refresh_token: refreshToken
    }

    //Look for Facebook Account
    User.findOne({"externalProviderInfo.facebook.id": profile.id }, function(err, user){
    //If there isn't a fb account, look for an existing account with the same kagwave or google enail
      if (!user){
        User.findOne({ $or: [ { email: email }, { "externalProviderInfo.google.email": email } ] }, function (err, user){
          //if there is a related existing account, send them to login to connect it
          if (user) {
            return done(null, false, { 
              message: "Looks like there's an account associated with that email. Log in and connect it in your settings."
            });
          //if there isn't any related account create one
          } else {
            const newUser = {
              kagwaveId: Math.floor(100000000000000 + Math.random() * 900000000000000),
              email: email,
              email_verified: false,
              display_name: display_name,
              name: {first_name: first_name, last_name: last_name},
              gender: gender,
              birthday: birthday,
              profile_photo: profile_photo,
              level: 1,
              is_verified: false,
              player_color: "#f7f370",
              main_skill: 'person',
              skills: {
                soccer: 1,
                basketball: 1,
                tennis: 1,
                football: 1,
                baseball: 1,
                hockey: 1,
                swimming: 1, 
                boxing: 1,
                ping_pong: 1,
                weightlifting: 1,
                surfing: 1, 
                snowboarding: 1,
                rock_climbing: 1,
                yoga: 1,
                horseback_riding: 1
              },
              friends: [],
              friend_requests: {
                incoming: [],
                outgoing: []
              },
              externalProviderInfo: {
                facebook: fbAccount
              },
            };
            new User(newUser).save();
            console.log('Created new user.');
            console.log(display_name, 'is logged in.');
            console.log(newUser);
            return done(null, newUser);
          }
        });
      //If account does exist, update its information and log it in.
      } else {
        User.findOneAndUpdate({"externalProviderInfo.facebook.id": profile.id}, 
          {$set: { "externalProviderInfo.facebook" : fbAccount }},
          { new: true, useFindAndModify: false }, 
          (err, doc) => {
            if (err) console.log("Something wrong when updating data!");
        });
        console.log(display_name, 'is logged in.');
        return done(null, user);;
      }
    })
  }
));


//Google  
passport.use('google-auth', new GoogleStrategy({
  clientID: process.env.GOOGLE_APP_ID,
  clientSecret: process.env.GOOGLE_APP_SECRET,
  callbackURL: `${serverUrl}/auth/google/redirect`,
  }, 
  function (accessToken, refreshToken, profile, done) {

    const { email, given_name, family_name, picture, locale } = profile._json;
    if (email === undefined){
      return done(null, null);
    }
    if (profile.display_name === undefined){
      var display_name = given_name + " " + family_name;
    } else {
      var display_name = profile.display_name;
    };
    
    const googleAccount = {
      id: profile.id,
      email: email,
      display_name: display_name,
      name: {given_name: given_name, family_name: family_name},
      location: locale,
      profile_photo: picture,
      access_token: accessToken,
      refresh_token: refreshToken
    }

    //Look for Google Account
    User.findOne({"externalProviderInfo.google.id": profile.id }, function(err, user){
      //If there isn't an account, look for an existing account with the same kagwave or google enail
        if (!user){
          User.findOne({ $or: [ { email: email }, { "externalProviderInfo.facebook.email": email } ] } , function (err, user){
            //if there is a related existing account, send them to login to connect it
            if (user) {
              return done(null, false, { 
                message: "Looks like there's an account associated with that email. Log in and connect it in your settings."
              });
            //if there isn't any related account create one
            } else {
              const newUser = {
                kagwaveId: Math.floor(100000000000000 + Math.random() * 900000000000000),
                email: email,
                email_verified: false,
                display_name: display_name,
                name: {first_name: given_name, last_name: family_name},
                gender: '',
                birthday: '',
                is_verified: false,
                profile_photo: picture,
                level: 1,
                player_color: "#f7f370",
                main_skill: 'person',
                skills: {
                  soccer: 1,
                  basketball: 1,
                  tennis: 1,
                  football: 1,
                  baseball: 1,
                  hockey: 1,
                  swimming: 1, 
                  boxing: 1,
                  ping_pong: 1,
                  weightlifting: 1,
                  surfing: 1, 
                  snowboarding: 1,
                  rock_climbing: 1,
                  yoga: 1,
                  horseback_riding: 1
                },
                externalProviderInfo: {
                  google: googleAccount
                },
                friends: [],
                friend_requests: {
                  incoming: [],
                  outgoing: []
                }
              };
              new User(newUser).save();
              console.log('Created new user.');
              console.log(display_name, 'is logged in.');
              console.log(newUser);
              return done(null, newUser);
            }
          });
        //If account does exist, update its information and log it in.
        } else {
          User.findOneAndUpdate({"externalProviderInfo.google.id": profile.id}, 
            {$set: { "externalProviderInfo.google" : googleAccount }},
            { new: true, useFindAndModify: false }, 
            (err, doc) => {
              if (err) console.log("Something wrong when updating data!");
          });
          console.log(display_name, 'is logged in.');
          return done(null, user);;
        }
      })
    
  })
);









//*CONNECTED APPS************************

//Facebook
passport.use('facebook-connect', new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${serverUrl}/connect/facebook/redirect`,
    profileFields: ["id", "birthday", "email", "first_name", "gender", "last_name"]
  },
  function(accessToken, refreshToken, profile, done) {
    const { email, gender, birthday, first_name, last_name } = profile._json;
    if (email === undefined){
      return done(null);
    }
    if (profile.display_name === undefined){
      var display_name = first_name + " " + last_name;
    } else {
      var display_name = profile.display_name;
    };
  
  const fbAccount = {
    id: profile.id,
    display_name: display_name,
    email: email,
    name: {first_name: first_name, last_name: last_name},
    gender: gender,
    birthday: birthday,
    profile_photo: `https://graph.facebook.com/${profile.id}/picture?access_token=${accessToken}`,
    access_token: accessToken,
    refresh_token: refreshToken
  }

  //Look for Facebook Account
  User.findOne({"externalProviderInfo.facebook.id": profile.id }, function(err, account){
    if (err) { return done(err); }
    //if there's already an account connected, dont do anything
    if (account){
      return done(null, null, { message: "already account connected" }); 
    //if not, add it to the logged in user
    } else {
      return done(null, fbAccount, { message: "success" } ); 
    }
  })
}));

//Google
passport.use('google-connect', new GoogleStrategy({
  clientID: process.env.GOOGLE_APP_ID,
  clientSecret: process.env.GOOGLE_APP_SECRET,
  callbackURL: `${serverUrl}/connect/google/redirect`,
},
function(accessToken, refreshToken, profile, done) {
  const { email, given_name, family_name, picture, locale } = profile._json;
  if (email === undefined){
    return done(null, null);
  }
  if (profile.display_name === undefined){
    var display_name = given_name + " " + family_name;
  } else {
    var display_name = profile.display_name;
  };
  
  const googleAccount = {
    id: profile.id,
    email: email,
    display_name: display_name,
    name: {given_name: given_name, family_name: family_name},
    location: locale,
    profile_photo: picture,
    accessToken: accessToken,
    refreshToken: refreshToken
  }

//Look for Google Account
User.findOne({"externalProviderInfo.google.id": profile.id }, function(err, account){
  if (err) { return done(err); }
  //if there's already an account connected, dont do anything
  if (account){
    return done(null, null, { message: "already account connected" }); 
  //if not, add it to the logged in user
  } else {
    return done(null, googleAccount, { message: "success" } ); 
  }
})
}));

//Twitter
passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_APP_ID,
  consumerSecret: process.env.TWITTER_APP_SECRET,
  callbackURL: `${serverUrl}/connect/twitter/redirect`,
},
function(token, tokenSecret, profile, done) {
  const { location, description, url, followers_count, friends_count, statuses_count, profile_image_url, profile_banner_url } = profile._json;
  const { id, id_str, username, display_name, } = profile;

  const twitAccount = {
    id: id,
    id_str: id_str,
    username: username,
    display_name: display_name,
    location: location,
    bio: description,
    website: url,
    followers: followers_count,
    following: friends_count,
    posts: statuses_count,
    profile_photo: profile_image_url,
    profileBanner: profile_banner_url,
    access_token: token,
    token_secret: tokenSecret
  };

  User.findOne({ "externalProviderInfo.twitter.id": profile.id }, function(err, account) {
    if (err) { return done(err); }
    if (account){
      return done(null, null); 
    } else {
      return done(null, twitAccount); 
    }
  });
}));


//Spotify  
passport.use(new SpotifyStrategy({
  clientID: process.env.SPOTIFY_APP_ID,
  clientSecret: process.env.SPOTIFY_APP_SECRET,
  callbackURL:`${serverUrl}/connect/spotify/redirect`,
},
function(accessToken, refreshToken, profile, done) {
  const { email, display_name, country, id } = profile._json;
  const { followers, username, profileUrl } = profile;

  const spotifyAccount = {
    id: id,
    email: email,
    display_name: display_name,
    country: country,
    followers: followers,
    username: username, 
    profileUrl: profileUrl,
    access_token: accessToken,
    refresh_token: refreshToken
  }

  User.findOne({ "externalProviderInfo.spotify.id": profile.id }, function(err, account) {
    if (err) { return done(err); }
    if (account){
      return done(null, null); 
    } else {
      console.log(spotifyAccount);
      return done(null, spotifyAccount); 
    }
  });
}));





//Instagram
passport.use(new InstagramStrategy({
  clientID: process.env.INSTAGRAM_APP_ID,
  clientSecret: process.env.INSTAGRAM_APP_SECRET,
  callbackURL: `${secureServerUrl}/connect/instagram/redirect`
},
function(accessToken, refreshToken, profile, done) {

  const { username, media_count, id, account_type } = profile._json

  const igAccount = {
    id: id,
    username: username,
    media_count: media_count,
    account_type: account_type,
    access_token: accessToken,
    refresh_token: refreshToken
  }

  User.findOne({ "externalProviderInfo.instagram.id": profile.id }, function(err, account) {
    if (err) { return done(err); }
    if (account){
      return done(null, null); 
    } else {
      return done(null, igAccount); 
    }
  });
}));


//LinkedIn
passport.use(new LinkedInStrategy({
  clientID: process.env.LINKEDIN_APP_ID,
  clientSecret: process.env.LINKEDIN_APP_SECRET,
  callbackURL: `${serverUrl}/connect/linkedin/redirect`
},
function(accessToken, refreshToken, profile, done) {

  const { id, name, displayName, photos} = profile;

  const liAccount = {
    id: id,
    name: name,
    displayName: displayName,
    photos: photos
  }

  User.findOne({ "externalProviderInfo.linkedin.id": profile.id }, function(err, account) {
    if (err) { return done(err); }
    if (account){
      return done(null, null); 
    } else {
      return done(null, liAccount); 
    }
  });
}));