"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const propositions_1 = __importDefault(require("../controllers/propositions"));
const router = express.Router();
router
    .get('/proposition', propositions_1.default.getAllPropositions)
    .get('/proposition/:propositionId', propositions_1.default.getPropositionById)
    .post('/proposition', propositions_1.default.createProposition)
    .put('/proposition/:propositionId', propositions_1.default.updatePropositionById)
    .delete('/proposition/:propositionId', propositions_1.default.deletePropositionById)
    .get('/proposition/ward/:wardId', propositions_1.default.getPropositionsByWardId)
    .get('/proposition/stake/:stakeId', propositions_1.default.getPropositionsByStakeId)
    .get('/proposition/ward/:wardId/calling/:callingId', propositions_1.default.getWardPropositionsByCallingId)
    .get('/proposition/ward/:wardId/organization/:organizationId', propositions_1.default.getWardPropositionsByOrganizationId);
exports.default = router;
