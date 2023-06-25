import * as express from 'express';

const router: express.Router = express.Router();
import members from '../controllers/members'

router
  .get('/member', members.getAllMembers)
  .get('/member/:memberId', members.getMemberById)
  .post('/member', members.createMember)
  .put('/member/:memberId', members.updateMemberById)
  .delete('/member/:memberId', members.deleteMemberById)
  .get('/member/ward/:wardId', members.getMembersByWardId);
//.get('/member/:stakeId', members.getMembersByStakeId);

export default router
