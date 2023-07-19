import * as express from 'express';
import callings from '../controllers/callings';
import authCheck from '../middlewares/authCheck';

const router: express.Router = express.Router();

router
  .get('/calling', authCheck, callings.getAllCallings)
  .get('/calling/:callingId', authCheck, callings.getCallingById)
  .post('/calling', authCheck, callings.createCalling)
  .put('/calling/:callingId', authCheck, callings.updateCallingById)
  .delete('/calling/:callingId', authCheck, callings.deleteCallingById);

export default router;
