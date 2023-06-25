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
const members_1 = __importDefault(require("../models/members"));
// import Organization from '../models/organizations';
const members = {
    getAllMembers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* #swagger.security = [{
                      "oAuthSample": [
                          "https://www.googleapis.com/auth/userinfo.profile",
                      ]
                  }] */
            // #swagger.summary = "This endpoint returns a list of all the members in the database."
            try {
                const members = yield members_1.default.find();
                /* #swagger.responses[200] = {
                        description: 'Returns an array of member objects.'
                } */
                res.status(200).json(members);
            }
            catch (err) {
                /* #swagger.responses[500] = {
                        description: 'An error occured.'
                } */
                res.status(500).json(err);
            }
        });
    },
    getMemberById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* #swagger.security = [{
                      "oAuthSample": [
                          "https://www.googleapis.com/auth/userinfo.profile",
                      ]
                  }] */
            // #swagger.summary = "This endpoint returns the details of a single member."
            /*  #swagger.parameters['wardId'] = {
                          in: 'path',
                          description: 'A MongoDB ObjectId',
                          required: true
                  } */
            try {
                let id;
                try {
                    id = new mongodb_1.ObjectId(req.params.memberId);
                }
                catch (err) {
                    /* #swagger.responses[400] = {
                          description: 'An invalid MongoDB ObjectId was provided.'
                  } */
                    res.status(400).json('Please provide a valid member id.');
                    return;
                }
                const member = yield members_1.default.findOne(id);
                /* #swagger.responses[200] = {
                        description: 'Returns a member object.'
                } */
                res.status(200).json(member);
            }
            catch (err) {
                /* #swagger.responses[500] = {
                        description: 'An error occured.'
                } */
                res.status(500).json(err);
            }
        });
    },
    createMember(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* #swagger.security = [{
                      "oAuthSample": [
                          "https://www.googleapis.com/auth/userinfo.profile",
                      ]
                  }] */
            // #swagger.summary = "This endpoint creates a member."
            /*  #swagger.parameters['newMember'] = {
                          in: 'body',
                          description: 'An object representing a new member',
                          required: true,
                          schema: { $ref: '#/definitions/Member' }
                  } */
            try {
                const member = new members_1.default({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName
                });
                if (req.body.email) {
                    Object.assign(member, { email: req.body.email });
                }
                if (req.body.password) {
                    Object.assign(member, { password: req.body.password });
                }
                if (req.body.admin) {
                    Object.assign(member, { admin: req.body.admin });
                }
                if (req.body.ageGroup) {
                    Object.assign(member, { ageGroup: req.body.ageGroup });
                }
                if (req.body.wardId) {
                    Object.assign(member, { wardId: req.body.wardId });
                }
                if (req.body.organizations) {
                    Object.assign(member, { organizations: req.body.organizations });
                }
                const newMember = yield member.save().catch((err) => {
                    /* #swagger.responses[422] = {
                          description: 'The provided member object does not pass validation.'
                  } */
                    res.status(422).json({
                        error: err.message
                    });
                });
                /* #swagger.responses[201] = {
                        description: 'Returns an object containing the result of the request and a string representing a MongoDB ObjectId.',
                        schema: { $ref: '#/definitions/Member' }
                } */
                res.status(201).json(newMember);
            }
            catch (err) {
                /* #swagger.responses[500] = {
                        description: 'An error occured.'
                } */
                res.status(500).json(err);
            }
        });
    },
    deleteMemberById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* #swagger.security = [{
                      "oAuthSample": [
                          "https://www.googleapis.com/auth/userinfo.profile",
                      ]
                  }] */
            // #swagger.summary = "This endpoint deletes a single member."
            /*  #swagger.parameters['wardId'] = {
                          in: 'path',
                          description: 'A MongoDB ObjectId',
                          required: true
                  } */
            try {
                let id;
                try {
                    id = new mongodb_1.ObjectId(req.params.memberId);
                }
                catch (err) {
                    /* #swagger.responses[400] = {
                          description: 'An invalid MongoDB ObjectId was provided.'
                  } */
                    res.status(400).json('Please provide a valid member id.');
                    return;
                }
                yield members_1.default.deleteOne(id);
                /* #swagger.responses[200] = {
                        description: 'The specified member has been deleted.',
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
    updateMemberById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* #swagger.security = [{
                      "oAuthSample": [
                          "https://www.googleapis.com/auth/userinfo.profile",
                      ]
                  }] */
            // #swagger.summary = "This endpoint updates the content of a single member."
            /*  #swagger.parameters['wardId'] = {
                          in: 'path',
                          description: 'A MongoDB ObjectId',
                          required: true
                  } */
            /*  #swagger.parameters['member'] = {
                          in: 'body',
                          description: 'An updated member object',
                          schema: { $ref: '#/definitions/Member' },
                          required: true
                  } */
            try {
                const member = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName
                };
                if (req.body.email) {
                    Object.assign(member, { email: req.body.email });
                }
                if (req.body.password) {
                    Object.assign(member, { password: req.body.password });
                }
                if (req.body.admin) {
                    Object.assign(member, { admin: req.body.admin });
                }
                if (req.body.ageGroup) {
                    Object.assign(member, { ageGroup: req.body.ageGroup });
                }
                if (req.body.wardId) {
                    Object.assign(member, { wardId: req.body.wardId });
                }
                if (req.body.organizations) {
                    Object.assign(member, { organizations: req.body.organizations });
                }
                let id;
                try {
                    id = new mongodb_1.ObjectId(req.params.memberId);
                }
                catch (err) {
                    /* #swagger.responses[400] = {
                          description: 'An invalid MongoDB ObjectId was provided.'
                  } */
                    res.status(400).json('Please provide a valid member id.');
                    return;
                }
                yield members_1.default.replaceOne({ _id: id }, member, { runValidators: true }).catch((err) => {
                    /* #swagger.responses[422] = {
                          description: 'The provided member object does not pass validation.'
                  } */
                    res.status(422).json({
                        error: err.message
                    });
                });
                /* #swagger.responses[204] = {
                            description: 'The specified member has been edited.',
                    } */
                res.status(204).json(member);
            }
            catch (err) {
                /* #swagger.responses[500] = {
                        description: 'An error occured.'
                } */
                res.status(500).json(err);
            }
        });
    },
    getMembersByWardId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /* #swagger.security = [{
                      "oAuthSample": [
                          "https://www.googleapis.com/auth/userinfo.profile",
                      ]
                  }] */
            // #swagger.summary = "This endpoint returns all members for a given ward."
            /*  #swagger.parameters['newMember'] = {
                          in: 'body',
                          description: 'An object representing a new member',
                          required: true,
                          schema: [{ $ref: '#/definitions/Member' }]
                  } */
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
                    res.status(400).json('Please provide a valid member id.');
                    return;
                }
                const members = yield members_1.default.find({ wardId: id });
                res.status(200).json(members);
            }
            catch (err) {
                /* #swagger.responses[500] = {
                        description: 'An error occured.'
                } */
                res.status(500).json(err);
            }
        });
    },
    //async getMembersByStakeId(req: Request, res: Response) {
    /* #swagger.security = [{
              "oAuthSample": [
                  "https://www.googleapis.com/auth/userinfo.profile",
              ]
          }] */
    // #swagger.summary = "This endpoint returns all members for a given stake."
    /*  #swagger.parameters['newProposition'] = {
                  in: 'body',
                  description: 'An object representing a new member',
                  required: true,
                  schema: [{ $ref: '#/definitions/Member' }]
          } */
    /*  #swagger.parameters['stakeId'] = {
            in: 'path',
            description: 'A MongoDB ObjectId',
            required: true
    } */
    /* try {
      let id: ObjectId;
      try {
        id = new ObjectId(req.params.stakeId);
      } catch (err) { */
    /* #swagger.responses[400] = {
          description: 'An invalid MongoDB ObjectId was provided.'
  } */
    /*  res.status(400).json('Please provide a valid member id.');
     return;
   }
   const memberIds = await Member.find({ stakeId: id }).distinct('_id');
   const members = await Member.find({
     memberId: {
       $in: memberIds
     }
   }) as Member[];
   res.status(200).json(members);
  } catch (err) { */
    /* #swagger.responses[500] = {
            description: 'An error occured.'
    } */
    /* res.status(500).json(err);
  }
  } */
};
exports.default = members;
