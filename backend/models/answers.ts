import { model, Schema } from 'mongoose';
import { IAnswer } from 'types/models';

export const answerSchema = new Schema<IAnswer>({
  questionId: {
    type: String,
    required: true,
  },
  customAnswer: {
    type: String,
  },
  chosenOption: [
    {
      type: Schema.Types.ObjectId,
      ref: 'OptionsModel',
      required: false,
    },
  ],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'UserModel',
    required: false,
  },
});

export const AnswerModel = model<IAnswer>('AnswerModel', answerSchema);
