import { IQuestion, QuestionModel } from '../models/questions';
import { IOption, OptionsModel } from '../models/options';
import {} from './tool';
import { NextFunction, Request, Response } from 'express';
import { IUser } from '../models/user';
import { isTeacher, notPermitted } from '../utils/utils';
import { ObjectId } from 'mongoose';

export const createQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as IUser;
  if (!isTeacher(user.type)) return notPermitted(res);
  const {
    body,
    options,
    quesImg,
    difficulty,
    subject,
    isMcq,
    answer,
    weightage,
    level,
    school,
    year,
    topic,
    component,
    exam,
    explanation,
  } = req.body;

  let ansCount = 0;
  options?.map((d: IOption) => {
    if (d.isAnswer) ansCount = ansCount + 1;
  });

  const info = await QuestionModel.findOne(
    { body: body, status: 1 },
    { status: 0 }
  );

  if (!!info) {
    return res.json({
      success: false,
      message: `This question already exists!`,
    });
  }

  if (!isMcq) {
    if (!answer || answer.trim() == '') {
      return res.json({ success: false, message: 'Enter answer!' });
    }

    const newQuestion = new QuestionModel<Partial<IQuestion>>({
      body,
      quesImg,
      difficulty,
      level: level,
      subject: subject,
      school: school,
      year: year,
      topic: topic,
      component: component,
      exam: exam,
      isMcq,
      customAnswer: answer,
      createdBy: user._id,
      ansCount,
      weightage: weightage,
    });

    await newQuestion.save();
    return res.json({
      success: true,
      message: 'Question created successfully!',
    });
  }

  if (!options || options.length === 0) {
    return res.json({ success: false, message: 'Enter options!' });
  }

  const ops = await OptionsModel.insertMany(options);

  // const ra: Array<ObjectId> = [];
  // ops.map((d: any) => {
  //   if (d.isAnswer) ra.push(d._id as ObjectId);
  // });

  const tempData = new QuestionModel<Partial<IQuestion>>({
    body,
    explanation,
    quesImg,
    subject,
    difficulty,
    options: ops.map((d) => d._id as ObjectId),
    createdBy: user._id,
    // rightAnswers: ra,
    ansCount,
    weightage,
    level,
    school,
    year,
    topic: topic,
    component,
    exam,
  });

  await tempData.save();
  return res.json({
    success: true,
    message: 'Question created successfully!',
  });
};

export const deleteQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as IUser;
  if (!isTeacher(user.type)) return notPermitted(res);

  const _id = req.body._id;
  await QuestionModel.findOneAndUpdate({ _id: _id }, { status: 0 });
  return res.json({
    success: true,
    message: 'Question has been deleted',
  });
};

export const getAllQuestions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as IUser;
  if (!isTeacher(user.type)) return notPermitted(res);

  const subject = req.body.subject;
  if (subject.length !== 0) {
    const question = await QuestionModel.find(
      { subject: subject, status: 1 },
      { status: 0 }
    )
      .populate('createdBy', 'name')
      .populate('subject', 'topic')
      .populate('options');

    return res.json({ success: true, message: `Success`, data: question });
  }

  const question = await QuestionModel.find({ status: 1 }, { status: 0 })
    .populate('createdBy', 'name')
    .populate('subject', 'topic')
    .populate('options');

  return res.json({
    success: true,
    message: `Success`,
    data: question,
  });
};

export const getSingleQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as IUser;
  if (!isTeacher(user.type)) return notPermitted(res);

  const _id = req.params._id;
  const question = await QuestionModel.find(
    { _id: _id, status: 1 },
    { status: 0 }
  )
    .populate('questions', 'body')
    .populate('subject', 'topic')
    .populate('options');

  if (question.length === 0) {
    return res.json({ success: false, message: `No such question exists` });
  }
  return res.json({ success: true, message: `Success`, data: question });
};
