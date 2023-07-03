"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/users');
const Member = require('../models/members');
require('dotenv').config();
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findById(id);
    if (user) {
        done(null, user);
    }
}));
passport.use('google', new GoogleStrategy({
    callbackURL: 'https://bishopric-tools.onrender.com/auth/google/redirect',
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    scope: ['profile'],
    proxy: true
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    let currentUser = yield User.findOne({
        googleId: profile.id
    });
    if (!currentUser) {
        const firstName = profile.displayName.split(" ")[0];
        const lastName = profile.displayName.split(" ")[1];
        const member = yield Member.findOne({
            firstName: firstName,
            lastName: lastName
        });
        if (member) {
            currentUser = yield new User({
                memberId: member.id,
                googleId: profile.id
            }).save();
        }
    }
    done(null, currentUser);
})));
