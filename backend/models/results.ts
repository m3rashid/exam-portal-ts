import { model, Schema } from 'mongoose';
import { IResult } from 'types/models';

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
