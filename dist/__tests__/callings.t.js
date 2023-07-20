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
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../server");
const globals_1 = require("@jest/globals");
require('dotenv').config();
const dbstring = process.env.ATLAS_URI || '';
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    jest.setTimeout(60000);
    yield server_1.server.close();
    yield mongoose_1.default.connection.close();
    yield mongoose_1.default.connect(dbstring);
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
    yield server_1.server.close();
    jest.setTimeout(60000);
}));
//GetbyId Test
(0, globals_1.describe)('Calling routes', () => {
    (0, globals_1.test)('responds to GET /calling', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.app).get('/calling');
        (0, globals_1.expect)(res.header['content-type']).toBe('application/json; charset=utf-8');
        (0, globals_1.expect)(res.statusCode).toBe(200);
    }), 20000);
    (0, globals_1.test)('responds to GET /calling/:callingId', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = {
            _id: '6497892b726a492433415e1a',
            organizationId: '649345be812b4a3f37335cf6',
            name: 'Bishop',
            __v: 0,
        };
        const res = yield (0, supertest_1.default)(server_1.app).get('/calling/6497892b726a492433415e1a');
        (0, globals_1.expect)(res.header['content-type']).toBe('application/json; charset=utf-8');
        (0, globals_1.expect)(res.statusCode).toBe(200);
        (0, globals_1.expect)(JSON.parse(res.text)).toEqual(result);
    }), 20000);
    //Delete Test
    (0, globals_1.test)('responds to DELETE /calling/:callingId', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.app).delete('/calling/64a9ee0d7498b5160bb418b0');
        (0, globals_1.expect)(res.statusCode).toBe(200);
    }), 20000);
    // PUT Test
    (0, globals_1.test)('responds to PUT /calling/:callingId', () => __awaiter(void 0, void 0, void 0, function* () {
        const update = {
            organizationId: '649345be812b4a3f37335cf6',
            name: 'First Calling',
        };
        const res = yield (0, supertest_1.default)(server_1.app)
            .put('/calling/64a9e7ff9c9be0b893e4d197')
            .send(update);
        (0, globals_1.expect)(res.statusCode).toBe(204);
    }));
    // POST Test
    (0, globals_1.test)('responds to POST /calling', () => __awaiter(void 0, void 0, void 0, function* () {
        const postInfo = {
            organizationId: '649345be812b4a3f37335cf6',
            name: 'New Calling',
        };
        const res = yield (0, supertest_1.default)(server_1.app).post('/calling').send(postInfo);
        (0, globals_1.expect)(res.statusCode).toBe(201);
    }));
});
