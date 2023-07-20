import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import Calling from '../models/callings';
// import Organization from '../models/organizations';

const callings = {
  async getAllCallings(req: Request, res: Response) {
    /* #swagger.security = [{
              "oAuthSample": [
                  "https://www.googleapis.com/auth/userinfo.profile",
              ]
          }] */
    // #swagger.summary = "This endpoint returns a list of all the callings in the database."
    try {
      const callings = (await Calling.find()) as Calling[];
      /* #swagger.responses[200] = {
              description: 'Returns an array of calling objects.',
        schema: [{ $ref: '#/definitions/Calling' }]
      } */
      res.status(200).json(callings);
    } catch (err) {
      /* #swagger.responses[500] = {
              description: 'An error occured.'
      } */
      res.status(500).json(err);
    }
  },

  async getCallingById(req: Request, res: Response) {
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
      let id: ObjectId;
      try {
        id = new ObjectId(req.params.callingId);
      } catch (err) {
        /* #swagger.responses[400] = {
              description: 'An invalid MongoDB ObjectId was provided.'
      } */
        res.status(400).json('Please provide a valid calling id.');
        return;
      }
      const calling = (await Calling.findOne(id)) as Calling;
      /* #swagger.responses[200] = {
              description: 'Returns a calling object.',
        schema: { $ref: '#/definitions/Calling' }
      } */
      res.status(200).json(calling);
    } catch (err) {
      /* #swagger.responses[500] = {
              description: 'An error occured.'
      } */
      res.status(500).json(err);
    }
  },

  async createCalling(req: Request, res: Response) {
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
      const calling = new Calling({
        name: req.body.name,
        organizationId: req.body.organizationId,
      });
      const newCalling = await calling.save().catch((err: Error) => {
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
    } catch (err) {
      /* #swagger.responses[500] = {
              description: 'An error occured.'
      } */
      res.status(500).json(err);
    }
  },

  async deleteCallingById(req: Request, res: Response) {
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
      let id: ObjectId;
      try {
        id = new ObjectId(req.params.callingId);
      } catch (err) {
        /* #swagger.responses[400] = {
              description: 'An invalid MongoDB ObjectId was provided.'
      } */
        res.status(400).json('Please provide a valid calling id.');
        return;
      }
      await Calling.deleteOne(id);
      /* #swagger.responses[200] = {
              description: 'The specified calling has been deleted.',
      } */
      res.status(200).send();
    } catch (err) {
      /* #swagger.responses[500] = {
              description: 'An error occured.'
      } */
      res.status(500).json(err);
    }
  },

  async updateCallingById(req: Request, res: Response) {
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
      let id: ObjectId;
      try {
        id = new ObjectId(req.params.callingId);
      } catch (err) {
        /* #swagger.responses[400] = {
              description: 'An invalid MongoDB ObjectId was provided.'
      } */
        res.status(400).json('Please provide a valid calling id.');
        return;
      }
      await Calling.replaceOne({ _id: id }, calling, {
        runValidators: true,
      }).catch((err: Error) => {
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
    } catch (err) {
      /* #swagger.responses[500] = {
              description: 'An error occured.'
      } */
      res.status(500).json(err);
    }
  },
};

export default callings;
