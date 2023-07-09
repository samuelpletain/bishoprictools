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
const callings_1 = __importDefault(require("../routes/callings"));
const globals_1 = require("@jest/globals");
server_1.default.use('/', callings_1.default);
//GetbyId Test
(0, globals_1.describe)('Calling routes', () => {
    (0, globals_1.test)('responds to /calling/:callingId', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = {
            _id: "6497892b726a492433415e1a",
            organizationId: "649345be812b4a3f37335cf6",
            name: "Bishop",
            __v: 0
        };
        const res = yield (0, supertest_1.default)(server_1.default).get('/calling/6497892b726a492433415e1a');
        (0, globals_1.expect)(res.header['content-type']).toBe('application/json; charset=utf-8');
        (0, globals_1.expect)(res.statusCode).toBe(200);
        (0, globals_1.expect)(JSON.parse(res.text)).toEqual(result);
    }), 20000);
});
//Delete Test
(0, globals_1.describe)('Calling routes', () => {
    (0, globals_1.test)('responds to /calling/:callingId', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default).delete('/calling/64a9ee0d7498b5160bb418b0');
        (0, globals_1.expect)(res.statusCode).toBe(200);
    }), 20000);
    // PUT Test
    (0, globals_1.test)('responds to PUT /calling/:callingId', () => __awaiter(void 0, void 0, void 0, function* () {
        const update = {
            organizationId: "649345be812b4a3f37335cf6",
            name: "First Calling"
        };
        const res = yield (0, supertest_1.default)(server_1.default)
            .put('/calling/64a9e7ff9c9be0b893e4d197')
            .send(update);
        (0, globals_1.expect)(res.statusCode).toBe(204);
    }));
    // POST Test
    (0, globals_1.test)('responds to POST /calling', () => __awaiter(void 0, void 0, void 0, function* () {
        const postInfo = {
            organizationId: "649345be812b4a3f37335cf6",
            name: "New Calling"
        };
        const res = yield (0, supertest_1.default)(server_1.default)
            .post('/calling')
            .send(postInfo);
        (0, globals_1.expect)(res.statusCode).toBe(201);
    }));
});
