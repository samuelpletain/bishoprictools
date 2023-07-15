import * as express from 'express';
import members from '../controllers/members'
import authCheck from '../middlewares/authCheck';

const router: express.Router = express.Router();

router
  .get('/member', authCheck, members.getAllMembers)
  .get('/member/:memberId', authCheck, members.getMemberById)
  .post('/member', authCheck, members.createMember)
  .put('/member/:memberId', authCheck, members.updateMemberById)
  .delete('/member/:memberId', authCheck, members.deleteMemberById)
  .get('/member/ward/:wardId', authCheck, members.getMembersByWardId);
  //.get('/member/:stakeId', members.getMembersByStakeId);

export default router
