import * as express from 'express';
import members from '../controllers/members'
import authCheck from '../middlewares/authCheck';

const router: express.Router = express.Router();

router
<<<<<<< HEAD
  .get('/member', members.getAllMembers)
  .get('/member/:memberId',  members.getMemberById)
  .post('/member', members.createMember)
  .put('/member/:memberId', members.updateMemberById)
  .delete('/member/:memberId', members.deleteMemberById)
  .get('/member/ward/:wardId', members.getMembersByWardId);
//.get('/member/:stakeId', members.getMembersByStakeId);
=======
  .get('/member', authCheck, members.getAllMembers)
  .get('/member/:memberId', authCheck, members.getMemberById)
  .post('/member', authCheck, members.createMember)
  .put('/member/:memberId', authCheck, members.updateMemberById)
  .delete('/member/:memberId', authCheck, members.deleteMemberById)
  .get('/member/ward/:wardId', authCheck, members.getMembersByWardId);
  //.get('/member/:stakeId', members.getMembersByStakeId);
>>>>>>> f3f8b6ae6ecd97c7cb4ffc8abd04b3356335b13b

export default router
