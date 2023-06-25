import * as express from 'express';

const router: express.Router = express.Router();
import propositions from '../controllers/propositions'

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
