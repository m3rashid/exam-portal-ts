import { Schema, model, ObjectId } from 'mongoose';
import { ITestPaper } from 'models/testpaper';
import { IUser } from 'models/user';

export interface IFeedback {
  feedback?: string;
  rating?: number;
  userId: ObjectId | IUser;
  testId: ObjectId | ITestPaper;
}

export const feedbackschema = new Schema<IFeedback>({
  feedback: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    required: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'UserModel',
    required: true,
  },
  testId: {
    type: Schema.Types.ObjectId,
    ref: 'TestPaperModel',
    required: true,
  },
});

export const FeedbackModel = model<IFeedback>('FeedbackModel', feedbackschema);
