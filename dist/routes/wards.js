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
const wards_1 = __importDefault(require("../controllers/wards"));
const authCheck_1 = __importDefault(require("../middlewares/authCheck"));
const router = express.Router();
router
    .get('/ward', authCheck_1.default, wards_1.default.getAllWards)
    .get('/ward/:wardId', authCheck_1.default, wards_1.default.getWardById)
    .post('/ward', authCheck_1.default, wards_1.default.createWard)
    .put('/ward/:wardId', authCheck_1.default, wards_1.default.updateWardById)
    .delete('/ward/:wardId', authCheck_1.default, wards_1.default.deleteWardById);
exports.default = router;
