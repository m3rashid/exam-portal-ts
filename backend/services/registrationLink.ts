import { TestPaperModel } from '../models/testPaper';
import { FeedbackModel } from '../models/feedback';
import { NextFunction, Request, Response } from 'express';
import { IUser } from '../models/user';
import { isTeacher, notPermitted } from '../utils/utils';

export const stopRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as IUser;
  if (!isTeacher(user.type)) return notPermitted(res);

  const { id, status } = req.body;

  const d = await TestPaperModel.findById(id, {
    testbegins: true,
    testconducted: true,
  });
  if (!d) {
    return res.status(500).json({
      success: false,
      message: 'Unable to change registration status',
    });
  }

  if (!(d.testBegins != true && d.testConducted != true)) {
    return res.json({
      success: false,
      message: 'Unable to change registration status',
    });
  }

  await TestPaperModel.findOneAndUpdate(
    { _id: id },
    { isRegistrationAvailable: status }
  );

  return res.json({
    success: true,
    message: `Registration status changed!`,
    currentStatus: status,
  });
};

export const download = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const testId = req.body.id;
  const user = req.user as IUser;

  if (!isTeacher(user.type)) return notPermitted(res);

  const file = `${
    req.protocol + '://' + req.get('host')
  }/result/result-${testId}.xlsx`;
  return res.json({
    success: true,
    message: 'File sent successfully',
    file: file,
  });
};

export const getFeedBack = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  var { testId } = req.body;
  const user = req.user as IUser;
  if (!isTeacher(user.type)) return notPermitted(res);

  const data = await FeedbackModel.find({ testId }).populate('userId');
  return res.status(200).json({
    success: true,
    message: 'Feedbacks Sent Successfully',
    data: data,
  });
};
