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
    server_1.server.close();
    yield mongoose_1.default.connection.close();
    yield mongoose_1.default.connect(dbstring);
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
    server_1.server.close();
    jest.setTimeout(3000);
}));
(0, globals_1.describe)('Ward routes', () => {
    const newProposition = {
        memberId: '6493930c60042c532a58a08b',
        callingId: '6493923060042c532a58a084',
        leaderApproval: true,
        contactedOn: '2022-08-13',
        interviewDate: '2022-08-15',
        interviewed: true,
        accepted: true,
        sustainedOn: '2022-08-17',
        setApart: '2022-08-17',
        realeasedOn: '2023-01-01',
    };
    let id = '';
    const updatedProposition = {
        memberId: '6493930c60042c532a58a08b',
        callingId: '6493923060042c532a58a084',
        leaderApproval: true,
        contactedOn: '2022-08-13',
        interviewDate: '2022-08-15',
        interviewed: true,
        accepted: true,
        sustainedOn: '2023-08-17',
        setApart: '2023-08-17',
        realeasedOn: '2024-01-01',
    };
    (0, globals_1.test)('responds to POST /proposition', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.app).post('/proposition').send(newProposition);
        const proposition = JSON.parse(res.text);
        (0, globals_1.expect)(res.header['content-type']).toBe('application/json; charset=utf-8');
        (0, globals_1.expect)(res.statusCode).toBe(201);
        id = proposition._id;
    }), 20000);
    (0, globals_1.test)('responds to GET /proposition/:propositionId', () => __awaiter(void 0, void 0, void 0, function* () {
        const error = yield (0, supertest_1.default)(server_1.app).get(`/proposition/123`);
        (0, globals_1.expect)(error.header['content-type']).toBe('application/json; charset=utf-8');
        (0, globals_1.expect)(error.statusCode).toBe(400);
        (0, globals_1.expect)(JSON.parse(error.text)).toEqual('Please provide a valid proposition id.');
        const res = yield (0, supertest_1.default)(server_1.app).get(`/proposition/${id}`);
        (0, globals_1.expect)(res.header['content-type']).toBe('application/json; charset=utf-8');
        (0, globals_1.expect)(res.statusCode).toBe(200);
    }), 20000);
    (0, globals_1.test)('responds to PUT /proposition/:propositionId', () => __awaiter(void 0, void 0, void 0, function* () {
        const error = yield (0, supertest_1.default)(server_1.app).get(`/proposition/123`);
        (0, globals_1.expect)(error.header['content-type']).toBe('application/json; charset=utf-8');
        (0, globals_1.expect)(error.statusCode).toBe(400);
        (0, globals_1.expect)(JSON.parse(error.text)).toEqual('Please provide a valid proposition id.');
        const res = yield (0, supertest_1.default)(server_1.app)
            .put(`/proposition/${id}`)
            .send(updatedProposition);
        (0, globals_1.expect)(res.statusCode).toBe(204);
    }), 20000);
    (0, globals_1.test)('responds to GET /proposition', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.app).get('/proposition');
        (0, globals_1.expect)(res.header['content-type']).toBe('application/json; charset=utf-8');
        (0, globals_1.expect)(res.statusCode).toBe(200);
    }), 20000);
    (0, globals_1.test)('responds to DELETE /proposition/:propositionId', () => __awaiter(void 0, void 0, void 0, function* () {
        const error = yield (0, supertest_1.default)(server_1.app).get(`/proposition/123`);
        (0, globals_1.expect)(error.header['content-type']).toBe('application/json; charset=utf-8');
        (0, globals_1.expect)(error.statusCode).toBe(400);
        const res = yield (0, supertest_1.default)(server_1.app).delete(`/proposition/${id}`);
        (0, globals_1.expect)(res.header['content-type']).toBe('application/json; charset=utf-8');
        (0, globals_1.expect)(res.statusCode).toBe(200);
    }), 20000);
});
