import { hashPassword } from './tool';
import { Request, Response, NextFunction } from 'express';
import { IUser, UserModel } from '../models/user';
import { throwError } from '../utils/error';
import { isAdmin, notPermitted } from '../utils/utils';

export const trainerRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const _id = req.body._id || null;
  const user = req.user as IUser;

  if (!isAdmin(user.type)) return notPermitted(res);

  const { name, password, emailId, contact } = req.body;

  if (_id != null) {
    await UserModel.findOneAndUpdate(
      { _id: _id, status: true },
      { name: name, contact: contact }
    );

    return res.json({
      success: true,
      message: "Teachers's Profile updated successfully!",
    });
  }

  const foundUser = await UserModel.findOne({ emailId, status: true });
  if (foundUser) {
    return res.json({
      success: false,
      message: `This id already exists!`,
    });
  }

  const hash = await hashPassword(password);
  const tempdata = new UserModel<Partial<IUser>>({
    name: name,
    password: hash,
    emailId: emailId,
    contact: contact,
    createdBy: user._id,
  });

  const savedUser = await tempdata.save();
  return res.json({
    success: true,
    message: `Teachers's Profile created successfully!`,
  });
};

export const removeTrainer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as IUser;
  if (!isAdmin(user.type)) return notPermitted(res);

  const _id = req.body._id;
  await UserModel.findOneAndUpdate({ _id: _id }, { status: false });
  return res.json({
    success: true,
    message: 'Account has been removed',
  });
};

export const getAllTrainers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as IUser;
  if (!isAdmin(user.type)) return notPermitted(res);

  const info = await UserModel.find(
    { type: 'TRAINER', status: 1 },
    { password: 0, type: 0, createdBy: 0, status: 0 }
  );
  if (!info) {
    throw throwError({ statusCode: 500, message: 'Unable to fetch data' });
  }

  return res.json({ success: true, message: `Success`, data: info });
};

export const getSingleTrainer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as IUser;
  if (!isAdmin(user.type)) return notPermitted(res);

  let _id = req.params._id;
  const info = await UserModel.find(
    { _id, status: true },
    { password: 0, type: 0, createdBy: 0, status: 0 }
  );
  if (info.length === 0) {
    return res.status(404).json({
      success: false,
      message: "This account doesn't exist!",
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Success',
    data: info,
  });
};
