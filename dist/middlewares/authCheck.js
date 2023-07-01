"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/login');
    }
    else {
        next();
    }
};
exports.default = authCheck;
