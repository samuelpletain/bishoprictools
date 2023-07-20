import * as express from 'express';
import callings from '../controllers/callings';
import authCheck from '../middlewares/authCheck';

const router: express.Router = express.Router();

router
  .get('/calling', callings.getAllCallings)
  .get('/calling/:callingId', callings.getCallingById)
  .post('/calling', callings.createCalling)
  .put('/calling/:callingId', callings.updateCallingById)
  .delete('/calling/:callingId', callings.deleteCallingById);

export default router;
