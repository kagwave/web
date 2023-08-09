import Player from '../../../shared/models/player';
import Conversations from '../../../shared/models/conversation';
import express from 'express';
import passport from 'passport';
import createNewUser from '../utils/onboarding/createNewUser';
import createKagwaveId from '../utils/onboarding/createKagwaveId';

import { hostUrl } from '../../../shared/utils/urls';
import { authService } from '../../../shared/utils/axios/axiosClient';

const googleParams = {
  accessType: 'offline', approvalPrompt: 'force', includeGrantedScopes: true
}

let loginRedirect: string;

const authenticationController = {

  local: {

    verifyLogin (req: express.Request, res: express.Response, next: express.NextFunction) {
      loginRedirect = req.body.redirect;
      passport.authenticate("local", function (err, user, info) {
        if (err) {
          return next(err);
        } else {
          if (!user) {
            res.send({status: info.message})
          } else { 
            res.send({status: 'Success.'});
          }
        }
      })(req, res, next);
    },
  
    saveLogin (req: express.Request, res: express.Response, next: express.NextFunction) {
      passport.authenticate("local", function(err, user, info) {
        req.logIn(user, function(err) {
          if (err) {
            return next(err);
          } else {
            res.redirect(`${hostUrl}/${loginRedirect ? loginRedirect : 'explore'}`);
          }
        });
      })(req, res, next);
    },
  
    logout (req: express.Request, res: express.Response, next: express.NextFunction) {
      req.logOut(function(err) {
        if (err) { return next(err); }
      });
      res.redirect(`${hostUrl}`);
    },
  
    getUser (req: express.Request, res: express.Response) {
      if (req.user) {
        let currentUser: any = req.user;
        res.json({id: currentUser.kagwaveId});
      } else {
        res.json({});
      }
    },
  
    completeSignUp (req: express.Request, res: express.Response, next: express.NextFunction) {
      
      let onboardingInfo = req.body;
      onboardingInfo.display_name = onboardingInfo.first_name + " " + onboardingInfo.last_name;
    
      //Look for user, if no user create one and log in.
      Player.findOne({email: onboardingInfo.email}, (function(err, user) {
    
        if (!user && !err) {
    
          const newUserId = createKagwaveId('player');
          onboardingInfo.kagwaveId = newUserId;
          
          const newUser = createNewUser('player', onboardingInfo);
          const newUserMessages = {
            kagwaveId: newUserId,
            conversations: []
          };
          new Player(newUser).save();
          new Conversations(newUserMessages).save();
         
          req.logIn(newUser, function(err) {
            if (err) {
              return next(err);
            } else {
              console.log('Created new user.');
              res.status(200).send('Added user to pending.');
            }
          });
        } else { 
          return res.status(400).send('The user already exists.');
        }
      }));
    },
  
    verifyNewEmail (req: express.Request, res: express.Response, next: express.NextFunction) {
      let email = req.body.email;
      Player.findOne({ $or: [ {email: email}, {"externalProviderInfo.facebook.email": email }, {"externalProviderInfo.facebook.email": email}, {"externalProviderInfo.apple.email": email} ] }, (function(err, user) {
        if (!user){
          return res.json(true)
        } else { 
          return res.json(false);
        }
      }));
    },

    verifyNewPhone (req: express.Request, res: express.Response, next: express.NextFunction) {
      let phone_number = req.body.phone_number;
      Player.findOne({phone_number: phone_number}, (function(err, user) {
        if (!user){
          return res.json(true)
        } else { 
          return res.json(false);
        }
      }));
    },
  },

  facebook: {

    auth: 
      passport.authenticate('facebook-auth', { 
        scope : ['public_profile', 'email', 'user_friends', 'user_birthday','user_location','user_videos', 'user_likes','user_link','user_gender','user_hometown','user_posts', 'user_photos']
      }),

    redirect (req: express.Request, res: express.Response, next: express.NextFunction) {
      passport.authenticate('facebook-auth', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) { 
          //req.session.loginStatus = info.message;
          return res.redirect(`${hostUrl}/login`);
        } else {
          req.logIn(user, function(err) {
            if (err) { return next(err); } else {
            //req.session.loginStatus = null;
            return res.redirect(`${hostUrl}`)}
          });
        }
      })(req, res, next)
    },
  },

  google: {

    auth (req: express.Request, res: express.Response, next: express.NextFunction) {
      console.log(req.query)
      passport.authenticate('google-auth', { 
        scope : ['email', 'profile'], ...googleParams
      })
    },
  

    redirect (req: express.Request, res: express.Response, next: express.NextFunction) {
      console.log(req.query);
      passport.authenticate('google-auth', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) { 
          return res.redirect(`${hostUrl}/login`);
        } else {
          req.logIn(user, function(err) {
            if (err) { return next(err); } else {
            return res.redirect(`${hostUrl}`);}
          });
        }
      })(req, res, next)
    },

  },

}

export default authenticationController;