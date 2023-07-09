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
    const newWard = {
        name: "Midvale 2nd"
    };
    let id = "";
    const newName = "Midvale 3rd";
    (0, globals_1.test)('responds to POST /ward', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default).post('/ward').send(newWard);
        const ward = JSON.parse(res.text);
        (0, globals_1.expect)(res.header['content-type']).toBe('application/json; charset=utf-8');
        (0, globals_1.expect)(res.statusCode).toBe(201);
        (0, globals_1.expect)(ward.name).toEqual(newWard.name);
        id = ward._id;
    }), 20000);
    (0, globals_1.test)('responds to GET /ward/:wardId', () => __awaiter(void 0, void 0, void 0, function* () {
        const error = yield (0, supertest_1.default)(server_1.default).get(`/ward/123`);
        (0, globals_1.expect)(error.header['content-type']).toBe('application/json; charset=utf-8');
        (0, globals_1.expect)(error.statusCode).toBe(400);
        (0, globals_1.expect)(JSON.parse(error.text)).toEqual('Please provide a valid ward id.');
        const res = yield (0, supertest_1.default)(server_1.default).get(`/ward/${id}`);
        (0, globals_1.expect)(res.header['content-type']).toBe('application/json; charset=utf-8');
        (0, globals_1.expect)(res.statusCode).toBe(200);
        (0, globals_1.expect)(JSON.parse(res.text)).toEqual({
            name: newWard.name,
            _id: id,
            __v: 0
        });
    }), 20000);
    (0, globals_1.test)('responds to PUT /ward/:wardId', () => __awaiter(void 0, void 0, void 0, function* () {
        const error = yield (0, supertest_1.default)(server_1.default).get(`/ward/123`);
        (0, globals_1.expect)(error.header['content-type']).toBe('application/json; charset=utf-8');
        (0, globals_1.expect)(error.statusCode).toBe(400);
        (0, globals_1.expect)(JSON.parse(error.text)).toEqual('Please provide a valid ward id.');
        const res = yield (0, supertest_1.default)(server_1.default).put(`/ward/${id}`).send({
            name: newName
        });
        (0, globals_1.expect)(res.statusCode).toBe(204);
    }), 20000);
    (0, globals_1.test)('responds to GET /ward', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default).get('/ward');
        (0, globals_1.expect)(res.header['content-type']).toBe('application/json; charset=utf-8');
        (0, globals_1.expect)(res.statusCode).toBe(200);
        (0, globals_1.expect)(JSON.parse(res.text)).toEqual(globals_1.expect.arrayContaining([{
                name: newName,
                _id: id,
                __v: 0
            }]));
    }), 20000);
    (0, globals_1.test)('responds to DELETE /ward/:wardId', () => __awaiter(void 0, void 0, void 0, function* () {
        const error = yield (0, supertest_1.default)(server_1.default).get(`/ward/123`);
        (0, globals_1.expect)(error.header['content-type']).toBe('application/json; charset=utf-8');
        (0, globals_1.expect)(error.statusCode).toBe(400);
        const res = yield (0, supertest_1.default)(server_1.default).delete(`/ward/${id}`);
        (0, globals_1.expect)(res.header['content-type']).toBe('application/json; charset=utf-8');
        (0, globals_1.expect)(res.statusCode).toBe(200);
    }), 20000);
});
