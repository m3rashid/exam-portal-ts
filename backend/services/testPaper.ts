import { ObjectId } from 'mongoose';
import { IQuestion, ITestPaper, IUser } from 'types/models';
import { ResultModel } from '../models/results';
import { OptionsModel } from '../models/options';
import { SubjectModel } from '../models/subjects';
import { isTeacher, notPermitted } from '../utils/utils';
import { NextFunction, Request, Response } from 'express';
import { QuestionModel } from '../models/questions';
import { TestPaperModel } from '../models/testPaper';

export const createEditTest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  var _id = req.body._id || null;
  const user = req.user as IUser;
  if (!isTeacher(user.type)) return notPermitted(res);

  const { title, questions } = req.body;
  if (!!_id) {
    await TestPaperModel.findOneAndUpdate({ _id }, { title, questions });
    return res.json({
      success: true,
      message: 'Testpaper has been updated!',
    });
  }

  const { type, difficulty, duration, subjects } = req.body;

  const info = await TestPaperModel.findOne(
    { title: title, type: type, testbegins: 0 },
    { status: 0 }
  );

  if (!!info) {
    return res.json({
      success: false,
      message: `This testpaper already exists!`,
    });
  }

  const tempdata = new TestPaperModel<Partial<ITestPaper>>({
    type: type,
    title: title,
    questions,
    difficulty: difficulty,
    duration: duration,
    createdBy: user._id,
    subjects: subjects,
  });

  const d = await tempdata.save();
  return res.json({
    success: true,
    message: `New testpaper created successfully!`,
    testid: d._id,
  });
};

export const getSingletest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let id = req.params._id;

  const testPaper = await TestPaperModel.find(
    { _id: id, status: 1 },
    { createdAt: 0, updatedAt: 0, status: 0 }
  )
    .populate('createdBy', 'name')
    .populate('questions', 'body')
    .populate({
      path: 'subjects',
      model: SubjectModel,
    })
    .populate({
      path: 'questions',
      populate: {
        path: 'options',
        model: OptionsModel,
      },
    });

  return res.json({ success: true, message: 'Success', data: testPaper });
};

export const getAlltests = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as IUser;
  if (!isTeacher(user.type)) return notPermitted(res);

  const title = req.body.title;
  const testPaper = await TestPaperModel.find({ status: 1 }, { status: 0 })
    .populate('questions', 'body')
    .populate({ path: 'subjects', model: SubjectModel })
    .populate({
      path: 'questions',
      populate: { path: 'options', model: OptionsModel },
    })
    .populate({ path: 'createdBy' });

  return res.json({ success: true, message: `Success`, data: testPaper });
};

export const deleteTest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as IUser;
  if (!isTeacher(user.type)) return notPermitted(res);

  const _id = req.body._id;
  await TestPaperModel.findOneAndUpdate({ _id: _id }, { status: 0 });
  return res.json({ success: true, message: 'Test has been deleted' });
};

export const TestDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as IUser;
  if (!isTeacher(user.type)) return notPermitted(res);

  const testId = req.body._id;
  const testDetails = await TestPaperModel.findOne(
    { _id: testId },
    {
      isResultgenerated: 0,
      isRegistrationavailable: 0,
      createdBy: 0,
      status: 0,
      testbegins: 0,
      questions: 0,
    }
  ).populate('subjects', 'topic');

  return res.status(200).json({
    success: true,
    message: 'Success',
    data: testDetails,
  });
};

export const basicTestdetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as IUser;
  if (!isTeacher(user.type)) return notPermitted(res);

  const testId = req.body.id;
  const basicTestDetail = await TestPaperModel.findById(testId, {
    questions: 0,
  })
    .populate('createdBy', 'name')
    .populate('subjects', 'topic');

  return res.status(200).json({
    success: true,
    message: 'Success',
    data: basicTestDetail,
  });
};

export const getTestquestions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as IUser;
  if (!isTeacher(user.type)) return notPermitted(res);

  const testId = req.body.id;
  const testQuestions = await TestPaperModel.findById(testId, {
    type: 0,
    title: 0,
    subjects: 0,
    duration: 0,
    organisation: 0,
    difficulty: 0,
    testbegins: 0,
    status: 0,
    createdBy: 0,
    isRegistrationavailable: 0,
  })
    .populate('questions', 'body')
    .populate({
      path: 'questions',
      model: QuestionModel,
      select: { body: 1, quesimg: 1, weightage: 1, anscount: 1 },
      populate: {
        path: 'options',
        model: OptionsModel,
      },
    });

  return res.status(200).json({
    success: true,
    message: 'Success',
    data: testQuestions ? testQuestions.questions : [],
  });
};

export const getCandidateDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as IUser;
  if (!isTeacher(user.type)) return notPermitted(res);

  const testId = req.body.testId;
  const candidateDetails = await ResultModel.find(
    { testId },
    { score: 1, userid: 1 }
  ).populate('userid');

  return res.status(200).json({
    success: true,
    message: 'Success',
    data: candidateDetails,
  });
};

export const getCandidates = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as IUser;
  if (!isTeacher(user.type)) return notPermitted(res);

  const testId = req.body.id;
  // TODO: get all candidates who have the given testId in their list of testIds
};

export const beginTest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as IUser;
  if (!isTeacher(user.type)) return notPermitted(res);

  const id = req.body.id;
  const data = await TestPaperModel.findOneAndUpdate(
    { _id: id, testconducted: false },
    { testbegins: 1, isRegistrationavailable: 0 },
    { new: true }
  );

  if (!!data) {
    res.json({
      success: true,
      message: 'Test has been started.',
      data: {
        isRegistrationavailable: data.isRegistrationAvailable,
        testbegins: data.testBegins,
        testconducted: data.testConducted,
        isResultgenerated: data.isResultGenerated,
      },
    });
  }

  return res.json({ success: false, message: 'Unable to start test.' });
};

export const endTest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as IUser;
  if (!isTeacher(user.type)) return notPermitted(res);

  const id = req.body.id;
  const info = await TestPaperModel.findOneAndUpdate(
    { _id: id, testconducted: 0, testbegins: 1, isResultgenerated: 0 },
    { testbegins: false, testconducted: true, isResultgenerated: true },
    { new: true }
  );

  if (!!info) {
    // const sheet = await result(id, MaxMarks);
    return res.json({
      success: true,
      message: 'The test has ended.',
      data: {
        isRegistrationavailable: info.isRegistrationAvailable,
        testbegins: info.testBegins,
        testconducted: info.testConducted,
        isResultgenerated: info.isResultGenerated,
      },
    });
  }
};

export const MaxMarks = async (testId: ObjectId) => {
  const mA = await TestPaperModel.findOne(
    { _id: testId },
    { questions: 1 }
  ).populate({
    path: 'questions',
    model: QuestionModel,
    select: { weightage: 1 },
  });

  if (!mA) throw new Error('Invalid testid');
  let m = 0;
  (mA.questions as IQuestion[]).map((d, i) => {
    m += d.weightage;
  });
  return m;
};

export const MM = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as IUser;
  if (!isTeacher(user.type)) return notPermitted(res);

  var testId = req.body.testId;
  const maxM = await MaxMarks(testId);
  return res.json({
    success: true,
    message: 'Maximum Marks',
    data: maxM,
  });
};

export const checkTestName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as IUser;
  if (!isTeacher(user.type)) return notPermitted(res);

  const testName = req.body.testName;

  const data = await TestPaperModel.findOne({ title: testName }, { _id: 1 });
  if (!!data) return res.json({ success: true, can_use: false });
  return res.json({ success: true, can_use: true });
};
