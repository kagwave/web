import express from 'express'
import authenticationController from '../controllers/authentication';
const router = express.Router();

//local    
router.post('/login/verify', authenticationController.local.verifyLogin);
router.post('/login/save', authenticationController.local.saveLogin);

router.get('/user', authenticationController.local.getUser);
router.get('/logout', authenticationController.local.logout);

router.post('/signup/complete', authenticationController.local.completeSignUp);
router.post('/signup/verify/email', authenticationController.local.verifyNewEmail);



//Third-Parties
router.get('/facebook', authenticationController.facebook.auth);
router.get('/facebook/redirect', authenticationController.facebook.redirect)

router.get('/google', authenticationController.google.auth);
router.get('/google/redirect', authenticationController.google.redirect);


export default router;