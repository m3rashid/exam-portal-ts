import { Schema, model, ObjectId } from 'mongoose';
import { IQuestion } from './questions';

export interface ISubResult {
  qId: ObjectId | IQuestion;
  explanation?: string;
  correctAnswer: Array<string>;
  givenAnswer: Array<string>;
  weightage: number;
  isCorrect?: boolean;
}

export const subResultsSchema = new Schema<ISubResult>({
  qId: {
    type: Schema.Types.ObjectId,
    ref: 'QuestionModel',
    required: true,
  },
  explanation: {
    type: String,
  },
  correctAnswer: [
    {
      type: String,
      required: true,
    },
  ],
  givenAnswer: [
    {
      type: String,
      required: true,
    },
  ],
  weightage: {
    type: Number,
    required: true,
  },
  isCorrect: {
    type: Boolean,
  },
});

export const SubResultsModel = model<ISubResult>(
  'subResultsModel',
  subResultsSchema
);
