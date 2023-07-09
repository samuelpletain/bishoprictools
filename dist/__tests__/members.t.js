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
const members_1 = __importDefault(require("../routes/members"));
const globals_1 = require("@jest/globals");
server_1.default.use('/', members_1.default);
(0, globals_1.describe)('Member routes', () => {
    (0, globals_1.test)('responds to /member/:memberId', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = {
            _id: "6497233806e2f4b9a7f23f3e",
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@gmail.com",
            password: "123456789",
            admin: true,
            ageGroup: "Adult",
            wardId: "6493925960042c532a58a087",
            organizations: ["649345be812b4a3f37335cf6", "649345be812b4a3f37335cf8"],
            __v: 0
        };
        const res = yield (0, supertest_1.default)(server_1.default).get('/member/6497233806e2f4b9a7f23f3e');
        (0, globals_1.expect)(res.header['content-type']).toBe('application/json; charset=utf-8');
        (0, globals_1.expect)(res.statusCode).toBe(200);
        (0, globals_1.expect)(JSON.parse(res.text)).toEqual(result);
    }), 20000);
    // Delete Test
    (0, globals_1.describe)('Member routes', () => {
        (0, globals_1.test)('responds to /member/:membergId', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(server_1.default).delete('/member/64aa1183f52fb4d632616e6c');
            (0, globals_1.expect)(res.statusCode).toBe(200);
        }), 20000);
        // PUT Test
        (0, globals_1.test)('responds to PUT /member/:memberId', () => __awaiter(void 0, void 0, void 0, function* () {
            const update = {
                _id: "64aa12210644bc8107c1fa17",
                firstName: "Succesful",
                lastName: "Test",
                email: "Test@Test.com",
                password: "123456789",
                admin: true,
                ageGroup: "Adult",
                wardId: "6493925960042c532a58a087",
                organizations: ["649345be812b4a3f37335cf6", "649345be812b4a3f37335cf8"],
                __v: 0
            };
            const res = yield (0, supertest_1.default)(server_1.default)
                .put('/member/64aa1183f52fb4d632616e6c')
                .send(update);
            (0, globals_1.expect)(res.statusCode).toBe(204);
        }));
        // POST Test
        (0, globals_1.test)('responds to POST /member', () => __awaiter(void 0, void 0, void 0, function* () {
            const postInfo = {
                firstName: "Succesful",
                lastName: "Test",
                email: "Succesful@Test.com",
                password: "123456789",
                admin: false,
                ageGroup: "Adult",
                wardId: "6493925960042c532a58a087",
                organizations: ["649345be812b4a3f37335cf6", "649345be812b4a3f37335cf8"],
                __v: 0
            };
            const res = yield (0, supertest_1.default)(server_1.default)
                .post('/member')
                .send(postInfo);
            (0, globals_1.expect)(res.statusCode).toBe(201);
        }));
    });
});
