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
(0, globals_1.describe)('stake routes', () => {
    const newstake = {
        name: 'Midvale 2nd',
    };
    let id = '';
    const newName = 'Midvale 3rd';
    (0, globals_1.test)('responds to POST /stake', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.app).post('/stake').send(newstake);
        const stake = JSON.parse(res.text);
        (0, globals_1.expect)(res.header['content-type']).toBe('application/json; charset=utf-8');
        (0, globals_1.expect)(res.statusCode).toBe(201);
        (0, globals_1.expect)(stake.name).toEqual(newstake.name);
        id = stake._id;
    }), 20000);
    (0, globals_1.test)('responds to GET /stake/:stakeId', () => __awaiter(void 0, void 0, void 0, function* () {
        const error = yield (0, supertest_1.default)(server_1.app).get(`/stake/123`);
        (0, globals_1.expect)(error.header['content-type']).toBe('application/json; charset=utf-8');
        (0, globals_1.expect)(error.statusCode).toBe(400);
        (0, globals_1.expect)(JSON.parse(error.text)).toEqual('Please provide a valid stake id.');
        const res = yield (0, supertest_1.default)(server_1.app).get(`/stake/${id}`);
        (0, globals_1.expect)(res.header['content-type']).toBe('application/json; charset=utf-8');
        (0, globals_1.expect)(res.statusCode).toBe(200);
        (0, globals_1.expect)(JSON.parse(res.text)).toEqual({
            name: newstake.name,
            _id: id,
            __v: 0,
        });
    }), 20000);
    (0, globals_1.test)('responds to PUT /stake/:stakeId', () => __awaiter(void 0, void 0, void 0, function* () {
        const error = yield (0, supertest_1.default)(server_1.app).get(`/stake/123`);
        (0, globals_1.expect)(error.header['content-type']).toBe('application/json; charset=utf-8');
        (0, globals_1.expect)(error.statusCode).toBe(400);
        (0, globals_1.expect)(JSON.parse(error.text)).toEqual('Please provide a valid stake id.');
        const res = yield (0, supertest_1.default)(server_1.app).put(`/stake/${id}`).send({
            name: newName,
        });
        (0, globals_1.expect)(res.statusCode).toBe(204);
    }), 20000);
    (0, globals_1.test)('responds to GET /stake', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.app).get('/stake');
        (0, globals_1.expect)(res.header['content-type']).toBe('application/json; charset=utf-8');
        (0, globals_1.expect)(res.statusCode).toBe(200);
        (0, globals_1.expect)(JSON.parse(res.text)).toEqual(globals_1.expect.arrayContaining([
            {
                name: newName,
                _id: id,
                __v: 0,
            },
        ]));
    }), 20000);
    (0, globals_1.test)('responds to DELETE /stake/:stakeId', () => __awaiter(void 0, void 0, void 0, function* () {
        const error = yield (0, supertest_1.default)(server_1.app).get(`/stake/123`);
        (0, globals_1.expect)(error.header['content-type']).toBe('application/json; charset=utf-8');
        (0, globals_1.expect)(error.statusCode).toBe(400);
        const res = yield (0, supertest_1.default)(server_1.app).delete(`/stake/${id}`);
        (0, globals_1.expect)(res.header['content-type']).toBe('application/json; charset=utf-8');
        (0, globals_1.expect)(res.statusCode).toBe(200);
    }), 20000);
});
