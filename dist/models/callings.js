"use strict";
const mongoose_1 = require("mongoose");
const callingSchema = new mongoose_1.Schema({
    callingId: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    organizationId: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    name: {
        type: String,
    },
});
const Calling = (0, mongoose_1.model)('Proposition', callingSchema);
module.exports = Calling;
