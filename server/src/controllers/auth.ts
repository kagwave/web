import Player from '../../../shared/models/player';
import Conversations from '../../../shared/models/conversation';
import express from 'express';
import passport from 'passport';
import createNewUser from '../services/auth/utils/onboarding/createNewUser';
import createKagwaveId from '../services/auth/utils/onboarding/createKagwaveId';

import { hostUrl } from '../../../shared/utils/urls';
import { authService } from '../../../shared/utils/axios/axiosClient';

const googleParams = {
  accessType: 'offline', approvalPrompt: 'force', includeGrantedScopes: true
}

let loginRedirect: string;

const authenticationController = {

  local: {

    verifyLogin (req: express.Request, res: express.Response, next: express.NextFunction) {

    },
  
    saveLogin (req: express.Request, res: express.Response, next: express.NextFunction) {
     
    },
  
    logout (req: express.Request, res: express.Response, next: express.NextFunction) {
      
    },
  
    getUser (req: express.Request, res: express.Response) {
      
    },
  
    completeSignUp (req: express.Request, res: express.Response, next: express.NextFunction) {
    
    },
  
    verifyNewEmail (req: express.Request, res: express.Response, next: express.NextFunction) {
      
    },

    verifyNewPhone (req: express.Request, res: express.Response, next: express.NextFunction) {
    
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