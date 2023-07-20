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
const stakes_1 = __importDefault(require("../models/stakes"));
// import Organization from '../models/organizations';
const stakes = {
    getAllStakes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* #swagger.security = [{
                      "oAuthSample": [
                          "https://www.googleapis.com/auth/userinfo.profile",
                      ]
                  }] */
            // #swagger.summary = "This endpoint returns a list of all the stakes in the database."
            try {
                const stakes = (yield stakes_1.default.find());
                /* #swagger.responses[200] = {
                        description: 'Returns an array of stake objects.',
                        schema: [{ $ref: '#/definitions/Stake' }]
                } */
                res.status(200).json(stakes);
            }
            catch (err) {
                /* #swagger.responses[500] = {
                        description: 'An error occured.'
                } */
                res.status(500).json(err);
            }
        });
    },
    getStakeById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* #swagger.security = [{
                      "oAuthSample": [
                          "https://www.googleapis.com/auth/userinfo.profile",
                      ]
                  }] */
            // #swagger.summary = "This endpoint returns the details of a single stake."
            /*  #swagger.parameters['stakeId'] = {
                          in: 'path',
                          description: 'A MongoDB ObjectId',
                          required: true
                  } */
            try {
                let id;
                try {
                    id = new mongodb_1.ObjectId(req.params.stakeId);
                }
                catch (err) {
                    /* #swagger.responses[400] = {
                          description: 'An invalid MongoDB ObjectId was provided.'
                  } */
                    res.status(400).json('Please provide a valid stake id.');
                    return;
                }
                const stake = (yield stakes_1.default.findOne(id));
                /* #swagger.responses[200] = {
                        description: 'Returns a stake object.',
                        schema: { $ref: '#/definitions/Stake' }
                } */
                res.status(200).json(stake);
            }
            catch (err) {
                /* #swagger.responses[500] = {
                        description: 'An error occured.'
                } */
                res.status(500).json(err);
            }
        });
    },
    createStake(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* #swagger.security = [{
                      "oAuthSample": [
                          "https://www.googleapis.com/auth/userinfo.profile",
                      ]
                  }] */
            // #swagger.summary = "This endpoint creates a stake."
            /*  #swagger.parameters['newStake'] = {
                          in: 'body',
                          description: 'An object representing a new stake',
                          required: true,
                          schema: { $ref: '#/definitions/Stake' }
                  } */
            try {
                const stake = new stakes_1.default({
                    name: req.body.name,
                    stakeId: req.body.stakeId,
                });
                const newStake = yield stake.save().catch((err) => {
                    /* #swagger.responses[422] = {
                          description: 'The provided stake object does not pass validation.'
                  } */
                    res.status(422).json({
                        error: err.message,
                    });
                });
                /* #swagger.responses[201] = {
                        description: 'Returns an object containing the result of the request and a string representing a MongoDB ObjectId.',
                        schema: { $ref: '#/definitions/Stake' }
                } */
                res.status(201).json(newStake);
            }
            catch (err) {
                /* #swagger.responses[500] = {
                        description: 'An error occured.'
                } */
                res.status(500).json(err);
            }
        });
    },
    deleteStakeById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* #swagger.security = [{
                      "oAuthSample": [
                          "https://www.googleapis.com/auth/userinfo.profile",
                      ]
                  }] */
            // #swagger.summary = "This endpoint deletes a single stake."
            /*  #swagger.parameters['stakeId'] = {
                          in: 'path',
                          description: 'A MongoDB ObjectId',
                          required: true
                  } */
            try {
                let id;
                try {
                    id = new mongodb_1.ObjectId(req.params.stakeId);
                }
                catch (err) {
                    /* #swagger.responses[400] = {
                          description: 'An invalid MongoDB ObjectId was provided.'
                  } */
                    res.status(400).json('Please provide a valid stake id.');
                    return;
                }
                yield stakes_1.default.deleteOne(id);
                /* #swagger.responses[200] = {
                        description: 'The specified stake has been deleted.',
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
    updateStakeById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* #swagger.security = [{
                      "oAuthSample": [
                          "https://www.googleapis.com/auth/userinfo.profile",
                      ]
                  }] */
            // #swagger.summary = "This endpoint updates the content of a single stake."
            /*  #swagger.parameters['stakeId'] = {
                          in: 'path',
                          description: 'A MongoDB ObjectId',
                          required: true
                  } */
            /*  #swagger.parameters['stake'] = {
                          in: 'body',
                          description: 'An updated stake object',
                          schema: { $ref: '#/definitions/Stake' },
                          required: true
                  } */
            try {
                const stake = {
                    name: req.body.name,
                    stakeId: req.body.stakeId,
                };
                let id;
                try {
                    id = new mongodb_1.ObjectId(req.params.stakeId);
                }
                catch (err) {
                    /* #swagger.responses[400] = {
                          description: 'An invalid MongoDB ObjectId was provided.'
                  } */
                    res.status(400).json('Please provide a valid stake id.');
                    return;
                }
                yield stakes_1.default.replaceOne({ _id: id }, stake, { runValidators: true }).catch((err) => {
                    /* #swagger.responses[422] = {
                        description: 'The provided stake object does not pass validation.'
                } */
                    res.status(422).json({
                        error: err.message,
                    });
                });
                /* #swagger.responses[204] = {
                            description: 'The specified stake has been edited.',
                    } */
                res.status(204).json(stake);
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
exports.default = stakes;
