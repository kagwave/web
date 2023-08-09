import passport from 'passport';
import Player from '../src/shared/models/player';
import Conversations from '../src/shared/models/conversation';

import { secureServerUrl, getServerUrl } from '../src/shared/utils/urls';
import createNewUser from '../src/services/auth/utils/onboarding/createNewUser';
import createKagwaveId from '../src/services/auth/utils/onboarding/createKagwaveId';

import FacebookStrategy from 'passport-facebook';
import GoogleStrategy from 'passport-google-oauth20';
import LocalStrategy from 'passport-local'

import { authService } from '../src/shared/utils/axios/axiosClient';

//Kagwave (Local)
passport.use('local', new LocalStrategy.Strategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback: true
  }, 

  function(req: any, email: string, password: string, done: any) {
    
    //Look for user email and make sure it has a password associated
    Player.findOne({$or: [ {email: email}, {codename: email}, {"externalProviderInfo.google.email": email}, {"externalProviderInfo.facebook.email": email}]}, function(err: any, user: any){

      if (!user) {
        return done(null, false, { message: "Unknown user." });
      } else {

      //If it does, proceed to verify password
        Player.findOne({$or: [{email: email}, {codename: email}, {"externalProviderInfo.google.email": email},  {"externalProviderInfo.facebook.email": email }]}).select("+password").exec(function(err: any, user: any) {  
          if (!user) {
            return done(null, false, { message: "You don't have a password yet. Try a method below and create one in your settings." });
          // verify if the password is valid
          } else { 
            user.isPasswordValid(password, function(err: any, isValid: boolean) {
            if (err) {
              console.log(err);
              return done(null, false, { message: "You don't have a password yet. Try a method below and create one in your settings." });
            // only return the user if the password is valid
            } else if (isValid) {
              return done(null, user, { message: "Login successful."});
            } else {
              return done(null, false, { message: "Invalid password." });
            }});
          }
        });
      }
    })
  })
);


//Facebook 
passport.use('facebook-auth', new FacebookStrategy.Strategy({
    clientID: process.env.FACEBOOK_APP2_ID,
    clientSecret: process.env.FACEBOOK_APP2_SECRET,
    callbackURL: `${getServerUrl('auth', true)}/facebook/redirect`,
    profileFields: ["id", "birthday", "email", "first_name", "gender", "last_name"]
  },
  function(accessToken: string, refreshToken: string, profile: any, done: any) {

    const { email, gender, birthday: date_of_birth, first_name, last_name, display_name } = profile._json;

    if (email === undefined){
      return done(null);
    }

    let profile_photo: string;

    authService({
      method: "GET", 
      url: `https://graph.facebook.com/v12.0/${profile.id}/picture?width=1000&height=1000&access_token=${accessToken}&redirect=false`, 
    }).then((response)=>{
      profile_photo = response.data.data.url;
    }).catch(err => { console.log(err); });

    let onboardingInfo: any = {
      email: email,
      gender: gender,
      date_of_birth: date_of_birth,
      first_name: first_name,
      last_name: last_name,
      display_name: display_name ? display_name : first_name + " " + last_name,
      profile_photo: profile_photo!
    }

    const fbAccount = {
      id: profile.id,
      email: email,
      display_name: display_name,
      name: {first_name: first_name, last_name: last_name},
      gender: gender,
      birthday: date_of_birth,
      profile_photo: profile_photo!,
      access_token: accessToken,
      refresh_token: refreshToken
    }

    //Look for Facebook Account
    Player.findOne({"externalProviderInfo.facebook.id": profile.id }, function(err, user){
    //If there isn't a fb account, look for an existing account with the same kagwave or google enail
      if (!user){
        Player.findOne({ $or: [ { email: email }, { "externalProviderInfo.google.email": email } ] }, function (err, user){
          //if there is a related existing account, send them to login to connect it
          if (user) {
            return done(null, false, { 
              message: "Looks like there's an account associated with that email. Log in and connect it in your settings."
            });
          //if there isn't any related account create one
          } else {

            const newUserId = createKagwaveId('player');
            onboardingInfo.kagwaveId = newUserId;
            const newUser = createNewUser('player', onboardingInfo, { name: 'facebook', info: fbAccount });
            const newUserMessages = {
              kagwaveId: newUserId,
              conversations: []
            }
            new Player(newUser).save();
            new Conversations(newUserMessages).save();
            console.log('Created new user.');
            console.log(newUser);
            return done(null, newUser);
          }
        });
      //If account does exist, update its information and log it in.
      } else {
        Player.findOneAndUpdate({"externalProviderInfo.facebook.id": profile.id}, 
          { $set: { "externalProviderInfo.facebook" : fbAccount }},
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
passport.use('google-auth', new GoogleStrategy.Strategy({
  clientID: process.env.GOOGLE_APP_ID,
  clientSecret: process.env.GOOGLE_APP_SECRET,
  callbackURL: `${getServerUrl('auth', true)}/google/redirect`,
  
  }, 
  function (accessToken: string, refreshToken: string, profile: any, done: any) {

    const { email, given_name: first_name, family_name: last_name, picture: profile_photo, locale } = profile._json;

    if (email === undefined){
      return done(null, null);
    }

    let onboardingInfo: any = {
      email: email,
      display_name: first_name + " " + last_name,
      first_name: first_name,
      last_name: last_name
    }

    const googleAccount = {
      id: profile.id,
      email: email,
      name: {given_name: first_name, family_name: last_name},
      location: locale,
      profile_photo: profile_photo,
      access_token: accessToken,
      refresh_token: refreshToken
    }



    //Look for Google Account
    Player.findOne({"externalProviderInfo.google.id": profile.id }, function(err, user){
      //If there isn't an account, look for an existing account with the same kagwave or google enail
        if (!user){
          Player.findOne({ $or: [ { email: email }, { "externalProviderInfo.facebook.email": email } ] } , function (err, user){
            //if there is a related existing account, send them to login to connect it
            if (user) {
              return done(null, false, { 
                message: "Looks like there's an account associated with that email. Log in and connect it in your settings."
              });
            //if there isn't any related account create one
            } else {

              const newUserId = createKagwaveId('player');
              onboardingInfo.kagwaveId = newUserId;
              const newUser = createNewUser('player', onboardingInfo,{ name: 'google', info: googleAccount });

              const newUserMessages = {
                kagwaveId: newUserId,
                conversations: []
              }
              new Player(newUser).save();
              new Conversations(newUserMessages).save();
              console.log('Created new user.');
              console.log(newUser);
              return done(null, newUser);
            }
          });
        //If account does exist, update its information and log it in.
        } else {
          Player.findOneAndUpdate({"externalProviderInfo.google.id": profile.id}, 
            {$set: { "externalProviderInfo.google" : googleAccount }},
            { new: true, useFindAndModify: false }, 
            (err, doc) => {
              if (err) console.log("Something wrong when updating data!");
          });
          return done(null, user);;
        }
      })
    
  })
);
