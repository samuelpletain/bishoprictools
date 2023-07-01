"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const wards_1 = __importDefault(require("../routes/wards"));
const globals_1 = require("@jest/globals");
server_1.default.use('/', wards_1.default);
(0, globals_1.describe)('Ward routes', () => {
    (0, globals_1.test)('responds to /ward/:wardId', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = {
            _id: "6493925960042c532a58a087",
            name: "Midvale 11th"
        };
        const res = yield (0, supertest_1.default)(server_1.default).get('/ward/6493925960042c532a58a087');
        (0, globals_1.expect)(res.header['content-type']).toBe('application/json; charset=utf-8');
        (0, globals_1.expect)(res.statusCode).toBe(200);
        (0, globals_1.expect)(JSON.parse(res.text)).toEqual(result);
    }), 20000);
});
