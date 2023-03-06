import { model, ObjectId, Schema } from 'mongoose';
import { IOption } from 'models/options';
import { IUser } from 'models/user';

export interface IAnswer {
  questionId: string;
  customAnswer: string;
  chosenOption: Array<ObjectId | IOption>;
  userId: ObjectId | IUser;
}

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
