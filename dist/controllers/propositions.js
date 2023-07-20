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
const propositions_1 = __importDefault(require("../models/propositions"));
const members_1 = __importDefault(require("../models/members"));
const callings_1 = __importDefault(require("../models/callings"));
const wards_1 = __importDefault(require("../models/wards"));
const propositions = {
    getAllPropositions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* #swagger.security = [{
                      "oAuthSample": [
                          "https://www.googleapis.com/auth/userinfo.profile",
                      ]
                  }] */
            // #swagger.summary = "This endpoint returns a list of all the propositions in the database."
            try {
                const propositions = (yield propositions_1.default.find());
                /* #swagger.responses[200] = {
                        description: 'Returns an array of proposition objects.',
                        schema: [{ $ref: '#/definitions/Proposition' }]
                } */
                res.status(200).json(propositions);
            }
            catch (err) {
                /* #swagger.responses[500] = {
                        description: 'An error occured.'
                } */
                res.status(500).json(err);
            }
        });
    },
    getPropositionById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* #swagger.security = [{
                      "oAuthSample": [
                          "https://www.googleapis.com/auth/userinfo.profile",
                      ]
                  }] */
            // #swagger.summary = "This endpoint returns the details of a single proposition."
            /*  #swagger.parameters['propositionId'] = {
                          in: 'path',
                          description: 'A MongoDB ObjectId',
                          required: true
                  } */
            try {
                let id;
                try {
                    id = new mongodb_1.ObjectId(req.params.propositionId);
                }
                catch (err) {
                    /* #swagger.responses[400] = {
                          description: 'An invalid MongoDB ObjectId was provided.'
                  } */
                    res.status(400).json('Please provide a valid proposition id.');
                    return;
                }
                const proposition = (yield propositions_1.default.findOne(id));
                /* #swagger.responses[200] = {
                        description: 'Returns a proposition object.',
                        schema: { $ref: '#/definitions/Proposition' },
                } */
                res.status(200).json(proposition);
            }
            catch (err) {
                /* #swagger.responses[500] = {
                        description: 'An error occured.'
                } */
                res.status(500).json(err);
            }
        });
    },
    createProposition(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* #swagger.security = [{
                      "oAuthSample": [
                          "https://www.googleapis.com/auth/userinfo.profile",
                      ]
                  }] */
            // #swagger.summary = "This endpoint creates a proposition."
            /*  #swagger.parameters['newProposition'] = {
                          in: 'body',
                          description: 'An object representing a new proposition',
                          required: true,
                          schema: {
                            $content: 'Jhon Doe',
                            $authorId: '6465a918462368509b563b23',
                            tags: ["Technology", "Innovation", "Programming"],
                            replyTo: "6465abf6462368509b563b30"
                          }
                  } */
            try {
                const proposition = new propositions_1.default({
                    memberId: req.body.memberId,
                    callingId: req.body.callingId,
                });
                if (req.body.leaderApproval) {
                    Object.assign(proposition, { leaderApproval: req.body.leaderApproval });
                }
                if (req.body.contactedOn) {
                    Object.assign(proposition, { contactedOn: req.body.contactedOn });
                }
                if (req.body.interviewDate) {
                    Object.assign(proposition, { interviewDate: req.body.interviewDate });
                }
                if (req.body.interviewed) {
                    Object.assign(proposition, { interviewed: req.body.interviewed });
                }
                if (req.body.accepted) {
                    Object.assign(proposition, { accepted: req.body.accepted });
                }
                if (req.body.sustainedOn) {
                    Object.assign(proposition, { sustainedOn: req.body.sustainedOn });
                }
                if (req.body.setApart) {
                    Object.assign(proposition, { setApart: req.body.setApart });
                }
                if (req.body.realeasedOn) {
                    Object.assign(proposition, { realeasedOn: req.body.realeasedOn });
                }
                const newProposition = yield proposition.save().catch((err) => {
                    /* #swagger.responses[422] = {
                          description: 'The provided proposition object does not pass validation.'
                  } */
                    res.status(422).json({
                        error: err.message,
                    });
                });
                /* #swagger.responses[201] = {
                        description: 'Returns an object containing the result of the request and a string representing a MongoDB ObjectId.',
                        schema: { $ref: '#/definitions/Proposition' }
                } */
                res.status(201).json(newProposition);
            }
            catch (err) {
                /* #swagger.responses[500] = {
                        description: 'An error occured.'
                } */
                res.status(500).json(err);
            }
        });
    },
    deletePropositionById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* #swagger.security = [{
                      "oAuthSample": [
                          "https://www.googleapis.com/auth/userinfo.profile",
                      ]
                  }] */
            // #swagger.summary = "This endpoint deletes a single proposition."
            /*  #swagger.parameters['propositionId'] = {
                          in: 'path',
                          description: 'A MongoDB ObjectId',
                          required: true
                  } */
            try {
                let id;
                try {
                    id = new mongodb_1.ObjectId(req.params.propositionId);
                }
                catch (err) {
                    /* #swagger.responses[400] = {
                          description: 'An invalid MongoDB ObjectId was provided.'
                  } */
                    res.status(400).json('Please provide a valid proposition id.');
                    return;
                }
                yield propositions_1.default.deleteOne(id);
                /* #swagger.responses[200] = {
                        description: 'The specified proposition has been deleted.',
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
    updatePropositionById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* #swagger.security = [{
                      "oAuthSample": [
                          "https://www.googleapis.com/auth/userinfo.profile",
                      ]
                  }] */
            // #swagger.summary = "This endpoint updates the content of a single proposition."
            /*  #swagger.parameters['propositionId'] = {
                          in: 'path',
                          description: 'A MongoDB ObjectId',
                          required: true
                  } */
            /*  #swagger.parameters['proposition'] = {
                          in: 'body',
                          description: 'An updated proposition object',
                          schema: { $ref: '#/definitions/Proposition' },
                          required: true
                  } */
            try {
                const proposition = {
                    memberId: req.body.memberId,
                    callingId: req.body.callingId,
                };
                if (req.body.leaderApproval) {
                    Object.assign(proposition, { leaderApproval: req.body.leaderApproval });
                }
                if (req.body.contactedOn) {
                    Object.assign(proposition, { contactedOn: req.body.contactedOn });
                }
                if (req.body.interviewDate) {
                    Object.assign(proposition, { interviewDate: req.body.interviewDate });
                }
                if (req.body.interviewed) {
                    Object.assign(proposition, { interviewed: req.body.interviewed });
                }
                if (req.body.accepted) {
                    Object.assign(proposition, { accepted: req.body.accepted });
                }
                if (req.body.sustainedOn) {
                    Object.assign(proposition, { sustainedOn: req.body.sustainedOn });
                }
                if (req.body.setApart) {
                    Object.assign(proposition, { setApart: req.body.setApart });
                }
                if (req.body.realeasedOn) {
                    Object.assign(proposition, { realeasedOn: req.body.realeasedOn });
                }
                let id;
                try {
                    id = new mongodb_1.ObjectId(req.params.propositionId);
                }
                catch (err) {
                    /* #swagger.responses[400] = {
                          description: 'An invalid MongoDB ObjectId was provided.'
                  } */
                    res.status(400).json('Please provide a valid proposition id.');
                    return;
                }
                yield propositions_1.default.replaceOne({ _id: id }, proposition, {
                    runValidators: true,
                }).catch((err) => {
                    /* #swagger.responses[422] = {
                          description: 'The provided proposition object does not pass validation.'
                  } */
                    res.status(422).json({
                        error: err.message,
                    });
                });
                /* #swagger.responses[204] = {
                            description: 'The specified proposition has been edited.',
                    } */
                res.status(204).json(proposition);
            }
            catch (err) {
                /* #swagger.responses[500] = {
                        description: 'An error occured.'
                } */
                res.status(500).json(err);
            }
        });
    },
    getPropositionsByWardId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* #swagger.security = [{
                      "oAuthSample": [
                          "https://www.googleapis.com/auth/userinfo.profile",
                      ]
                  }] */
            // #swagger.summary = "This endpoint returns all propositions for a given ward."
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
                const memberIds = yield members_1.default.find({ wardId: id }).distinct('_id');
                const propositions = (yield propositions_1.default.find({
                    memberId: {
                        $in: memberIds,
                    },
                }));
                /* #swagger.responses[200] = {
                        description: 'Returns an array of proposition objects.',
                        schema: [{ $ref: '#/definitions/Proposition' }],
                } */
                res.status(200).json(propositions);
            }
            catch (err) {
                /* #swagger.responses[500] = {
                        description: 'An error occured.'
                } */
                res.status(500).json(err);
            }
        });
    },
    getPropositionsByStakeId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* #swagger.security = [{
                      "oAuthSample": [
                          "https://www.googleapis.com/auth/userinfo.profile",
                      ]
                  }] */
            // #swagger.summary = "This endpoint returns all propositions for a given stake."
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
                    res.status(400).json('Please provide a valid proposition id.');
                    return;
                }
                const wardIds = yield wards_1.default.find({
                    stakeId: id,
                }).distinct('_id');
                const memberIds = yield members_1.default.find({
                    wardId: {
                        $in: wardIds,
                    },
                }).distinct('_id');
                const propositions = (yield propositions_1.default.find({
                    memberId: {
                        $in: memberIds,
                    },
                }));
                /* #swagger.responses[200] = {
                        description: 'Returns an array of proposition objects.',
                        schema: [{ $ref: '#/definitions/Proposition' }],
                } */
                res.status(200).json(propositions);
            }
            catch (err) {
                /* #swagger.responses[500] = {
                        description: 'An error occured.'
                } */
                res.status(500).json(err);
            }
        });
    },
    getWardPropositionsByOrganizationId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* #swagger.security = [{
                      "oAuthSample": [
                          "https://www.googleapis.com/auth/userinfo.profile",
                      ]
                  }] */
            // #swagger.summary = "This endpoint returns the propositions of a given ward that belongs to a given organization."
            /*  #swagger.parameters['wardId'] = {
                          in: 'path',
                          description: 'A MongoDB ObjectId',
                          required: true
                  } */
            /*  #swagger.parameters['organizationId'] = {
                    in: 'path',
                    description: 'A MongoDB ObjectId',
                    required: true
            } */
            try {
                let wardId;
                try {
                    wardId = new mongodb_1.ObjectId(req.params.wardId);
                }
                catch (err) {
                    /* #swagger.responses[400] = {
                          description: 'An invalid MongoDB ObjectId was provided.'
                  } */
                    res.status(400).json('Please provide a valid ward id.');
                    return;
                }
                let orgId;
                try {
                    orgId = new mongodb_1.ObjectId(req.params.organizationId);
                }
                catch (err) {
                    /* #swagger.responses[400] = {
                          description: 'An invalid MongoDB ObjectId was provided.'
                  } */
                    res.status(400).json('Please provide a valid organization id.');
                    return;
                }
                const callingIds = yield callings_1.default.find({ organizationId: orgId }).distinct('_id');
                const memberIds = yield members_1.default.find({ wardId: wardId }).distinct('_id');
                const propositions = (yield propositions_1.default.find({
                    callingId: {
                        $in: callingIds,
                    },
                    memberId: {
                        $in: memberIds,
                    },
                }));
                /* #swagger.responses[200] = {
                        description: 'Returns an array of proposition objects.',
                        schema: [{ $ref: '#/definitions/Proposition' }],
                } */
                res.status(200).json(propositions);
            }
            catch (err) {
                /* #swagger.responses[500] = {
                        description: 'An error occured.'
                } */
                res.status(500).json(err);
            }
        });
    },
    getWardPropositionsByCallingId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* #swagger.security = [{
                      "oAuthSample": [
                          "https://www.googleapis.com/auth/userinfo.profile",
                      ]
                  }] */
            // #swagger.summary = "This endpoint returns the propositions of a given ward for a given calling."
            /*  #swagger.parameters['wardId'] = {
                          in: 'path',
                          description: 'A MongoDB ObjectId',
                          required: true
                  } */
            /*  #swagger.parameters['callingId'] = {
                    in: 'path',
                    description: 'A MongoDB ObjectId',
                    required: true
            } */
            try {
                let wardId;
                try {
                    wardId = new mongodb_1.ObjectId(req.params.wardId);
                }
                catch (err) {
                    /* #swagger.responses[400] = {
                          description: 'An invalid MongoDB ObjectId was provided.'
                  } */
                    res.status(400).json('Please provide a valid ward id.');
                    return;
                }
                let callingId;
                try {
                    callingId = new mongodb_1.ObjectId(req.params.callingId);
                }
                catch (err) {
                    /* #swagger.responses[400] = {
                          description: 'An invalid MongoDB ObjectId was provided.'
                  } */
                    res.status(400).json('Please provide a valid organization id.');
                    return;
                }
                const memberIds = yield members_1.default.find({ wardId: wardId }).distinct('_id');
                const propositions = (yield propositions_1.default.find({
                    callingId: callingId,
                    memberId: {
                        $in: memberIds,
                    },
                }));
                /* #swagger.responses[200] = {
                        description: 'Returns an array of proposition objects.',
                        schema: [{ $ref: '#/definitions/Proposition' }],
                } */
                res.status(200).json(propositions);
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
exports.default = propositions;
