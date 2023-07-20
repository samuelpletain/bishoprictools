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
const callings_1 = __importDefault(require("../models/callings"));
// import Organization from '../models/organizations';
const callings = {
    getAllCallings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* #swagger.security = [{
                      "oAuthSample": [
                          "https://www.googleapis.com/auth/userinfo.profile",
                      ]
                  }] */
            // #swagger.summary = "This endpoint returns a list of all the callings in the database."
            try {
                const callings = (yield callings_1.default.find());
                /* #swagger.responses[200] = {
                        description: 'Returns an array of calling objects.',
                  schema: [{ $ref: '#/definitions/Calling' }]
                } */
                res.status(200).json(callings);
            }
            catch (err) {
                /* #swagger.responses[500] = {
                        description: 'An error occured.'
                } */
                res.status(500).json(err);
            }
        });
    },
    getCallingById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* #swagger.security = [{
                      "oAuthSample": [
                          "https://www.googleapis.com/auth/userinfo.profile",
                      ]
                  }] */
            // #swagger.summary = "This endpoint returns the details of a single calling."
            /*  #swagger.parameters['callingId'] = {
                          in: 'path',
                          description: 'A MongoDB ObjectId',
                          required: true
                  } */
            try {
                let id;
                try {
                    id = new mongodb_1.ObjectId(req.params.callingId);
                }
                catch (err) {
                    /* #swagger.responses[400] = {
                          description: 'An invalid MongoDB ObjectId was provided.'
                  } */
                    res.status(400).json('Please provide a valid calling id.');
                    return;
                }
                const calling = (yield callings_1.default.findOne(id));
                /* #swagger.responses[200] = {
                        description: 'Returns a calling object.',
                  schema: { $ref: '#/definitions/Calling' }
                } */
                res.status(200).json(calling);
            }
            catch (err) {
                /* #swagger.responses[500] = {
                        description: 'An error occured.'
                } */
                res.status(500).json(err);
            }
        });
    },
    createCalling(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* #swagger.security = [{
                      "oAuthSample": [
                          "https://www.googleapis.com/auth/userinfo.profile",
                      ]
                  }] */
            // #swagger.summary = "This endpoint creates a calling."
            /*  #swagger.parameters['newCalling'] = {
                          in: 'body',
                          description: 'An object representing a new calling',
                          required: true,
                          schema: { $ref: '#/definitions/Calling' }
                  } */
            try {
                const calling = new callings_1.default({
                    name: req.body.name,
                    organizationId: req.body.organizationId,
                });
                const newCalling = yield calling.save().catch((err) => {
                    /* #swagger.responses[422] = {
                          description: 'The provided calling object does not pass validation.'
                  } */
                    res.status(422).json({
                        error: err.message,
                    });
                });
                /* #swagger.responses[201] = {
                        description: 'Returns an object containing the result of the request and a string representing a MongoDB ObjectId.',
                        schema: { $ref: '#/definitions/Calling' }
                } */
                res.status(201).json(newCalling);
            }
            catch (err) {
                /* #swagger.responses[500] = {
                        description: 'An error occured.'
                } */
                res.status(500).json(err);
            }
        });
    },
    deleteCallingById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* #swagger.security = [{
                      "oAuthSample": [
                          "https://www.googleapis.com/auth/userinfo.profile",
                      ]
                  }] */
            // #swagger.summary = "This endpoint deletes a single calling."
            /*  #swagger.parameters['callingId'] = {
                          in: 'path',
                          description: 'A MongoDB ObjectId',
                          required: true
                  } */
            try {
                let id;
                try {
                    id = new mongodb_1.ObjectId(req.params.callingId);
                }
                catch (err) {
                    /* #swagger.responses[400] = {
                          description: 'An invalid MongoDB ObjectId was provided.'
                  } */
                    res.status(400).json('Please provide a valid calling id.');
                    return;
                }
                yield callings_1.default.deleteOne(id);
                /* #swagger.responses[200] = {
                        description: 'The specified calling has been deleted.',
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
    updateCallingById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* #swagger.security = [{
                      "oAuthSample": [
                          "https://www.googleapis.com/auth/userinfo.profile",
                      ]
                  }] */
            // #swagger.summary = "This endpoint updates the content of a single calling."
            /*  #swagger.parameters['callingId'] = {
                          in: 'path',
                          description: 'A MongoDB ObjectId',
                          required: true
                  } */
            /*  #swagger.parameters['calling'] = {
                          in: 'body',
                          description: 'An updated calling object',
                          schema: { $ref: '#/definitions/Calling' },
                          required: true
                  } */
            try {
                const calling = {
                    name: req.body.name,
                    organizationId: req.body.organizationId,
                };
                let id;
                try {
                    id = new mongodb_1.ObjectId(req.params.callingId);
                }
                catch (err) {
                    /* #swagger.responses[400] = {
                          description: 'An invalid MongoDB ObjectId was provided.'
                  } */
                    res.status(400).json('Please provide a valid calling id.');
                    return;
                }
                yield callings_1.default.replaceOne({ _id: id }, calling, {
                    runValidators: true,
                }).catch((err) => {
                    /* #swagger.responses[422] = {
                          description: 'The provided calling object does not pass validation.'
                  } */
                    res.status(422).json({
                        error: err.message,
                    });
                });
                /* #swagger.responses[204] = {
                            description: 'The specified calling has been edited.',
                    } */
                res.status(204).json(calling);
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
exports.default = callings;
