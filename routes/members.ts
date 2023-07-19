import * as express from 'express';
import members from '../controllers/members';
import authCheck from '../middlewares/authCheck';

const router: express.Router = express.Router();

router
  .get('/member', members.getAllMembers)
  .get('/member/:memberId', members.getMemberById)
  .post('/member', members.createMember)
  .put('/member/:memberId', members.updateMemberById)
  .delete('/member/:memberId', members.deleteMemberById)
  .get('/member/ward/:wardId', members.getMembersByWardId)
  .get('/member/stake/:stakeId', members.getMembersByStakeId);

export default router;
