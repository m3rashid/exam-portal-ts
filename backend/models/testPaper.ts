import { Schema, model } from 'mongoose';
import { ITestPaper } from 'types/models';

export const testschema = new Schema<ITestPaper>({
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'QuestionModel',
      required: false,
    },
  ],
  subjects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'SubjectModel',
      required: false,
    },
  ],
  duration: {
    type: Number,
    required: true,
  },
  difficulty: {
    type: Number,
    default: 1,
    required: false,
  },
  testBegins: {
    type: Boolean,
    default: false,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'UserModel',
  },
  isRegistrationAvailable: {
    type: Boolean,
    default: true,
    required: true,
  },
  testConducted: {
    type: Boolean,
    default: false,
    required: true,
  },
  isResultGenerated: {
    type: Boolean,
    default: false,
    required: true,
  },
});

export const TestPaperModel = model<ITestPaper>('TestPaperModel', testschema);
