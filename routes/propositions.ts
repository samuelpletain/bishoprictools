import * as express from 'express';

const routes: express.Router = express.Router();
import propositions from '../controllers/propositions'

routes
  .get('/proposition', propositions.getAllPropositions)
  .get('/proposition/:propositionsId', propositions.getPropositionById)
  .post('/proposition', propositions.createProposition)
  .put('/proposition/:propositionsId', propositions.updatePropositionById)
  .delete('/proposition/:propositionsId', propositions.deletePropositionById)
  .get('/proposition/:wardId', propositions.getPropositionsByWardId)
  .get('/proposition/:stakeId', propositions.getPropositionsByStakeId)
  .get('/proposition/:orgId', propositions.getPropositionsByOrgId)
  .get('/proposition/:callingId', propositions.getPropositionsByCallingId);

export default routes
