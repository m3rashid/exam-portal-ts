import { Schema, model, ObjectId } from 'mongoose';
import { IFeedback } from 'types/models';

export const feedbackschema = new Schema<IFeedback>(
  {
    feedback: { type: String, required: false },
    rating: { type: Number, required: false },
    userId: { type: Schema.Types.ObjectId, ref: 'UserModel', required: true },
    testId: {
      type: Schema.Types.ObjectId,
      ref: 'TestPaperModel',
      required: true,
    },
  },
  { timestamps: true }
);

export const FeedbackModel = model<IFeedback>('FeedbackModel', feedbackschema);
