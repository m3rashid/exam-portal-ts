import { NextFunction, Request, Response } from 'express';
import { IUser } from '../models/user';

export const userDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as IUser;

  return res.json({
    success: true,
    message: 'successfull',
    user: {
      name: user.name,
      type: user.type,
      _id: user._id,
      emailId: user.emailId,
      contact: user.contact,
    },
  });
};
