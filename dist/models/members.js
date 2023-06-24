"use strict";
const mongoose_1 = require("mongoose");
const memberSchema = new mongoose_1.Schema({
    firstName: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    lastName: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    email: {
        type: mongoose_1.Schema.Types.String,
        default: null
    },
    password: {
        type: mongoose_1.Schema.Types.String,
        default: null
    },
    admin: {
        type: Boolean,
        default: false
    },
    ageGroup: {
        type: mongoose_1.Schema.Types.String,
        default: null
    },
    wardId: {
        type: mongoose_1.Schema.Types.ObjectId,
        default: true
    },
    organizationId: {
        type: mongoose_1.Schema.Types.ObjectId,
        default: true
    },
});
const Member = (0, mongoose_1.model)('Member', memberSchema);
module.exports = Member;
