import { model, ObjectId, Schema } from 'mongoose';
import { ITestPaper } from './testPaper';
import { IUser } from './user';
import { IQuestion } from './questions';
import { IAnswer } from './answers';

export interface IAnswerSheet {
  _id: ObjectId;
  startTime: number;
  testId: ObjectId | ITestPaper;
  userId: ObjectId | IUser;
  questions: Array<ObjectId | IQuestion>;
  answers: Array<ObjectId | IAnswer>;
  completed: boolean;
}

export const answersheetschema = new Schema<IAnswerSheet>({
  startTime: {
    type: Number,
    required: true,
  },
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
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'QuestionModel',
      required: true,
    },
  ],
  answers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'AnswerModel',
      required: true,
    },
  ],
  completed: {
    type: Boolean,
    default: false,
    required: true,
  },
});

export const AnswersheetModel = model<IAnswerSheet>(
  'AnswersheetModel',
  answersheetschema
);