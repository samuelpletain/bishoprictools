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
exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const propositions_1 = __importDefault(require("./routes/propositions"));
const callings_1 = __importDefault(require("./routes/callings"));
const wards_1 = __importDefault(require("./routes/wards"));
const stakes_1 = __importDefault(require("./routes/stakes"));
const members_1 = __importDefault(require("./routes/members"));
const auth_1 = __importDefault(require("./routes/auth"));
const swaggerUi = __importStar(require("swagger-ui-express"));
const swagger_output_json_1 = __importDefault(require("./swagger-output.json"));
const cookieSession = require('cookie-session');
const passport = require('passport');
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
const port = process.env.PORT || '3000';
const dbstring = process.env.ATLAS_URI || '';
const host = process.env.RENDER_EXTERNAL_URL || 'http://localhost';
app.set('trust proxy', 1);
app.use(cookieSession({
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger_output_json_1.default));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.use('/', propositions_1.default);
app.use('/', callings_1.default);
app.use('/', wards_1.default);
app.use('/', stakes_1.default);
app.use('/', members_1.default);
app.use('/', auth_1.default);
mongoose_1.default
    .connect(dbstring)
    .then(() => {
    console.log('Successfully connected to MongoDB');
})
    .catch((err) => {
    console.log(err);
    console.log('Not connected to MongoDB');
});
const server = app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at ${host}:${port}`);
});
exports.server = server;
