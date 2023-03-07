import { ITestPaper, TestPaperModel } from '../models/testPaper';
import { FeedbackModel, IFeedback } from '../models/feedback';
import { QuestionModel } from '../models/questions';
import { AnswersheetModel, IAnswerSheet } from '../models/answerSheet';
import { AnswerModel } from '../models/answers';
import { NextFunction, Request, Response } from 'express';
import { IUser, UserModel } from '../models/user';
import { OptionsModel } from '../models/options';
import { throwError } from '../utils/error';

/**
 * @deprecated
 */
export const studentEnter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, emailId, contact, testId } = req.body;

  const info = await TestPaperModel.findOne({
    _id: testId,
    isRegistrationavailable: true,
  });

  if (!info) {
    return res.json({
      success: false,
      message: ` Registration for this test has been closed!`,
    });
  }

  const data = await UserModel.findOne({
    $or: [
      { emailId, testId },
      { contact: contact, testId },
    ],
  });

  if (data) {
    const link = `/trainee/taketest?testid=${testId}&traineeid=${data._id}`;
    return res.json({
      success: false,
      message: 'This id has already been registered for this test!',
      testLink: link,
    });
  }

  const tempdata = new UserModel<Partial<IUser>>({
    name: name,
    emailId,
    contact: contact,
    testIds: [testId],
  });

  const u = await tempdata.save();
  const link = `/trainee/taketest?testid=${testId}&traineeid=${u._id}`;
  return res.json({
    success: true,
    message: `Student registered successfully!`,
    user: u,
    testLink: link,
  });
};

export const correctAnswers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const _id = req.body._id;
  const correctAnswers = await TestPaperModel.find(
    { _id: _id, testconducted: true },
    {
      type: 0,
      subjects: 0,
      duration: 0,
      organisation: 0,
      difficulty: 0,
      testbegins: 0,
      status: 0,
      createdBy: 0,
      isRegistrationavailable: 0,
      testconducted: 0,
    }
  )
    .populate('questions', 'body')
    .populate('questions', 'explanation')
    .populate({
      path: 'questions',
      model: QuestionModel,
      select: {
        body: 1,
        quesimg: 1,
        weightage: 1,
        anscount: 1,
        explanation: 1,
      },
      populate: {
        path: 'options',
        model: OptionsModel,
      },
    });

  if (!correctAnswers) {
    return res.json({
      success: false,
      message: 'Invalid test id.',
    });
  }

  return res.json({
    success: true,
    message: 'Success',
    data: correctAnswers,
  });
};

export const feedback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { feedback, rating, userId, testId } = req.body;

  const tempdata = new FeedbackModel<Partial<IFeedback>>({
    feedback,
    rating,
    userId,
    testId,
  });

  await tempdata.save();
  return res.json({
    success: true,
    message: `Feedback recorded successfully!`,
  });
};

export const checkFeedback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, testId } = req.body;

  const info = await FeedbackModel.findOne({ userId, testId });
  if (!info) {
    return res.json({
      success: true,
      message: 'Feedback is not given by this userid.',
      status: false,
    });
  }
  return res.json({
    success: true,
    message: 'Feedback given',
    status: true,
  });
};

/**
 * @deprecated hot to generate test Id
 */
export const resendMail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.body;
  const info = await UserModel.findById(userId, { emailId: 1, testId: 1 });
  if (!!info) {
    // const link = `/trainee/taketest?testid=${info.testId}&traineeid=${info._id}`;
    return res.json({
      success: true,
      message: `Link sent successfully!`,
      // link: link,
    });
  }
  return res.json({
    success: false,
    message: 'This user has not been registered.',
  });
};

export const testQuestions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  var { testId } = req.body;
  const testQuestions = await TestPaperModel.findById(testId, {
    type: 0,
    title: 0,
    subjects: 0,
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
      select: { body: 1, quesimg: 1, weightage: 1, anscount: 1, duration: 1 },
      populate: {
        path: 'options',
        select: { optbody: 1, optimg: 1 },
      },
    });

  if (!testQuestions) {
    return res.json({
      success: false,
      message: 'Invalid test id.',
    });
  }
  return res.json({
    success: true,
    message: 'Success',
    data: testQuestions.questions,
  });
};

export const getQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { qId } = req.body;

  const question = await QuestionModel.find(
    { _id: qId, status: 1 },
    {
      body: 1,
      options: 1,
      quesimg: 1,
      level: 1,
      difficulty: 1,
      explanation: 1,
    }
  ).populate({
    path: 'options',
    model: OptionsModel,
    select: { optbody: 1, optimg: 1 },
  });

  if (question.length === 0) {
    return res.json({
      success: false,
      message: `No such question exists`,
    });
  }

  return res.json({
    success: true,
    message: `Success`,
    data: question,
  });
};

export const endTest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { testId, userId } = req.body;

  const info = await AnswersheetModel.findOneAndUpdate(
    { testId, userId },
    { completed: true }
  );
  if (info) {
    return res.json({
      success: true,
      message: 'Your answers have been submitted',
    });
  }

  return res.json({
    success: false,
    message: 'Unable to submit answers!',
  });
};

