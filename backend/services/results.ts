import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongoose';
import { AnswersheetModel } from '../models/answerSheet';
import { IOption, IAnswer, IResult, IQuestion } from 'types/models';
import { SubResultsModel } from '../models/subResults';
import { OptionsModel } from '../models/options';
import { throwError } from '../utils/error';
import { ResultModel } from '../models/results';

export const generateResults = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, testId } = req.body;

  const result = await generateResult(userId, testId);
  if (!result) {
    throw throwError({ message: 'Unable to generate result', statusCode: 500 });
  }

  return res.status(200).json({
    success: true,
    message: 'Result generated successfully',
  });
};

export const generateResult = async (userId: ObjectId, testId: ObjectId) => {
  const ansMap = ['A', 'B', 'C', 'D', 'E'];

  const results = await ResultModel.findOne({
    userId,
    testId,
  }).populate('result');
  if (!!results) return results;

  const answerSheet = await AnswersheetModel.findOne(
    { userId, testId, completed: true },
    { testid: 0, userid: 0, startTime: 0, completed: 0 }
  )
    .populate({
      path: 'questions',
      select: {
        explanation: 1,
        weightage: 1,
        body: 1,
        answer: 1,
        isMcq: 1,
        customAnswer: 1,
      },
      populate: {
        path: 'options',
        model: OptionsModel,
        select: { isAnswer: 1 },
      },
    })
    .populate('answers', 'questionid chosenOption customAnswer');

  if (!answerSheet) throw new Error('invalid Inputs');

  let score = 0;
  const questions = answerSheet.questions as IQuestion[];
  const answers = answerSheet.answers as IAnswer[];
  const subResults = questions.map((d, i) => {
    if (!d.isMcq) {
      const answ = d.customAnswer;
      const chosen: string = answers[i].customAnswer;
      const isCorrect = answ === chosen;
      if (answ == chosen) score += d.weightage || 0;

      const givenAnswers = [];
      givenAnswers.push(chosen);
      const correctAnswers = [];
      correctAnswers.push(answ);

      return {
        qid: d._id,
        weightage: d.weightage,
        correctAnswer: correctAnswers,
        givenAnswer: givenAnswers,
        explanation: d.explanation,
        iscorrect: isCorrect,
      };
    } else {
      const ans = answers[i].chosenOption;
      const correctAns: string[] = [];
      const givenAns: string[] = [];
      (d.options as IOption[]).map((dd, ii) => {
        if (dd.isAnswer) correctAns.push(ansMap[ii]);

        for (let m = 0; m < ans.length; m++) {
          if (String(ans[m]) == String(dd._id)) {
            givenAns.push(ansMap[ii]);
          }
        }
      });
      const l1 = correctAns.length;
      const l2 = givenAns.length;
      let isCorrect = false;

      if (l1 == l2) {
        var count = 0;
        for (var p = 0; p < l1; p++) {
          for (var q = 0; q < l2; q++) {
            if (correctAns[p] == givenAns[q]) {
              count++;
              break;
            }
          }
        }
        if (count == l1) {
          isCorrect = true;
          score += d.weightage;
        }
      }

      var tmp = {
        qid: d._id,
        weightage: d.weightage,
        correctAnswer: correctAns,
        givenAnswer: givenAns,
        explanation: d.explanation,
        isCorrect,
      };

      return tmp;
    }
  });

  const subRes = await SubResultsModel.insertMany(subResults);
  const res = new ResultModel<Partial<IResult>>({
    testId,
    userId,
    answerSheetId: answerSheet._id,
    result: subRes,
    score,
  });

  const data = await res.save();
  return data;
};
