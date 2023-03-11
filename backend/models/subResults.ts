import { Schema, model } from 'mongoose';
import { ISubResult } from 'types/models';

export const subResultsSchema = new Schema<ISubResult>(
  {
    qId: { type: Schema.Types.ObjectId, ref: 'QuestionModel', required: true },
    explanation: { type: String },
    correctAnswer: [{ type: String, required: true }],
    givenAnswer: [{ type: String, required: true }],
    weightage: { type: Number, required: true },
    isCorrect: { type: Boolean },
  },
  { timestamps: true }
);

export const SubResultsModel = model<ISubResult>(
  'subResultsModel',
  subResultsSchema
);
