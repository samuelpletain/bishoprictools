import * as express from 'express';
import stakes from '../controllers/stakes';
import authCheck from '../middlewares/authCheck';

const router: express.Router = express.Router();

router
  .get('/stake', stakes.getAllStakes)
  .get('/stake/:stakeId', stakes.getStakeById)
  .post('/stake', stakes.createStake)
  .put('/stake/:stakeId', stakes.updateStakeById)
  .delete('/stake/:stakeId', stakes.deleteStakeById);

export default router;
