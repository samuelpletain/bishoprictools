import * as express from 'express';
import wards from '../controllers/wards'
import authCheck from '../middlewares/authCheck';

const router: express.Router = express.Router();

router
  .get('/ward', wards.getAllWards)
  .get('/ward/:wardId', wards.getWardById)
  .post('/ward', wards.createWard)
  .put('/ward/:wardId', wards.updateWardById)
  .delete('/ward/:wardId', wards.deleteWardById);

export default router