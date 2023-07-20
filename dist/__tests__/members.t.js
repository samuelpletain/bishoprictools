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
(0, globals_1.describe)('Member routes', () => {
    let id = '';
    (0, globals_1.test)('responds to /member/:memberId', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = {
            _id: '6497233806e2f4b9a7f23f3e',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@gmail.com',
            password: '123456789',
            admin: true,
            ageGroup: 'Adult',
            wardId: '6493925960042c532a58a087',
            organizations: ['649345be812b4a3f37335cf6', '649345be812b4a3f37335cf8'],
            __v: 0,
        };
        const res = yield (0, supertest_1.default)(server_1.app).get('/member/6497233806e2f4b9a7f23f3e');
        (0, globals_1.expect)(res.header['content-type']).toBe('application/json; charset=utf-8');
        (0, globals_1.expect)(res.statusCode).toBe(200);
        (0, globals_1.expect)(JSON.parse(res.text)).toEqual(result);
    }), 20000);
    // Delete Test
    // POST Test
    (0, globals_1.test)('responds to POST /member', () => __awaiter(void 0, void 0, void 0, function* () {
        const postInfo = {
            firstName: 'Succesful',
            lastName: 'Test',
            email: 'Succesful@Test.com',
            password: '123456789',
            admin: false,
            ageGroup: 'Adult',
            wardId: '6493925960042c532a58a087',
            organizations: ['649345be812b4a3f37335cf6', '649345be812b4a3f37335cf8'],
        };
        const res = yield (0, supertest_1.default)(server_1.app).post('/member').send(postInfo);
        (0, globals_1.expect)(res.statusCode).toBe(201);
        const member = JSON.parse(res.text);
        id = member._id;
    }));
    // PUT Test
    (0, globals_1.test)('responds to PUT /member/:memberId', () => __awaiter(void 0, void 0, void 0, function* () {
        const update = {
            firstName: 'Succesful',
            lastName: 'Test',
            email: 'Succesful1@Test.com',
            password: '123456789',
            admin: true,
            ageGroup: 'Adult',
            wardId: '6493925960042c532a58a087',
            organizations: ['649345be812b4a3f37335cf6', '649345be812b4a3f37335cf8'],
            __v: 0,
        };
        const res = yield (0, supertest_1.default)(server_1.app).put(`/member/${id}`).send(update);
        console.log(res);
        (0, globals_1.expect)(res.statusCode).toBe(204);
    }));
    (0, globals_1.test)('responds to /member/:memberId', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.app).delete(`/member/${id}`);
        (0, globals_1.expect)(res.statusCode).toBe(200);
    }), 20000);
});
