import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import Ward from '../models/wards';
// import Organization from '../models/organizations';

const wards = {
  async getAllWards(req: Request, res: Response) {
    /* #swagger.security = [{
              "oAuthSample": [
                  "https://www.googleapis.com/auth/userinfo.profile",
              ]
          }] */
    // #swagger.summary = "This endpoint returns a list of all the wards in the database."
    try {
      const wards = await Ward.find() as Ward[];
      /* #swagger.responses[200] = {
              description: 'Returns an array of ward objects.'
      } */
      res.status(200).json(wards);
    } catch (err) {
      /* #swagger.responses[500] = {
              description: 'An error occured.'
      } */
      res.status(500).json(err);
    }
  },

  async getWardById(req: Request, res: Response) {
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
      let id: ObjectId;
      try {
        id = new ObjectId(req.params.wardId);
      } catch (err) {
        /* #swagger.responses[400] = {
              description: 'An invalid MongoDB ObjectId was provided.'
      } */
        res.status(400).json('Please provide a valid ward id.');
        return;
      }
      const ward = await Ward.findOne(id) as Ward;
      /* #swagger.responses[200] = {
              description: 'Returns a ward object.'
      } */
      res.status(200).json(ward);
    } catch (err) {
      /* #swagger.responses[500] = {
              description: 'An error occured.'
      } */
      res.status(500).json(err);
    }
  },

  async createWard(req: Request, res: Response) {
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
      const ward = new Ward({
        name: req.body.name,
        wardId: req.body.wardId
      });
      const newWard = await ward.save().catch((err: Error) => {
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
    } catch (err) {
      /* #swagger.responses[500] = {
              description: 'An error occured.'
      } */
      res.status(500).json(err);
    }
  },

  async deleteWardById(req: Request, res: Response) {
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
      let id: ObjectId;
      try {
        id = new ObjectId(req.params.wardId);
      } catch (err) {
        /* #swagger.responses[400] = {
              description: 'An invalid MongoDB ObjectId was provided.'
      } */
        res.status(400).json('Please provide a valid ward id.');
        return;
      }
      await Ward.deleteOne(id);
      /* #swagger.responses[200] = {
              description: 'The specified ward has been deleted.',
      } */
      res.status(200).send();
    } catch (err) {
      /* #swagger.responses[500] = {
              description: 'An error occured.'
      } */
      res.status(500).json(err);
    }
  },

  async updateWardById(req: Request, res: Response) {
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
      }
      let id: ObjectId;
      try {
        id = new ObjectId(req.params.wardId);
      } catch (err) {
        /* #swagger.responses[400] = {
              description: 'An invalid MongoDB ObjectId was provided.'
      } */
        res.status(400).json('Please provide a valid ward id.');
        return;
      }
      await Ward.replaceOne({ _id: id }, ward, { runValidators: true }).catch((err: Error) => {
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
    } catch (err) {
      /* #swagger.responses[500] = {
              description: 'An error occured.'
      } */
      res.status(500).json(err);
    }
  },
};

export default wards;