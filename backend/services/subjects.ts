//view all subjects and single subject
import { NextFunction, Request, Response } from 'express';
import { ISubject, SubjectModel } from '../models/subjects';
import { IUser } from '../models/user';
import { isAdmin, notPermitted } from '../utils/utils';

export const createEditsubject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const _id = req.body._id || null;
  const user = req.user as IUser;
  if (!user || !isAdmin(user.type)) return notPermitted(res);

  const topic = req.body.topic;
  if (!!_id) {
    await SubjectModel.findOneAndUpdate({ _id: _id }, { topic: topic });
    return res.json({
      success: true,
      message: 'Subject name has been changed',
    });
  }

  const info = await SubjectModel.findOne({ topic: topic });

  if (!!info) {
    return res.json({
      success: false,
      message: `This subject already exists!`,
    });
  }

  const tempdata = new SubjectModel<Partial<ISubject>>({
    topic: topic,
    createdBy: user._id,
  });

  await tempdata.save();
  return res.json({
    success: true,
    message: `New subject created successfully!`,
  });
};

export const getAllSubjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const subject = await SubjectModel.find(
    { status: 1 },
    { createdAt: 0, updatedAt: 0 }
  ).populate('createdBy', 'name');

  return res.json({ success: true, message: 'Success', data: subject });
};

export const getSingleSubject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params._id;
  const subject = await SubjectModel.find(
    { _id: id },
    { createdAt: 0, updatedAt: 0, status: 0 }
  ).populate('createdBy', 'name');

  return res.json({
    success: true,
    message: `Success`,
    data: subject,
  });
};
