import * as express from 'express';
import wards from '../controllers/wards'
import authCheck from '../middlewares/authCheck';

const router: express.Router = express.Router();

router
  .get('/ward', authCheck, wards.getAllWards)
  .get('/ward/:wardId', wards.getWardById)
  .post('/ward', authCheck, wards.createWard)
  .put('/ward/:wardId', authCheck, wards.updateWardById)
  .delete('/ward/:wardId', authCheck, wards.deleteWardById);

export default router