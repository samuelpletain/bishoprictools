import { NextFunction, Request, Response } from 'express';

const authCheck = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.redirect('/login');
  } else {
    next();
  }
};

export default authCheck;