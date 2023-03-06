import { IUser } from '../models/user';
import passport from '../utils/passport';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    'login',
    { session: false },
    (err: any, user: IUser, info: any) => {
      if (err || !user) {
        return res.json(info);
      }

      if (user.type !== req.body.type) {
        return res.json({
          success: false,
          message: `Cannot login as ${req.body.type} here`,
        });
      }

      req.login({ _id: user._id }, { session: false }, (err) => {
        if (err) {
          return res.json({ success: false, message: 'Server Error' });
        }

        const token = jwt.sign(
          { _id: user._id },
          process.env.JWT_SECRET as string,
          { expiresIn: 5000000 }
        );

        return res.json({
          success: true,
          message: 'login successful',
          user: {
            name: user.name,
            type: user.type,
            _id: user._id,
            emailId: user.emailId,
            contact: user.contact,
          },
          token: token,
        });
      });
    }
  )(req, res, next);
};
