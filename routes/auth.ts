import * as express from 'express';
import auth from '../controllers/auth';
const passport = require('passport');
const passportStategies = require('../config/passport');

const routes: express.Router = express.Router();

routes.get('/login', auth.login)

routes.get('/logout', auth.logout)

routes.get('/auth/google', passport.authenticate('google', {
  scope: ['profile']
}))

routes.get('/auth/google/redirect', passport.authenticate('google', {
  successRedirect: '/proposition',
  failureRedirect: '/login'
}))

export default routes