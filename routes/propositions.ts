import * as express from 'express';

const router: express.Router = express.Router();
import propositions from '../controllers/propositions'

router
  .get('/proposition', propositions.getAllPropositions)
  .get('/proposition/:propositionId', propositions.getPropositionById)
  .post('/proposition', propositions.createProposition)
  .put('/proposition/:propositionId', propositions.updatePropositionById)
  .delete('/proposition/:propositionId', propositions.deletePropositionById)
  .get('/proposition/:wardId', propositions.getPropositionsByWardId)
  .get('/proposition/:stakeId', propositions.getPropositionsByStakeId);

export default router
