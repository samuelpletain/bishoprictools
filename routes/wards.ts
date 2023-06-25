import * as express from 'express';

const router: express.Router = express.Router();
import wards from '../controllers/wards'

router
  .get('/ward', wards.getAllWards)
  .get('/ward/:wardId', wards.getWardById)
  .post('/ward', wards.createWard)
  .put('/ward/:wardId', wards.updateWardById)
  .delete('/ward/:wardId', wards.deleteWardById);

export default router