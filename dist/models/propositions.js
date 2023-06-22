"use strict";
const mongoose_1 = require("mongoose");
const propositionSchema = new mongoose_1.Schema({
    memberId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    callingId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    leaderApproval: {
        type: Boolean,
        default: false
    },
    contactedOn: {
        type: Date,
        default: null
    },
    interviewDate: {
        type: Date,
        default: null
    },
    interviewed: {
        type: Boolean,
        default: false
    },
    accepted: {
        type: Boolean,
        default: false
    },
    sustainedOn: {
        type: Date,
        default: null
    },
    setApart: {
        type: Date,
        default: null
    },
    realeasedOn: {
        type: Date,
        default: null
    }
});
const Proposition = (0, mongoose_1.model)('Proposition', propositionSchema);
module.exports = Proposition;
