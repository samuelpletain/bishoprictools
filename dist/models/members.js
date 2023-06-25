"use strict";
const mongoose_1 = require("mongoose");
const memberSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        default: null,
        unique: true
    },
    password: {
        type: String,
        default: null
    },
    admin: {
        type: Boolean,
        default: false
    },
    ageGroup: {
        type: String,
        default: 'Adult',
        enum: ['Adult', 'Youth']
    },
    wardId: {
        type: mongoose_1.Schema.Types.ObjectId,
        default: null
    },
    organizations: [{
            type: mongoose_1.Schema.Types.ObjectId,
            default: []
        }]
});
const Member = (0, mongoose_1.model)('Member', memberSchema);
module.exports = Member;
