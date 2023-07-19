import * as express from 'express';
import stakes from '../controllers/stakes';
import authCheck from '../middlewares/authCheck';

const router: express.Router = express.Router();

router
  .get('/stake', authCheck, stakes.getAllStakes)
  .get('/stake/:stakeId', authCheck, stakes.getStakeById)
  .post('/stake', authCheck, stakes.createStake)
  .put('/stake/:stakeId', authCheck, stakes.updateStakeById)
  .delete('/stake/:stakeId', authCheck, stakes.deleteStakeById);

export default router;
