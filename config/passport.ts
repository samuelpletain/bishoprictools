import { DoneCallback, Profile } from 'passport';

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/users');
const Member = require('../models/members');
require('dotenv').config();

passport.serializeUser((user: typeof User, done: DoneCallback) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done: DoneCallback) => {
  const user = await User.findById(id);
  if (user) {
    done(null, user);
  }
});

passport.use('google', new GoogleStrategy({
  callbackURL: 'https://bishopric-tools.onrender.com/auth/google/redirect',
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  scope: ['profile'],
  proxy: true
}, async (accessToken: string, refreshToken: string, profile: Profile, done: DoneCallback) => {
  let currentUser = await User.findOne({
    googleId: profile.id
  });

  if (!currentUser) {
    const firstName = profile.displayName.split(" ")[0];
    const lastName = profile.displayName.split(" ")[1];
    const member = await Member.findOne({
      firstName: firstName,
      lastName: lastName
    })
    if (member) {
      currentUser = await new User({
        memberId: member.id,
        googleId: profile.id
      }).save();
    }
  }
  done(null, currentUser);
}));
