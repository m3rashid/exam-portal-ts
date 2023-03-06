import { model, ObjectId, Schema } from 'mongoose';
import { IAnswerSheet } from './answerSheet';
import { ISubResult } from './subResults';
import { ITestPaper } from './testPaper';
import { IUser } from './user';

export interface IResult {
  _id: ObjectId;
  testId: ObjectId | ITestPaper;
  userId: ObjectId | IUser;
  answerSheetId: ObjectId | IAnswerSheet;
  result: Array<ObjectId | ISubResult>;
  score?: number;
}

export const resultSchema = new Schema<IResult>({
  testId: {
    type: Schema.Types.ObjectId,
    ref: 'TestPaperModel',
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'UserModel',
    required: true,
  },
  answerSheetId: {
    type: Schema.Types.ObjectId,
    ref: 'AnswersheetModel',
    required: true,
  },
  result: [
    {
      type: Schema.Types.ObjectId,
      ref: 'SubResultsModel',
      required: true,
    },
  ],
  score: {
    type: Number,
    default: 0,
  },
});

export const ResultModel = model<IResult>('ResultModel', resultSchema);
