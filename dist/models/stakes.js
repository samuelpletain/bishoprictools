"use strict";
const mongoose_1 = require("mongoose");
const stakeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    }
});
const Stake = (0, mongoose_1.model)('Stake', stakeSchema);
module.exports = Stake;
