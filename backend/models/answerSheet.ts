import { model, Schema } from 'mongoose';
import { IAnswerSheet } from 'types/models';

export const answersheetschema = new Schema<IAnswerSheet>(
  {
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
  },
  { timestamps: true }
);

export const AnswersheetModel = model<IAnswerSheet>(
  'AnswersheetModel',
  answersheetschema
);
