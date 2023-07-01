"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = {
    login(req, res) {
        // #swagger.summary = "This endpoint redirects a user to /auth/google."
        res.redirect('/auth/google');
    },
    logout(req, res) {
        // #swagger.summary = "This endpoint logs out a user."
        // @ts-ignore
        req.logout();
        res.redirect('/');
    }
};
exports.default = auth;
