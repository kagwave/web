import express from 'express';
import passport from 'passport';

import { hostUrl } from '../src/utils/urls';

const googleParams = {
  accessType: 'offline', approvalPrompt: 'force', includeGrantedScopes: true
}

let loginRedirect: string;

const authenticationController = {

  getUser (req: express.Request, res: express.Response) {
    if (req.user) {
      let currentUser: any = req.user;
      delete currentUser.accessToken;
      delete currentUser.refreshToken;
      delete currentUser["_id"];
      res.json(currentUser);
    } else {
      res.json({});
    }
  },

  logout (req: express.Request, res: express.Response, next: express.NextFunction) {
    req.logOut(function(err) {
      if (err) {
        console.log(err);
        return res.status(404).send("Error logging out.")
      } else {
        res.status(200).send("OK");
      }
    });

  },

  google: {

    auth: (req: express.Request, res: express.Response, next: express.NextFunction) => {
      // set user type
      passport.authenticate('google', { 
        scope : ['email', 'profile'], ...googleParams
      })(req, res, next);
    },
  
    redirect (req: express.Request, res: express.Response, next: express.NextFunction) {
      passport.authenticate('google', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) { 
          //res.cookie('errorMessage', info.message, { httpOnly: true });
          return res.redirect(`${hostUrl}/login/`);
        } else {
          req.logIn(user, function(err) {
            if (err) { 
              return next(err); 
            } else {
              return res.redirect(`${hostUrl}`);
            }
          });
        }
      })(req, res, next);
    }

  }

}

export default authenticationController;