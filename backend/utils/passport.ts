import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { IUser, UserModel } from 'models/user';
import { Request } from 'express';

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'emailid',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (
      req: Request,
      emailId: IUser['emailId'],
      password: IUser['password'],
      done
    ) => {
      try {
        const user = await UserModel.findOne({
          emailId,
          status: true,
        });
        if (!user) throw new Error('Invalid Email Id');

        const res = await bcrypt.compare(password, user.password);
        if (!res) throw new Error('Invalid Password');
        return done(null, user, {
          message: 'logged in successfully',
        });
      } catch (err: any) {
        return done(err, false, {
          message: err.message || 'Server Error',
        });
      }
    }
  )
);

let opts = {
  jwtFromRequest: ExtractJwt.fromUrlQueryParameter('Token'),
  secretOrKey: process.env.JWT_SECRET,
  // jwtFromRequest: ExtractJwt.fromHeader('authorization');
};

passport.use(
  'user-token',
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await UserModel.findById(jwt_payload._id);
      if (!user) throw new Error('Authentication failed');
      return done(null, user, {
        success: true,
        message: 'Successfull',
      });
    } catch (err: any) {
      return done(err, false, {
        success: false,
        message: err.message || 'Server Error',
      });
    }
  })
);

export default passport;
