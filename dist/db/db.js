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
const db = {
    dbConnect: function (app, dbstring, host, port) {
        return __awaiter(this, void 0, void 0, function* () {
            mongoose_1.default
                .connect(dbstring)
                .then(() => {
                console.log('Successfully connected to MongoDB');
                app.listen(port, () => {
                    console.log(`⚡️[server]: Server is running at ${host}:${port}`);
                });
            })
                .catch((err) => {
                console.log(err);
                console.log('Not connected to MongoDB');
            });
        });
    },
    dbClose: function () {
        return __awaiter(this, void 0, void 0, function* () {
            mongoose_1.default.disconnect();
        });
    },
};
exports.default = db;