export const updateAnswers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { testId, userId, qId, newAnswer, isMcq, customAnswer } = req.body;

  const p1 = TestPaperModel.findById(testId, { duration: 1 });
  const p2 = AnswersheetModel.findOne(
    { testId, userId, completed: false },
    { _id: 1, startTime: 1 }
  );

  const [p1Info, p2Info] = await Promise.all([p1, p2]);
  if (!p2Info) {
    throw throwError({
      statusCode: 400,
      message: 'Unable to update answer',
    });
  }

  let pending = null;
  const present = new Date().getMilliseconds();
  pending =
    (p1Info as ITestPaper).duration * 60 -
    (present - (p2Info as IAnswerSheet).startTime) / 1000;

  if (pending > 0) {
    const info = await AnswerModel.findOneAndUpdate(
      { questionId: qId, userId },
      {
        ...(isMcq
          ? { chosenOption: newAnswer }
          : { customAnswer: customAnswer }),
      }
    );
    return res.json({
      success: true,
      message: 'Answer Updated',
      data: info,
    });
  }

  await AnswersheetModel.findByIdAndUpdate(
    { testId, userId },
    { completed: true }
  );

  return res.json({ success: false, message: 'Time is up!' });
};

export const chosenOptions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  var { testId, userId } = req.body;
  const answerSheet = await AnswersheetModel.findOne(
    { testId, userId },
    { answers: 1 }
  ).populate('answers');

  return res.json({
    success: true,
    message: 'Chosen Options',
    data: answerSheet,
  });
};

export const studentDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.body;
  const info = await UserModel.findById(userId, {
    name: 1,
    emailId: 1,
    contact: 1,
  });
  if (info) {
    return res.json({ success: true, message: 'Student details', data: info });
  }
  return res.json({ success: false, message: 'This student does not exists' });
};

export const flags = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { testId, studentId } = req.body;

  const p1 = AnswersheetModel.findOne(
    { userId: studentId, testId },
    { _id: 1, startTime: 1, completed: 1 }
  );

  const p2 = UserModel.findOne(
    { _id: studentId, testIds: { $in: [testId] } },
    { _id: 1 }
  );

  const p3 = TestPaperModel.findById(testId, {
    testBegins: 1,
    testConducted: 1,
    duration: 1,
  });

  const present = new Date().getMilliseconds();
  const [infoP1, infoP2, infoP3] = await Promise.all([p1, p2, p3]);
  if (!infoP2) {
    return res.json({ success: false, message: 'Invalid URL!' });
  }
  let startedWriting = false;
  let pending: number | null = null;
  if (!infoP3) {
    throw throwError({ statusCode: 404, message: 'No test paper found' });
  }

  startedWriting = true;
  pending =
    (infoP3 as ITestPaper).duration * 60 -
    (present - (infoP1 as IAnswerSheet).startTime) / 1000;

  if (pending <= 0) {
    const result = await AnswersheetModel.findOneAndUpdate(
      { userid: studentId, testId },
      { completed: true }
    );

    return res.json({
      success: true,
      message: 'Successfull',
      data: {
        testbegins: (infoP3 as ITestPaper).testBegins,
        testconducted: (infoP3 as ITestPaper).testConducted,
        startedWriting: startedWriting,
        pending: pending,
        completed: true,
      },
    });
  }

  return res.json({
    success: true,
    message: 'Successfull',
    data: {
      testbegins: (infoP3 as ITestPaper).testBegins,
      testconducted: (infoP3 as ITestPaper).testConducted,
      startedWriting: startedWriting,
      pending: pending,
      completed: (infoP1 as IAnswerSheet).completed,
    },
  });
};

export const answerSheet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, testId } = req.body;
  var p1 = UserModel.find({ _id: userId, testId });
  var p2 = TestPaperModel.find({
    _id: testId,
    testbegins: true,
    testconducted: false,
  });

  const [infoP1, infoP2] = await Promise.all([p1, p2]);
  if (!infoP1.length || !infoP2.length) {
    return res.json({
      success: false,
      message: 'Invalid URL',
    });
  }

  // Promise.all([p1, p2]).then((info) => {
  const data = await AnswersheetModel.find({ userId, testId });
  if (data.length) {
    return res.json({
      success: true,
      message: 'Answer Sheet already exists!',
      data: data,
    });
  }

  const qus = infoP2[0].questions;
  const answer = qus?.map((d, i) => {
    return {
      questionId: d,
      chosenOption: [],
      userId,
    };
  });

  const ans = await AnswerModel.insertMany(answer);
  const startTime = new Date().getMilliseconds();

  const tempdata = new AnswersheetModel<Partial<IAnswerSheet>>({
    startTime: startTime,
    questions: qus,
    answers: ans,
    testId,
    userId,
  });

  const answersheet = await tempdata.save();
  return res.json({ success: true, message: 'Test has started!' });
};
