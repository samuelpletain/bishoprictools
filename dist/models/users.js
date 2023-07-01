"use strict";
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    memberId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    googleId: {
        type: String,
        required: true
    }
});
const User = (0, mongoose_1.model)('User', userSchema);
module.exports = User;
