import { Response } from 'express';
import { IUserType } from 'types/models';

export const isDevelopment = process.env.NODE_ENV === 'development';

export const isAdmin = (userType: IUserType) => userType === 'ADMIN';
export const isTeacher = (userType: IUserType) => userType === 'TEACHER';
export const isStudent = (userType: IUserType) => userType === 'STUDENT';
export const isOther = (userType: IUserType) => userType === 'OTHER';

export const notPermitted = (res: Response) => {
  return res.status(401).json({
    success: false,
    message: 'Permissions not granted!',
  });
};
