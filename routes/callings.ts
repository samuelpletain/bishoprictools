import * as express from 'express';

const router: express.Router = express.Router();
import callings from '../controllers/callings'

router
  .get('/calling', callings.getAllCallings)
  .get('/calling/:callingId', callings.getCallingById)
  .post('/calling', callings.createCalling)
  .put('/calling/:callingId', callings.updateCallingById)
  .delete('/calling/:callingId', callings.deleteCallingById)

export default router