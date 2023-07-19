import * as express from 'express';
import propositions from '../controllers/propositions';
import authCheck from '../middlewares/authCheck';

const router: express.Router = express.Router();

router
  .get('/proposition', authCheck, propositions.getAllPropositions)
  .get(
    '/proposition/:propositionId',
    authCheck,
    propositions.getPropositionById
  )
  .post('/proposition', authCheck, propositions.createProposition)
  .put(
    '/proposition/:propositionId',
    authCheck,
    propositions.updatePropositionById
  )
  .delete(
    '/proposition/:propositionId',
    authCheck,
    propositions.deletePropositionById
  )
  .get(
    '/proposition/ward/:wardId',
    authCheck,
    propositions.getPropositionsByWardId
  )
  .get(
    '/proposition/stake/:stakeId',
    authCheck,
    propositions.getPropositionsByStakeId
  )
  .get(
    '/proposition/ward/:wardId/calling/:callingId',
    authCheck,
    propositions.getWardPropositionsByCallingId
  )
  .get(
    '/proposition/ward/:wardId/organization/:organizationId',
    authCheck,
    propositions.getWardPropositionsByOrganizationId
  );

export default router;
