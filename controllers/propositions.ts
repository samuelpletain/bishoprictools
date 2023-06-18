import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import Proposition from '../models/propositions';

const propositions = {
  async getAllPropositions(req: Request, res: Response) {
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
    // #swagger.summary = "This endpoint returns the details of a single proposition."
    /*  #swagger.parameters['postId'] = {
                  in: 'path',
                  description: 'A MongoDB ObjectId',
                  required: true
          } */
    try {
      let id: ObjectId;
      try {
        id = new ObjectId(req.params.postId);
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
        content: req.body.content,
        authorId: req.body.authorId
      });
      if (req.body.tags) {
        Object.assign(proposition, { tags: req.body.tags });
      }
      if (req.body.replyTo) {
        Object.assign(proposition, { replyTo: req.body.replyTo });
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
    /*  #swagger.parameters['postId'] = {
                  in: 'path',
                  description: 'A MongoDB ObjectId',
                  required: true
          } */
    try {
      let id: ObjectId;
      try {
        id = new ObjectId(req.params.postId);
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
    /*  #swagger.parameters['postId'] = {
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
        content: req.body.content,
        authorId: req.body.authorId
      };
      if (req.body.tags) {
        Object.assign(proposition, { tags: req.body.tags });
      }
      if (req.body.likes) {
        Object.assign(proposition, { likes: req.body.likes });
      }
      if (req.body.replyTo) {
        Object.assign(proposition, { replyTo: req.body.replyTo });
      }
      if (req.body.createdOn) {
        Object.assign(proposition, { createdOn: req.body.createdOn });
      }
      if (req.body.editedAt) {
        Object.assign(proposition, { editedAt: req.body.editedAt });
      }
      let id: ObjectId;
      try {
        id = new ObjectId(req.params.postId);
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
      res.status(204).send();
    } catch (err) {
      /* #swagger.responses[500] = {
              description: 'An error occured.'
      } */
      res.status(500).json(err);
    }
  },

  async getPropositionsByWardId(req: Request, res: Response) {
  },

  async getPropositionsByStakeId(req: Request, res: Response) {
  },

  async getPropositionsByOrgId(req: Request, res: Response) {
  },

  async getPropositionsByCallingId(req: Request, res: Response) {
  }
};

export default propositions;
