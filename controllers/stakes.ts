import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import Stake from '../models/stakes';
// import Organization from '../models/organizations';

const stakes = {
  async getAllStakes(req: Request, res: Response) {
    /* #swagger.security = [{
              "oAuthSample": [
                  "https://www.googleapis.com/auth/userinfo.profile",
              ]
          }] */
    // #swagger.summary = "This endpoint returns a list of all the stakes in the database."
    try {
      const stakes = await Stake.find() as Stake[];
      /* #swagger.responses[200] = {
              description: 'Returns an array of stake objects.'
      } */
      res.status(200).json(stakes);
    } catch (err) {
      /* #swagger.responses[500] = {
              description: 'An error occured.'
      } */
      res.status(500).json(err);
    }
  },

  async getStakeById(req: Request, res: Response) {
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
      let id: ObjectId;
      try {
        id = new ObjectId(req.params.stakeId);
      } catch (err) {
        /* #swagger.responses[400] = {
              description: 'An invalid MongoDB ObjectId was provided.'
      } */
        res.status(400).json('Please provide a valid stake id.');
        return;
      }
      const stake = await Stake.findOne(id) as Stake;
      /* #swagger.responses[200] = {
              description: 'Returns a stake object.'
      } */
      res.status(200).json(stake);
    } catch (err) {
      /* #swagger.responses[500] = {
              description: 'An error occured.'
      } */
      res.status(500).json(err);
    }
  },

  async createStake(req: Request, res: Response) {
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
      const stake = new Stake({
        name: req.body.name,
        stakeId: req.body.stakeId
      });
      const newStake = await stake.save().catch((err: Error) => {
        /* #swagger.responses[422] = {
              description: 'The provided stake object does not pass validation.'
      } */
        res.status(422).json({
          error: err.message
        });
      });
      /* #swagger.responses[201] = {
              description: 'Returns an object containing the result of the request and a string representing a MongoDB ObjectId.',
              schema: { $ref: '#/definitions/Stake' }
      } */
      res.status(201).json(newStake);
    } catch (err) {
      /* #swagger.responses[500] = {
              description: 'An error occured.'
      } */
      res.status(500).json(err);
    }
  },

  async deleteStakeById(req: Request, res: Response) {
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
      let id: ObjectId;
      try {
        id = new ObjectId(req.params.stakeId);
      } catch (err) {
        /* #swagger.responses[400] = {
              description: 'An invalid MongoDB ObjectId was provided.'
      } */
        res.status(400).json('Please provide a valid stake id.');
        return;
      }
      await Stake.deleteOne(id);
      /* #swagger.responses[200] = {
              description: 'The specified stake has been deleted.',
      } */
      res.status(200).send();
    } catch (err) {
      /* #swagger.responses[500] = {
              description: 'An error occured.'
      } */
      res.status(500).json(err);
    }
  },

  async updateStakeById(req: Request, res: Response) {
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
        stakeId: req.body.stakeId
      }
      let id: ObjectId;
      try {
        id = new ObjectId(req.params.stakeId);
      } catch (err) {
        /* #swagger.responses[400] = {
              description: 'An invalid MongoDB ObjectId was provided.'
      } */
        res.status(400).json('Please provide a valid stake id.');
        return;
      }
      await Stake.replaceOne({ _id: id }, stake, { runValidators: true }).catch((err: Error) => {
        /* #swagger.responses[422] = {
              description: 'The provided stake object does not pass validation.'
      } */
        res.status(422).json({
          error: err.message
        });
      });
      /* #swagger.responses[204] = {
                  description: 'The specified stake has been edited.',
          } */
      res.status(204).json(stake);
    } catch (err) {
      /* #swagger.responses[500] = {
              description: 'An error occured.'
      } */
      res.status(500).json(err);
    }
  },
};

export default stakes;