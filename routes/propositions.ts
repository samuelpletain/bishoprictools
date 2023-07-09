import * as express from 'express';
import propositions from '../controllers/propositions';
import authCheck from '../middlewares/authCheck';

const router: express.Router = express.Router();

router
  .get('/proposition', propositions.getAllPropositions)
  .get('/proposition/:propositionId', propositions.getPropositionById)
  .post('/proposition', propositions.createProposition)
  .put('/proposition/:propositionId', propositions.updatePropositionById)
  .delete('/proposition/:propositionId', propositions.deletePropositionById)
  .get('/proposition/ward/:wardId', propositions.getPropositionsByWardId)
  .get('/proposition/stake/:stakeId', propositions.getPropositionsByStakeId)
  .get('/proposition/ward/:wardId/calling/:callingId', propositions.getWardPropositionsByCallingId)
  .get('/proposition/ward/:wardId/organization/:organizationId', propositions.getWardPropositionsByOrganizationId);

export default router
