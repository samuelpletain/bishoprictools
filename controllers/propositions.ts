import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import Proposition from '../models/propositions';
import Member from '../models/members';

const propositions = {
  async getAllPropositions(req: Request, res: Response) {
    /* #swagger.security = [{
              "oAuthSample": [
                  "https://www.googleapis.com/auth/userinfo.profile",
              ]
          }] */
    // #swagger.summary = "This endpoint returns a list of all the propositions in the database."
    try {
      const propositions = await Proposition.find() as Proposition[];
      /* #swagger.responses[200] = {
              description: 'Returns an array of proposition objects.',
              schema: [{ $ref: '#/definitions/Proposition' }]
      } */
      res.status(200).json(propositions);
    } catch (err) {
      /* #swagger.responses[500] = {
              description: 'An error occured.'
      } */
      res.status(500).json(err);
    }
  },

  async getPropositionById(req: Request, res: Response) {
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
      let id: ObjectId;
      try {
        id = new ObjectId(req.params.propositionId);
      } catch (err) {
        /* #swagger.responses[400] = {
              description: 'An invalid MongoDB ObjectId was provided.'
      } */
        res.status(400).json('Please provide a valid proposition id.');
        return;
      }
      const proposition = await Proposition.findOne(id) as Proposition;
      /* #swagger.responses[200] = {
              description: 'Returns a proposition object.',
              schema: { $ref: '#/definitions/Proposition' },
      } */
      res.status(200).json(proposition);
    } catch (err) {
      /* #swagger.responses[500] = {
              description: 'An error occured.'
      } */
      res.status(500).json(err);
    }
  },

  async createProposition(req: Request, res: Response) {
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
      const proposition = new Proposition({
        memberId: req.body.memberId,
        callingId: req.body.callingId
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
      const newProposition = await proposition.save().catch((err: Error) => {
        /* #swagger.responses[422] = {
              description: 'The provided proposition object does not pass validation.'
      } */
        res.status(422).json({
          error: err.message
        });
      });
      /* #swagger.responses[201] = {
              description: 'Returns an object containing the result of the request and a string representing a MongoDB ObjectId.',
              schema: {
                      acknowledged: true,
                      insertedId: "643f75ca2cec8ebd2a3cc16c"
                  }
      } */
      res.status(201).json(newProposition);
    } catch (err) {
      /* #swagger.responses[500] = {
              description: 'An error occured.'
      } */
      res.status(500).json(err);
    }
  },

  async deletePropositionById(req: Request, res: Response) {
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
      let id: ObjectId;
      try {
        id = new ObjectId(req.params.propositionId);
      } catch (err) {
        /* #swagger.responses[400] = {
              description: 'An invalid MongoDB ObjectId was provided.'
      } */
        res.status(400).json('Please provide a valid proposition id.');
        return;
      }
      await Proposition.deleteOne(id);
      /* #swagger.responses[200] = {
              description: 'The specified proposition has been deleted.',
      } */
      res.status(200).send();
    } catch (err) {
      /* #swagger.responses[500] = {
              description: 'An error occured.'
      } */
      res.status(500).json(err);
    }
  },

  async updatePropositionById(req: Request, res: Response) {
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
        callingId: req.body.callingId
      }
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
      console.log(proposition)
      let id: ObjectId;
      try {
        id = new ObjectId(req.params.propositionId);
      } catch (err) {
        /* #swagger.responses[400] = {
              description: 'An invalid MongoDB ObjectId was provided.'
      } */
        res.status(400).json('Please provide a valid proposition id.');
        return;
      }
      await Proposition.replaceOne({ _id: id }, proposition, { runValidators: true }).catch((err: Error) => {
        /* #swagger.responses[422] = {
              description: 'The provided proposition object does not pass validation.'
      } */
        res.status(422).json({
          error: err.message
        });
      });
      /* #swagger.responses[204] = {
                  description: 'The specified proposition has been edited.',
          } */
      res.status(204).json(proposition);
    } catch (err) {
      /* #swagger.responses[500] = {
              description: 'An error occured.'
      } */
      res.status(500).json(err);
    }
  },

  async getPropositionsByWardId(req: Request, res: Response) {
    /* #swagger.security = [{
              "oAuthSample": [
                  "https://www.googleapis.com/auth/userinfo.profile",
              ]
          }] */
    // #swagger.summary = "This endpoint returns all propositions for a given ward."
    /*  #swagger.parameters['newProposition'] = {
                  in: 'body',
                  description: 'An object representing a new proposition',
                  required: true,
                  schema: [{ $ref: '#/definitions/Proposition' }]
          } */
    /*  #swagger.parameters['wardId'] = {
            in: 'path',
            description: 'A MongoDB ObjectId',
            required: true
    } */
    try {
      let id: ObjectId;
      try {
        id = new ObjectId(req.params.wardId);
      } catch (err) {
        /* #swagger.responses[400] = {
              description: 'An invalid MongoDB ObjectId was provided.'
      } */
        res.status(400).json('Please provide a valid proposition id.');
        return;
      }
      const memberIds = await Member.find({ wardId: id }).distinct('_id');
      const propositions = await Proposition.find({
        memberId: {
          $in: memberIds
        }
      }) as Proposition[];
      res.status(200).json(propositions);
    } catch (err) {
      /* #swagger.responses[500] = {
              description: 'An error occured.'
      } */
      res.status(500).json(err);
    }
  },

  async getPropositionsByStakeId(req: Request, res: Response) {
    /* #swagger.security = [{
              "oAuthSample": [
                  "https://www.googleapis.com/auth/userinfo.profile",
              ]
          }] */
    // #swagger.summary = "This endpoint returns all propositions for a given stake."
    /*  #swagger.parameters['newProposition'] = {
                  in: 'body',
                  description: 'An object representing a new proposition',
                  required: true,
                  schema: [{ $ref: '#/definitions/Proposition' }]
          } */
    /*  #swagger.parameters['stakeId'] = {
            in: 'path',
            description: 'A MongoDB ObjectId',
            required: true
    } */
    try {
      let id: ObjectId;
      try {
        id = new ObjectId(req.params.stakeId);
      } catch (err) {
        /* #swagger.responses[400] = {
              description: 'An invalid MongoDB ObjectId was provided.'
      } */
        res.status(400).json('Please provide a valid proposition id.');
        return;
      }
      const memberIds = await Member.find({ stakeId: id }).distinct('_id');
      const propositions = await Proposition.find({
        memberId: {
          $in: memberIds
        }
      }) as Proposition[];
      res.status(200).json(propositions);
    } catch (err) {
      /* #swagger.responses[500] = {
              description: 'An error occured.'
      } */
      res.status(500).json(err);
    }
  }
};

export default propositions;
