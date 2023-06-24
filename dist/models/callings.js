"use strict";
const mongoose_1 = require("mongoose");
const callingSchema = new mongoose_1.Schema({
    organizationId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
});
const Calling = (0, mongoose_1.model)('Calling', callingSchema);
module.exports = Calling;
