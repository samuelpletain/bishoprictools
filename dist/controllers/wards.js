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
const mongodb_1 = require("mongodb");
const wards_1 = __importDefault(require("../models/wards"));
// import Organization from '../models/organizations';
const wards = {
    getAllWards(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* #swagger.security = [{
                      "oAuthSample": [
                          "https://www.googleapis.com/auth/userinfo.profile",
                      ]
                  }] */
            // #swagger.summary = "This endpoint returns a list of all the wards in the database."
            try {
                const wards = yield wards_1.default.find();
                /* #swagger.responses[200] = {
                        description: 'Returns an array of ward objects.'
                } */
                res.status(200).json(wards);
            }
            catch (err) {
                /* #swagger.responses[500] = {
                        description: 'An error occured.'
                } */
                res.status(500).json(err);
            }
        });
    },
    getWardById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* #swagger.security = [{
                      "oAuthSample": [
                          "https://www.googleapis.com/auth/userinfo.profile",
                      ]
                  }] */
            // #swagger.summary = "This endpoint returns the details of a single ward."
            /*  #swagger.parameters['wardId'] = {
                          in: 'path',
                          description: 'A MongoDB ObjectId',
                          required: true
                  } */
            try {
                let id;
                try {
                    id = new mongodb_1.ObjectId(req.params.wardId);
                }
                catch (err) {
                    /* #swagger.responses[400] = {
                          description: 'An invalid MongoDB ObjectId was provided.'
                  } */
                    res.status(400).json('Please provide a valid ward id.');
                    return;
                }
                const ward = yield wards_1.default.findOne(id);
                /* #swagger.responses[200] = {
                        description: 'Returns a ward object.'
                } */
                res.status(200).json(ward);
            }
            catch (err) {
                /* #swagger.responses[500] = {
                        description: 'An error occured.'
                } */
                res.status(500).json(err);
            }
        });
    },
    createWard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* #swagger.security = [{
                      "oAuthSample": [
                          "https://www.googleapis.com/auth/userinfo.profile",
                      ]
                  }] */
            // #swagger.summary = "This endpoint creates a ward."
            /*  #swagger.parameters['newWard'] = {
                          in: 'body',
                          description: 'An object representing a new ward',
                          required: true,
                          schema: { $ref: '#/definitions/Ward' }
                  } */
            try {
                const ward = new wards_1.default({
                    name: req.body.name,
                    wardId: req.body.wardId
                });
                const newWard = yield ward.save().catch((err) => {
                    /* #swagger.responses[422] = {
                          description: 'The provided ward object does not pass validation.'
                  } */
                    res.status(422).json({
                        error: err.message
                    });
                });
                /* #swagger.responses[201] = {
                        description: 'Returns an object containing the result of the request and a string representing a MongoDB ObjectId.',
                        schema: { $ref: '#/definitions/Ward' }
                } */
                res.status(201).json(newWard);
            }
            catch (err) {
                /* #swagger.responses[500] = {
                        description: 'An error occured.'
                } */
                res.status(500).json(err);
            }
        });
    },
    deleteWardById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* #swagger.security = [{
                      "oAuthSample": [
                          "https://www.googleapis.com/auth/userinfo.profile",
                      ]
                  }] */
            // #swagger.summary = "This endpoint deletes a single ward."
            /*  #swagger.parameters['wardId'] = {
                          in: 'path',
                          description: 'A MongoDB ObjectId',
                          required: true
                  } */
            try {
                let id;
                try {
                    id = new mongodb_1.ObjectId(req.params.wardId);
                }
                catch (err) {
                    /* #swagger.responses[400] = {
                          description: 'An invalid MongoDB ObjectId was provided.'
                  } */
                    res.status(400).json('Please provide a valid ward id.');
                    return;
                }
                yield wards_1.default.deleteOne(id);
                /* #swagger.responses[200] = {
                        description: 'The specified ward has been deleted.',
                } */
                res.status(200).send();
            }
            catch (err) {
                /* #swagger.responses[500] = {
                        description: 'An error occured.'
                } */
                res.status(500).json(err);
            }
        });
    },
    updateWardById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* #swagger.security = [{
                      "oAuthSample": [
                          "https://www.googleapis.com/auth/userinfo.profile",
                      ]
                  }] */
            // #swagger.summary = "This endpoint updates the content of a single ward."
            /*  #swagger.parameters['wardId'] = {
                          in: 'path',
                          description: 'A MongoDB ObjectId',
                          required: true
                  } */
            /*  #swagger.parameters['ward'] = {
                          in: 'body',
                          description: 'An updated ward object',
                          schema: { $ref: '#/definitions/Ward' },
                          required: true
                  } */
            try {
                const ward = {
                    name: req.body.name,
                    wardId: req.body.wardId
                };
                let id;
                try {
                    id = new mongodb_1.ObjectId(req.params.wardId);
                }
                catch (err) {
                    /* #swagger.responses[400] = {
                          description: 'An invalid MongoDB ObjectId was provided.'
                  } */
                    res.status(400).json('Please provide a valid ward id.');
                    return;
                }
                yield wards_1.default.replaceOne({ _id: id }, ward, { runValidators: true }).catch((err) => {
                    /* #swagger.responses[422] = {
                          description: 'The provided ward object does not pass validation.'
                  } */
                    res.status(422).json({
                        error: err.message
                    });
                });
                /* #swagger.responses[204] = {
                            description: 'The specified ward has been edited.',
                    } */
                res.status(204).json(ward);
            }
            catch (err) {
                /* #swagger.responses[500] = {
                        description: 'An error occured.'
                } */
                res.status(500).json(err);
            }
        });
    },
};
exports.default = wards;
