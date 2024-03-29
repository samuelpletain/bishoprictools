import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import Member from '../models/members';
import Ward from '../models/wards';

const members = {
  async getAllMembers(req: Request, res: Response) {
    /* #swagger.security = [{
              "oAuthSample": [
                  "https://www.googleapis.com/auth/userinfo.profile",
              ]
          }] */
    // #swagger.summary = "This endpoint returns a list of all the members in the database."
    try {
      const members = (await Member.find()) as Member[];
      /* #swagger.responses[200] = {
              description: 'Returns an array of member objects.',
              schema: [{ $ref: '#/definitions/Member' }]
      } */
      res.status(200).json(members);
    } catch (err) {
      /* #swagger.responses[500] = {
              description: 'An error occured.'
      } */
      res.status(500).json(err);
    }
  },

  async getMemberById(req: Request, res: Response) {
    /* #swagger.security = [{
              "oAuthSample": [
                  "https://www.googleapis.com/auth/userinfo.profile",
              ]
          }] */
    // #swagger.summary = "This endpoint returns the details of a single member."
    /*  #swagger.parameters['memberId'] = {
                  in: 'path',
                  description: 'A MongoDB ObjectId',
                  required: true
          } */
    try {
      let id: ObjectId;
      try {
        id = new ObjectId(req.params.memberId);
      } catch (err) {
        /* #swagger.responses[400] = {
              description: 'An invalid MongoDB ObjectId was provided.'
      } */
        res.status(400).json('Please provide a valid member id.');
        return;
      }
      const member = (await Member.findOne(id)) as Member;
      /* #swagger.responses[200] = {
              description: 'Returns a member object.',
              schema: { $ref: '#/definitions/Member' }
      } */
      res.status(200).json(member);
    } catch (err) {
      /* #swagger.responses[500] = {
              description: 'An error occured.'
      } */
      res.status(500).json(err);
    }
  },

  async createMember(req: Request, res: Response) {
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
      const member = new Member({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
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
      const newMember = await member.save().catch((err: Error) => {
        /* #swagger.responses[422] = {
              description: 'The provided member object does not pass validation.'
      } */
        res.status(422).json({
          error: err.message,
        });
      });
      /* #swagger.responses[201] = {
              description: 'Returns an object containing the result of the request and a string representing a MongoDB ObjectId.',
              schema: { $ref: '#/definitions/Member' }
      } */
      res.status(201).json(newMember);
    } catch (err) {
      /* #swagger.responses[500] = {
              description: 'An error occured.'
      } */
      res.status(500).json(err);
    }
  },

  async deleteMemberById(req: Request, res: Response) {
    /* #swagger.security = [{
              "oAuthSample": [
                  "https://www.googleapis.com/auth/userinfo.profile",
              ]
          }] */
    // #swagger.summary = "This endpoint deletes a single member."
    /*  #swagger.parameters['memberId'] = {
                  in: 'path',
                  description: 'A MongoDB ObjectId',
                  required: true
          } */
    try {
      let id: ObjectId;
      try {
        id = new ObjectId(req.params.memberId);
      } catch (err) {
        /* #swagger.responses[400] = {
              description: 'An invalid MongoDB ObjectId was provided.'
      } */
        res.status(400).json('Please provide a valid member id.');
        return;
      }
      await Member.deleteOne(id);
      /* #swagger.responses[200] = {
              description: 'The specified member has been deleted.',
      } */
      res.status(200).send();
    } catch (err) {
      /* #swagger.responses[500] = {
              description: 'An error occured.'
      } */
      res.status(500).json(err);
    }
  },

  async updateMemberById(req: Request, res: Response) {
    /* #swagger.security = [{
              "oAuthSample": [
                  "https://www.googleapis.com/auth/userinfo.profile",
              ]
          }] */
    // #swagger.summary = "This endpoint updates the content of a single member."
    /*  #swagger.parameters['memberId'] = {
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
        lastName: req.body.lastName,
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
      let id: ObjectId;
      try {
        id = new ObjectId(req.params.memberId);
      } catch (err) {
        /* #swagger.responses[400] = {
              description: 'An invalid MongoDB ObjectId was provided.'
      } */
        res.status(400).json('Please provide a valid member id.');
        return;
      }
      await Member.replaceOne({ _id: id }, member, {
        runValidators: true,
      }).catch((err: Error) => {
        /* #swagger.responses[422] = {
              description: 'The provided member object does not pass validation.'
      } */
        res.status(422).json({
          error: err.message,
        });
      });
      /* #swagger.responses[204] = {
                  description: 'The specified member has been edited.',
          } */
      res.status(204).json(member);
    } catch (err) {
      /* #swagger.responses[500] = {
              description: 'An error occured.'
      } */
      res.status(500).json(err);
    }
  },

  async getMembersByWardId(req: Request, res: Response) {
    /* #swagger.security = [{
              "oAuthSample": [
                  "https://www.googleapis.com/auth/userinfo.profile",
              ]
          }] */
    // #swagger.summary = "This endpoint returns all members for a given ward."
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
        res.status(400).json('Please provide a valid member id.');
        return;
      }
      const members = (await Member.find({ wardId: id })) as Member[];
      /* #swagger.responses[200] = {
        description: 'Returns an array of member objects.',
        schema: [{ $ref: '#/definitions/Member' }]
      } */
      res.status(200).json(members);
    } catch (err) {
      /* #swagger.responses[500] = {
              description: 'An error occured.'
      } */
      res.status(500).json(err);
    }
  },

  async getMembersByStakeId(req: Request, res: Response) {
    /* #swagger.security = [{
            "oAuthSample": [
                "https://www.googleapis.com/auth/userinfo.profile",
            ]
        }] */
    // #swagger.summary = "This endpoint returns all members for a given stake."
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
        res.status(400).json('Please provide a valid member id.');
        return;
      }
      const wardIds = await Ward.find({
        stakeId: id,
      }).distinct('_id');
      console.log();
      const members = (await Member.find({
        wardId: {
          $in: wardIds,
        },
      })) as Member[];
      /* #swagger.responses[200] = {
        description: 'Returns an array of member objects.',
        schema: [{ $ref: '#/definitions/Member' }]
      } */
      res.status(200).json(members);
    } catch (err) {
      /* #swagger.responses[500] = {
          description: 'An error occured.'
  } */
      res.status(500).json(err);
    }
  },
};

export default members;
