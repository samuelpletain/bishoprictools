"use strict";
const mongoose_1 = require("mongoose");
const wardSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    stakeId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
});
const Ward = (0, mongoose_1.model)('Ward', wardSchema);
module.exports = Ward;
